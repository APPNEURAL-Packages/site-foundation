export type BrandAudience = {
    name: string;
    needs: readonly string[];
};
export type BrandColor = {
    value: `#${string}`;
    onColor?: `#${string}`;
};
/**
 * Owner-approved brand facts. Keep uncertain claims out of this object until
 * they are verified; public sites can safely derive metadata from these fields.
 */
export interface BrandDNA {
    schemaVersion: "1.0";
    identity: {
        name: string;
        url: string;
        description: string;
        logo?: string;
        locale?: string;
        legalName?: string;
        sameAs?: readonly string[];
    };
    positioning: {
        promise: string;
        audiences: readonly BrandAudience[];
        differentiators: readonly string[];
    };
    voice: {
        traits: readonly string[];
        preferredTerms?: readonly string[];
        avoidTerms?: readonly string[];
    };
    visual: {
        primary: BrandColor;
        secondary?: BrandColor;
        fontFamilies?: readonly string[];
        radius?: string;
    };
    governance?: {
        owner?: string;
        reviewedAt?: string;
        approvedClaims?: readonly string[];
    };
}
export type BrandDnaValidationIssue = {
    path: string;
    message: string;
};
export type BrandDnaValidation = {
    valid: true;
    issues: readonly [];
} | {
    valid: false;
    issues: readonly BrandDnaValidationIssue[];
};
export declare function validateBrandDNA(dna: BrandDNA): BrandDnaValidation;
export declare function toSiteIdentity(dna: BrandDNA): {
    name: string;
    url: string;
    description: string;
    logo: string | undefined;
    locale: string | undefined;
    sameAs: readonly string[] | undefined;
};
export declare function toCssCustomProperties(dna: BrandDNA): Record<string, string>;
