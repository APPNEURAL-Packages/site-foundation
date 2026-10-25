export type ReleaseInfo = {
    service: string;
    version: string;
    commit?: string;
    builtAt?: string;
};
export type HealthPayload = {
    ok: true;
    service: string;
    version: string;
    checkedAt: string;
};
export declare const healthPayload: (release: ReleaseInfo, now?: Date) => HealthPayload;
export declare function redactError(error: unknown): {
    name: string;
    message: string;
};
