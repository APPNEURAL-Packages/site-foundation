export const DEFAULT_PERFORMANCE_BUDGET = { lcpMs: 2500, inpMs: 200, cls: 0.1, transferKb: 1600 };
export function performanceSnapshot() {
    if (typeof performance === "undefined")
        return undefined;
    const navigation = performance.getEntriesByType("navigation")[0];
    if (!navigation)
        return undefined;
    return {
        navigationType: navigation.type,
        domInteractiveMs: Math.round(navigation.domInteractive),
        loadMs: Math.round(navigation.loadEventEnd),
        transferBytes: navigation.transferSize,
    };
}
export function prefersReducedData() {
    if (typeof navigator === "undefined")
        return false;
    return Boolean(navigator.connection?.saveData);
}
