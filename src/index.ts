export { createPageMetadata, websiteJsonLd, organizationJsonLd, breadcrumbJsonLd } from "@appneural/site-essentials";
export { securityHeaders, DEFAULT_CSP } from "@appneural/site-security";
export { DEFAULT_PERFORMANCE_BUDGET, performanceSnapshot, prefersReducedData } from "@appneural/site-performance";
export { consentDefaults, canUse, readConsent, writeConsent } from "@appneural/site-consent";
export { normalizePlainText, isEmail, validateContact } from "@appneural/site-forms";
export { safePath, createSiteEvent, dispatchSiteEvent } from "@appneural/site-analytics";
export { healthPayload, redactError } from "@appneural/site-observability";
export { requiredPolicies, missingPolicies } from "@appneural/site-compliance";
export { validateBrandDNA, toSiteIdentity, toCssCustomProperties } from "@appneurox/brand-dna";
export type { SiteIdentity, PageMetadataInput } from "@appneural/site-essentials";
export type { BrandDNA } from "@appneurox/brand-dna";

export type SiteFoundationOptions = {
  service: string;
  version?: string;
  contentSecurityPolicy?: string;
};
