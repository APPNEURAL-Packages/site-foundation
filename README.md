# @appneural/site-foundation

The single dependency used by portfolio websites. It re-exports the common brand, SEO, accessibility, security, consent, forms, analytics, performance, observability and compliance primitives.

The package contains a reviewed snapshot of the separately maintained concern packages so pnpm can install one direct, pinned Git dependency without allowing transitive Git dependencies.

Next.js sites wrap their existing config with `withSiteFoundation` from `@appneural/site-foundation/next`. Vite sites generate their Cloudflare `_headers` content with `siteFoundationHeaders` from `@appneural/site-foundation/vite`. Existing site routes, branding and provider configuration remain site-owned.
