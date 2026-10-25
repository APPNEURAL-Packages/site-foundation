import { securityHeaders } from "@appneural/site-security";
import type { SiteFoundationOptions } from "./index.js";

export function siteFoundationHeaders(options: SiteFoundationOptions): string {
  const headers = securityHeaders({ contentSecurityPolicy: options.contentSecurityPolicy });
  return [
    "/*",
    ...Object.entries(headers).map(([key, value]) => `  ${key}: ${value}`),
    `  X-Site-Service: ${options.service}`,
    `  X-Site-Foundation: ${options.version ?? "0.1.1"}`,
    "",
  ].join("\n");
}

type EmitAsset = (asset: { type: "asset"; fileName: string; source: string }) => void;

export function siteFoundationPlugin(options: SiteFoundationOptions) {
  return {
    name: "appneural-site-foundation",
    apply: "build" as const,
    generateBundle(this: { emitFile: EmitAsset }) {
      this.emitFile({ type: "asset", fileName: "_headers", source: siteFoundationHeaders(options) });
    },
  };
}
