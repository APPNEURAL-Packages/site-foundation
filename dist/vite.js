import { securityHeaders } from "@appneural/site-security";
export function siteFoundationHeaders(options) {
    const headers = securityHeaders({ contentSecurityPolicy: options.contentSecurityPolicy });
    return [
        "/*",
        ...Object.entries(headers).map(([key, value]) => `  ${key}: ${value}`),
        `  X-Site-Service: ${options.service}`,
        `  X-Site-Foundation: ${options.version ?? "0.1.1"}`,
        "",
    ].join("\n");
}
export function siteFoundationPlugin(options) {
    return {
        name: "appneural-site-foundation",
        apply: "build",
        generateBundle() {
            this.emitFile({ type: "asset", fileName: "_headers", source: siteFoundationHeaders(options) });
        },
    };
}
