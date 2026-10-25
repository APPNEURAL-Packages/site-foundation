/** Configuration contract for the shared Next.js Cloudflare website renderer. */
export type SiteVariant = "enterprise" | "saas" | "devtools" | "education" | "kids" | "personal" | "creative";
export type SiteContentItem = {
    title: string;
    body: string;
};
export type ConfiguredSite = {
    name: string;
    domain: string;
    legalName?: string;
    tagline: string;
    description: string;
    keywords: string[];
    variant: SiteVariant;
    theme: {
        mode: "light" | "dark";
        bg: string;
        surface: string;
        ink: string;
        muted: string;
        accent: string;
        accent2: string;
        accentInk: string;
        radius: string;
    };
    ecosystem?: {
        label: string;
        name: string;
        url: string;
    };
    hero: {
        eyebrow: string;
        title: string;
        highlight: string;
        subtitle: string;
        primaryCta: string;
        secondaryCta: string;
        visual: string[];
    };
    pillars: string[];
    features: SiteContentItem[];
    audiences: SiteContentItem[];
    steps: SiteContentItem[];
    offer: {
        path: string;
        label: string;
        title: string;
        intro: string;
        items: {
            name: string;
            body: string;
            points: string[];
        }[];
    };
    about: {
        title: string;
        body: string[];
        values: SiteContentItem[];
    };
    faqs: {
        q: string;
        a: string;
    }[];
    cta: {
        title: string;
        body: string;
    };
};
export type SiteConfig = ConfiguredSite;
export type Variant = SiteVariant;
export type Item = SiteContentItem;
export declare const defineConfiguredSite: <T extends ConfiguredSite>(config: T) => T;
