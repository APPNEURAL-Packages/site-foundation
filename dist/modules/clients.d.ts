export type PublicClientConfig = {
    url: string;
    title: string;
    allowedOrigin?: string;
};
export type SalogentClientConfig = PublicClientConfig & {
    agentId?: string;
};
export type GenXFormClientConfig = PublicClientConfig & {
    formId?: string;
};
export declare const mountSalogentClient: (target: HTMLElement, config: SalogentClientConfig) => HTMLIFrameElement;
export declare const mountGenXFormClient: (target: HTMLElement, config: GenXFormClientConfig) => HTMLIFrameElement;
