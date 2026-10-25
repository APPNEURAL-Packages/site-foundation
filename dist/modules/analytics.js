export function safePath(value) {
    try {
        return new URL(value, "https://local.invalid").pathname;
    }
    catch {
        return "/";
    }
}
export function createSiteEvent(name, path, properties) {
    return { name, path: safePath(path), timestamp: new Date().toISOString(), ...(properties ? { properties } : {}) };
}
export function dispatchSiteEvent(event) {
    if (typeof window !== "undefined")
        window.dispatchEvent(new CustomEvent("appneural:site-event", { detail: event }));
}
