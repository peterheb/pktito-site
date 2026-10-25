---
title: Getting started
description: Install pktito, choose a speech model, and transcribe your first recording.
order: 1
---

## Install

Download pktito for your system from the [download page](/download).

| System  | Needs                                                                   | Installer                                          |
| ------- | ----------------------------------------------------------------------- | -------------------------------------------------- |
| macOS   | macOS 12 or later, Apple silicon                                        | A disk image: drag pktito to Applications.         |
| Windows | Windows 10 or 11, x64 or Arm64                                          | Installer (.exe) or Microsoft Store (coming soon). |
| Linux   | glibc 2.34 or later, x86-64 or Arm64.<br/>(Ubuntu 22+, Debian 12+, derivatives) | A .deb file.                               |

## Requirements

pktito uses your operating system's built-in media support to read common formats like MP3 and MP4 files. For other media files, it uses ffmpeg automatically when it's installed; on Linux, the .deb installs it. Windows N editions need the Media Feature Pack, or ffmpeg, for anything but WAV and AIFF. [Formats](/docs/formats) has the details.

## Choose a model

pktito supports two NVIDIA speech models:

- **English** (parakeet-tdt-0.6b-v2)
- **Multilingual** (parakeet-tdt-0.6b-v3): 25 European languages

On first launch, download the best model for your task from within the app; the one for your system's language is already chosen. If you've downloaded a model before, choose **I already have a model file…** to open it. pktito uses its own `.pkf` file format for speech models; [Models](/docs/models) lists them.

## Transcribe and listen

Drop audio or video files on the window, or click **Choose files…**. The transcript appears as it's made, and several files dropped together are transcribed in turn. Finished transcripts are kept on the start screen under **Recent**.

Press Space to play the recording, or click a sentence's time to play from there. The word being spoken is underlined as it plays.

- **Speed**: < and > change it, from 0.75× to 2×.
- **Volume**: click the speaker to mute; the slider beside it sets the level.
- **Find**: Ctrl+F (⌘F on a Mac).
- **Times**: click the time under the waveform to switch between seconds and frames.

[Saving](/docs/saving) covers the formats a transcript can be saved in.
