import { securityHeaders } from "@appneural/site-security";
export function withSiteFoundation(config, options) {
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
    };
}
