---
title: AliceBench
description: AliceBench v1, one number for how fast a computer transcribes with pktito, and how to run it.
order: 4
---

## What it is

AliceBench v1 times pktito transcribing LibriVox's public-domain recording of _Alice's Adventures in Wonderland_: twelve chapters, 2:58:51 in all, with the English model (parakeet-tdt-0.6b-v2). The result is the audio's length over the time it took, as times real time.

## Results

| Machine                                                                      | × real time | Whole book | pktito | Backend     | Threads |
| ---------------------------------------------------------------------------- | ----------: | ---------: | ------ | ----------- | ------: |
| Windows Workstation<br><small>16 cores, AMD Ryzen 9 9950X</small>            |       238.8 |       0:45 | 0.9.1  | avx512-vnni |      16 |
| EC2 c8a.xlarge<br><small>4 cores, AMD EPYC 9R45 (Zen 5)</small>              |       125.9 |       1:25 | 0.9.1  | avx512-vnni |       4 |
| Mac mini<br><small>12 cores, Apple M4 Pro</small>                            |       123.0 |       1:27 | 0.9.1  | neon-dp     |      12 |
| Vivobook S 15 (2024)<br><small>12 cores, Snapdragon X Elite</small>          |        63.3 |       2:50 | 0.9.3  | neon-dp     |      12 |
| ThinkPad P14s Gen 5 (2024)<br><small>8 cores, AMD Ryzen 7 PRO 8840HS</small> |        58.6 |       3:03 | 0.9.1  | avx512-vnni |       8 |
| Windows Laptop (2021)<br><small>4 cores, Intel Core i7-1185G7</small>        |        37.0 |       4:50 | 0.9.1  | avx512-vnni |       4 |
| Raspberry Pi 5<br><small>4 cores, Cortex-A76, 4 GB</small>                   |        14.5 |      12:19 | 0.9.1  | neon-dp     |       4 |

Run October 24, 2026, and the Vivobook October 27 with 0.9.3; every run matched all 12 reference transcripts. The Mac mini was in use at the time. The Windows laptop is a Surface Pro 8, plugged in, in the Balanced power mode; the ThinkPad, a mobile workstation, and the Vivobook were plugged in, in the Best performance mode. The Vivobook runs its first chapter at about 110 times real time, then settles near 60 as it warms.

## Run it

On macOS or Linux, from a clone of [pktito](https://github.com/peterheb/pktito):

```sh
scripts/alicebench.sh [DIR]
```

On Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\alicebench.ps1 [DIR]
```

It downloads the chapters (200 MB) and the English model the first time, then prints each chapter's speed and the total.

- **DIR** defaults to `~/.cache/alicebench-v1`, or `%LOCALAPPDATA%\alicebench-v1` on Windows.
- **`PKTITO_CLI`** names the `pktito-cli` to time; otherwise the one on the PATH, or the Mac app's.

The full results are saved in DIR as `result.json`.

## Why FLAC

The chapters are 16 kHz mono FLAC, made from LibriVox's MP3s, because each system decodes an MP3 slightly differently: macOS's and ffmpeg's versions of chapter 11 differ in 5 of its 1,937 words. A FLAC decodes the same everywhere, so every computer transcribes the same audio.

## “All 12 transcripts are the reference's”

Every correct build of pktito writes the same transcript of the same audio, byte for byte, on any machine. So the script also checks each chapter's transcript against the reference. That last line means this build computes the right answer, so its speed counts; a mismatch makes the script exit 1.
