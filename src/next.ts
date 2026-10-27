import { siteResponseHeaders } from "./modules/security.js";
import type { SiteFoundationOptions } from "./index.js";

type Header = { key: string; value: string };
type HeaderRule = { source: string; headers: Header[] };
type NextConfigLike = { headers?: () => Promise<HeaderRule[]> | HeaderRule[] };

export function withSiteFoundation<T extends NextConfigLike>(config: T, options: SiteFoundationOptions): T {
  const existingHeaders = config.headers;
  return {
    ...config,
    poweredByHeader: false,
    async headers() {
      const existing = existingHeaders ? await existingHeaders() : [];
      const shared: Header[] = Object.entries(siteResponseHeaders(options)).map(([key, value]) => ({ key, value }));
      // vinext's matcher does not match the root path with "/:path*"; "/(.*)" covers
      // it in both vinext and Next.js. Listed first, so a site's own rules for the
      // same header keys still win: both frameworks keep the last matching value.
      return [{ source: "/(.*)", headers: shared }, ...existing];
    },
  } as T;
}

type ConfigFactory = (...args: never[]) => NextConfigLike | Promise<NextConfigLike>;

export function withSiteFoundationExport<T extends NextConfigLike | ConfigFactory>(source: T, options: SiteFoundationOptions): T {
  if (typeof source !== "function") return withSiteFoundation(source, options) as T;
  return (async (...args: never[]) => withSiteFoundation(await source(...args), options)) as T;
}
