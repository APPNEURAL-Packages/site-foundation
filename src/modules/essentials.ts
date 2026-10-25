export interface SiteIdentity {
  name: string;
  url: string;
  description?: string;
  logo?: string;
  locale?: string;
  sameAs?: readonly string[];
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

function absoluteUrl(value: string, base: string): string {
  return new URL(value, base.endsWith("/") ? base : `${base}/`).toString();
}

export function canonicalUrl(siteUrl: string, path = "/"): string {
  return absoluteUrl(path, siteUrl);
}

export function createPageMetadata(site: SiteIdentity, page: PageMetadataInput) {
  const canonical = canonicalUrl(site.url, page.path);
  const image = page.image ? absoluteUrl(page.image, site.url) : undefined;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    robots: page.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website" as const,
      siteName: site.name,
      title: page.title,
      description: page.description,
      url: canonical,
      locale: site.locale,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? ("summary_large_image" as const) : ("summary" as const),
      title: page.title,
      description: page.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function websiteJsonLd(site: SiteIdentity) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: canonicalUrl(site.url),
    ...(site.description ? { description: site.description } : {}),
    ...(site.locale ? { inLanguage: site.locale } : {}),
  };
}

export function organizationJsonLd(site: SiteIdentity) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: canonicalUrl(site.url),
    ...(site.description ? { description: site.description } : {}),
    ...(site.logo ? { logo: absoluteUrl(site.logo, site.url) } : {}),
    ...(site.sameAs?.length ? { sameAs: [...site.sameAs] } : {}),
  };
}

export function breadcrumbJsonLd(
  siteUrl: string,
  items: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(siteUrl, item.path),
    })),
  };
}
