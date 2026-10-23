---
title: Getting started
description: Install pktito, choose a speech model, and transcribe your first recording.
order: 1
---

## Install

Download the installer for your system from the [download page](/download).

| System  | Needs                                                                              | Installer                                                                                      |
| ------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| macOS   | macOS 12 or later, Apple silicon                                                   | A disk image: open it and drag pktito to Applications.                                         |
| Windows | Windows 10 or 11, x64 or Arm64                                                     | A setup program. It also puts `pktito-cli` on your PATH.                                       |
| Linux   | glibc 2.34 or later (Ubuntu 22.04, Debian 12, Raspberry Pi OS 12), x86-64 or Arm64 | A .deb. Installing it with apt brings ffmpeg along, which pktito reads files through on Linux. |

The N editions of Windows have no Media Foundation, which pktito uses to read audio and video, until the Media Feature Pack is installed. Installing ffmpeg works too; see [Formats](/docs/formats).

## Choose a model

On its first run pktito asks for a speech model, with the one that speaks your system's language already picked:

- **English**: parakeet-tdt-0.6b-v2, a 624 MB download.
- **Multilingual**: parakeet-tdt-0.6b-v3, 25 European languages, a 648 MB download.

Choose **Download the English model** (or the Multilingual one). The download can be paused and resumed, and one that stops keeps what it has: the next asks only for the rest. After a lost connection pktito tries again by itself. The model is checked before it is used, and it is the one thing pktito downloads; transcription happens on your computer.

Files dropped on the window while the model downloads wait their turn.

To skip the download, choose **I already have a model file…** and pick a `.pkf`. [Models](/docs/models) has both files and how to switch later.

## Transcribe a file

Drop audio or video files on the window, or click **Choose files…** (Ctrl+O; ⌘O on a Mac). Text appears as each part of the recording finishes. **Stop** ends the transcription after the part it is on and keeps the text so far.

Several files dropped together form a batch: each one's progress is a row, and a row opens its transcript.

Each finished transcript stays on the start screen's **Recent** list. The arrow at the top left, or Esc, goes back there.

## Read along

Press Space to play and pause, or click a sentence's time to play from it. The word being spoken is underlined, and the transcript scrolls to keep it in view. Clicking the waveform jumps to that point.

- **Speed**: < and > slow playback down and speed it up, from 0.75× to 2×.
- **Find**: Ctrl+F (⌘F on a Mac) searches the transcript; matches are marked under the waveform.
- **Times**: click the time beside the play button to show seconds or frames.
- **Sentences or Captions**: a finished transcript reads as the model's sentences or as its subtitle track. See [Saving](/docs/saving#sentences-and-captions).

## Save

**Save as** writes the transcript as text, subtitles, Markdown or JSON. [Saving](/docs/saving) covers each format and Save all for a batch.
