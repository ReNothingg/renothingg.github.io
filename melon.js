import * as THREE from 'three';

const COLORS = {
  light: '#bcc97e',
  dark: '#6e874f',
  red: '#c4554a',
  ink: '#302f2d',
  lens: '#2c2a2b',
  flesh: '#ef3b4f',
  rindWhite: '#eef0c8',
  rivet: '#e9e6dc',
  laser: '#ff1f1f',
};

const CAMERA_DISTANCE = 10;
const FOV = 30;
const BODY_SCALE = new THREE.Vector3(1.03, 1, 1);
const GLASSES_Z = 1.0;
const GLASSES_BEND = 0.28;
const LENS_CENTER = new THREE.Vector2(0.535, 0.15);

const isSmallScreen = () => window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

const createGradientMap = (levels) => {
  const data = new Uint8Array(levels.flatMap((value) => [value, value, value, 255]));
  const texture = new THREE.DataTexture(data, levels.length, 1, THREE.RGBAFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
};

const createStripeTexture = (renderer) => {
  const width = 1024;
  const height = 512;
  const stripes = 10;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = COLORS.light;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = COLORS.dark;

  const period = width / stripes;
  for (let i = 0; i < stripes; i += 1) {
    const center = (i + 0.5) * period;
    const left = [];
    const right = [];
    for (let y = 0; y <= height; y += 4) {
      const v = y / height;
      const wobble = Math.sin(v * Math.PI * 4 + i * 1.9) * period * 0.1 + Math.sin(v * Math.PI * 9 + i * 0.7) * period * 0.03;
      const half = period * (0.21 + 0.05 * Math.sin(v * Math.PI * 5 + i * 2.3));
      left.push([center + wobble - half, y]);
      right.push([center + wobble + half, y]);
    }
    [-width, 0, width].forEach((shift) => {
      ctx.beginPath();
      left.forEach(([x, y], index) => (index ? ctx.lineTo(x + shift, y) : ctx.moveTo(x + shift, y)));
      for (let k = right.length - 1; k >= 0; k -= 1) ctx.lineTo(right[k][0] + shift, right[k][1]);
      ctx.closePath();
      ctx.fill();
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  return texture;
};

const toSphere = (x, y, radius) =>
  new THREE.Vector3(Math.sin(x) * Math.cos(y) * radius, Math.sin(y) * radius, Math.cos(x) * Math.cos(y) * radius);

const wrapOntoSphere = (geometry, lift) => {
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const p = toSphere(pos.getX(i), pos.getY(i), 1 + lift + pos.getZ(i));
    pos.setXYZ(i, p.x, p.y, p.z);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
};

const bend = (geometry) => {
  const pos = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    pos.setZ(i, pos.getZ(i) - GLASSES_BEND * x * x);
    const angle = Math.atan(2 * GLASSES_BEND * x);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const nx = normal.getX(i);
    const nz = normal.getZ(i);
    normal.setXYZ(i, nx * cos + nz * sin, normal.getY(i), -nx * sin + nz * cos);
  }
  pos.needsUpdate = true;
  normal.needsUpdate = true;
  return geometry;
};

const smoothShape = (points) => {
  const shape = new THREE.Shape();
  const vectors = points.map(([x, y]) => new THREE.Vector2(x, y));
  shape.moveTo(vectors[0].x, vectors[0].y);
  shape.splineThru([...vectors.slice(1), vectors[0]]);
  return shape;
};

const LEFT_LENS = [
  [-0.86, 0.36], [-0.7, 0.43], [-0.45, 0.435], [-0.27, 0.405], [-0.205, 0.31], [-0.225, 0.13],
  [-0.32, -0.035], [-0.53, -0.13], [-0.74, -0.09], [-0.84, 0.03], [-0.875, 0.2],
];

const FRAME = [
  [-1.04, 0.45], [-0.8, 0.49], [-0.5, 0.49], [-0.24, 0.455], [0, 0.42], [0.24, 0.455], [0.5, 0.49], [0.8, 0.49],
  [1.04, 0.45], [1.045, 0.33], [0.965, 0.26], [0.925, 0.06], [0.845, -0.12], [0.62, -0.19], [0.4, -0.17],
  [0.25, -0.06], [0.155, 0.12], [0.075, 0.245], [0, 0.275], [-0.075, 0.245], [-0.155, 0.12], [-0.25, -0.06],
  [-0.4, -0.17], [-0.62, -0.19], [-0.845, -0.12], [-0.925, 0.06], [-0.965, 0.26], [-1.045, 0.33],
];

const lensPoints = (side, grow = 1) =>
  LEFT_LENS.map(([x, y]) => {
    const cx = -LENS_CENTER.x;
    const gx = cx + (x - cx) * grow;
    const gy = LENS_CENTER.y + (y - LENS_CENTER.y) * grow;
    return [side < 0 ? gx : -gx, gy];
  });

const domeNormals = (geometry, cx, cy, strength) => {
  const pos = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 1) {
    v.set((pos.getX(i) - cx) * strength, (pos.getY(i) - cy) * strength, 1).normalize();
    normal.setXYZ(i, v.x, v.y, v.z);
  }
  normal.needsUpdate = true;
  return geometry;
};

const createReflections = (renderer) => {
  const room = new THREE.Scene();
  room.add(new THREE.Mesh(new THREE.SphereGeometry(10, 24, 16), new THREE.MeshBasicMaterial({ color: '#2a292c', side: THREE.BackSide })));
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshBasicMaterial({ color: '#3d4a2c' }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -4;
  room.add(floor);
  const panel = (w, h, color, position, lookAt) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    mesh.position.copy(position);
    mesh.lookAt(lookAt);
    room.add(mesh);
  };
  const center = new THREE.Vector3();
  panel(11, 5, '#ffffff', new THREE.Vector3(-5, 6, 6), center);
  panel(2.2, 12, '#fff6e0', new THREE.Vector3(7, 1, 5), center);
  panel(18, 1.2, '#d8ecff', new THREE.Vector3(0, 3, 8), center);
  panel(3, 3, '#ffd9c9', new THREE.Vector3(-7, -1, -3), center);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(room, 0.02).texture;
  pmrem.dispose();
  return texture;
};

const mirrorGeometry = (geometry) => {
  geometry.scale(-1, 1, 1);
  const index = geometry.index.array;
  for (let i = 0; i < index.length; i += 3) {
    const swap = index[i + 1];
    index[i + 1] = index[i + 2];
    index[i + 2] = swap;
  }
  geometry.index.needsUpdate = true;
  return geometry;
};

const buildGlasses = (materials) => {
  const group = new THREE.Group();
  const frameShape = smoothShape(FRAME);
  const frame = new THREE.ExtrudeGeometry(frameShape, { depth: 0.07, bevelEnabled: false, curveSegments: 10 });
  group.add(new THREE.Mesh(bend(frame), materials.frame));

  const leftLens = new THREE.ShapeGeometry(smoothShape(lensPoints(-1)), 12);
  const lenses = [];
  [-1, 1].forEach((side) => {
    const lensGeo = side < 0 ? leftLens.clone() : mirrorGeometry(leftLens.clone());
    domeNormals(lensGeo, side * LENS_CENTER.x, LENS_CENTER.y, 0.9);
    lensGeo.translate(0, 0, 0.09);
    const lens = new THREE.Mesh(bend(lensGeo), materials.lens);
    group.add(lens);
    lenses.push(lens);


    const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), materials.rivet);
    rivet.position.set(side * 0.94, 0.4, 0.075 - GLASSES_BEND * 0.94 * 0.94);
    group.add(rivet);

    const temple = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 1.03, 0.4, 0.04 - GLASSES_BEND * 1.06),
      new THREE.Vector3(side * 1.05, 0.41, -0.35),
      new THREE.Vector3(side * 0.98, 0.42, -0.95),
      new THREE.Vector3(side * 0.8, 0.42, -1.35),
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(temple, 16, 0.03, 6, false), materials.frame));
  });

  group.position.set(0, 0, GLASSES_Z);
  return { group, lenses };
};

const buildMouth = (materials) => {
  const group = new THREE.Group();
  const start = new THREE.Vector2(-0.205, -0.268);
  const control = new THREE.Vector2(0.02, -0.47);
  const end = new THREE.Vector2(0.245, -0.262);
  const curve = new THREE.QuadraticBezierCurve(start, control, end);
  const points = [new THREE.Vector2(-0.222, -0.252), ...curve.getPoints(24), new THREE.Vector2(0.262, -0.246)];
  const path = new THREE.CatmullRomCurve3(points.map((p) => toSphere(p.x, p.y, 1.014)));
  group.add(new THREE.Mesh(new THREE.TubeGeometry(path, 40, 0.023, 6, false), materials.ink));

  const lip = new THREE.Shape();
  lip.moveTo(-0.15, -0.292);
  lip.quadraticCurveTo(0.012, -0.205, 0.18, -0.288);
  lip.quadraticCurveTo(0.03, -0.39, -0.15, -0.292);
  const lipGeo = new THREE.ExtrudeGeometry(lip, { depth: 0.006, bevelEnabled: false, curveSegments: 12 });
  group.add(new THREE.Mesh(wrapOntoSphere(lipGeo, 0.006), materials.red));
  return group;
};

const buildLaser = () => {
  const group = new THREE.Group();
  const make = (radius, color, opacity) => {
    const geo = new THREE.CylinderGeometry(radius, radius, 1, 10, 1, true);
    geo.translate(0, 0.5, 0);
    geo.rotateX(Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, toneMapped: false });
    return new THREE.Mesh(geo, mat);
  };
  const beams = [make(0.11, COLORS.laser, 0.22), make(0.045, COLORS.laser, 0.9), make(0.015, '#fff3f3', 1)];
  beams.forEach((beam) => group.add(beam));
  const flare = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 12, 8),
    new THREE.MeshBasicMaterial({ color: '#ff5a4a', transparent: true, opacity: 0.85, depthWrite: false, toneMapped: false })
  );
  group.add(flare);
  group.visible = false;
  return { group, beams, flare };
};

export function mountMelon(host, hit, options = {}) {
  const small = isSmallScreen();
  const canvas = document.createElement('canvas');
  canvas.className = 'melon-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: small ? 'default' : 'high-performance' });
  } catch (error) {
    return null;
  }

  host.prepend(canvas);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 80);
  camera.position.set(0, 0, CAMERA_DISTANCE);

  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.45);
  key.position.set(-3, 4, 5);
  scene.add(key);

  const reflections = createReflections(renderer);
  const gradientMap = createGradientMap([120, 200, 255]);
  const softGradient = createGradientMap([215, 255]);
  const toon = (color, extra = {}) => new THREE.MeshToonMaterial({ color, gradientMap, ...extra });
  const materials = {
    rind: toon('#ffffff', { map: createStripeTexture(renderer) }),
    outline: new THREE.MeshBasicMaterial({ color: COLORS.ink, side: THREE.BackSide }),
    frame: toon(COLORS.red, { gradientMap: softGradient }),
    lens: new THREE.MeshStandardMaterial({
      color: '#8e8e94',
      roughness: 0.07,
      metalness: 1,
      envMap: reflections,
      envMapIntensity: 1,
      emissive: new THREE.Color(COLORS.laser),
      emissiveIntensity: 0,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
    rivet: new THREE.MeshBasicMaterial({ color: COLORS.rivet }),
    ink: new THREE.MeshBasicMaterial({ color: COLORS.ink }),
    red: toon(COLORS.red, { gradientMap: softGradient }),
    flash: new THREE.MeshBasicMaterial({ color: '#fff4c9', transparent: true, opacity: 0, depthWrite: false, toneMapped: false }),
    ring: new THREE.MeshBasicMaterial({ color: '#ffd23f', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
  };

  const stage = new THREE.Group();
  scene.add(stage);
  const root = new THREE.Group();
  stage.add(root);
  const body = new THREE.Group();
  body.scale.copy(BODY_SCALE);
  root.add(body);

  const sphere = new THREE.SphereGeometry(1, small ? 48 : 64, small ? 36 : 48);
  body.add(new THREE.Mesh(sphere, materials.rind));
  const outline = new THREE.Mesh(sphere, materials.outline);
  outline.scale.setScalar(1.028);
  body.add(outline);
  body.add(buildMouth(materials));

  const { group: glasses, lenses } = buildGlasses(materials);
  body.add(glasses);

  const lasers = [-1, 1].map((side) => {
    const laser = buildLaser();
    laser.group.position.set(side * LENS_CENTER.x, LENS_CENTER.y, 0.11 - GLASSES_BEND * LENS_CENTER.x * LENS_CENTER.x);
    glasses.add(laser.group);
    return { ...laser, side };
  });

  const shadow = (() => {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(20,20,20,0.36)');
    g.addColorStop(0.55, 'rgba(20,20,20,0.12)');
    g.addColorStop(1, 'rgba(20,20,20,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 2.8),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -1.3;
    stage.add(mesh);
    return mesh;
  })();

  const flash = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), materials.flash);
  flash.visible = false;
  stage.add(flash);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 64), materials.ring);
  ring.visible = false;
  stage.add(ring);

  const counts = small ? { chunk: 6, seed: 16, juice: 36 } : { chunk: 9, seed: 26, juice: 64 };
  const chunkGeometry = new THREE.DodecahedronGeometry(0.26, 0);
  const seedGeometry = new THREE.SphereGeometry(0.05, 8, 6);
  seedGeometry.scale(0.7, 1.3, 0.5);
  const juiceGeometry = new THREE.IcosahedronGeometry(0.045, 0);

  const createPool = (geometry, material, capacity) => {
    const mesh = new THREE.InstancedMesh(geometry, material, capacity);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.count = 0;
    mesh.frustumCulled = false;
    stage.add(mesh);
    return { mesh, capacity, items: [] };
  };

  const pools = {
    flesh: createPool(chunkGeometry, toon(COLORS.flesh), counts.chunk * 2),
    dark: createPool(chunkGeometry, toon(COLORS.dark), counts.chunk),
    light: createPool(chunkGeometry, toon(COLORS.light), counts.chunk),
    white: createPool(chunkGeometry, toon(COLORS.rindWhite), counts.chunk),
    seed: createPool(seedGeometry, new THREE.MeshBasicMaterial({ color: '#1d1714' }), counts.seed),
    juice: createPool(juiceGeometry, new THREE.MeshBasicMaterial({ color: '#ff3048' }), counts.juice),
  };
  const dummy = new THREE.Object3D();

  const state = {
    phase: 'idle',
    phaseTime: 0,
    time: 0,
    pointer: new THREE.Vector2(),
    look: new THREE.Vector2(),
    squash: 0,
    squashVelocity: 0,
    pop: 1,
    popVelocity: 0,
    running: false,
    visible: true,
    glassesFlight: null,
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const halfHeight = CAMERA_DISTANCE * Math.tan(THREE.MathUtils.degToRad(FOV / 2));

  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();

    const hitRect = hit.getBoundingClientRect();
    const cx = hitRect.left + hitRect.width / 2 - rect.left;
    const cy = hitRect.top + hitRect.height / 2 - rect.top;
    const halfWidth = halfHeight * camera.aspect;
    stage.position.set((cx / rect.width) * 2 * halfWidth - halfWidth, halfHeight - (cy / rect.height) * 2 * halfHeight, 0);
    const radius = (hitRect.height / 2 / rect.height) * 2 * halfHeight;
    stage.scale.setScalar(radius * 0.92);
  };

  const setPhase = (phase) => {
    state.phase = phase;
    state.phaseTime = 0;
    host.classList.toggle('is-busy', phase !== 'idle');
    options.onState?.(phase === 'exploded' ? 'boom' : phase);
  };

  const randomDirection = () => new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.35, Math.random() - 0.3).normalize();

  const spawn = (pool, spread, speed, lift, size, life) => {
    if (pool.items.length >= pool.capacity) return;
    const dir = randomDirection();
    const s = size * (0.6 + Math.random() * 0.9);
    pool.items.push({
      position: dir.clone().multiplyScalar(Math.random() * spread),
      velocity: dir.multiplyScalar(speed * (0.6 + Math.random() * 0.8)).add(new THREE.Vector3(0, lift, 0)),
      rotation: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      spin: new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14),
      scale: new THREE.Vector3(s * (0.7 + Math.random() * 0.6), s, s * (0.7 + Math.random() * 0.6)),
      life: life * (0.8 + Math.random() * 0.4),
      age: 0,
    });
  };

  const explode = () => {
    body.visible = false;
    lasers.forEach((laser) => (laser.group.visible = false));

    for (let i = 0; i < counts.chunk * 2; i += 1) spawn(pools.flesh, 0.8, 9, 2.5, 1, 3);
    for (let i = 0; i < counts.chunk; i += 1) {
      spawn(pools.dark, 0.8, 9, 2.5, 1, 3);
      spawn(pools.light, 0.8, 9, 2.5, 1, 3);
      spawn(pools.white, 0.8, 9, 2.5, 0.8, 3);
    }
    for (let i = 0; i < counts.seed; i += 1) spawn(pools.seed, 0.5, 11, 3, 1, 3);
    for (let i = 0; i < counts.juice; i += 1) spawn(pools.juice, 0.6, 14, 0, 1.2, 1.8);

    const worldPosition = new THREE.Vector3();
    const worldQuaternion = new THREE.Quaternion();
    glasses.getWorldPosition(worldPosition);
    glasses.getWorldQuaternion(worldQuaternion);
    stage.worldToLocal(worldPosition);
    body.remove(glasses);
    stage.add(glasses);
    glasses.position.copy(worldPosition);
    glasses.quaternion.copy(worldQuaternion);
    glasses.scale.copy(BODY_SCALE);
    state.glassesFlight = {
      velocity: new THREE.Vector3((Math.random() - 0.5) * 3, 11, 0.8),
      spin: new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 10),
    };

    flash.visible = true;
    ring.visible = true;
    flash.scale.setScalar(0.5);
    ring.scale.setScalar(1);
  };

  const reform = () => {
    Object.values(pools).forEach((pool) => {
      pool.items.length = 0;
      pool.mesh.count = 0;
    });
    stage.remove(glasses);
    body.add(glasses);
    glasses.position.set(0, 0, GLASSES_Z);
    glasses.rotation.set(0, 0, 0);
    glasses.scale.set(1, 1, 1);
    state.glassesFlight = null;
    lenses.forEach((lens) => (lens.material.emissiveIntensity = 0));
    body.visible = true;
    state.pop = 0;
    state.popVelocity = 0;
  };

  const trigger = () => {
    if (state.phase !== 'idle') return;
    state.squashVelocity -= 3.5;
    setPhase('charge');
  };

  const onPointerMove = (event) => {
    const rect = hit.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    state.pointer.set(
      THREE.MathUtils.clamp((event.clientX - cx) / (window.innerWidth / 2), -1, 1),
      THREE.MathUtils.clamp((event.clientY - cy) / (window.innerHeight / 2), -1, 1)
    );
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  hit.addEventListener('click', trigger);
  hit.addEventListener('pointerenter', () => {
    if (state.phase === 'idle') state.squashVelocity += 1.4;
  });

  const clock = new THREE.Clock();
  const forward = new THREE.Vector3(0, 0, 1);
  const direction = new THREE.Vector3();
  const CHARGE = 1.25;
  const EXPLODED = 3.6;

  const updatePools = (dt) => {
    Object.values(pools).forEach((pool) => {
      const { items, mesh } = pool;
      for (let i = items.length - 1; i >= 0; i -= 1) {
        const item = items[i];
        item.age += dt;
        if (item.age >= item.life) {
          items.splice(i, 1);
          continue;
        }
        item.velocity.y -= 15 * dt;
        item.velocity.multiplyScalar(Math.pow(0.6, dt));
        item.position.addScaledVector(item.velocity, dt);
        item.rotation.x += item.spin.x * dt;
        item.rotation.y += item.spin.y * dt;
        item.rotation.z += item.spin.z * dt;
      }
      if (!items.length && !mesh.count) return;
      items.forEach((item, index) => {
        const fade = THREE.MathUtils.clamp((item.life - item.age) / 0.5, 0, 1);
        dummy.position.copy(item.position);
        dummy.rotation.copy(item.rotation);
        dummy.scale.copy(item.scale).multiplyScalar(fade);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
      });
      mesh.count = items.length;
      mesh.instanceMatrix.needsUpdate = true;
    });
  };

  const tick = (dt) => {
    state.time += dt;
    state.phaseTime += dt;
    const t = state.time;
    const idle = reduceMotion ? 0 : 1;

    state.look.lerp(state.pointer, 1 - Math.pow(0.003, dt));
    root.rotation.y = state.look.x * 0.5 + Math.sin(t * 0.6) * 0.05 * idle;
    root.rotation.x = state.look.y * 0.3 + Math.sin(t * 0.8) * 0.03 * idle;
    root.rotation.z = -state.look.x * 0.08;
    root.position.set(0, Math.sin(t * 1.3) * 0.06 * idle, 0);

    state.squashVelocity += (-170 * state.squash - 10 * state.squashVelocity) * dt;
    state.squash += state.squashVelocity * dt;
    state.popVelocity += (-160 * (state.pop - 1) - 9 * state.popVelocity) * dt;
    state.pop += state.popVelocity * dt;
    const s = state.squash * 0.22;
    const p = Math.max(state.pop, 0);
    body.scale.set(BODY_SCALE.x * (1 - s * 0.6) * p, BODY_SCALE.y * (1 + s) * p, BODY_SCALE.z * (1 - s * 0.6) * p);

    if (state.phase === 'charge') {
      const k = Math.min(state.phaseTime / CHARGE, 1);
      const jitter = 0.02 + k * 0.07;
      root.position.x += (Math.random() - 0.5) * jitter;
      root.position.y += (Math.random() - 0.5) * jitter;
      body.scale.multiplyScalar(1 + k * 0.12 + Math.sin(t * 60) * 0.015 * k);
      lenses.forEach((lens) => (lens.material.emissiveIntensity = 0.4 + k * 2.2));

      const firing = state.phaseTime > 0.18;
      lasers.forEach((laser) => {
        laser.group.visible = firing;
        if (!firing) return;
        const sweep = Math.sin(state.phaseTime * 5.5 + laser.side) * 0.35;
        const angle = 0.95 + Math.sin(state.phaseTime * 3.1 + laser.side * 2) * 0.35;
        direction.set(laser.side * Math.sin(angle), -0.12 + sweep, Math.cos(angle)).normalize();
        laser.beams.forEach((beam, index) => {
          beam.quaternion.setFromUnitVectors(forward, direction);
          const wobble = 1 + Math.sin(t * 50 + index) * 0.12;
          beam.scale.set(wobble, wobble, 40);
        });
        laser.flare.scale.setScalar(0.9 + Math.sin(t * 40) * 0.25);
      });

      if (state.phaseTime >= CHARGE) {
        explode();
        setPhase('exploded');
      }
    } else if (state.phase === 'exploded') {
      const pt = state.phaseTime;
      flash.visible = pt < 0.35;
      flash.scale.setScalar(0.5 + pt * 9);
      materials.flash.opacity = Math.max(0, 1 - pt / 0.35);
      ring.visible = pt < 0.7;
      ring.scale.setScalar(1 + pt * 10);
      ring.quaternion.copy(camera.quaternion);
      materials.ring.opacity = Math.max(0, 0.9 - pt / 0.7);

      if (state.glassesFlight) {
        const flight = state.glassesFlight;
        flight.velocity.y -= 16 * dt;
        glasses.position.addScaledVector(flight.velocity, dt);
        glasses.rotation.x += flight.spin.x * dt;
        glasses.rotation.y += flight.spin.y * dt;
        glasses.rotation.z += flight.spin.z * dt;
      }

      if (pt >= EXPLODED) {
        reform();
        setPhase('idle');
      }
    }

    shadow.visible = body.visible;
    const shadowScale = (1 - root.position.y * 0.6) * Math.max(p, 0.01);
    shadow.scale.set(shadowScale, shadowScale, 1);

    updatePools(dt);
    renderer.render(scene, camera);
  };

  const frame = () => {
    if (!state.running) return;
    tick(Math.min(clock.getDelta(), 0.05));
    requestAnimationFrame(frame);
  };

  const start = () => {
    if (state.running) return;
    state.running = true;
    clock.getDelta();
    requestAnimationFrame(frame);
  };
  const stop = () => {
    state.running = false;
  };

  const io = new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting;
    if (state.visible && !document.hidden) start();
    else stop();
  });
  io.observe(host);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (state.visible) start();
  });

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  ro.observe(hit);
  resize();
  tick(0);
  host.classList.add('is-3d');
  start();

  return { trigger };
}
