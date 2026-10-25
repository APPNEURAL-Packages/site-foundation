import { securityHeaders } from "./modules/security.js";
export function withSiteFoundation(config, options) {
    const existingHeaders = config.headers;
    return {
        ...config,
        poweredByHeader: false,
        async headers() {
            const existing = existingHeaders ? await existingHeaders() : [];
            const common = securityHeaders({ contentSecurityPolicy: options.contentSecurityPolicy });
            const shared = [
                ...Object.entries(common).map(([key, value]) => ({ key, value })),
                { key: "X-Site-Service", value: options.service },
                { key: "X-Site-Foundation", value: options.version ?? "0.3.0" },
            ];
            const universalIndex = existing.findIndex((rule) => rule.source === "/:path*");
            if (universalIndex < 0)
                return [...existing, { source: "/:path*", headers: shared }];
            return existing.map((rule, index) => {
                if (index !== universalIndex)
                    return rule;
                const owned = new Set(rule.headers.map((header) => header.key.toLowerCase()));
                return { ...rule, headers: [...rule.headers, ...shared.filter((header) => !owned.has(header.key.toLowerCase()))] };
            });
        },
    };
}
export function withSiteFoundationExport(source, options) {
    if (typeof source !== "function")
        return withSiteFoundation(source, options);
    return (async (...args) => withSiteFoundation(await source(...args), options));
}
