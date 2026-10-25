import { createSiteEvent, dispatchSiteEvent } from "@appneural/site-analytics";
import { performanceSnapshot, prefersReducedData } from "@appneural/site-performance";

export function initializeSiteFoundation(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  document.documentElement.dataset.siteFoundation = "0.1.1";
  if (prefersReducedData()) document.documentElement.dataset.reducedData = "true";
  dispatchSiteEvent(createSiteEvent("page_view", window.location.pathname));
  window.dispatchEvent(new CustomEvent("appneural:site-performance", { detail: performanceSnapshot() }));
}
