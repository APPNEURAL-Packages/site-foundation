export const publicPosts = (config) => config.posts.filter((post) => !post.draft).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
export const blogPath = (config, slug = "") => `${(config.basePath ?? "/blog").replace(/\/$/u, "")}${slug ? `/${slug.replace(/^\//u, "")}` : ""}`;
export const blogTags = (config) => [...new Set(publicPosts(config).flatMap((post) => post.tags ?? []))].sort();
