// The releases, newest first, for the download page: each one's version, the
// day it was posted, and what changed for someone using it. The first is the
// release /download/<key> serves, so it must be the version latest.json names
// (the R2 bucket pktito-releases); a release adds its entry here when it is
// posted. pktito-app's history has every change.

export type Release = { version: string; date: string; notes: string[] };

export const RELEASES: Release[] = [
  {
    version: "0.9.6",
    date: "November 5, 2026",
    notes: [
      "On a Windows PC with a Snapdragon X Elite, pktito runs the speech model on the chip's NPU: about a third faster than on its CPU, which it leaves almost idle. Manage models offers the NPU's edition for a model file you already have.",
      "On a Mac, the Neural Engine edition is about a fifth faster.",
      "Arm processors with SVE, like NVIDIA's DGX Spark and RTX Spark, transcribe about 14% faster on Linux and Windows.",
      "A line of the transcript is a sentence. A sentence over 30 seconds breaks at a comma or a pause, and a line no longer ends after an abbreviation like “Mr.”",
      "Find matches the start of a word.",
      "The licenses and other panels no longer cover the window's own buttons, at any size.",
      "pktito-cli's help is shorter: one phrase an option.",
    ],
  },
  {
    version: "0.9.5",
    date: "November 2, 2026",
    notes: [
      "On a Mac with Apple silicon, pktito runs the speech model on the Neural Engine, two to four times as fast as on the CPU. The app and pktito-cli download its Neural Engine edition there.",
      "Sentences run on across the points where a long recording is cut, and each cut hears the audio past it, so fewer sentences end in the wrong place.",
      "Faster on machines with 8 or more threads, which now transcribe several parts of a recording at once.",
      "Manage models, in the model menu, lists the models downloaded and deletes the ones you no longer need.",
      "Find while paused moves the playhead to the match.",
      "The waveform shows quiet recordings, not a flat line.",
    ],
  },
  {
    version: "0.9.4",
    date: "October 30, 2026",
    notes: [
      "Faster on Arm processors: the Raspberry Pi 3's, and those with dot-product instructions, like the Pi 5's.",
      "Intel Xeon processors with AMX, from Sapphire Rapids on, use it, on Linux and Windows.",
      "On Linux, the desktop places the window, and the player stays quiet rather than fail where GStreamer lacks what it needs.",
    ],
  },
  {
    version: "0.9.3",
    date: "October 27, 2026",
    notes: [
      "Speech the model wrote no words for is transcribed again, which gives back titles, credits and short replies it used to drop.",
      "Find follows playback.",
      "A side column in a wide window, from 920 pixels, that you can drag.",
      "On Linux, recordings play.",
      "Your computer stays awake while pktito transcribes.",
      "On Linux, the app installs a pktito command.",
    ],
  },
];

export const CURRENT = RELEASES[0];
