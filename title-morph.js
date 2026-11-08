const SPRING = 'cubic-bezier(0.34, 1.4, 0.64, 1)';
const SPACE = ' ';

const collectWords = (source) => {
  const words = [];
  source.forEach((chip) => {
    const text = chip.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;
    const parts = text.length > 14 ? text.split(/\s*\/\s*/) : [text];
    parts.forEach((part) => {
      if (part && !words.includes(part)) words.push(part);
    });
  });
  return words;
};

const buildSequence = (home, words, groupSize) => {
  const sequence = [];
  for (let i = 0; i < words.length; i += groupSize) {
    sequence.push(home, ...words.slice(i, i + groupSize));
  }
  return sequence;
};

const makeLetter = (char) => {
  const span = document.createElement('span');
  span.textContent = char === ' ' ? SPACE : char;
  span.dataset.char = char;
  return span;
};

export function mountTitleMorph(word, chips, options = {}) {
  const hero = options.hero || word.closest('section');
  const home = word.textContent.trim();
  const words = collectWords(chips);
  if (!words.length) return null;

  const sequence = buildSequence(home, words, options.groupSize || 4);
  const homeHold = options.homeHold || 3200;
  const wordHold = options.wordHold || 1500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let timer = 0;
  let visible = true;
  let current = home;

  [...word.children].forEach((span) => {
    span.dataset.char = span.textContent;
  });

  const paintAccent = (letters, text) => {
    const accent = text === home ? 2 : 1;
    letters.forEach((span, i) => span.classList.toggle('is-accent', i < accent));
  };

  const gap = document.createElement('span');
  gap.className = 'hero-gap';

  const letters = () => [...word.children].filter((span) => span !== gap && !span.classList.contains('is-leaving'));

  const gapWidth = () => {
    const melon = options.hit?.getBoundingClientRect();
    if (!melon || !melon.width) return 0;
    const title = word.parentElement.getBoundingClientRect();
    const overlap = Math.min(melon.bottom, title.bottom) - Math.max(melon.top, title.top);
    return overlap > title.height * 0.25 ? melon.width * 1.2 : 0;
  };

  const splitPoint = (target) => {
    const middle = target.length / 2;
    let best = -1;
    target.forEach((char, i) => {
      if (char === ' ' && (best < 0 || Math.abs(i - middle) < Math.abs(best - middle))) best = i;
    });
    return best >= 0 ? { at: best, drop: true } : { at: Math.round(middle), drop: false };
  };

  const fitFor = () => {
    const limit = Math.min(window.innerWidth, hero.getBoundingClientRect().width) * (window.innerWidth <= 900 ? 0.9 : 0.86);
    word.style.setProperty('--fit', '1');
    word.style.translate = '';
    if (!gap.isConnected) {
      const natural = word.scrollWidth;
      word.style.setProperty('--fit', (natural > limit ? limit / natural : 1).toFixed(4));
      return;
    }
    const size = gapWidth();
    gap.style.width = `${size}px`;
    const left = gap.offsetLeft;
    const right = word.scrollWidth - left - size;
    const fit = Math.min(1, (limit - size) / 2 / Math.max(left, right, 1));
    word.style.setProperty('--fit', fit.toFixed(4));
    if (size) word.style.translate = `${((right - left) * fit) / 2}px 0`;
  };

  const morph = (text) => {
    const oldLetters = letters();
    const oldRects = new Map(oldLetters.map((span) => [span, span.getBoundingClientRect()]));
    const oldBox = word.getBoundingClientRect();
    const oldFont = parseFloat(getComputedStyle(word).fontSize);
    const used = new Set();
    const target = [...text];
    word.classList.add('is-morphing');

    const next = target.map((char, j) => {
      if (char === ' ') return makeLetter(char);
      const key = char.toLowerCase();
      let best = null;
      let bestScore = Infinity;
      oldLetters.forEach((span, i) => {
        if (used.has(span) || span.dataset.char.toLowerCase() !== key) return;
        const score = Math.abs(i / Math.max(oldLetters.length - 1, 1) - j / Math.max(target.length - 1, 1)) + (span.dataset.char === char ? 0 : 0.15);
        if (score < bestScore) {
          bestScore = score;
          best = span;
        }
      });
      if (!best) return makeLetter(char);
      used.add(best);
      best.textContent = char;
      best.dataset.char = char;
      return best;
    });

    const leaving = oldLetters.filter((span) => !used.has(span));
    const glyphs = next.slice();
    if (text !== home && gapWidth()) {
      const split = splitPoint(target);
      next.splice(split.at, split.drop ? 1 : 0, gap);
    }
    word.replaceChildren(...next);
    paintAccent(glyphs, text);
    fitFor();

    const newBox = word.getBoundingClientRect();
    const newFont = parseFloat(getComputedStyle(word).fontSize);
    const ratio = oldFont / newFont;

    leaving.forEach((span, i) => {
      const rect = oldRects.get(span);
      span.classList.add('is-leaving');
      span.style.left = `${rect.left - newBox.left}px`;
      span.style.top = `${rect.top - newBox.top}px`;
      span.style.fontSize = `${oldFont}px`;
      word.appendChild(span);
      const drift = (rect.left + rect.width / 2 - (oldBox.left + oldBox.width / 2)) / oldBox.width;
      const spin = (i % 2 ? 1 : -1) * (12 + (i * 7) % 18);
      span.animate(
        [
          { opacity: 1, transform: 'none', filter: 'blur(0px)' },
          { opacity: 0, transform: `translate(${drift * 0.6}em, ${i % 3 === 0 ? '-' : ''}0.45em) rotate(${spin}deg) scale(0.4)`, filter: 'blur(10px)' },
        ],
        { duration: 520, delay: i * 22, easing: 'cubic-bezier(0.5, 0, 0.75, 0)', fill: 'forwards' }
      ).finished.then(() => span.remove(), () => span.remove());
    });

    let fresh = 0;
    next.forEach((span, j) => {
      if (span === gap) return;
      const from = oldRects.get(span);
      if (from) {
        const to = span.getBoundingClientRect();
        const dx = from.left + from.width / 2 - (to.left + to.width / 2);
        const dy = from.top + from.height / 2 - (to.top + to.height / 2);
        const hop = Math.min(Math.abs(dx) * 0.22, newFont * 0.45) * (dx > 0 ? 1 : -1);
        span.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(${ratio})` },
            { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - hop}px) scale(${1 + (ratio - 1) * 0.45}) rotate(${dx > 0 ? -6 : 6}deg)`, offset: 0.5 },
            { transform: 'none' },
          ],
          { duration: 820, delay: j * 18, easing: SPRING, fill: 'backwards' }
        );
      } else if (span.dataset.char !== ' ') {
        const tilt = fresh % 2 ? -14 : 12;
        span.animate(
          [
            { opacity: 0, transform: `translateY(0.55em) rotate(${tilt}deg) scale(0.3)`, filter: 'blur(12px)' },
            { opacity: 1, transform: 'none', filter: 'blur(0px)' },
          ],
          { duration: 680, delay: 180 + fresh * 38, easing: SPRING, fill: 'backwards' }
        );
        fresh += 1;
      }
    });

    current = text;
  };

  const busy = () => hero.classList.contains('is-charging') || hero.classList.contains('is-boom');

  const schedule = (delay) => {
    clearTimeout(timer);
    timer = setTimeout(step, delay);
  };

  const step = () => {
    if (!visible || document.hidden) return;
    if (busy()) {
      schedule(600);
      return;
    }
    index = (index + 1) % sequence.length;
    morph(sequence[index]);
    schedule(sequence[index] === home ? homeHold : wordHold);
  };

  const resume = () => {
    if (visible && !document.hidden) schedule(current === home ? homeHold : wordHold);
  };

  if (reduceMotion) return null;

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) resume();
    else clearTimeout(timer);
  }).observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTimeout(timer);
    else resume();
  });

  window.addEventListener('resize', () => {
    if (gap.isConnected && !gapWidth()) gap.remove();
    fitFor();
  }, { passive: true });

  schedule(options.startDelay || 2600);

  return { morph };
}
