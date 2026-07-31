document.addEventListener('DOMContentLoaded', () => {
  const sectionParams = {
    home: 'hero',
    about: 'about',
    projects: 'projects',
    orders: 'orders',
    cases: 'orders',
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

  const setupHorizontalDrag = (scroller) => {
    if (!scroller) return;

    let dragPointerId = null;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragged = false;
    let suppressClick = false;

    scroller.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;

      dragPointerId = event.pointerId;
      dragStartX = event.clientX;
      dragStartScroll = scroller.scrollLeft;
      dragged = false;
    });

    scroller.addEventListener('pointermove', (event) => {
      if (event.pointerId !== dragPointerId) return;

      const distance = event.clientX - dragStartX;
      if (!dragged && Math.abs(distance) > 5) {
        dragged = true;
        scroller.setPointerCapture(event.pointerId);
        scroller.classList.add('is-dragging');
      }

      if (!dragged) return;
      scroller.scrollLeft = dragStartScroll - distance;
    });

    const finishDrag = (event) => {
      if (event.pointerId !== dragPointerId) return;

      if (scroller.hasPointerCapture(event.pointerId)) {
        scroller.releasePointerCapture(event.pointerId);
      }

      suppressClick = dragged;
      dragPointerId = null;
      scroller.classList.remove('is-dragging');

      if (suppressClick) {
        window.setTimeout(() => {
          suppressClick = false;
        }, 0);
      }
    };

    scroller.addEventListener('pointerup', finishDrag);
    scroller.addEventListener('pointercancel', finishDrag);
    scroller.addEventListener(
      'click',
      (event) => {
        if (!suppressClick) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
      },
      true
    );
    scroller.addEventListener('dragstart', (event) => event.preventDefault());
  };

  const setupProjectsScrollShadows = () => {
    const shell = document.querySelector('[data-projects-scroll-shell]');
    const scroller = document.querySelector('[data-projects-scroll]');

    if (!shell || !scroller) return;

    let ticking = false;

    const updateShadows = () => {
      const maxScroll = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
      shell.classList.toggle('is-at-start', scroller.scrollLeft <= 24);
      shell.classList.toggle('is-at-end', scroller.scrollLeft >= maxScroll - 2);
      ticking = false;
    };

    const requestShadowUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateShadows);
    };

    setupHorizontalDrag(scroller);
    scroller.addEventListener('scroll', requestShadowUpdate, { passive: true });

    window.addEventListener('resize', requestShadowUpdate);
    updateShadows();
  };

  const setupOrderCardsScroll = () => {
    const scroller = document.querySelector('[data-order-cards-scroll]');
    setupHorizontalDrag(scroller);
  };

  setupProjectsScrollShadows();
  setupOrderCardsScroll();
  setupDeadProjectsMarquee();
});
