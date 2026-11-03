---
title: AliceBench
description: AliceBench v1, one number for how fast a computer transcribes with pktito, and how to run it.
order: 4
---

## What it is

AliceBench v1 times pktito transcribing LibriVox's public-domain recording of _Alice's Adventures in Wonderland_: twelve chapters, 2:58:51 in all, with the English model (parakeet-tdt-0.6b-v2). The result is the audio's length over the time it took, as times real time.

## Results

| Machine                                                                      | × real time | Whole book | Backend       | Threads |
| ---------------------------------------------------------------------------- | ----------: | ---------: | ------------- | ------: |
| Mac Studio<br><small>36 cores, Apple M5 Ultra</small>                        |       750.0 |       0:14 | Neural Engine |         |
|                                                                              |       434.3 |       0:25 | neon-dp       |      36 |
| Mac mini<br><small>12 cores, Apple M4 Pro</small>                            |       386.0 |       0:28 | Neural Engine |         |
|                                                                              |       126.9 |       1:25 | neon-dp       |      12 |
| Windows Workstation<br><small>16 cores, AMD Ryzen 9 9950X</small>            |       361.5 |       0:30 | avx512-vnni   |      16 |
| Mac mini<br><small>10 cores, Apple M4</small>                                |       356.6 |       0:30 | Neural Engine |         |
|                                                                              |        94.2 |       1:54 | neon-dp       |      10 |
| NVIDIA DGX Spark<br><small>20 cores, NVIDIA GB10</small>                     |       191.2 |       0:56 | neon-dp       |      20 |
| EC2 c8a.xlarge<br><small>4 cores, AMD EPYC 9R45 (Zen 5)</small>              |       128.7 |       1:23 | avx512-vnni   |       4 |
| ThinkPad P14s Gen 5 (2024)<br><small>8 cores, AMD Ryzen 7 PRO 8840HS</small> |       110.9 |       1:37 | avx512-vnni   |       8 |
| Vivobook S 15 (2024)<br><small>12 cores, Snapdragon X Elite</small>          |       103.3 |       1:44 | neon-dp       |      12 |
| Windows Laptop (2021)<br><small>4 cores, Intel Core i7-1185G7</small>        |        48.9 |       3:40 | avx512-vnni   |       4 |
| Raspberry Pi 5<br><small>4 cores, Cortex-A76, 4 GB</small>                   |        14.1 |      12:41 | neon-dp       |       4 |
| Raspberry Pi 3B+<br><small>4 cores, Cortex-A53, 1 GB</small>                 |        1.18 |    2:32:16 | neon          |       4 |

Run November 2, 2026, with pktito 0.9.5. Every run on a CPU gave the reference transcripts of all 12 chapters; each Mac's Neural Engine is 16 words from them, of 27,137. The M4 Pro Mac mini was in use at the time. The Windows laptop is a Surface Pro 8, plugged in, in the Balanced power mode; the ThinkPad, a mobile workstation, and the Vivobook were plugged in, in the Best performance mode. The DGX Spark runs Ubuntu. The Pi 3B+ reached its temperature limit by the end.

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

Every correct build of pktito running on a CPU writes the same transcript of the same audio, byte for byte, on any machine. So the script also compares each chapter's transcript with the reference: identical, or by its word error rate and the characters that differ. On a CPU, that last line means this build computes the right answer, so its speed counts. The Neural Engine computes in its own way, so on a Mac the line gives how far its transcripts land from the reference: 16 words of 27,137.
