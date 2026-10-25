export type PolicyLinks = {
    privacy: string;
    terms: string;
    cookies?: string;
    accessibility?: string;
    refunds?: string;
};
export type BusinessIdentity = {
    displayName: string;
    legalName?: string;
    email?: string;
    country?: string;
    registrationId?: string;
};
export type SiteFeatures = {
    analytics?: boolean;
    marketingCookies?: boolean;
    payments?: boolean;
    accounts?: boolean;
};
export declare function requiredPolicies(features: SiteFeatures): Array<keyof PolicyLinks>;
export declare function missingPolicies(links: Partial<PolicyLinks>, features: SiteFeatures): string[];
