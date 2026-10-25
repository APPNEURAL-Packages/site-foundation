export type ChatHandoffOptions = { label?: string; heading?: string; message?: string; contactUrl: string; contactLabel?: string };

export function mountChatHandoff(options: ChatHandoffOptions): HTMLElement | undefined {
  if (typeof document === "undefined" || document.querySelector("[data-site-chat]")) return undefined;
  const root = document.createElement("aside"); root.dataset.siteChat = "handoff";
  root.innerHTML = `<button type="button" data-chat-toggle aria-expanded="false"></button><section data-chat-panel hidden role="dialog"><h2 data-chat-heading></h2><p data-chat-message></p><a data-chat-contact></a><button type="button" data-chat-close aria-label="Close">×</button></section>`;
  const panel = root.querySelector<HTMLElement>("[data-chat-panel]")!, toggle = root.querySelector<HTMLButtonElement>("[data-chat-toggle]")!, close = root.querySelector<HTMLButtonElement>("[data-chat-close]")!, contact = root.querySelector<HTMLAnchorElement>("[data-chat-contact]")!, heading = root.querySelector<HTMLElement>("[data-chat-heading]")!, message = root.querySelector<HTMLElement>("[data-chat-message]")!;
  toggle.textContent = options.label ?? "Need help?"; heading.textContent = options.heading ?? "How can we help?"; message.textContent = options.message ?? "Share your requirement and the team will follow up."; panel.setAttribute("aria-label", heading.textContent); contact.href = options.contactUrl; contact.textContent = options.contactLabel ?? "Contact us";
  const setOpen = (open: boolean) => { panel.hidden = !open; toggle.setAttribute("aria-expanded", String(open)); if (open) close.focus(); };
  toggle.addEventListener("click", () => setOpen(panel.hidden)); close.addEventListener("click", () => { setOpen(false); toggle.focus(); }); root.addEventListener("keydown", (event) => { if (event.key === "Escape") setOpen(false); });
  document.body.append(root); return root;
}

export const chatHandoffStyles = `[data-site-chat]{position:fixed;right:1rem;bottom:1rem;z-index:50}[data-chat-panel]{position:absolute;right:0;bottom:3.25rem;width:min(22rem,calc(100vw - 2rem));padding:1rem;background:Canvas;color:CanvasText;border:1px solid color-mix(in srgb,CanvasText 20%,transparent);border-radius:1rem;box-shadow:0 1rem 3rem rgba(0,0,0,.16)}[data-chat-close]{position:absolute;right:.5rem;top:.5rem}`;
