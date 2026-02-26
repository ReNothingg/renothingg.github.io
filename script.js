document.addEventListener('DOMContentLoaded', () => {
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

  const scrollButton = document.getElementById('scrollToTopBtn');
  if (!scrollButton) return;

  const onScroll = () => {
    if (window.scrollY > 600) scrollButton.classList.add('visible');
    else scrollButton.classList.remove('visible');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
  });
});
