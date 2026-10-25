export type CarouselOptions = {
    autoplayMs?: number;
    startIndex?: number;
    wrap?: boolean;
};
export declare function mountCarousel(root: HTMLElement, options?: CarouselOptions): {
    go: (target: number) => void;
    next: () => void;
    previous: () => void;
    destroy: () => void;
    readonly index: number;
};
