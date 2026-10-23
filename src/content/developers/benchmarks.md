---
title: AliceBench
description: AliceBench v1, one number for how fast a computer transcribes with pktito, and how to run it.
order: 4
---

## What it is

AliceBench v1 times pktito transcribing LibriVox's public-domain recording of _Alice's Adventures in Wonderland_: twelve chapters, 2:58:51 in all, with the English model (parakeet-tdt-0.6b-v2). The result is the audio's length over the time it took, as times real time.

## Results

| Machine                 | × real time | Whole book | pktito | Backend   | Threads |
| ----------------------- | ----------: | ---------: | ------ | --------- | ------: |
| AMD Ryzen 9 9950X       |       212.6 |       0:50 | 0.8.5  | avx2-vnni |      16 |
| NVIDIA DGX Spark (GB10) |       113.0 |       1:35 | 0.8.5  | neon-dp   |      20 |
| Mac mini, M4 Pro        |       106.1 |       1:41 | 0.8.4  | neon-dp   |      12 |
| Raspberry Pi 5          |        14.4 |      12:25 | 0.8.5  | neon-dp   |       4 |

All four ran on October 23, 2026, and in each all 12 transcripts were the reference's. The Mac mini was in use, with other apps open.

## Run it

On macOS or Linux, from a clone of [pktito-app](https://github.com/peterheb/pktito-app):

```sh
scripts/alicebench.sh [DIR]
```

On Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\alicebench.ps1 [DIR]
```

The script downloads the chapters into DIR once, 200 MB in all, checking each against its SHA-256; it downloads the English model too if it isn't there. Then it runs `pktito-cli bench --json` on the twelve chapters and prints each one's speed and the total.

- **DIR** defaults to `~/.cache/alicebench-v1`, or `%LOCALAPPDATA%\alicebench-v1` on Windows.
- **`PKTITO_CLI`** names the `pktito-cli` to time. Without it the script uses the one on the PATH, and on a Mac then the app's.

The full results, as JSON, are saved in DIR as `result.json`. The time counts transcription only: reading the files is left out.

## Why FLAC

The chapters are 16 kHz mono FLAC, made from LibriVox's 64 kbps MP3s. Each system's MP3 decoder gives slightly different samples: macOS's and ffmpeg's readings of chapter 11 are 22 ms apart in length, and 5 of its 1,937 words come out differently. A FLAC reads as the same samples on macOS, on Windows and through ffmpeg, so every computer transcribes the same audio.

## “All 12 transcripts are the reference's”

With the same audio, every correct build of pktito writes the same transcript, byte for byte: the bits pktito computes don't depend on the machine or the backend. The script holds each chapter's transcript to the one every machine gives, by its SHA-256. The last line,

```text
  all 12 transcripts are the reference's
```

says this computer's pktito computed what the reference engine does, so its speed is for the right answer. When any transcript differs, the script says how many and exits 1; it also exits 1 when fewer than 12 chapters were timed. With no `pktito-cli` to be found, it stops and says so.
