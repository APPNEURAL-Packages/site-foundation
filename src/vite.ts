import { securityHeaders } from "@appneural/site-security";
import type { SiteFoundationOptions } from "./index.js";

export function siteFoundationHeaders(options: SiteFoundationOptions): string {
  const headers = securityHeaders({ contentSecurityPolicy: options.contentSecurityPolicy });
  return [
    "/*",
    ...Object.entries(headers).map(([key, value]) => `  ${key}: ${value}`),
    `  X-Site-Service: ${options.service}`,
    `  X-Site-Foundation: ${options.version ?? "0.1.0"}`,
    "",
  ].join("\n");
}
