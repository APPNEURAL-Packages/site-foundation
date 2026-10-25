import type { SiteFoundationOptions } from "./index.js";
type Header = {
    key: string;
    value: string;
};
type HeaderRule = {
    source: string;
    headers: Header[];
};
type NextConfigLike = {
    headers?: () => Promise<HeaderRule[]> | HeaderRule[];
    [key: string]: unknown;
};
export declare function withSiteFoundation<T extends NextConfigLike>(config: T, options: SiteFoundationOptions): T;
type ConfigFactory = (...args: never[]) => NextConfigLike | Promise<NextConfigLike>;
export declare function withSiteFoundationExport<T extends NextConfigLike | ConfigFactory>(source: T, options: SiteFoundationOptions): T;
export {};
