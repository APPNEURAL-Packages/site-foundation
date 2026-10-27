export type SecurityHeadersOptions = {
    contentSecurityPolicy?: string;
    frameAncestors?: readonly string[];
    permissions?: Partial<Record<"camera" | "microphone" | "geolocation" | "payment" | "usb", readonly string[]>>;
};
export declare const DEFAULT_CSP: string;
export declare function securityHeaders(options?: SecurityHeadersOptions): Record<string, string>;
/** Keep in step with package.json so X-Site-Foundation reports the installed release. */
export declare const FOUNDATION_VERSION = "0.4.3";
export type SiteResponseHeadersOptions = {
    service: string;
    version?: string;
    contentSecurityPolicy?: string;
};
/** The security headers plus the X-Site-Service and X-Site-Foundation markers every site sends. */
export declare function siteResponseHeaders(options: SiteResponseHeadersOptions): Record<string, string>;
