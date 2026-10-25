export function requiredPolicies(features) {
    const policies = ["privacy", "terms"];
    if (features.analytics || features.marketingCookies)
        policies.push("cookies");
    if (features.payments)
        policies.push("refunds");
    return policies;
}
export function missingPolicies(links, features) {
    return requiredPolicies(features).filter((key) => !links[key]?.trim());
}
