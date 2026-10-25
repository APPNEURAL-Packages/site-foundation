export type ConsentCategory = "necessary" | "analytics" | "marketing" | "preferences";
export type ConsentPreferences = { version: 1; updatedAt: string; choices: Record<ConsentCategory, boolean> };

export const consentDefaults = (): ConsentPreferences => ({
  version: 1,
  updatedAt: new Date(0).toISOString(),
  choices: { necessary: true, analytics: false, marketing: false, preferences: false },
});

export function canUse(preferences: ConsentPreferences | undefined, category: ConsentCategory): boolean {
  return category === "necessary" || preferences?.choices[category] === true;
}

export function readConsent(storageKey: string): ConsentPreferences | undefined {
  if (typeof localStorage === "undefined") return undefined;
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? "null") as ConsentPreferences | null;
    return value?.version === 1 && value.choices?.necessary === true ? value : undefined;
  } catch { return undefined; }
}

export function writeConsent(storageKey: string, choices: Partial<ConsentPreferences["choices"]>): ConsentPreferences {
  const value: ConsentPreferences = {
    version: 1,
    updatedAt: new Date().toISOString(),
    choices: { ...consentDefaults().choices, ...choices, necessary: true },
  };
  if (typeof localStorage !== "undefined") localStorage.setItem(storageKey, JSON.stringify(value));
  return value;
}
