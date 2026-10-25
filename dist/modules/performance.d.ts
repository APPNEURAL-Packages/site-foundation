export type PerformanceBudget = {
    lcpMs: number;
    inpMs: number;
    cls: number;
    transferKb: number;
};
export declare const DEFAULT_PERFORMANCE_BUDGET: PerformanceBudget;
export type SitePerformanceSnapshot = {
    navigationType?: string;
    domInteractiveMs?: number;
    loadMs?: number;
    transferBytes?: number;
};
export declare function performanceSnapshot(): SitePerformanceSnapshot | undefined;
export declare function prefersReducedData(): boolean;
