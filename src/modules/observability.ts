export type ReleaseInfo = { service: string; version: string; commit?: string; builtAt?: string };
export type HealthPayload = { ok: true; service: string; version: string; checkedAt: string };

export const healthPayload = (release: ReleaseInfo, now = new Date()): HealthPayload => ({ ok: true, service: release.service, version: release.version, checkedAt: now.toISOString() });

export function redactError(error: unknown): { name: string; message: string } {
  const source = error instanceof Error ? error : new Error("Unexpected error");
  return {
    name: source.name.slice(0, 80),
    message: source.message.replace(/https?:\/\/\S+/gu, "[url]").replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/giu, "[email]").slice(0, 500),
  };
}
