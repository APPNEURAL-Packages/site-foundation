export type BlogAuthor = { name: string; url?: string; image?: string };
export type BlogPost = { slug: string; title: string; description: string; body: string; publishedAt?: string; updatedAt?: string; image?: string; imageAlt?: string; tags?: readonly string[]; author?: BlogAuthor; draft?: boolean };
export type BlogConfig = { basePath?: string; title: string; description: string; posts: readonly BlogPost[]; pageSize?: number; showTags?: boolean; showAuthors?: boolean };
export const publicPosts = (config: BlogConfig): BlogPost[] => config.posts.filter((post) => !post.draft).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
export const blogPath = (config: BlogConfig, slug = ""): string => `${(config.basePath ?? "/blog").replace(/\/$/u, "")}${slug ? `/${slug.replace(/^\//u, "")}` : ""}`;
export const blogTags = (config: BlogConfig): string[] => [...new Set(publicPosts(config).flatMap((post) => post.tags ?? []))].sort();
