export function defineWebsiteConfig(config) {
    const publicUrls = config.chat ? [config.chat.client.scriptUrl, config.chat.client.apiUrl] : [];
    if (config.forms)
        publicUrls.push(config.forms.client.baseUrl);
    for (const value of publicUrls) {
        const url = new URL(value);
        if (url.protocol !== "https:")
            throw new Error("Website public clients require HTTPS.");
        if (/\/(admin|dashboard)(?:\/|$)/u.test(url.pathname))
            throw new Error("Website configuration cannot reference admin clients.");
    }
    return config;
}
