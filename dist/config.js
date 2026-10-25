export function defineWebsiteConfig(config) {
    for (const client of [config.chat?.client, config.forms?.client]) {
        if (client && /\/(admin|dashboard)(?:\/|$)/u.test(new URL(client.url).pathname))
            throw new Error("Website configuration cannot reference admin clients.");
    }
    return config;
}
