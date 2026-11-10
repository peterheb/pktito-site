// The releases, newest first, for the download page: each one's version, the
// day it was posted, and what changed for someone using it. The first is the
// release /download/<key> serves, so it must be the version latest.json names
// (the R2 bucket pktito-releases); a release adds its entry here when it is
// posted. pktito-app's history has every change.

export type Release = { version: string; date: string; notes: string[] };

export const RELEASES: Release[] = [
  {
    version: "0.9.7",
    date: "November 10, 2026",
    notes: [
      "Mac on macOS 12 to 14: no longer quits when it transcribes; it runs on the CPU.",
      "Faster on Snapdragon PCs and phones and on the Raspberry Pi 5.",
      "Faster on Intel and AMD processors with AVX-512 or AVX-VNNI.",
      "Manage models: Update gets a newer build of a model.",
    ],
  },
  {
    version: "0.9.6",
    date: "November 5, 2026",
    notes: [
      "Windows on Snapdragon X Elite: runs on the NPU, a third faster and the CPU left free.",
      "Mac: the Neural Engine is about 20% faster.",
      "Arm with SVE (DGX Spark, RTX Spark): about 14% faster.",
      "Each line is a sentence; long ones break at a comma or pause.",
      "Find matches the start of a word.",
    ],
  },
  {
    version: "0.9.5",
    date: "November 2, 2026",
    notes: [
      "Mac: runs on the Neural Engine, two to four times as fast as the CPU.",
      "Long recordings: sentences carry across cuts.",
      "Faster on 8 or more threads.",
      "Manage models: see and delete downloaded models.",
    ],
  },
  {
    version: "0.9.4",
    date: "October 30, 2026",
    notes: ["Faster on Arm, including the Raspberry Pi.", "Intel Xeon: uses AMX."],
  },
  {
    version: "0.9.3",
    date: "October 27, 2026",
    notes: ["Recovers speech the model skipped.", "Find follows playback.", "Linux: recordings play."],
  },
];

export const CURRENT = RELEASES[0];
