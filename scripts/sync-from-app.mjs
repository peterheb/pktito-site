// The design system's files and the app's pictures, copied from a pktito-app
// checkout beside this one (or the path in PKTITO_APP) into this repo, where
// they are committed: the site builds without the app's repo. Run it after
// the design system or the screenshots change.
//
//     npm run sync
import { cpSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const app = resolve(process.env.PKTITO_APP ?? "../pktito-app");
if (!existsSync(join(app, "design/tokens.json"))) {
  console.error(`no pktito-app at ${app}: set PKTITO_APP`);
  process.exit(2);
}
const copy = (from, to) => {
  mkdirSync(resolve(to, ".."), { recursive: true });
  cpSync(join(app, from), to);
  console.log(`${from} -> ${to}`);
};

copy("design/tokens.json", "design/tokens.json");
copy("design/bundle.css", "public/bundle.css");
copy("design/app-icon.svg", "public/favicon.svg");
mkdirSync("public/fonts", { recursive: true });
for (const f of readdirSync(join(app, "ui/fonts")))
  if (/\.(woff2|txt)$/.test(f)) copy(`ui/fonts/${f}`, `public/fonts/${f}`);
// the budgie, for About: its viewer and its voxels
copy("ui/mascot.js", "public/mascot/mascot.js");
copy("ui/mascot-model.js", "public/mascot/mascot-model.js");
mkdirSync("public/screenshots", { recursive: true });
for (const f of readdirSync(join(app, "site/screenshots")))
  if (f.endsWith(".png")) copy(`site/screenshots/${f}`, `public/screenshots/${f}`);
