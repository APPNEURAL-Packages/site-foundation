export type CarouselOptions = { autoplayMs?: number; startIndex?: number; wrap?: boolean };

export function mountCarousel(root: HTMLElement, options: CarouselOptions = {}) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-carousel-slide]"));
  const previous = root.querySelector<HTMLButtonElement>("[data-carousel-previous]");
  const next = root.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-carousel-dot]"));
  const live = root.querySelector<HTMLElement>("[data-carousel-status]");
  let index = Math.min(Math.max(options.startIndex ?? 0, 0), Math.max(slides.length - 1, 0));
  let timer: number | undefined;
  const wrap = options.wrap !== false;
  const render = () => {
    slides.forEach((slide, current) => { const active = current === index; slide.hidden = !active; slide.setAttribute("aria-hidden", String(!active)); });
    dots.forEach((dot, current) => dot.setAttribute("aria-current", current === index ? "true" : "false"));
    if (live && slides.length) live.textContent = `Slide ${index + 1} of ${slides.length}`;
    if (!wrap) { if (previous) previous.disabled = index === 0; if (next) next.disabled = index === slides.length - 1; }
  };
  const go = (target: number) => { if (!slides.length) return; index = wrap ? (target + slides.length) % slides.length : Math.min(Math.max(target, 0), slides.length - 1); render(); };
  const stop = () => { if (timer !== undefined) window.clearInterval(timer); timer = undefined; };
  const start = () => { stop(); if ((options.autoplayMs ?? 0) < 2000 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; timer = window.setInterval(() => go(index + 1), options.autoplayMs); };
  previous?.addEventListener("click", () => go(index - 1)); next?.addEventListener("click", () => go(index + 1));
  dots.forEach((dot, current) => dot.addEventListener("click", () => go(current)));
  root.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") go(index - 1); if (event.key === "ArrowRight") go(index + 1); });
  root.addEventListener("mouseenter", stop); root.addEventListener("mouseleave", start); root.addEventListener("focusin", stop); root.addEventListener("focusout", start);
  render(); start();
  return { go, next: () => go(index + 1), previous: () => go(index - 1), destroy: stop, get index() { return index; } };
}
