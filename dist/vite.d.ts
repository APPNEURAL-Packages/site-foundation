import type { SiteFoundationOptions } from "./index.js";
export declare function siteFoundationHeaders(options: SiteFoundationOptions): string;
type EmitAsset = (asset: {
    type: "asset";
    fileName: string;
    source: string;
}) => void;
type BundleAsset = {
    type: "asset";
    source: string | Uint8Array;
};
export declare function siteFoundationPlugin(options: SiteFoundationOptions): {
    name: string;
    apply: "build";
    generateBundle(this: {
        emitFile: EmitAsset;
    }, _output: unknown, bundle: Record<string, BundleAsset | unknown>): void;
};
export {};
