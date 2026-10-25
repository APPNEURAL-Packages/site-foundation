import { securityHeaders } from "@appneural/site-security";
import type { SiteFoundationOptions } from "./index.js";

type Header = { key: string; value: string };
type HeaderRule = { source: string; headers: Header[] };
type NextConfigLike = { headers?: () => Promise<HeaderRule[]> | HeaderRule[]; [key: string]: unknown };

export function withSiteFoundation<T extends NextConfigLike>(config: T, options: SiteFoundationOptions): T {
  const existingHeaders = config.headers;
  return {
    ...config,
    poweredByHeader: false,
    async headers() {
      const existing = existingHeaders ? await existingHeaders() : [];
      const common = securityHeaders({ contentSecurityPolicy: options.contentSecurityPolicy });
      return [
        ...existing,
        {
          source: "/:path*",
          headers: [
            ...Object.entries(common).map(([key, value]) => ({ key, value })),
            { key: "X-Site-Service", value: options.service },
            { key: "X-Site-Foundation", value: options.version ?? "0.1.1" },
          ],
        },
      ];
    },
  } as T;
}
