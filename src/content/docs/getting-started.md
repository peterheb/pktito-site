---
title: Getting started
description: Install pktito, choose a speech model, and transcribe your first recording.
order: 1
---

## Install

Download pktito for your system from the [download page](/download).

| System  | Needs                                                                              | Installer                                                  |
| ------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| macOS   | macOS 12 or later, Apple silicon                                                   | A disk image: drag pktito to Applications.                 |
| Windows | Windows 10 or 11, x64 or Arm64                                                     | A setup program, which also puts `pktito-cli` on the PATH. |
| Linux   | glibc 2.34 or later (Ubuntu 22.04, Debian 12, Raspberry Pi OS 12), x86-64 or Arm64 | A .deb, with ffmpeg as a dependency.                       |

Windows N editions need the Media Feature Pack, or ffmpeg, to read audio and video other than WAV and AIFF.

## Choose a model

On first launch pktito offers two speech models, with the one for your system's language already chosen:

- **English**: parakeet-tdt-0.6b-v2, 624 MB.
- **Multilingual**: parakeet-tdt-0.6b-v3, 25 European languages, 648 MB.

The download can be paused, and resumes where it stopped. To skip it, choose **I already have a model file…**. [Models](/docs/models) has both files.

## Transcribe

Drop audio or video files on the window, or click **Choose files…**. The text appears as the recording is transcribed. Several files dropped together are transcribed in turn, as a batch.

Finished transcripts stay on the start screen's **Recent** list.

## Read along

Press Space to play, or click a sentence's time to play from there. The word being spoken is underlined as the transcript follows along.

- **Speed**: < and > change it, from 0.75× to 2×.
- **Find**: Ctrl+F (⌘F on a Mac).
- **Times**: click the time beside the play button to switch between seconds and frames.

[Saving](/docs/saving) covers the formats a transcript can be saved in.
