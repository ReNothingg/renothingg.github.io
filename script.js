document.addEventListener('DOMContentLoaded', () => {
  const sectionParams = {
    home: 'hero',
    about: 'about',
    projects: 'projects',
    orders: 'orders',
    support: 'support',
    contact: 'contact',
  };

  const getRequestedSection = () => {
    const query = window.location.search.slice(1).split('&')[0];
    const param = decodeURIComponent(query.split('=')[0] || '').toLowerCase();
    return sectionParams[param] || null;
  };

  const scrollToRequestedSection = (behavior = 'auto') => {
    const sectionId = getRequestedSection();
    if (!sectionId) return;

    document.getElementById(sectionId)?.scrollIntoView({ behavior, block: 'start' });
  };

  document.querySelectorAll('[data-section-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const sectionId = link.getAttribute('data-section-link');
      if (!sectionId) return;

      event.preventDefault();
      window.history.pushState(null, '', link.getAttribute('href'));
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  window.addEventListener('popstate', () => scrollToRequestedSection('smooth'));
  window.requestAnimationFrame(() => scrollToRequestedSection());

  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  const copyCards = document.querySelectorAll('.support-card--copy');
  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  copyCards.forEach((card) => {
    const button = card.querySelector('.copy-btn');
    if (!button) return;

    const handleCopy = async (event) => {
      event.preventDefault();
      const value = card.getAttribute('data-copy');
      if (!value) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          fallbackCopy(value);
        }
      } catch (error) {
        fallbackCopy(value);
      }

      const original = button.textContent;
      button.textContent = 'Скопировано';
      card.classList.add('is-copied');

      window.setTimeout(() => {
        button.textContent = original;
        card.classList.remove('is-copied');
      }, 1800);
    };

    card.addEventListener('click', handleCopy);
  });

  const setupProjectsScene = () => {
    const scene = document.querySelector('[data-projects-scene]');
    if (!scene) return;

    const section = scene.closest('#projects');
    const stories = Array.from(scene.querySelectorAll('[data-project-story]'));
    const previews = Array.from(scene.querySelectorAll('[data-project-preview]'));

    if (!stories.length || stories.length !== previews.length) return;

    let activeIndex = -1;
    let ticking = false;

    const setAccent = (index) => {
      const accent =
        stories[index]?.style.getPropertyValue('--project-accent') ||
        previews[index]?.style.getPropertyValue('--project-accent');

      if (!accent) return;

      scene.style.setProperty('--projects-active-accent', accent.trim());
      if (section) {
        section.style.setProperty('--projects-active-accent', accent.trim());
      }
    };

    const setActiveProject = (index) => {
      if (index < 0 || index >= stories.length || index === activeIndex) return;

      activeIndex = index;

      stories.forEach((story, storyIndex) => {
        story.classList.toggle('is-active', storyIndex === index);
      });

      previews.forEach((preview, previewIndex) => {
        preview.classList.toggle('is-active', previewIndex === index);
      });

      setAccent(index);
    };

    const updateActiveFromViewport = () => {
      const focusLine =
        (window.innerHeight || document.documentElement.clientHeight) * 0.48;
      let nextIndex = activeIndex === -1 ? 0 : activeIndex;
      let closestDistance = Number.POSITIVE_INFINITY;

      stories.forEach((story, index) => {
        const rect = story.getBoundingClientRect();
        const storyCenter = rect.top + rect.height / 2;
        const distance = Math.abs(storyCenter - focusLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveProject(nextIndex);
    };

    const updateProgress = () => {
      const rect = scene.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const distance = Math.max(rect.height - viewportHeight * 0.45, 1);
      const rawProgress = (viewportHeight * 0.2 - rect.top) / distance;
      const progress = Math.min(Math.max(rawProgress, 0.04), 1);

      scene.style.setProperty('--projects-progress', progress.toFixed(4));
      scene.style.setProperty(
        '--projects-progress-offset',
        `${(progress * 24).toFixed(2)}px`
      );
      scene.style.setProperty(
        '--projects-glow-opacity',
        (0.5 + progress * 0.35).toFixed(3)
      );
      updateActiveFromViewport();
    };

    const requestProgressUpdate = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          let nextIndex = activeIndex;
          let bestRatio = 0;

          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            if (entry.intersectionRatio >= bestRatio) {
              bestRatio = entry.intersectionRatio;
              nextIndex = stories.indexOf(entry.target);
            }
          });

          if (nextIndex !== -1) {
            setActiveProject(nextIndex);
          }
        },
        {
          threshold: [0.2, 0.4, 0.6, 0.8],
          rootMargin: '-18% 0px -22% 0px',
        }
      );

      stories.forEach((story) => observer.observe(story));
    }

    stories.forEach((story, index) => {
      story.addEventListener('mouseenter', () => setActiveProject(index));
      story.addEventListener('focusin', () => setActiveProject(index));
    });

    setActiveProject(0);
    updateProgress();

    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);
  };

  const setupDeadProjectsMarquee = () => {
    const track = document.querySelector('[data-dead-projects-track]');
    const group = document.querySelector('[data-dead-projects-group]');

    if (!track || !group || track.children.length > 1) return;

    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');

    clone.querySelectorAll('img').forEach((image) => {
      image.alt = '';
    });

    track.appendChild(clone);
  };

  setupProjectsScene();
  setupDeadProjectsMarquee();

  const scrollButton = document.getElementById('scrollToTopBtn');
  if (scrollButton) {
    const onScroll = () => {
      if (window.scrollY > 600) scrollButton.classList.add('visible');
      else scrollButton.classList.remove('visible');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    scrollButton.addEventListener('click', () => {
      window.scrollTo({ top: 0 });
    });
  }
});
