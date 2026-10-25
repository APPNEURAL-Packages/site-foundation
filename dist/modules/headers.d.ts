export type HeaderVariant = "marketing" | "product" | "docs" | "editorial" | "personal" | "utility" | "transparent" | "compact";
export type HeaderLink = {
    label: string;
    href: string;
    children?: readonly HeaderLink[];
    external?: boolean;
};
export type HeaderAction = {
    label: string;
    href: string;
    tone?: "primary" | "secondary" | "quiet";
};
export type HeaderConfig = {
    variant: HeaderVariant;
    brand: {
        name: string;
        href?: string;
        logo?: string;
        logoAlt?: string;
    };
    navigation: readonly HeaderLink[];
    actions?: readonly HeaderAction[];
    announcement?: {
        text: string;
        href?: string;
    };
    sticky?: boolean;
    search?: {
        enabled: boolean;
        label?: string;
    };
};
export declare const defineHeader: <T extends HeaderConfig>(config: T) => T;
export declare function validateHeader(config: HeaderConfig): string[];
