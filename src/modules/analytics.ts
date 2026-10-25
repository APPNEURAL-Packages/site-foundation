export type SiteEventName = "page_view" | "cta_click" | "form_start" | "form_submit" | "signup" | "purchase";
export type SiteEvent = { name: SiteEventName; path: string; timestamp: string; properties?: Record<string, string | number | boolean> };

export function safePath(value: string): string {
  try { return new URL(value, "https://local.invalid").pathname; }
  catch { return "/"; }
}

export function createSiteEvent(name: SiteEventName, path: string, properties?: SiteEvent["properties"]): SiteEvent {
  return { name, path: safePath(path), timestamp: new Date().toISOString(), ...(properties ? { properties } : {}) };
}

export function dispatchSiteEvent(event: SiteEvent): void {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("appneural:site-event", { detail: event }));
}
