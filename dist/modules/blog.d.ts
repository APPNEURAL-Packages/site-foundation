export type BlogAuthor = {
    name: string;
    url?: string;
    image?: string;
};
export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    body: string;
    publishedAt?: string;
    updatedAt?: string;
    image?: string;
    imageAlt?: string;
    tags?: readonly string[];
    author?: BlogAuthor;
    draft?: boolean;
};
export type BlogConfig = {
    basePath?: string;
    title: string;
    description: string;
    posts: readonly BlogPost[];
    pageSize?: number;
    showTags?: boolean;
    showAuthors?: boolean;
};
export declare const publicPosts: (config: BlogConfig) => BlogPost[];
export declare const blogPath: (config: BlogConfig, slug?: string) => string;
export declare const blogTags: (config: BlogConfig) => string[];
