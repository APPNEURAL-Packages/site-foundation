import type { BlogConfig } from "./modules/blog.js";
import type { GenXFormClientConfig, SalogentClientConfig } from "./modules/clients.js";
import type { HeaderConfig } from "./modules/headers.js";
import type { CommonPageId } from "./modules/pages.js";

export type WebsiteFoundationConfig = {
  id: string;
  header: HeaderConfig;
  chat?: { provider: "salogent"; client: SalogentClientConfig };
  forms?: { provider: "genxform"; client: GenXFormClientConfig };
  blog?: BlogConfig;
  commonPages?: readonly CommonPageId[];
};

export function defineWebsiteConfig<T extends WebsiteFoundationConfig>(config: T): T {
  const publicUrls = config.chat ? [config.chat.client.scriptUrl, config.chat.client.apiUrl] : [];
  if (config.forms) publicUrls.push(config.forms.client.baseUrl);
  for (const value of publicUrls) {
    const url = new URL(value);
    if (url.protocol !== "https:") throw new Error("Website public clients require HTTPS.");
    if (/\/(admin|dashboard)(?:\/|$)/u.test(url.pathname)) throw new Error("Website configuration cannot reference admin clients.");
  }
  return config;
}
