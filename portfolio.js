(() => {
  const portfolioItems = [
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

  const createMediaElement = (source, title, position, total) => {
    if (source.endsWith('.mp4')) {
      const video = document.createElement('video');
      video.src = source;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', `${title}, видео ${position} из ${total}`);
      return video;
    }

    const image = document.createElement('img');
    image.src = source;
    image.alt = `${title}, изображение ${position} из ${total}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  };

  const createPortfolioCard = (item) => {
    const card = document.createElement('article');
    card.className = 'client-case-card';

    const visual = document.createElement('div');
    visual.className = 'client-case-visual';

    const mediaSlot = document.createElement('div');
    mediaSlot.className = 'client-case-media';
    visual.appendChild(mediaSlot);

    card.append(visual);

    let activeIndex = Math.max(item.media.indexOf(item.cover), 0);
    const counter = document.createElement('span');
    counter.className = 'client-case-count';

    const render = () => {
      const source = item.media[activeIndex];
      const media = createMediaElement(source, item.title, activeIndex + 1, item.media.length);
      mediaSlot.replaceChildren(media);
      counter.textContent = `${activeIndex + 1} / ${item.media.length}`;
    };

    if (item.media.length > 1) {
      const previous = document.createElement('button');
      previous.className = 'client-case-arrow client-case-arrow--prev';
      previous.type = 'button';
      previous.setAttribute('aria-label', `Предыдущее изображение: ${item.title}`);
      previous.textContent = '←';

      const next = document.createElement('button');
      next.className = 'client-case-arrow client-case-arrow--next';
      next.type = 'button';
      next.setAttribute('aria-label', `Следующее изображение: ${item.title}`);
      next.textContent = '→';

      const move = (direction) => {
        const currentMedia = mediaSlot.querySelector('video');
        currentMedia?.pause();
        activeIndex = (activeIndex + direction + item.media.length) % item.media.length;
        render();
      };

      previous.addEventListener('click', () => move(-1));
      next.addEventListener('click', () => move(1));
      visual.append(previous, next, counter);
    }

    render();
    return card;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const portfolio = document.querySelector('[data-client-portfolio]');
    const grid = portfolio?.querySelector('[data-client-portfolio-grid]');
    const toggle = portfolio?.querySelector('[data-client-portfolio-toggle]');

    if (!portfolio || !grid || !toggle) return;

    const cards = portfolioItems.map(createPortfolioCard);
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

    window.addEventListener('resize', updateHeight);
    updateCollapsedAccessibility(false);
    window.requestAnimationFrame(updateHeight);
  });
})();
