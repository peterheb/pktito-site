// pktito.net/llms.txt: what an agent needs to know about pktito, in the
// llmstxt.org shape, with the docs' pages linked as Markdown-ish text
// (llms-full.txt has them whole).
import { getCollection } from "astro:content";
import { SECTIONS } from "../lib/site";

export async function GET() {
  const out = [
    "# pktito",
    "",
    "> pktito transcribes speech in audio and video files on the computer it runs on, with NVIDIA's Parakeet-TDT models (English, or 25 European languages). It is a desktop app for macOS, Windows and Linux with a command-line tool, pktito-cli, and a C11 library. It needs no GPU and no network after the model's one download.",
    "",
    "For an agent: download pktito-cli alone (https://pktito.net/download/cli-linux for Linux x86-64, cli-linux-arm64, cli-macos; chmod +x it) or install pktito, run `pktito-cli download parakeet-tdt-0.6b-v2` once, then `pktito-cli --json FILE` and read the JSON from stdout. The full text of every page below is at https://pktito.net/llms-full.txt.",
    "",
  ];
  for (const key of ["developers", "docs"] as const) {
    const pages = (await getCollection(key)).sort((a, b) => a.data.order - b.data.order);
    out.push(`## ${SECTIONS[key].title}`, "");
    for (const p of pages) out.push(`- [${p.data.title}](https://pktito.net/${key}/${p.id}): ${p.data.description}`);
    out.push("");
  }
  out.push("## Optional", "", "- [Download](https://pktito.net/download): installers for macOS, Windows and Linux, and pktito-cli alone for macOS and Linux", "- [Source](https://github.com/peterheb/pktito): the app and pktito-cli, MIT", "");
  return new Response(out.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
