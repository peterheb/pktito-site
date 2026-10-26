# pktito.net

The site of [pktito](https://github.com/peterheb/pktito): the home page, Download, Docs and Developers (Markdown in `src/content`), About, Privacy, and `llms.txt` for agents. It's built with Astro into `dist/`, and served with the installers by a Cloudflare Worker (`worker.js`) that also counts downloads.

```sh
npm install
npm run dev         # http://localhost:4321
npm run build       # dist/
npm run preview     # the Worker and dist/ together, as deployed
npm run deploy      # build, then wrangler deploy
```

## Where things are

- `src/pages`: the home page, Download, About, Privacy, 404, `/soon`, the Docs and Developers landing pages and their page routes, and `llms.txt`/`llms-full.txt`, made from the same Markdown as the docs.
- `src/content/docs`, `src/content/developers`: one Markdown file a page, with `title`, `description` and `order` (its place in the left nav).
- `src/layouts`: `Base` (head, header, footer) and `Docs` (the section's pages, the page, its headings).
- `src/styles`: `base.css` (the grid, type, header, footer, page parts) and `site.css` (the nav, the home page's bands, the docs and their Markdown).
- `public`: the design system's files, the fonts, the budgie for About, and the app's screenshots, copied from pktito-app by `npm run sync`; `tokens.css` is generated from `design/tokens.json` on every build.

The design system, the voice included, lives in pktito-app's `design/README.md`. After it or the screenshots change, run `npm run sync` with pktito-app checked out beside this repo (or `PKTITO_APP=path`), and commit what it copies.

## Installers

The download page links to `/download/macos`, `/download/windows`, `/download/windows-arm64`, `/download/linux-deb` and `/download/linux-deb-arm64`, and to `pktito-cli` alone at `/download/cli-macos`, `/download/cli-windows`, `/download/cli-windows-arm64`, `/download/cli-linux` and `/download/cli-linux-arm64`; `/download/sha256sums` is the release's checksums. The Windows CLIs are what the setup programs install, byte for byte; winget installs them from their `/download/<version>/<file>` addresses, which its manifests pin by SHA-256. These stay put from release to release. The Worker redirects each to the file that `latest.json`, in the R2 bucket `pktito-releases`, names for it, and serves `/download/<version>/<file>` from `<version>/<file>` there, resumable and cached for a year. A key that `latest.json` doesn't name goes to `/soon`.

Posting a release is its files first, then `latest.json`. The CLIs are the release's own: the Mac's taken from the DMG's app, so that the DMG's notarization covers it, Linux's from the .debs, and Windows' from the signed setup programs. A posted file never changes, the checksums included: a file added to a release later gets a checksums file of its own name that lists the whole release, which `latest.json` then names (0.9.2's Windows CLIs went into `SHA256SUMS-2`).

```sh
npx wrangler@4 r2 object put pktito-releases/0.9.0/pktito_0.9.0_aarch64.dmg --file pktito_0.9.0_aarch64.dmg --remote
npx wrangler@4 r2 object put pktito-releases/latest.json --file latest.json --content-type application/json --remote
```

```json
{
  "version": "0.9.0",
  "files": {
    "macos": "pktito_0.9.0_aarch64.dmg",
    "windows": "pktito_0.9.0_x64-setup.exe",
    "windows-arm64": "pktito_0.9.0_arm64-setup.exe",
    "linux-deb": "pktito_0.9.0_amd64.deb",
    "linux-deb-arm64": "pktito_0.9.0_arm64.deb",
    "cli-macos": "pktito-cli-0.9.0-macos-arm64",
    "cli-linux": "pktito-cli-0.9.0-linux-x86_64",
    "cli-linux-arm64": "pktito-cli-0.9.0-linux-arm64",
    "sha256sums": "SHA256SUMS"
  }
}
```

## Download counts

An installer download that starts adds one to its file's count for the day (UTC), in the D1 database `pktito-stats`. Only the counts are kept: no address, and nothing that tells one visitor from another. A resumed download, a HEAD request, a probe of a few bytes and a crawler's fetch aren't counted.

```sh
npx wrangler@4 d1 execute pktito-stats --remote --command \
  "SELECT version, file, SUM(n) AS downloads FROM downloads GROUP BY version, file"
```

## Models and screenshots

models.pktito.net and the screenshots are pktito-app's: its README ("The model") says how the models are hosted and uploaded, and its `design/README.md` ("Imagery") how the screenshots are taken.
