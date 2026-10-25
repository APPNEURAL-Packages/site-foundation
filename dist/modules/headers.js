export const defineHeader = (config) => config;
export function validateHeader(config) { const issues = []; if (!config.brand.name.trim())
    issues.push("brand.name is required"); for (const link of [...config.navigation, ...(config.actions ?? [])])
    if (!link.label.trim() || !link.href.trim())
        issues.push("Every header link needs a label and href"); return issues; }
