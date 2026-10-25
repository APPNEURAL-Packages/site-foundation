export type SalogentClientConfig = {
    scriptUrl: string;
    websiteId: string;
    apiUrl: string;
    color?: string;
    welcome?: string;
};
export type GenXFormClientConfig = {
    baseUrl: string;
    publicRef: string;
    title: string;
};
export declare function mountSalogentClient(config: SalogentClientConfig): HTMLScriptElement;
export declare function genXFormPublicUrl(config: GenXFormClientConfig): string;
export declare function mountGenXFormClient(target: HTMLElement, config: GenXFormClientConfig): HTMLIFrameElement;
