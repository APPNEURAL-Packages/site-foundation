import type { BlogConfig } from "./modules/blog.js";
import type { GenXFormClientConfig, SalogentClientConfig } from "./modules/clients.js";
import type { HeaderConfig } from "./modules/headers.js";
import type { CommonPageId } from "./modules/pages.js";
export type WebsiteFoundationConfig = {
    id: string;
    header: HeaderConfig;
    chat?: {
        provider: "salogent";
        client: SalogentClientConfig;
    };
    forms?: {
        provider: "genxform";
        client: GenXFormClientConfig;
    };
    blog?: BlogConfig;
    commonPages?: readonly CommonPageId[];
};
export declare function defineWebsiteConfig<T extends WebsiteFoundationConfig>(config: T): T;
