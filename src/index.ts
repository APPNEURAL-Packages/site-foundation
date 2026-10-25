export { createPageMetadata, websiteJsonLd, organizationJsonLd, breadcrumbJsonLd } from "./modules/essentials.js";
export { securityHeaders, DEFAULT_CSP } from "./modules/security.js";
export { DEFAULT_PERFORMANCE_BUDGET, performanceSnapshot, prefersReducedData } from "./modules/performance.js";
export { consentDefaults, canUse, readConsent, writeConsent } from "./modules/consent.js";
export { normalizePlainText, isEmail, validateContact, mountContactForm } from "./modules/forms.js";
export type { ContactFormOptions } from "./modules/forms.js";
export { safePath, createSiteEvent, dispatchSiteEvent } from "./modules/analytics.js";
export { healthPayload, redactError } from "./modules/observability.js";
export { requiredPolicies, missingPolicies } from "./modules/compliance.js";
export { validateBrandDNA, toSiteIdentity, toCssCustomProperties } from "./modules/brand.js";
export { mountCarousel } from "./modules/carousel.js";
export { mountChatHandoff, chatHandoffStyles } from "./modules/chat.js";
export { commonPages, commonFooterLinks } from "./modules/pages.js";
export type { SiteIdentity, PageMetadataInput } from "./modules/essentials.js";
export type { BrandDNA } from "./modules/brand.js";
export type { CarouselOptions } from "./modules/carousel.js";
export type { ChatHandoffOptions } from "./modules/chat.js";
export type { CommonPageId, CommonPageDescriptor } from "./modules/pages.js";

export type SiteFoundationOptions = {
  service: string;
  version?: string;
  contentSecurityPolicy?: string;
};
