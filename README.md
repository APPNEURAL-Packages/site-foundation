# @appneural/site-foundation

The single dependency used by portfolio websites. It re-exports the common brand, SEO, accessibility, security, consent, forms, analytics, performance, observability and compliance primitives.

The package contains a reviewed snapshot of the separately maintained concern packages so pnpm can install one direct, pinned Git dependency without allowing transitive Git dependencies.

Version 0.2 adds an accessible carousel controller, an honest contact-handoff chat widget, endpoint-configured form behavior, and common About, Contact, Privacy, Terms, Accessibility and 404 page descriptors. UI mounting remains opt-in so existing site-specific widgets and routes are not duplicated.

Version 0.3 adds config-only website contracts, eight header variants, public blog helpers, the Salogent script widget adapter, and the GenXForm published-form adapter. Public clients require HTTPS and reject admin/dashboard URLs; admin applications remain separate.

Version 0.4 starts removing copied kit code from websites. The shared Cloudflare site configuration contract is exported from `@appneural/site-foundation/kit`; website repositories keep their content and theme values, not a private copy of that contract.

Next.js sites wrap their existing config with `withSiteFoundation` from `@appneural/site-foundation/next`. Vite sites generate their Cloudflare `_headers` content with `siteFoundationHeaders` from `@appneural/site-foundation/vite`. Existing site routes, branding and provider configuration remain site-owned.

Version 0.4.3 registers the shared headers on `/(.*)` ahead of the site's own rules, because vinext does not match the root path with `/:path*`. A site's own value for the same header still wins. `X-Site-Foundation` reports the installed release. Workers that serve a static export themselves can apply `siteResponseHeaders` to their responses, since Next.js ignores `headers()` with `output: 'export'` and Cloudflare does not apply `_headers` to responses a Worker builds.
