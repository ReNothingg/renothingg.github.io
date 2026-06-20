document.addEventListener("DOMContentLoaded", () => {
  const body = document.body,
    menu = document.querySelector(".menu-toggle"),
    nav = document.querySelector("#main-nav");
  menu?.addEventListener("click", () => {
    const open = !body.classList.contains("nav-open");
    body.classList.toggle("nav-open", open);
    menu.setAttribute("aria-expanded", String(open));
  });
  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      body.classList.remove("nav-open");
      menu?.setAttribute("aria-expanded", "false");
    }
  });
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveal = document.querySelectorAll(".reveal");
  if (reduced) reveal.forEach((el) => el.classList.add("visible"));
  else {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    reveal.forEach((el) => observer.observe(el));
  }
  const links = [...document.querySelectorAll("#main-nav a")],
    sections = [...document.querySelectorAll("main section[id]")],
    top = document.querySelector(".to-top");
  const onScroll = () => {
    top?.classList.toggle("visible", scrollY > 500);
    let current = "";
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 140) current = section.id;
    });
    links.forEach((link) =>
      link.classList.toggle("active", link.hash === `#${current}`),
    );
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top?.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }),
  );
  const shots = [...document.querySelectorAll(".shot")],
    dots = document.querySelector(".gallery-dots"),
    lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox?.querySelector("img");
  let active = 0;
  const show = (index) => {
    active = (index + shots.length) % shots.length;
    shots.forEach((shot, i) =>
      shot.classList.toggle("is-active", i === active),
    );
    [...dots.children].forEach((dot, i) =>
      dot.classList.toggle("active", i === active),
    );
  };
  shots.forEach((shot, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Скриншот ${i + 1}`);
    dot.addEventListener("click", () => show(i));
    dots.append(dot);
    shot.addEventListener("click", () => {
      show(i);
      if (innerWidth > 650 && lightbox && lightboxImg) {
        lightboxImg.src = shot.dataset.full;
        lightbox.showModal();
      }
    });
  });
  show(0);
  document
    .querySelector(".gallery-prev")
    ?.addEventListener("click", () => show(active - 1));
  document
    .querySelector(".gallery-next")
    ?.addEventListener("click", () => show(active + 1));
  lightbox
    ?.querySelector("button")
    ?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });
});
