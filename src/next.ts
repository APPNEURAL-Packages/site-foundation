import { securityHeaders } from "./modules/security.js";
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
      const shared: Header[] = [
        ...Object.entries(common).map(([key, value]) => ({ key, value })),
        { key: "X-Site-Service", value: options.service },
        { key: "X-Site-Foundation", value: options.version ?? "0.2.0" },
      ];
      const universalIndex = existing.findIndex((rule) => rule.source === "/:path*");
      if (universalIndex < 0) return [...existing, { source: "/:path*", headers: shared }];
      return existing.map((rule, index) => {
        if (index !== universalIndex) return rule;
        const owned = new Set(rule.headers.map((header) => header.key.toLowerCase()));
        return { ...rule, headers: [...rule.headers, ...shared.filter((header) => !owned.has(header.key.toLowerCase()))] };
      });
    },
  } as T;
}

type ConfigFactory = (...args: never[]) => NextConfigLike | Promise<NextConfigLike>;

export function withSiteFoundationExport<T extends NextConfigLike | ConfigFactory>(source: T, options: SiteFoundationOptions): T {
  if (typeof source !== "function") return withSiteFoundation(source, options) as T;
  return (async (...args: never[]) => withSiteFoundation(await source(...args), options)) as T;
}
