function publicUrl(config, params) { const url = new URL(config.url); if (url.protocol !== "https:")
    throw new Error("Public clients require HTTPS."); if (/\/(admin|dashboard)(?:\/|$)/u.test(url.pathname))
    throw new Error("Admin routes cannot be embedded as public clients."); for (const [key, value] of Object.entries(params))
    if (value)
        url.searchParams.set(key, value); return url.toString(); }
function mountClient(target, config, src) { const frame = document.createElement("iframe"); frame.src = src; frame.title = config.title; frame.loading = "lazy"; frame.referrerPolicy = "strict-origin-when-cross-origin"; frame.setAttribute("sandbox", "allow-forms allow-scripts allow-same-origin allow-popups"); frame.setAttribute("data-site-public-client", "true"); target.replaceChildren(frame); return frame; }
export const mountSalogentClient = (target, config) => mountClient(target, config, publicUrl(config, { agent: config.agentId }));
export const mountGenXFormClient = (target, config) => mountClient(target, config, publicUrl(config, { form: config.formId }));
