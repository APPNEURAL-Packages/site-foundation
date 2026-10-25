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
  for (const client of [config.chat?.client, config.forms?.client]) {
    if (client && /\/(admin|dashboard)(?:\/|$)/u.test(new URL(client.url).pathname)) throw new Error("Website configuration cannot reference admin clients.");
  }
  return config;
}
