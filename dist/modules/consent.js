export const consentDefaults = () => ({
    version: 1,
    updatedAt: new Date(0).toISOString(),
    choices: { necessary: true, analytics: false, marketing: false, preferences: false },
});
export function canUse(preferences, category) {
    return category === "necessary" || preferences?.choices[category] === true;
}
export function readConsent(storageKey) {
    if (typeof localStorage === "undefined")
        return undefined;
    try {
        const value = JSON.parse(localStorage.getItem(storageKey) ?? "null");
        return value?.version === 1 && value.choices?.necessary === true ? value : undefined;
    }
    catch {
        return undefined;
    }
}
export function writeConsent(storageKey, choices) {
    const value = {
        version: 1,
        updatedAt: new Date().toISOString(),
        choices: { ...consentDefaults().choices, ...choices, necessary: true },
    };
    if (typeof localStorage !== "undefined")
        localStorage.setItem(storageKey, JSON.stringify(value));
    return value;
}
