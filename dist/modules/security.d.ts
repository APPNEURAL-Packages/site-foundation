export type SecurityHeadersOptions = {
    contentSecurityPolicy?: string;
    frameAncestors?: readonly string[];
    permissions?: Partial<Record<"camera" | "microphone" | "geolocation" | "payment" | "usb", readonly string[]>>;
};
export declare const DEFAULT_CSP: string;
export declare function securityHeaders(options?: SecurityHeadersOptions): Record<string, string>;
