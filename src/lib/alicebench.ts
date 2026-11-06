// AliceBench v1 as the site shows it: one record of each machine's latest
// run (pktito-app's ALICEBENCH.md has every run, dated), drawn as the chart
// on the developers' AliceBench page, as a table in that page's Markdown,
// and as the bars on the home page. × real time is the book's 10,731.4 s
// over the time taken. A machine's cpu is pktito-cli bench on its CPU; its
// accel, where it has one, is the encoder on its Neural Engine or NPU, as
// the app runs it.

export const BOOK_SECONDS = 10731.4;

// seconds: the whole book as timed, where x rounds too far to give it back
export type Run = { x: number; path: string; threads?: number; seconds?: number };
export type Machine = {
  id: string;
  name: string;
  about: string;
  cpu?: Run;
  accel?: Run & { kind: "Neural Engine" | "NPU" };
  // the release the row is from, where it isn't the page's
  version?: string;
};

export const RELEASE = "0.9.6";
export const WHEN = "November 5, 2026";

export const MACHINES: Machine[] = [
  {
    id: "studio",
    name: "Mac Studio",
    about: "36 cores, Apple M5 Ultra",
    accel: { kind: "Neural Engine", x: 908.5, path: "Neural Engine" },
    cpu: { x: 436.5, path: "neon-dp", threads: 36 },
  },
  {
    id: "m4pro",
    name: "Mac mini",
    about: "12 cores, Apple M4 Pro",
    accel: { kind: "Neural Engine", x: 468.3, path: "Neural Engine" },
    cpu: { x: 125.4, path: "neon-dp", threads: 12 },
  },
  {
    id: "m4",
    name: "Mac mini",
    about: "10 cores, Apple M4",
    accel: { kind: "Neural Engine", x: 428.5, path: "Neural Engine" },
    cpu: { x: 93.9, path: "neon-dp", threads: 10 },
  },
  { id: "9950x", name: "Windows Workstation", about: "16 cores, AMD Ryzen 9 9950X", cpu: { x: 353.5, path: "avx512-vnni", threads: 16 } },
  { id: "spark", name: "NVIDIA DGX Spark", about: "20 cores, NVIDIA GB10", cpu: { x: 219.2, path: "neon-sve", threads: 20 } },
  {
    id: "vivobook",
    name: "Vivobook S 15 (2024)",
    about: "12 cores, Snapdragon X Elite",
    accel: { kind: "NPU", x: 137.9, path: "NPU" },
    cpu: { x: 104.5, path: "neon-dp", threads: 12 },
  },
  {
    id: "iphone16e",
    name: "iPhone 16e",
    about: "6 cores, Apple A18",
    accel: { kind: "Neural Engine", x: 317.6, path: "Neural Engine" },
  },
  {
    id: "s25",
    name: "Galaxy S25 Ultra",
    about: "8 cores, Snapdragon 8 Elite",
    accel: { kind: "NPU", x: 229.2, path: "NPU" },
    cpu: { x: 32.0, path: "neon-dp", threads: 8 },
  },
  {
    id: "s24",
    name: "Galaxy S24 Ultra",
    about: "8 cores, Snapdragon 8 Gen 3",
    accel: { kind: "NPU", x: 195.6, path: "NPU" },
    cpu: { x: 25.8, path: "neon-dp", threads: 8 },
  },
  { id: "c8a", name: "EC2 c8a.xlarge", about: "4 cores, AMD EPYC 9R45 (Zen 5)", cpu: { x: 128.4, path: "avx512-vnni", threads: 4 } },
  { id: "thinkpad", name: "ThinkPad P14s Gen 5 (2024)", about: "8 cores, AMD Ryzen 7 PRO 8840HS", cpu: { x: 110.1, path: "avx512-vnni", threads: 8 } },
  { id: "surface", name: "Windows Laptop (2021)", about: "4 cores, Intel Core i7-1185G7", cpu: { x: 51.5, path: "avx512-vnni", threads: 4 } },
  { id: "pi5", name: "Raspberry Pi 5", about: "4 cores, Cortex-A76, 4 GB", cpu: { x: 14.1, path: "neon-dp", threads: 4 } },
  { id: "pi3", name: "Raspberry Pi 3B+", about: "4 cores, Cortex-A53, 1 GB", cpu: { x: 1.19, path: "neon", threads: 4, seconds: 9003 } },
];

export const best = (m: Machine) => Math.max(m.accel?.x ?? 0, m.cpu?.x ?? 0);
export const byBest = () => [...MACHINES].sort((a, b) => best(b) - best(a));
export const machine = (id: string) => MACHINES.find((m) => m.id === id)!;

/** The whole book's time at x: 0:12, 12:41, 2:32:16. */
export function clock(x: number, seconds?: number) {
  const s = Math.round(seconds ?? BOOK_SECONDS / x);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), q = s % 60;
  const two = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${two(m)}:${two(q)}` : `${m}:${two(q)}`;
}

/** The same in words, for the home page: 23 s, 1 min 24 s. */
export function spoken(x: number) {
  const s = Math.round(BOOK_SECONDS / x);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), q = s % 60;
  return [h && `${h} h`, m && `${m} min`, (q || !(h || m)) && `${q} s`].filter(Boolean).join(" ");
}

const fmt = (x: number) => (x >= 10 ? x.toFixed(1) : String(x));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

// 1× to 1,000× across the track, on a log scale
const pos = (x: number) => ((Math.log10(x) / 3) * 100).toFixed(2);

/** The chart: a row a machine, fastest first, a dot for its CPU and a
 *  square for its Neural Engine or NPU, each figure also written out. */
export function chartHtml() {
  const ticks = [1, 10, 100, 1000];
  const grid =
    ticks.map((t) => `<i class="ab-grid" style="left:${pos(t)}%"></i>`).join("") +
    [2, 5, 20, 50, 200, 500].map((t) => `<i class="ab-grid ab-minor" style="left:${pos(t)}%"></i>`).join("");
  const rows = byBest().map((m) => {
    const marks: string[] = [];
    const tip = (what: string, r: Run) => `${m.name}, ${m.about}: ${what} ${fmt(r.x)}× real time`;
    if (m.cpu && m.accel) {
      const a = pos(m.cpu.x), b = pos(m.accel.x);
      marks.push(`<i class="ab-seg" style="left:${a}%;width:${(+b - +a).toFixed(2)}%"></i>`);
    }
    if (m.cpu) marks.push(`<i class="ab-mk ab-cpu" style="left:${pos(m.cpu.x)}%" title="${esc(tip(`CPU (${m.cpu.path}, ${m.cpu.threads} threads)`, m.cpu))}"></i>`);
    if (m.accel) marks.push(`<i class="ab-mk ab-accel" style="left:${pos(m.accel.x)}%" title="${esc(tip(m.accel.kind, m.accel))}"></i>`);
    const top = m.accel ?? m.cpu!;
    // a third line only where there's something to note: the accelerator,
    // with the CPU beside it, or an earlier release
    const said = [m.accel?.kind, m.accel && m.cpu && `CPU ${fmt(m.cpu.x)}×`, m.version && `pktito ${m.version}`].filter(Boolean).join(" · ");
    return `<div class="ab-row"><div class="ab-name"><b>${esc(m.name)}</b><span>${esc(m.about)}</span>${said ? `<span>${said}</span>` : ""}</div><div class="ab-track" aria-hidden="true">${grid}${marks.join("")}</div><div class="ab-val"><b>${fmt(top.x)}×</b></div></div>`;
  });
  const axis = `<div class="ab-row ab-axis" aria-hidden="true"><span></span><div class="ab-scale">${ticks
    .map((t, i) => `<span class="${i === 0 ? "first" : i === ticks.length - 1 ? "last" : ""}" style="left:${pos(t)}%">${t.toLocaleString("en-US")}×</span>`)
    .join("")}</div><span></span></div>`;
  const legend = `<div class="ab-legend" aria-hidden="true"><span><i class="ab-k ab-cpu"></i>CPU</span><span><i class="ab-k ab-accel"></i>Neural Engine or NPU</span><span>× real time, log scale</span></div>`;
  return `<figure class="ab" aria-label="AliceBench results by machine, fastest first">${legend}${axis}${rows.join("")}</figure>`;
}

/** The same results as a Markdown table, for the page's .md and llms-full.txt. */
export function tableMarkdown() {
  const out = ["| Machine | × real time | Whole book | Backend | Threads |", "| --- | ---: | ---: | --- | ---: |"];
  for (const m of byBest()) {
    const label = `${m.name} (${m.about})${m.version ? `, pktito ${m.version}` : ""}`;
    const runs: Run[] = [m.accel, m.cpu].filter(Boolean) as Run[];
    runs.forEach((r, i) => out.push(`| ${i ? "" : label} | ${fmt(r.x)} | ${clock(r.x, r.seconds)} | ${r.path} | ${r.threads ?? ""} |`));
  }
  return out.join("\n");
}

export const PLACEHOLDER = '<div data-alicebench></div>';
/** A page's Markdown with the chart's place given the table. */
export const withTable = (body: string) => body.replace(PLACEHOLDER, tableMarkdown());
