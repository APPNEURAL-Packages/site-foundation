import { siteResponseHeaders } from "./modules/security.js";
export function siteFoundationHeaders(options) {
    return ["/*", ...Object.entries(siteResponseHeaders(options)).map(([key, value]) => `  ${key}: ${value}`), ""].join("\n");
}
export function siteFoundationPlugin(options) {
    return {
        name: "appneural-site-foundation",
        apply: "build",
        generateBundle(_output, bundle) {
            const generated = siteFoundationHeaders(options);
            const current = bundle["_headers"];
            if (!current || current.type !== "asset" || typeof current.source !== "string") {
                this.emitFile({ type: "asset", fileName: "_headers", source: generated });
                return;
            }
            const present = new Set(Array.from(current.source.matchAll(/^\s*([\w-]+):/gmu), (match) => match[1].toLowerCase()));
            const additions = generated.split("\n").filter((line) => {
                const match = line.match(/^\s*([\w-]+):/u);
                return !match || !present.has(match[1].toLowerCase());
            });
            current.source = `${current.source.trimEnd()}\n\n${additions.join("\n")}`;
        },
    };
}
