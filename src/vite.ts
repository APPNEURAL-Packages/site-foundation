import { securityHeaders } from "@appneural/site-security";
import type { SiteFoundationOptions } from "./index.js";

export function siteFoundationHeaders(options: SiteFoundationOptions): string {
  const headers = securityHeaders({ contentSecurityPolicy: options.contentSecurityPolicy });
  return [
    "/*",
    ...Object.entries(headers).map(([key, value]) => `  ${key}: ${value}`),
    `  X-Site-Service: ${options.service}`,
    `  X-Site-Foundation: ${options.version ?? "0.1.2"}`,
    "",
  ].join("\n");
}

type EmitAsset = (asset: { type: "asset"; fileName: string; source: string }) => void;
type BundleAsset = { type: "asset"; source: string | Uint8Array };

export function siteFoundationPlugin(options: SiteFoundationOptions) {
  return {
    name: "appneural-site-foundation",
    apply: "build" as const,
    generateBundle(this: { emitFile: EmitAsset }, _output: unknown, bundle: Record<string, BundleAsset | unknown>) {
      const generated = siteFoundationHeaders(options);
      const current = bundle["_headers"] as BundleAsset | undefined;
      if (!current || current.type !== "asset" || typeof current.source !== "string") {
        this.emitFile({ type: "asset", fileName: "_headers", source: generated });
        return;
      }
      const present = new Set(Array.from(current.source.matchAll(/^\s*([\w-]+):/gmu), (match) => match[1].toLowerCase()));
      const additions = generated.split("\n").filter((line) => {
        const match = line.match(/^\s*([\w-]+):/u);
        return !match || !present.has(match[1].toLowerCase());
      });
      current.source = `${current.source.trimEnd()}\n\n${additions.join("\n")}`;
    },
  };
}
