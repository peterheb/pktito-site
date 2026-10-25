// pktito.net, built to dist/ for the Worker (worker.js, wrangler.jsonc).
// Pages are files (docs/models.html), which the Worker's assets serve at
// /docs/models; /models, the old page, goes to the docs' Models page, and
// each section's address to its first page.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://pktito.net",
  trailingSlash: "never",
  build: { format: "file" },
  redirects: {
    "/models": "/docs/models",
    "/docs": "/docs/getting-started",
    "/developers": "/developers/cli",
  },
  // code takes the site's own dark field (site.css, .prose pre), not a theme's
  markdown: { syntaxHighlight: false },
});
