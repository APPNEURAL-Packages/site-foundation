export type SiteEventName = "page_view" | "cta_click" | "form_start" | "form_submit" | "signup" | "purchase";
export type SiteEvent = {
    name: SiteEventName;
    path: string;
    timestamp: string;
    properties?: Record<string, string | number | boolean>;
};
export declare function safePath(value: string): string;
export declare function createSiteEvent(name: SiteEventName, path: string, properties?: SiteEvent["properties"]): SiteEvent;
export declare function dispatchSiteEvent(event: SiteEvent): void;
