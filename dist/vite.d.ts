import type { SiteFoundationOptions } from "./index.js";
export declare function siteFoundationHeaders(options: SiteFoundationOptions): string;
type EmitAsset = (asset: {
    type: "asset";
    fileName: string;
    source: string;
}) => void;
export declare function siteFoundationPlugin(options: SiteFoundationOptions): {
    name: string;
    apply: "build";
    generateBundle(this: {
        emitFile: EmitAsset;
    }): void;
};
export {};
