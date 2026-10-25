// pktito.net/developers/<page>.md: the page as its Markdown, for an agent that
// would rather not read the HTML (llms.txt links these).
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  return (await getCollection("developers")).map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export function GET({ props }) {
  const { entry } = props;
  const md = `# ${entry.data.title}\n\n${entry.data.description}\n\n${(entry.body ?? "").trim()}\n`;
  return new Response(md, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
