export type ConsentCategory = "necessary" | "analytics" | "marketing" | "preferences";
export type ConsentPreferences = {
    version: 1;
    updatedAt: string;
    choices: Record<ConsentCategory, boolean>;
};
export declare const consentDefaults: () => ConsentPreferences;
export declare function canUse(preferences: ConsentPreferences | undefined, category: ConsentCategory): boolean;
export declare function readConsent(storageKey: string): ConsentPreferences | undefined;
export declare function writeConsent(storageKey: string, choices: Partial<ConsentPreferences["choices"]>): ConsentPreferences;
