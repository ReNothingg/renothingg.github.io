(() => {
  const portfolioItems = [
    {
      title: 'Ловец выплат 911pay',
      category: 'Telegram-бот · Go',
      media: [
        'public/client-cases/catcher911-dashboard.jpg',
        'public/client-cases/catcher911-history.jpg',
        'public/client-cases/catcher911-history-2.jpg',
        'public/client-cases/catcher911-settings.jpg',
        'public/client-cases/catcher911-stats.jpg',
      ],
    },
    {
      title: 'WatchGPT — ChatGPT на Apple Watch',
      category: 'Приложение watchOS · SwiftUI',
      fit: 'contain',
      cover: 'public/client-cases/watchgpt-01-home.webp',
      media: [
        'public/client-cases/watchgpt-01-home.webp',
        'public/client-cases/watchgpt-02-record.webp',
        'public/client-cases/watchgpt-03-recognize.webp',
        'public/client-cases/watchgpt-04-attach.webp',
        'public/client-cases/watchgpt-05-photo.webp',
        'public/client-cases/watchgpt-06-table.webp',
        'public/client-cases/watchgpt-07-code.webp',
        'public/client-cases/watchgpt-08-search.webp',
        'public/client-cases/watchgpt-09-news.webp',
        'public/client-cases/watchgpt-10-chats.webp',
        'public/client-cases/watchgpt-11-history.webp',
        'public/client-cases/watchgpt-12-limits.webp',
        'public/client-cases/watchgpt-13-usage.webp',
        'public/client-cases/watchgpt-14-models.webp',
        'public/client-cases/watchgpt-15-claude.webp',
        'public/client-cases/watchgpt-16-quick.webp',
        'public/client-cases/watchgpt-17-settings.webp',
        'public/client-cases/watchgpt-18-answers.webp',
        'public/client-cases/watchgpt-19-settings-more.webp',
        'public/client-cases/watchgpt-20-voice.webp',
        'public/client-cases/watchgpt-21-whisper.webp',
        'public/client-cases/watchgpt-22-places.webp',
        'public/client-cases/watchgpt-23-privacy.webp',
      ],
    },
    {
      title: 'IGROSHOP — магазин цифровых игр',
      category: 'Веб-сайт · PlayStation и Xbox',
      fit: 'contain',
      cover: 'public/client-cases/igroshop-01.webp',
      media: [
        'public/client-cases/igroshop-01.webp',
        'public/client-cases/igroshop-02.webp',
        'public/client-cases/igroshop-03.webp',
        'public/client-cases/igroshop-04.webp',
      ],
    },
    {
      title: 'AutoAdd — каталог товаров с ИИ',
      category: 'Веб-приложение · МойСклад',
      fit: 'contain',
      cover: 'public/client-cases/autoadd-01-import.webp',
      media: [
        'public/client-cases/autoadd-01-import.webp',
        'public/client-cases/autoadd-02-review.webp',
        'public/client-cases/autoadd-03-enriched-card.webp',
        'public/client-cases/autoadd-04-catalogue.webp',
        'public/client-cases/autoadd-05-editor.webp',
        'public/client-cases/autoadd-06-description.webp',
        'public/client-cases/autoadd-07-bulk.webp',
        'public/client-cases/autoadd-08-commands.webp',
        'public/client-cases/autoadd-09-variants.webp',
        'public/client-cases/autoadd-10-journal.webp',
        'public/client-cases/autoadd-11-history.webp',
      ],
    },
    {
      title: 'Liquid Glass — React / WebGL',
      category: 'Интерактивная графика',
      fit: 'contain',
      cover: 'public/client-cases/liquid-glass-metaballs-three.jpg',
      media: [
        'public/client-cases/liquid-glass-optics.jpg',
        'public/client-cases/liquid-glass-refraction-08.jpg',
        'public/client-cases/liquid-glass-refraction-32.jpg',
        'public/client-cases/liquid-glass-refraction-64.jpg',
        'public/client-cases/liquid-glass-metaballs-two.jpg',
        'public/client-cases/liquid-glass-metaballs-three.jpg',
        'public/client-cases/liquid-glass-specular.jpg',
        'public/client-cases/liquid-glass-geometry.jpg',
      ],
    },
    {
      title: 'Aurus',
      category: 'Telegram-бот и Mini App',
      media: [
        'public/client-cases/aurus-home.jpg',
        'public/client-cases/aurus-orders.jpg',
        'public/client-cases/aurus-history.jpg',
        'public/client-cases/aurus-admin-overview.jpg',
        'public/client-cases/aurus-admin-orders.jpg',
        'public/client-cases/aurus-admin-more.jpg',
      ],
    },
    {
      title: 'StellerPay Market',
      category: 'Telegram-бот и Mini App',
      media: [
        'public/client-cases/stellerpay-stars.jpg',
        'public/client-cases/stellerpay-premium.jpg',
        'public/client-cases/stellerpay-vpn.jpg',
        'public/client-cases/stellerpay-balance.jpg',
      ],
    },
    {
      title: 'Зубрык',
      category: 'Telegram-бот и Mini App',
      media: [
        'public/client-cases/zubryk-home.jpg',
        'public/client-cases/zubryk-tests.jpg',
        'public/client-cases/zubryk-grammar.jpg',
        'public/client-cases/zubryk-bot.jpg',
        'public/client-cases/zubryk-settings.jpg',
      ],
    },
    {
      title: "Работа №37",
      category: "Игры",
      media: [
        "public/client-cases/23794004-01.webp",
        "public/client-cases/23794004-02.webp",
        "public/client-cases/23794004-03.webp",
        "public/client-cases/23794004-04.webp",
        "public/client-cases/23794004-05.webp",
      ],
    },
    {
      title: "Работа №36",
      category: "Игры",
      media: [
        "public/client-cases/23793815-01.webp",
        "public/client-cases/23793815-02.webp",
        "public/client-cases/23793815-03.webp",
      ],
    },
    {
      title: 'Flowex',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23732913-01.webp',
        'public/client-cases/23732913-02.webp',
        'public/client-cases/23732913-03.webp',
        'public/client-cases/23732913-04.webp',
        'public/client-cases/23732913-05.webp',
        'public/client-cases/23732913-06.webp',
      ],
    },
    {
      title: 'Работа №34',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23682370-01.webp',
        'public/client-cases/23682370-02.webp',
        'public/client-cases/23682370-03.webp',
        'public/client-cases/23682370-04.webp',
      ],
    },
    {
      title: 'Моя личная работа, не на заказ',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23549711-01.webp',
        'public/client-cases/23549711-02.webp',
        'public/client-cases/23549711-03.webp',
      ],
    },
    {
      title: 'Работа №32',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23535582-01.webp',
        'public/client-cases/23535582-02.webp',
      ],
    },
    {
      title: 'Работа №31',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23495367-01.webp',
        'public/client-cases/23495367-02.webp',
      ],
    },
    {
      title: 'Приложение под macOS и Windows',
      category: 'Создание сайта',
      cover: 'public/client-cases/23389778-02.webp',
      media: [
        'public/client-cases/23389778-01.webp',
        'public/client-cases/23389778-02.webp',
      ],
    },
    {
      title: 'Работа №29',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23389736-01.webp',
        'public/client-cases/23389736-02.webp',
        'public/client-cases/23389736-03.webp',
      ],
    },
    {
      title: 'Аналог Codex Micro',
      category: 'Создание сайта',
      cover: 'public/client-cases/23389719-cover.webp',
      media: ['public/client-cases/23389719-01.webp'],
    },
    {
      title: 'Работа №27',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23385952-01.webp',
        'public/client-cases/23385952-02.webp',
        'public/client-cases/23385952-03.webp',
        'public/client-cases/23385952-04.webp',
        'public/client-cases/23385952-05.webp',
      ],
    },
    {
      title: 'Работа №26',
      category: 'Создание сайта',
      cover: 'public/client-cases/23385878-02.webp',
      media: [
        'public/client-cases/23385878-01.webp',
        'public/client-cases/23385878-02.webp',
      ],
    },
    {
      title: 'Работа №25',
      category: 'Игры',
      cover: 'public/client-cases/23320329-03.webp',
      media: [
        'public/client-cases/23320329-01.webp',
        'public/client-cases/23320329-02.webp',
        'public/client-cases/23320329-03.webp',
      ],
    },
    {
      title: 'Работа №23',
      category: 'Игры',
      media: ['public/client-cases/23320198-01.webp'],
    },
    {
      title: 'Работа №21',
      category: 'Игры',
      cover: 'public/client-cases/23320183-02.webp',
      media: [
        'public/client-cases/23320183-01.webp',
        'public/client-cases/23320183-02.webp',
      ],
    },
    {
      title: 'Работа №20',
      category: 'Игры',
      media: [
        'public/client-cases/23320170-01.webp',
        'public/client-cases/23320170-02.webp',
        'public/client-cases/23320170-03.webp',
        'public/client-cases/23320170-04.webp',
        'public/client-cases/23320170-05.webp',
        'public/client-cases/23320170-06.webp',
      ],
    },
    {
      title: 'Работа №19',
      category: 'Игры',
      media: [
        'public/client-cases/23320133-01.webp',
        'public/client-cases/23320133-02.webp',
        'public/client-cases/23320133-03.webp',
        'public/client-cases/23320133-04.webp',
        'public/client-cases/23320133-05.webp',
        'public/client-cases/23320133-06.webp',
        'public/client-cases/23320133-07.webp',
        'public/client-cases/23320133-08.webp',
      ],
    },
    {
      title: 'Работа №18',
      category: 'Создание сайта',
      cover: 'public/client-cases/23319977-04.webp',
      media: [
        'public/client-cases/23319977-01.webp',
        'public/client-cases/23319977-02.webp',
        'public/client-cases/23319977-03.webp',
        'public/client-cases/23319977-04.webp',
      ],
    },
    {
      title: 'Работа №17',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23202144-01.webp',
        'public/client-cases/23202144-02.webp',
        'public/client-cases/23202144-03.webp',
      ],
    },
    {
      title: 'Работа №16',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23202020-01.webp',
        'public/client-cases/23202020-02.webp',
        'public/client-cases/23202020-03.webp',
        'public/client-cases/23202020-04.webp',
      ],
    },
    {
      title: 'Работа №15',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23187470-01.webp',
        'public/client-cases/23187470-02.webp',
      ],
    },
    {
      title: 'TGift',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23187453-01.webp',
        'public/client-cases/23187453-02.webp',
      ],
    },
    {
      title: 'Работа №14',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23187403-01.webp',
        'public/client-cases/23187403-02.webp',
        'public/client-cases/23187403-03.webp',
        'public/client-cases/23187403-04.webp',
      ],
    },
    {
      title: 'Метки для Organic Maps',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23184509-01.webp',
        'public/client-cases/23184509-02.webp',
      ],
    },
    {
      title: 'StellerPay',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23184447-01.webp',
        'public/client-cases/23184447-02.webp',
        'public/client-cases/23184447-03.webp',
        'public/client-cases/23184447-04.webp',
        'public/client-cases/23184447-05.webp',
        'public/client-cases/23184447-06.webp',
      ],
    },
    {
      title: 'SynvexAI.com',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23184414-01.webp',
        'public/client-cases/23184414-02.webp',
      ],
    },
    {
      title: 'ReNothingg.github.io',
      category: 'Создание сайта',
      media: ['public/client-cases/23184397-01.webp'],
    },
    {
      title: 'chat.synvexai.com',
      category: 'Создание сайта',
      media: [
        'public/client-cases/23184389-01.webp',
        'public/client-cases/23184389-02.webp',
        'public/client-cases/23184389-03.webp',
      ],
    },
    {
      title: 'Работа №8',
      category: 'Мобильные приложения',
      media: [
        'public/client-cases/23184340-01.webp',
        'public/client-cases/23184340-02.webp',
        'public/client-cases/23184340-03.webp',
        'public/client-cases/23184340-04.webp',
      ],
    },
    {
      title: 'Работа №7',
      category: 'Мобильные приложения',
      media: [
        'public/client-cases/23184273-01.webp',
        'public/client-cases/23184273-02.mp4',
      ],
    },
    {
      title: 'Работа №3',
      category: 'Мобильные приложения',
      media: [
        'public/client-cases/23184224-01.webp',
        'public/client-cases/23184224-02.webp',
        'public/client-cases/23184224-03.webp',
        'public/client-cases/23184224-04.webp',
      ],
    },
    {
      title: 'Работа №5',
      category: 'Мобильные приложения',
      media: [
        'public/client-cases/23184205-01.webp',
        'public/client-cases/23184205-02.webp',
        'public/client-cases/23184205-03.webp',
        'public/client-cases/23184205-04.webp',
        'public/client-cases/23184205-05.webp',
        'public/client-cases/23184205-06.webp',
      ],
    },
    {
      title: 'ReMind',
      category: 'Мобильные приложения',
      media: [
        'public/client-cases/23184183-01.webp',
        'public/client-cases/23184183-02.webp',
        'public/client-cases/23184183-03.webp',
        'public/client-cases/23184183-04.webp',
        'public/client-cases/23184183-05.webp',
        'public/client-cases/23184183-06.webp',
      ],
    },
  ];

  const createMediaElement = (source, title, position, total, options = {}) => {
    if (source.endsWith('.mp4')) {
      const video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', `${title}, видео ${position} из ${total}`);
      video.src = source;
      return video;
    }

    const image = document.createElement('img');
    image.alt = `${title}, изображение ${position} из ${total}`;
    image.loading = options.loading || 'lazy';
    image.fetchPriority = options.priority || 'auto';
    image.decoding = 'async';
    image.src = source;
    return image;
  };

  const createProjectViewer = () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'project-viewer';
    dialog.setAttribute('aria-labelledby', 'project-viewer-title');
    dialog.innerHTML = `
      <div class="project-viewer-window">
        <header class="project-viewer-header">
          <div>
            <p class="project-viewer-category"></p>
            <h2 id="project-viewer-title"></h2>
          </div>
          <button class="project-viewer-close" type="button" aria-label="Закрыть проект" autofocus>×</button>
        </header>
        <div class="project-viewer-gallery" role="region" aria-label="Галерея проекта" aria-roledescription="карусель">
          <div class="project-viewer-stage"></div>
          <div class="project-viewer-navigation">
            <button class="project-viewer-arrow" type="button" data-direction="-1" aria-label="Предыдущий скриншот">←</button>
            <p class="project-viewer-counter" aria-live="polite" aria-atomic="true"></p>
            <button class="project-viewer-arrow" type="button" data-direction="1" aria-label="Следующий скриншот">→</button>
          </div>
          <input class="project-viewer-range" type="range" min="1" step="1" aria-label="Номер скриншота">
        </div>
        <footer class="project-viewer-footer">
          <p class="project-viewer-description"></p>
          <div class="project-viewer-links">
            <a class="project-viewer-website" target="_blank" rel="noopener noreferrer" hidden>Перейти к проекту ↗</a>
          </div>
        </footer>
      </div>`;
    document.body.append(dialog);

    const stage = dialog.querySelector('.project-viewer-stage');
    const gallery = dialog.querySelector('.project-viewer-gallery');
    const counter = dialog.querySelector('.project-viewer-counter');
    const range = dialog.querySelector('.project-viewer-range');
    const website = dialog.querySelector('.project-viewer-website');
    const arrows = [...dialog.querySelectorAll('[data-direction]')];
    let currentItem;
    let activeIndex = 0;
    let opener;
    let previousOverflow;
    let pointerStart;
    let suppressClick = false;
    let lastWheel = 0;
    let wheelDistance = 0;
    let lastWheelEvent = 0;
    let slides = [];
    let rangeFrame = 0;

    const render = () => {
      const total = currentItem.media.length;
      slides.forEach((slide, index) => {
        const offset = index - activeIndex;
        const distance = Math.abs(offset);
        const active = offset === 0;
        slide.hidden = distance > 3;
        slide.classList.toggle('is-active', active);
        slide.style.setProperty('--offset', offset);
        slide.style.setProperty('--distance', distance);
        slide.style.setProperty('--side', Math.sign(offset));
        slide.style.zIndex = 10 - distance;
        slide.setAttribute('aria-hidden', String(!active));
        if (distance <= 3 && !slide.firstChild) {
          const media = createMediaElement(currentItem.media[index], currentItem.title, index + 1, total, {
            loading: 'eager',
            priority: active ? 'high' : 'low',
          });
          media.draggable = false;
          slide.append(media);
        }
        const image = slide.querySelector('img');
        if (image) image.fetchPriority = active ? 'high' : 'low';
        const video = slide.querySelector('video');
        if (video) {
          video.controls = active;
          video.tabIndex = active ? 0 : -1;
          if (!active) video.pause();
        }
        if (distance > 3 && slide.firstChild) {
          if (video) {
            video.removeAttribute('src');
            video.load();
          }
          slide.replaceChildren();
        }
      });
      counter.textContent = `${activeIndex + 1} / ${total}`;
      range.value = activeIndex + 1;
      range.setAttribute('aria-valuetext', `${activeIndex + 1} из ${total}`);
      arrows[0].disabled = activeIndex === 0;
      arrows[1].disabled = activeIndex === total - 1;
    };

    const select = (index) => {
      const nextIndex = Math.max(0, Math.min(index, currentItem.media.length - 1));
      if (nextIndex === activeIndex) return;
      activeIndex = nextIndex;
      render();
    };

    arrows.forEach((button) => {
      button.addEventListener('click', () => select(activeIndex + Number(button.dataset.direction)));
    });
    range.addEventListener('input', () => {
      if (rangeFrame) return;
      rangeFrame = window.requestAnimationFrame(() => {
        rangeFrame = 0;
        select(Number(range.value) - 1);
      });
    });
    dialog.querySelector('.project-viewer-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog && pointerStart?.backdrop) dialog.close();
    });
    dialog.addEventListener('pointerdown', (event) => {
      pointerStart = { x: event.clientX, y: event.clientY, backdrop: event.target === dialog };
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.target.matches('input, video')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        select(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        select(event.key === 'Home' ? 0 : currentItem.media.length - 1);
      }
    });
    stage.addEventListener('pointerdown', (event) => {
      if (event.target.closest('video') || (event.pointerType === 'mouse' && event.button !== 0)) return;
      stage.setPointerCapture(event.pointerId);
    });
    stage.addEventListener('pointerup', (event) => {
      if (!stage.hasPointerCapture(event.pointerId)) return;
      stage.releasePointerCapture(event.pointerId);
      if (!pointerStart) return;
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        suppressClick = true;
        select(activeIndex + (dx < 0 ? 1 : -1));
        window.setTimeout(() => { suppressClick = false; }, 0);
      } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        const slide = document.elementFromPoint(event.clientX, event.clientY)?.closest('.project-viewer-slide');
        if (slide) select(Number(slide.dataset.index));
      }
    });
    stage.addEventListener('click', (event) => {
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
    gallery.addEventListener('wheel', (event) => {
      if (event.ctrlKey || currentItem.media.length < 2) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheelEvent > 160) wheelDistance = 0;
      lastWheelEvent = now;
      if (now - lastWheel < 280) return;
      wheelDistance += (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY)
        * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1);
      if (Math.abs(wheelDistance) < 35) return;
      select(activeIndex + Math.sign(wheelDistance));
      lastWheel = now;
      wheelDistance = 0;
    }, { passive: false });
    dialog.addEventListener('close', () => {
      window.cancelAnimationFrame(rangeFrame);
      rangeFrame = 0;
      stage.querySelectorAll('video').forEach((video) => video.pause());
      stage.replaceChildren();
      slides = [];
      document.documentElement.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
      document.dispatchEvent(new Event('projectviewerchange'));
    });

    return (item, trigger) => {
      currentItem = item;
      opener = trigger;
      activeIndex = Math.max(item.media.indexOf(item.cover), 0);
      pointerStart = null;
      lastWheel = 0;
      lastWheelEvent = 0;
      wheelDistance = 0;
      dialog.querySelector('#project-viewer-title').textContent = item.title;
      dialog.querySelector('.project-viewer-category').textContent = item.category || 'Проект';
      dialog.querySelector('.project-viewer-description').textContent = item.description || '';
      dialog.querySelector('.project-viewer-footer').hidden = !item.description && !item.href;
      website.hidden = !item.href;
      if (item.href) website.href = item.href;
      range.max = item.media.length;
      range.hidden = item.media.length < 2;
      slides = item.media.map((source, index) => {
        const slide = document.createElement('div');
        slide.className = 'project-viewer-slide';
        slide.dataset.index = index;
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'слайд');
        slide.setAttribute('aria-label', `${index + 1} из ${item.media.length}`);
        return slide;
      });
      stage.replaceChildren(...slides);
      render();
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
      document.dispatchEvent(new Event('projectviewerchange'));
    };
  };

  const createPortfolioCard = (item, openProject) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'client-case-card';
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', `Открыть проект: ${item.title}`);

    const visual = document.createElement('span');
    visual.className = 'client-case-visual';
    const mediaSlot = document.createElement('span');
    mediaSlot.className = 'client-case-media';
    const coverIndex = Math.max(item.media.indexOf(item.cover), 0);
    const media = createMediaElement(item.cover || item.media[0], item.title, coverIndex + 1, item.media.length);
    if (item.fit) media.style.objectFit = item.fit;
    if (media.tagName === 'VIDEO') media.controls = false;
    mediaSlot.append(media);
    visual.append(mediaSlot);

    const caption = document.createElement('span');
    caption.className = 'client-case-caption';
    const captionText = document.createElement('span');
    captionText.className = 'client-case-text';
    const title = document.createElement('span');
    title.className = 'client-case-title';
    title.textContent = item.title;
    const category = document.createElement('span');
    category.className = 'client-case-category';
    category.textContent = item.category || '';
    captionText.append(title, category);
    const hint = document.createElement('span');
    hint.className = 'client-case-open';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = '↗';
    caption.append(captionText, hint);
    card.append(visual, caption);
    card.addEventListener('click', () => openProject(item, card));
    return card;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const portfolio = document.querySelector('[data-client-portfolio]');
    const grid = portfolio?.querySelector('[data-client-portfolio-grid]');
    const toggle = portfolio?.querySelector('[data-client-portfolio-toggle]');

    if (!portfolio || !grid || !toggle) return;

    const count = portfolio.querySelector('.client-portfolio-heading > p');
    if (count) {
      const total = portfolioItems.length;
      const last = total % 10;
      const word = total % 100 >= 11 && total % 100 <= 14 ? 'проектов'
        : last === 1 ? 'проект' : last >= 2 && last <= 4 ? 'проекта' : 'проектов';
      count.textContent = `${total} ${word}`;
    }

    let viewer;
    const openProject = (item, trigger) => {
      viewer ||= createProjectViewer();
      viewer(item, trigger);
    };
    const cards = portfolioItems.slice(0, 6).map((item) => createPortfolioCard(item, openProject));
    document.querySelectorAll('.project-card').forEach((card) => {
      const title = card.querySelector('h4')?.textContent.trim();
      const matched = portfolioItems.find((item) => item.title === title || item.title.startsWith(`${title} —`))
        || (title === 'SynvexAI' ? portfolioItems.find((item) => item.title === 'SynvexAI.com') : null);
      const item = {
        ...matched,
        title,
        category: matched?.category || card.querySelector('.project-status')?.textContent,
        description: card.querySelector('.project-card-copy > p')?.textContent,
        media: matched?.media || [card.querySelector('.project-card-art').getAttribute('src')],
        href: card.href,
      };
      card.setAttribute('aria-haspopup', 'dialog');
      card.addEventListener('click', (event) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openProject(item, card);
      });
    });
    grid.replaceChildren(...cards);

    const getCollapsedHeight = () => {
      const lastVisibleCard = cards[Math.min(5, cards.length - 1)];
      return lastVisibleCard.offsetTop + lastVisibleCard.offsetHeight;
    };

    const updateHeight = () => {
      grid.style.maxHeight = portfolio.classList.contains('is-expanded')
        ? `${grid.scrollHeight}px`
        : `${getCollapsedHeight()}px`;
    };

    const updateCollapsedAccessibility = (expanded) => {
      cards.slice(6).forEach((card) => {
        card.inert = !expanded;
        if (expanded) {
          card.removeAttribute('aria-hidden');
        } else {
          card.setAttribute('aria-hidden', 'true');
        }
      });
    };

    toggle.addEventListener('click', () => {
      const willExpand = !portfolio.classList.contains('is-expanded');

      if (willExpand && cards.length < portfolioItems.length) {
        const remaining = portfolioItems.slice(cards.length).map((item) => createPortfolioCard(item, openProject));
        cards.push(...remaining);
        grid.append(...remaining);
      }

      if (!willExpand) {
        grid.style.maxHeight = `${grid.scrollHeight}px`;
      }

      window.requestAnimationFrame(() => {
        portfolio.classList.toggle('is-expanded', willExpand);
        updateCollapsedAccessibility(willExpand);
        toggle.setAttribute('aria-expanded', String(willExpand));
        toggle.textContent = willExpand ? 'Свернуть' : 'Показать больше';
        updateHeight();
      });
    });

    let heightFrame = 0;
    const requestHeightUpdate = () => {
      if (heightFrame) return;
      heightFrame = window.requestAnimationFrame(() => {
        heightFrame = 0;
        updateHeight();
      });
    };
    window.addEventListener('resize', requestHeightUpdate, { passive: true });
    document.fonts.ready.then(requestHeightUpdate);
    updateCollapsedAccessibility(false);
    window.requestAnimationFrame(updateHeight);
  });
})();
