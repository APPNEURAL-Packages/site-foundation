const isUrl = (value) => {
    if (!value)
        return false;
    try {
        const url = new URL(value);
        return url.protocol === "https:";
    }
    catch {
        return false;
    }
};
const isHex = (value) => Boolean(value && /^#[0-9a-f]{6}$/iu.test(value));
export function validateBrandDNA(dna) {
    const issues = [];
    const required = [
        ["identity.name", dna.identity?.name],
        ["identity.description", dna.identity?.description],
        ["positioning.promise", dna.positioning?.promise],
    ];
    for (const [path, value] of required) {
        if (!value?.trim())
            issues.push({ path, message: "Provide an owner-approved value." });
    }
    if (!isUrl(dna.identity?.url)) {
        issues.push({ path: "identity.url", message: "Use an absolute HTTPS URL." });
    }
    if (dna.identity?.logo && !isUrl(dna.identity.logo) && !dna.identity.logo.startsWith("/")) {
        issues.push({ path: "identity.logo", message: "Use an absolute HTTPS URL or an origin-relative path." });
    }
    if (!isHex(dna.visual?.primary?.value)) {
        issues.push({ path: "visual.primary.value", message: "Use a six-digit hexadecimal colour." });
    }
    if (dna.visual?.secondary && !isHex(dna.visual.secondary.value)) {
        issues.push({ path: "visual.secondary.value", message: "Use a six-digit hexadecimal colour." });
    }
    if (!dna.positioning?.audiences?.length) {
        issues.push({ path: "positioning.audiences", message: "Add at least one audience." });
    }
    if (!dna.voice?.traits?.length) {
        issues.push({ path: "voice.traits", message: "Add at least one voice trait." });
    }
    return issues.length ? { valid: false, issues } : { valid: true, issues: [] };
}
export function toSiteIdentity(dna) {
    return {
        name: dna.identity.name,
        url: dna.identity.url,
        description: dna.identity.description,
        logo: dna.identity.logo,
        locale: dna.identity.locale,
        sameAs: dna.identity.sameAs,
    };
}
export function toCssCustomProperties(dna) {
    const values = {
        "--brand-primary": dna.visual.primary.value,
    };
    if (dna.visual.primary.onColor)
        values["--brand-on-primary"] = dna.visual.primary.onColor;
    if (dna.visual.secondary)
        values["--brand-secondary"] = dna.visual.secondary.value;
    if (dna.visual.secondary?.onColor)
        values["--brand-on-secondary"] = dna.visual.secondary.onColor;
    if (dna.visual.radius)
        values["--brand-radius"] = dna.visual.radius;
    if (dna.visual.fontFamilies?.length)
        values["--brand-fonts"] = dna.visual.fontFamilies.join(", ");
    return values;
}
