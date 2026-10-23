// pktito.net/llms-full.txt: every docs and developers page whole, as its
// Markdown, for an agent to read in one fetch.
import { getCollection } from "astro:content";

export async function GET() {
  const out = ["# pktito: the documentation, whole", ""];
  for (const key of ["developers", "docs"] as const) {
    const pages = (await getCollection(key)).sort((a, b) => a.data.order - b.data.order);
    for (const p of pages) out.push(`# ${p.data.title}`, "", `Source: https://pktito.net/${key}/${p.id}`, "", p.data.description, "", (p.body ?? "").trim(), "");
  }
  return new Response(out.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
