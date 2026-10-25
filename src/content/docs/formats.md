---
title: Formats
description: The audio and video files pktito opens, and the ones ffmpeg adds.
order: 2
---

## How pktito reads a file

pktito reads WAV and AIFF itself. Other formats go to the system's media support on macOS and Windows, and to ffmpeg on Linux. Where ffmpeg is installed, it opens what the system can't.

## The formats

Tested on macOS 27, Windows 11 and Ubuntu 26.04.

| File                                                                       | macOS | Windows | ffmpeg |
| -------------------------------------------------------------------------- | :---: | :-----: | :----: |
| WAV and AIFF: PCM, float, µ-law, A-law, AIFF-C, RF64 (pktito's own reader) |   ✓   |    ✓    |   ✓    |
| MP4, MOV, M4A, 3GP: AAC, HE-AAC v1 and v2, ALAC, PCM; H.264, HEVC, ProRes  |   ✓   |    ✓    |   ✓    |
| MP3, constant and variable rate                                            |   ✓   |    ✓    |   ✓    |
| WAV: IMA ADPCM                                                             |   ✓   |    ✓    |   ✓    |
| FLAC, 16-bit 44.1 kHz and 24-bit 96 kHz                                    |   ✓   |    ✓    |   ✓    |
| MPEG-TS (H.264, AAC), MPEG-PS (MPEG-2, MP2)                                |   ✓   |    ✓    |   ✓    |
| AVI: MJPEG with PCM                                                        |   ✓   |    ✓    |   ✓    |
| AC-3 5.1, alone or in M2TS                                                 |   ✓   |    –    |   ✓    |
| CAF with ALAC                                                              |   ✓   |    –    |   ✓    |
| Ogg Opus and Vorbis, .opus voice messages                                  |   ✓   |    –    |   ✓    |
| WebM: Opus or Vorbis, with VP8, VP9 or AV1                                 |   –   |    ✓    |   ✓    |
| Matroska with AAC                                                          |   –   |    ✓    |   ✓    |
| Matroska with AC-3, E-AC-3 or DTS 5.1                                      |   –   |    –    |   ✓    |
| WMA, WMV                                                                   |   –   |    ✓    |   ✓    |
| AVI: MPEG-4 with MP3                                                       |   –   |    ✓    |   ✓    |
| FLV; Ogg Theora                                                            |   –   |    –    |   ✓    |

pktito transcribes a file's first audio track.

## Installing ffmpeg

pktito finds ffmpeg on its own once it's installed:

- **macOS**: `brew install ffmpeg`, with [Homebrew](https://brew.sh).
- **Windows**: `winget install Gyan.FFmpeg` in a terminal. Scoop's and Chocolatey's ffmpeg work too.
- **Linux**: the .deb installs it.

Other builds are on [ffmpeg.org](https://ffmpeg.org/download.html).
