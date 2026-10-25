export const healthPayload = (release, now = new Date()) => ({ ok: true, service: release.service, version: release.version, checkedAt: now.toISOString() });
export function redactError(error) {
    const source = error instanceof Error ? error : new Error("Unexpected error");
    return {
        name: source.name.slice(0, 80),
        message: source.message.replace(/https?:\/\/\S+/gu, "[url]").replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/giu, "[email]").slice(0, 500),
    };
}
