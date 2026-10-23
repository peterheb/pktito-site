---
title: Formats
description: The audio and video files pktito reads on macOS, Windows and Linux, and with ffmpeg.
order: 2
---

## How pktito reads a file

pktito reads audio and video through the media libraries your system already has:

- **macOS**: AVFoundation.
- **Windows**: Media Foundation. The N editions of Windows have it only with the Media Feature Pack.
- **Linux**: ffmpeg, which is required. Install it with your package manager.

On macOS and Windows, a file the system can't read goes to ffmpeg when ffmpeg is installed and on the PATH. With ffmpeg, every file below reads on every system.

## The formats

One minute of speech in each format, transcribed on macOS 27.0.1, Windows 11 and Ubuntu 26.04 with ffmpeg 8.0.1 (ffmpeg 9.0 on the other two), October 21, 2026:

| File                                                                      | macOS |  Windows   |   ffmpeg   |
| ------------------------------------------------------------------------- | :---: | :--------: | :--------: |
| MP4, MOV, M4A, 3GP: AAC, HE-AAC v1 and v2, ALAC, PCM; H.264, HEVC, ProRes |   ✓   |     ✓      |     ✓      |
| MP3, constant and variable rate                                           |   ✓   |     ✓      |     ✓      |
| WAV: 16 and 24-bit, float, µ-law, IMA ADPCM                               |   ✓   |     ✓      |     ✓      |
| FLAC, 16-bit 44.1 kHz and 24-bit 96 kHz                                   |   ✓   |     ✓      |     ✓      |
| MPEG-TS (H.264, AAC), MPEG-PS (MPEG-2, MP2)                               |   ✓   |     ✓      |     ✓      |
| AVI: MJPEG with PCM                                                       |   ✓   |     ✓      |     ✓      |
| AC-3 5.1, alone or in M2TS                                                |   ✓   |     –      |     ✓      |
| AIFF; CAF with ALAC                                                       |   ✓   |     –      |     ✓      |
| Ogg Opus and Vorbis, .opus voice messages                                 |   ✓   |     –      |     ✓      |
| WebM: Opus or Vorbis, with VP8, VP9 or AV1                                |   –   |     ✓      |     ✓      |
| Matroska with AAC                                                         |   –   |     ✓      |     ✓      |
| Matroska with AC-3, E-AC-3 or DTS 5.1                                     |   –   |     –      |     ✓      |
| WMA, WMV                                                                  |   –   |     ✓      |     ✓      |
| AVI: MPEG-4 with MP3                                                      |   –   |     ✓      |     ✓      |
| FLV; Ogg Theora                                                           |   –   |     –      |     ✓      |
| An MP3 named .m4a                                                         |   –   |     ✓      |     ✓      |
| An M4A cut off halfway                                                    |   –   | first half | first half |

A file with several audio tracks gives its first.

## The same transcript everywhere

A lossless file (WAV, FLAC, ALAC) gives the same transcript, byte for byte, on all three systems and on every run. Lossy formats differ only as far as each system decodes them differently: HE-AAC most, by a word or two in a minute.

## Choosing the reader

The `PKTITO_DECODER` environment variable overrides the choice, for the app and `pktito-cli` alike:

- `PKTITO_DECODER=ffmpeg` reads everything through ffmpeg.
- `PKTITO_DECODER=os` uses the system alone, never ffmpeg.
