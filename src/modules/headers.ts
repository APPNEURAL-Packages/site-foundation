export type HeaderVariant = "marketing" | "product" | "docs" | "editorial" | "personal" | "utility" | "transparent" | "compact";
export type HeaderLink = { label: string; href: string; children?: readonly HeaderLink[]; external?: boolean };
export type HeaderAction = { label: string; href: string; tone?: "primary" | "secondary" | "quiet" };
export type HeaderConfig = { variant: HeaderVariant; brand: { name: string; href?: string; logo?: string; logoAlt?: string }; navigation: readonly HeaderLink[]; actions?: readonly HeaderAction[]; announcement?: { text: string; href?: string }; sticky?: boolean; search?: { enabled: boolean; label?: string } };
export const defineHeader = <T extends HeaderConfig>(config: T): T => config;
export function validateHeader(config: HeaderConfig): string[] { const issues: string[] = []; if (!config.brand.name.trim()) issues.push("brand.name is required"); for (const link of [...config.navigation, ...(config.actions ?? [])]) if (!link.label.trim() || !link.href.trim()) issues.push("Every header link needs a label and href"); return issues; }
