document.addEventListener("DOMContentLoaded", () => {
  const toast = document.querySelector(".copy-toast");
  let toastTimer;

  document.addEventListener("keydown", () => {
    document.body.classList.add("using-keyboard");
  });

  document.addEventListener("pointerdown", () => {
    document.body.classList.remove("using-keyboard");
  });

  const fallbackCopy = (text) => {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  };

  const showToast = () => {
    if (!toast) return;

    window.clearTimeout(toastTimer);
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1800);
  };

  document.querySelectorAll(".copy-link").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const targetId = button.dataset.copyTarget;
      const url = new URL(window.location.href);
      url.hash = targetId;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url.href);
        } else {
          fallbackCopy(url.href);
        }
      } catch {
        fallbackCopy(url.href);
      }

      button.setAttribute("aria-label", "Ссылка скопирована");
      showToast();
      window.setTimeout(() => {
        button.setAttribute("aria-label", "Скопировать ссылку на раздел");
      }, 1800);
    });
  });

  const setSectionState = (toggle, expanded) => {
    const targetId = toggle.getAttribute("aria-controls");
    const target = document.getElementById(targetId);
    const section = toggle.closest(".article-section");
    const heading = toggle.closest(".section-heading");
    const button = heading?.querySelector(".collapse-button");
    if (!target || !section || !button) return;

    toggle.setAttribute("aria-expanded", String(expanded));
    button.setAttribute("aria-expanded", String(expanded));
    button.setAttribute("aria-label", expanded ? "Свернуть раздел" : "Развернуть раздел");
    target.classList.toggle("is-collapsed", !expanded);
    section.classList.toggle("is-collapsed", !expanded);
  };

  document.querySelectorAll("[data-section-toggle]").forEach((toggleElement) => {
    const toggle = () => {
      const expanded = toggleElement.getAttribute("aria-expanded") === "true";
      setSectionState(toggleElement, !expanded);
    };

    toggleElement.addEventListener("click", (event) => {
      toggle();
      if (event.detail > 0) toggleElement.blur();
    });
    toggleElement.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });

    toggleElement.closest(".section-heading")?.querySelector(".collapse-button")?.addEventListener("click", (event) => {
      event.stopPropagation();
      toggle();
    });
  });

  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
    });
  }
});
