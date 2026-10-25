# @appneural/site-foundation

The single dependency used by portfolio websites. It re-exports the common brand, SEO, accessibility, security, consent, forms, analytics, performance, observability and compliance primitives.

Next.js sites wrap their existing config with `withSiteFoundation` from `@appneural/site-foundation/next`. Vite sites generate their Cloudflare `_headers` content with `siteFoundationHeaders` from `@appneural/site-foundation/vite`. Existing site routes, branding and provider configuration remain site-owned.
