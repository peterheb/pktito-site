// pktito-server beside an LLM, as the server page shows it: the study of
// 2026-11-07 on a DGX Spark serving GLM-5.3-Flash (the homelab repo,
// benchmarks/pktito-beside-llm-20261107, has the raw runs, the harness and
// summary.json). Drawn as two charts in the AliceBench chart's style, and as
// a table in the page's Markdown.

// GLM's generation speed without pktito, and how much it varied run to run
export const BASE = { one: 60.6, eight: 143.0 };
export const SPREAD = { one: 2, eight: 3 };

// GLM's speed change, in percent, serving 1 chat and 8 at once (each a
// one-line prompt asking for 384 tokens); pktito-server idle, taking a clip
// now and then, or transcribing without pause, 2 chapter-length WAVs a
// worker (one worker per 4 threads)
export const LLM = [
  { name: "Idle", about: "running, nothing to transcribe", one: 1.3, eight: -1.3 },
  { name: "Occasional", about: "a 30 s clip every 10 s", one: 0.9, eight: 1.5 },
  { name: "4 threads", about: "2 recordings at once", one: -0.2, eight: -0.8 },
  { name: "8 threads", about: "4 recordings at once", one: -0.9, eight: -2.3 },
  { name: "12 threads", about: "6 recordings at once", one: -3.9, eight: -0.9 },
  { name: "20 threads", about: "10 recordings at once, every core", one: -4.0, eight: -6.7 },
];

// pktito's × real time with GLM loaded and idle, and generating for 1 chat
// (for 8 at once within 2% of that)
export const PKTITO = [
  { t: 4, idle: 91.8, busy: 67.1 },
  { t: 8, idle: 166.0, busy: 123.2 },
  { t: 12, idle: 203.5, busy: 136.5 },
  { t: 20, idle: 226.3, busy: 151.0 },
];

const pct = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(1) + "%";
const tick = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v) + (v ? "%" : "");

function axis(ticks: number[], at: (v: number) => string, label: (v: number) => string) {
  return `<div class="ab-row ab-axis" aria-hidden="true"><span></span><div class="ab-scale">${ticks
    .map((t, i) => `<span class="${i === 0 ? "first" : i === ticks.length - 1 ? "last" : ""}" style="left:${at(t)}%">${label(t)}</span>`)
    .join("")}</div><span></span></div>`;
}

const mark = (kind: "cpu" | "accel", left: string, tip: string) => `<i class="ab-mk ab-${kind}" style="left:${left}%" title="${tip}"></i>`;
const row = (name: string, about: string, track: string, val: string) =>
  `<div class="ab-row"><div class="ab-name"><b>${name}</b><span>${about}</span></div><div class="ab-track" aria-hidden="true">${track}</div><div class="ab-val">${val}</div></div>`;

/** GLM's speed change by what pktito is doing: -8% to +4%, run-to-run shaded. */
export function llmChartHtml() {
  const lo = -8, hi = 4;
  const at = (v: number) => (((v - lo) / (hi - lo)) * 100).toFixed(2);
  const grid =
    `<i class="ab-band" style="left:${at(-SPREAD.eight)}%;width:${(+at(SPREAD.eight) - +at(-SPREAD.eight)).toFixed(2)}%"></i>` +
    [-8, -6, -4, -2, 2, 4].map((t) => `<i class="ab-grid${t % 4 ? " ab-minor" : ""}" style="left:${at(t)}%"></i>`).join("") +
    `<i class="ab-grid ab-zero" style="left:${at(0)}%"></i>`;
  const rows = LLM.map((r) => {
    const marks = mark("cpu", at(r.one), `${r.name}: LLM serving 1 chat ${pct(r.one)}`) + mark("accel", at(r.eight), `${r.name}: LLM serving 8 chats ${pct(r.eight)}`);
    const val = `<span class="ab-pair"><i class="ab-k ab-cpu"></i>${pct(r.one)}</span><span class="ab-pair"><i class="ab-k ab-accel"></i>${pct(r.eight)}</span>`;
    return row(r.name, r.about, grid + marks, val);
  });
  const legend = `<div class="ab-legend" aria-hidden="true"><span><i class="ab-k ab-cpu"></i>LLM serving 1 chat</span><span><i class="ab-k ab-accel"></i>LLM serving 8 chats at once</span><span><i class="ab-k ab-band-k"></i>run to run, without pktito</span></div>`;
  return `<figure class="ab ab-wide" aria-label="GLM-5.3-Flash's generation speed by what pktito-server is doing"><figcaption class="ab-title">The LLM's speed, against the same Spark without pktito</figcaption>${legend}${axis([-8, -4, 0, 4], at, tick)}${rows.join("")}</figure>`;
}

/** pktito's speed by threads, beside GLM idle and generating: 0 to 250×. */
export function pktitoChartHtml() {
  const hi = 250;
  const at = (v: number) => ((v / hi) * 100).toFixed(2);
  const ticks = [0, 50, 100, 150, 200, 250];
  const grid = ticks.slice(1).map((t) => `<i class="ab-grid" style="left:${at(t)}%"></i>`).join("");
  const rows = PKTITO.map((r) => {
    const a = at(r.busy), b = at(r.idle);
    const marks =
      `<i class="ab-seg" style="left:${a}%;width:${(+b - +a).toFixed(2)}%"></i>` +
      mark("cpu", b, `-t ${r.t}: ${r.idle.toFixed(0)}× beside an idle LLM`) +
      mark("accel", a, `-t ${r.t}: ${r.busy.toFixed(0)}× beside a generating LLM`);
    return row(`${r.t} threads`, `${r.idle.toFixed(0)}× beside an idle LLM`, grid + marks, `<b>${r.busy.toFixed(0)}×</b>`);
  });
  const legend = `<div class="ab-legend" aria-hidden="true"><span><i class="ab-k ab-cpu"></i>LLM idle</span><span><i class="ab-k ab-accel"></i>LLM generating</span><span>× real time</span></div>`;
  return `<figure class="ab" aria-label="pktito-server's speed by threads, beside an idle and a generating LLM"><figcaption class="ab-title">pktito's speed beside the LLM</figcaption>${legend}${axis(ticks, at, String)}${rows.join("")}</figure>`;
}

/** The same as Markdown tables, for the page's .md and llms-full.txt. */
export function tablesMarkdown() {
  const a = ["| pktito-server | GLM serving 1 chat | GLM serving 8 chats at once |", "| --- | ---: | ---: |"];
  for (const r of LLM) a.push(`| ${r.name} (${r.about}) | ${pct(r.one)} | ${pct(r.eight)} |`);
  const b = ["| Threads | Beside an idle LLM | Beside a generating LLM |", "| ---: | ---: | ---: |"];
  for (const r of PKTITO) b.push(`| ${r.t} | ${r.idle.toFixed(0)}× | ${r.busy.toFixed(0)}× |`);
  return a.join("\n") + "\n\n" + b.join("\n");
}

export const PLACEHOLDER = '<div data-besidellm></div>';
export const chartsHtml = () => llmChartHtml() + pktitoChartHtml();

/** A page's Markdown with the charts' place given the tables. */
export const withTables = (body: string) => body.replace(PLACEHOLDER, tablesMarkdown());
