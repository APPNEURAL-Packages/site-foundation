export type ChatHandoffOptions = {
    label?: string;
    heading?: string;
    message?: string;
    contactUrl: string;
    contactLabel?: string;
};
export declare function mountChatHandoff(options: ChatHandoffOptions): HTMLElement | undefined;
export declare const chatHandoffStyles = "[data-site-chat]{position:fixed;right:1rem;bottom:1rem;z-index:50}[data-chat-panel]{position:absolute;right:0;bottom:3.25rem;width:min(22rem,calc(100vw - 2rem));padding:1rem;background:Canvas;color:CanvasText;border:1px solid color-mix(in srgb,CanvasText 20%,transparent);border-radius:1rem;box-shadow:0 1rem 3rem rgba(0,0,0,.16)}[data-chat-close]{position:absolute;right:.5rem;top:.5rem}";
