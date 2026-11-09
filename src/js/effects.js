import { mountTitleMorph } from './title-morph.js?v=20261108-perf1';

const hero = document.getElementById('hero');
const host = hero?.querySelector('[data-melon]');
const hit = hero?.querySelector('[data-melon-hit]');
const morphWord = hero?.querySelector('[data-title-morph]');

if (morphWord) {
  mountTitleMorph(morphWord, document.querySelectorAll('.about-stack-tags > span'), { hero, hit });
}

if (host && hit) {
  let visible = false;
  let loading = false;
  let mounted = false;
  let melonModule;

  const mount = async () => {
    if (loading || mounted || !visible || document.hidden) return;
    loading = true;
    try {
      melonModule ||= await import('./melon.js?v=20261108-perf1');
      if (!visible || document.hidden) return;

      const footer = document.querySelector('footer');
      let rest;
      let restHost;
      let restVisible = false;
      let waiting = 0;
      const flush = () => {
        if (!restVisible || document.hidden) return;
        rest ||= melonModule.mountGlassesRest(restHost);
        while (waiting > 0) {
          waiting -= 1;
          rest?.drop();
        }
      };
      const dropGlasses = () => {
        if (!footer) return;
        waiting = Math.min(waiting + 1, 3);
        if (!restHost) {
          restHost = document.createElement('div');
          restHost.className = 'footer-glasses';
          restHost.setAttribute('aria-hidden', 'true');
          footer.appendChild(restHost);
          new IntersectionObserver(([entry]) => {
            restVisible = entry.isIntersecting;
            if (restVisible) setTimeout(flush, 250);
          }, { threshold: 0.6 }).observe(restHost);
          document.addEventListener('visibilitychange', flush);
        }
        if (restVisible) flush();
      };

      mounted = Boolean(melonModule.mountMelon(host, hit, {
        onState: (state) => {
          if (state === 'boom') dropGlasses();
          hero.classList.toggle('is-charging', state === 'charge');
          hero.classList.toggle('is-boom', state === 'boom');
        },
      }));
    } catch (error) {
      mounted = false;
    } finally {
      loading = false;
    }
  };

  const scheduleMount = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(mount, { timeout: 1200 });
    else window.requestAnimationFrame(mount);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) scheduleMount();
  }).observe(host);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && visible && !mounted) scheduleMount();
  });
}
