export type PolicyLinks = { privacy: string; terms: string; cookies?: string; accessibility?: string; refunds?: string };
export type BusinessIdentity = { displayName: string; legalName?: string; email?: string; country?: string; registrationId?: string };
export type SiteFeatures = { analytics?: boolean; marketingCookies?: boolean; payments?: boolean; accounts?: boolean };

export function requiredPolicies(features: SiteFeatures): Array<keyof PolicyLinks> {
  const policies: Array<keyof PolicyLinks> = ["privacy", "terms"];
  if (features.analytics || features.marketingCookies) policies.push("cookies");
  if (features.payments) policies.push("refunds");
  return policies;
}

export function missingPolicies(links: Partial<PolicyLinks>, features: SiteFeatures): string[] {
  return requiredPolicies(features).filter((key) => !links[key]?.trim());
}
