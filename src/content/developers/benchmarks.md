---
title: AliceBench
description: AliceBench v1, one number for how fast a computer transcribes with pktito, and how to run it.
order: 4
---

## What it is

AliceBench v1 times pktito transcribing LibriVox's public-domain recording of _Alice's Adventures in Wonderland_: twelve chapters, 2:58:51 in all, with the English model (parakeet-tdt-0.6b-v2). The result is the audio's length over the time it took, as times real time.

## Results

<div data-alicebench></div>

pktito 0.9.6, November 2026. CPU runs match the reference transcripts exactly; the Neural Engine and NPUs are 16–19 words off in 27,137. NPU and iPhone figures come from the app.

## Run it

On macOS or Linux, from a clone of [pktito](https://github.com/peterheb/pktito):

```sh
scripts/alicebench.sh [DIR]
```

On Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\alicebench.ps1 [DIR]
```

It downloads the chapters (200 MB) and the English model the first time, then prints each chapter's speed and the total. On a Mac with Apple silicon it times the Neural Engine.

- **DIR** defaults to `~/.cache/alicebench-v1`, or `%LOCALAPPDATA%\alicebench-v1` on Windows.
- **`PKTITO_CLI`** names the `pktito-cli` to time; otherwise the one on the PATH, or the Mac app's.

The full results are saved in DIR as `result.json`.

## Why FLAC

The chapters are 16 kHz mono FLAC, made from LibriVox's MP3s, because each system decodes an MP3 slightly differently: macOS's and ffmpeg's versions of chapter 11 differ in 5 of its 1,937 words. A FLAC decodes the same everywhere, so every computer transcribes the same audio.

## “All 12 transcripts identical to the reference”

Every correct build of pktito running on a CPU writes the same transcript of the same audio, byte for byte, on any machine. So the script also compares each chapter's transcript with the reference: identical, or by its word error rate and the characters that differ. On a CPU, that last line means this build computes the right answer, so its speed counts. The Neural Engine and an NPU compute in their own way, so there the line gives how far the transcripts land from the reference: 16 words of 27,137.
