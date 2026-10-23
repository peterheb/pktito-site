---
title: Formats
description: The audio and video files pktito reads on macOS, Windows and Linux, and with ffmpeg.
order: 2
---

## How pktito reads a file

pktito reads files with the system's own media library: AVFoundation on macOS, Media Foundation on Windows. Linux uses ffmpeg, which the .deb installs. On macOS and Windows, ffmpeg (when it's installed) reads what the system can't.

## The formats

Tested on macOS 27, Windows 11 and Ubuntu 26.04, October 2026.

| File                                                                      | macOS | Windows | ffmpeg |
| ------------------------------------------------------------------------- | :---: | :-----: | :----: |
| MP4, MOV, M4A, 3GP: AAC, HE-AAC v1 and v2, ALAC, PCM; H.264, HEVC, ProRes |   ✓   |    ✓    |   ✓    |
| MP3, constant and variable rate                                           |   ✓   |    ✓    |   ✓    |
| WAV: 16 and 24-bit, float, µ-law, IMA ADPCM                               |   ✓   |    ✓    |   ✓    |
| FLAC, 16-bit 44.1 kHz and 24-bit 96 kHz                                   |   ✓   |    ✓    |   ✓    |
| MPEG-TS (H.264, AAC), MPEG-PS (MPEG-2, MP2)                               |   ✓   |    ✓    |   ✓    |
| AVI: MJPEG with PCM                                                       |   ✓   |    ✓    |   ✓    |
| AC-3 5.1, alone or in M2TS                                                |   ✓   |    –    |   ✓    |
| AIFF; CAF with ALAC                                                       |   ✓   |    –    |   ✓    |
| Ogg Opus and Vorbis, .opus voice messages                                 |   ✓   |    –    |   ✓    |
| WebM: Opus or Vorbis, with VP8, VP9 or AV1                                |   –   |    ✓    |   ✓    |
| Matroska with AAC                                                         |   –   |    ✓    |   ✓    |
| Matroska with AC-3, E-AC-3 or DTS 5.1                                     |   –   |    –    |   ✓    |
| WMA, WMV                                                                  |   –   |    ✓    |   ✓    |
| AVI: MPEG-4 with MP3                                                      |   –   |    ✓    |   ✓    |
| FLV; Ogg Theora                                                           |   –   |    –    |   ✓    |

A file with several audio tracks gives its first.

## The same transcript everywhere

A lossless file (WAV, FLAC, ALAC) gives the same transcript on every system. A lossy one can differ by a word or two, since each system decodes it slightly differently.

## Choosing the reader

`PKTITO_DECODER` overrides the choice, for the app and `pktito-cli`:

- `PKTITO_DECODER=ffmpeg` reads everything through ffmpeg.
- `PKTITO_DECODER=os` uses the system alone, never ffmpeg.
