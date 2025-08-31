export function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const anim = el.dataset.anim;
          el.classList.remove("opacity-0", "translate-y-8", "translate-x-8");
          el.classList.add(`animate-${anim}`);
          observer.unobserve(el); // solo animar una vez
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("[data-anim]").forEach((el) => observer.observe(el));
}
