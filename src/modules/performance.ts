export type PerformanceBudget = { lcpMs: number; inpMs: number; cls: number; transferKb: number };
export const DEFAULT_PERFORMANCE_BUDGET: PerformanceBudget = { lcpMs: 2500, inpMs: 200, cls: 0.1, transferKb: 1600 };

export type SitePerformanceSnapshot = {
  navigationType?: string;
  domInteractiveMs?: number;
  loadMs?: number;
  transferBytes?: number;
};

export function performanceSnapshot(): SitePerformanceSnapshot | undefined {
  if (typeof performance === "undefined") return undefined;
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (!navigation) return undefined;
  return {
    navigationType: navigation.type,
    domInteractiveMs: Math.round(navigation.domInteractive),
    loadMs: Math.round(navigation.loadEventEnd),
    transferBytes: navigation.transferSize,
  };
}

export function prefersReducedData(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
}
