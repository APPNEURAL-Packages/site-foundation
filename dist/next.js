import { siteResponseHeaders } from "./modules/security.js";
export function withSiteFoundation(config, options) {
    const existingHeaders = config.headers;
    return {
        ...config,
        poweredByHeader: false,
        async headers() {
            const existing = existingHeaders ? await existingHeaders() : [];
            const shared = Object.entries(siteResponseHeaders(options)).map(([key, value]) => ({ key, value }));
            // vinext's matcher does not match the root path with "/:path*"; "/(.*)" covers
            // it in both vinext and Next.js. Listed first, so a site's own rules for the
            // same header keys still win: both frameworks keep the last matching value.
            return [{ source: "/(.*)", headers: shared }, ...existing];
        },
    };
}
export function withSiteFoundationExport(source, options) {
    if (typeof source !== "function")
        return withSiteFoundation(source, options);
    return (async (...args) => withSiteFoundation(await source(...args), options));
}
