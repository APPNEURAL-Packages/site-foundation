export interface SiteIdentity {
    name: string;
    url: string;
    description?: string;
    logo?: string;
    locale?: string;
    sameAs?: readonly string[];
}
export interface PageMetadataInput {
    title: string;
    description: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
}
export declare function canonicalUrl(siteUrl: string, path?: string): string;
export declare function createPageMetadata(site: SiteIdentity, page: PageMetadataInput): {
    title: string;
    description: string;
    alternates: {
        canonical: string;
    };
    robots: {
        index: boolean;
        follow: boolean;
    };
    openGraph: {
        images?: {
            url: string;
        }[] | undefined;
        type: "website";
        siteName: string;
        title: string;
        description: string;
        url: string;
        locale: string | undefined;
    };
    twitter: {
        images?: string[] | undefined;
        card: "summary_large_image" | "summary";
        title: string;
        description: string;
    };
};
export declare function websiteJsonLd(site: SiteIdentity): {
    inLanguage?: string | undefined;
    description?: string | undefined;
    "@context": string;
    "@type": string;
    name: string;
    url: string;
};
export declare function organizationJsonLd(site: SiteIdentity): {
    sameAs?: string[] | undefined;
    logo?: string | undefined;
    description?: string | undefined;
    "@context": string;
    "@type": string;
    name: string;
    url: string;
};
export declare function breadcrumbJsonLd(siteUrl: string, items: readonly {
    name: string;
    path: string;
}[]): {
    "@context": string;
    "@type": string;
    itemListElement: {
        "@type": string;
        position: number;
        name: string;
        item: string;
    }[];
};
