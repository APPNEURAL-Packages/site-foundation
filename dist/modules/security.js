export const DEFAULT_CSP = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
].join("; ");
export function securityHeaders(options = {}) {
    const headers = {
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    };
    if (options.contentSecurityPolicy)
        headers["Content-Security-Policy"] = options.contentSecurityPolicy;
    else if (options.frameAncestors?.length) {
        headers["Content-Security-Policy"] = DEFAULT_CSP.replace("frame-ancestors 'self'", `frame-ancestors ${options.frameAncestors.join(" ")}`);
    }
    if (options.permissions && Object.keys(options.permissions).length) {
        headers["Permissions-Policy"] = Object.entries(options.permissions).map(([name, allow = []]) => `${name}=(${allow.join(" ")})`).join(", ");
    }
    return headers;
}
