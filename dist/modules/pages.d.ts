export type CommonPageId = "about" | "contact" | "privacy" | "terms" | "accessibility" | "not-found";
export type CommonPageDescriptor = {
    id: CommonPageId;
    path: string;
    title: string;
    description: string;
    requiredFacts: readonly string[];
};
export declare function commonPages(brandName: string): CommonPageDescriptor[];
export declare const commonFooterLinks: (brandName: string, available: readonly CommonPageId[]) => {
    id: CommonPageId;
    path: string;
    title: string;
}[];
