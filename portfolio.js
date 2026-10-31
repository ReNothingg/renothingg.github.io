(() => {
  const portfolioItems = [
    {
      title: 'AutoAdd — каталог товаров с ИИ',
      category: 'Веб-приложение · МойСклад',
      openFullImage: true,
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
        'public/client-cases/aurus-withdrawal.jpg',
        'public/client-cases/aurus-history.jpg',
        'public/client-cases/aurus-bot.jpg',
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

    const caption = document.createElement('div');
    caption.className = 'client-case-caption';

    const captionText = document.createElement('div');
    captionText.className = 'client-case-text';
    const titleEl = document.createElement('h5');
    titleEl.className = 'client-case-title';
    titleEl.textContent = item.title;
    captionText.append(titleEl);
    if (item.category) {
      const categoryEl = document.createElement('p');
      categoryEl.className = 'client-case-category';
      categoryEl.textContent = item.category;
      captionText.append(categoryEl);
    }
    caption.append(captionText);

    card.append(visual, caption);

    let activeIndex = Math.max(item.media.indexOf(item.cover), 0);
    const counter = document.createElement('span');
    counter.className = 'client-case-count';

    const render = () => {
      const source = item.media[activeIndex];
      const media = createMediaElement(source, item.title, activeIndex + 1, item.media.length);
      if (item.fit) media.style.objectFit = item.fit;
      if (item.openFullImage) {
        const fullImage = document.createElement('a');
        fullImage.href = source;
        fullImage.target = '_blank';
        fullImage.rel = 'noopener noreferrer';
        fullImage.setAttribute('aria-label', `Открыть скриншот ${activeIndex + 1} из ${item.media.length}: ${item.title}`);
        fullImage.append(media);
        mediaSlot.replaceChildren(fullImage);
      } else {
        mediaSlot.replaceChildren(media);
      }
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
      const controls = document.createElement('div');
      controls.className = 'client-case-controls';
      controls.append(previous, counter, next);
      caption.append(controls);
    }

    render();
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
