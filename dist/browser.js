import { createSiteEvent, dispatchSiteEvent } from "./modules/analytics.js";
import { performanceSnapshot, prefersReducedData } from "./modules/performance.js";
export function initializeSiteFoundation() {
    if (typeof window === "undefined" || typeof document === "undefined")
        return;
    document.documentElement.dataset.siteFoundation = "0.1.3";
    if (prefersReducedData())
        document.documentElement.dataset.reducedData = "true";
    dispatchSiteEvent(createSiteEvent("page_view", window.location.pathname));
    window.dispatchEvent(new CustomEvent("appneural:site-performance", { detail: performanceSnapshot() }));
}
