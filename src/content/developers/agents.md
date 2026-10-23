---
title: For AI agents
description: How an AI agent can transcribe audio and video with pktito-cli, without a window or questions.
order: 2
---

An agent that needs a recording's text can run `pktito-cli`: it asks nothing, prints the transcript or JSON on standard output, keeps progress off pipes, and says what went wrong in its exit code and on standard error. Everything runs on the computer; only the model download reaches the internet. [pktito.net/llms.txt](https://pktito.net/llms.txt) summarizes this page for agents.

## Install

There is no standalone download of `pktito-cli` yet: it comes with the app's installers. These addresses always give the latest release:

| System  | Installer                                                                                       | `pktito-cli` after installing                        |
| ------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| macOS   | `https://pktito.net/download/macos`                                                             | `/Applications/pktito.app/Contents/MacOS/pktito-cli` |
| Windows | `https://pktito.net/download/windows` (x64), `https://pktito.net/download/windows-arm64`        | On the PATH, in terminals opened after the install   |
| Linux   | `https://pktito.net/download/linux-deb` (x86-64), `https://pktito.net/download/linux-deb-arm64` | `/usr/bin/pktito-cli`                                |

On Linux, `pktito-cli` reads every file through ffmpeg, so it needs ffmpeg installed to read anything. Installing the .deb with apt brings it in:

```sh
sudo apt install ./pktito_*.deb
```

On macOS, the person can put `pktito-cli` on the PATH with **Install Command Line Tool…** in the pktito menu; otherwise use the full path above.

## Get a model

```sh
pktito-cli download parakeet-tdt-0.6b-v2
```

This runs without questions. It downloads 624 MB once, checks it, prints the model file's path on standard output and exits 0; if the model is already there it prints the path at once. While the network is away it keeps trying, so put your own time limit on it. Use `parakeet-tdt-0.6b-v3` (648 MB) for the 25 European languages it covers: see [Models](/docs/models).

`pktito-cli models` shows which models are downloaded and which one is in use.

## Transcribe

```sh
pktito-cli -q --json talk.mp4
```

`-q` turns progress off. Progress only goes to a terminal anyway, so a captured standard error holds only errors. `-m english` or `-m multilingual` picks the model; without it, the one the app uses.

For plain text, one sentence a line, leave out `--json`. For several files, name them all in one command: each transcript is then written beside its file, or into the folder given with `-o`, and each file's path is printed on standard error unless `-q`.

## Read the result

With `--json`, standard output is one JSON object:

- `file`: the file's name.
- `duration`: its length in seconds.
- `model`: the model's name.
- `segments`: the sentences, each with `start`, `end`, `text`, and `words` (each with `start`, `end`, `text`).
- `captions`: subtitle cues, each with `start`, `end` and `lines`.

The full text is the segments' `text`, joined with spaces or newlines. Times are seconds. [pktito-cli](/developers/cli#json-output) has every field.

## Exit codes

| Code | Meaning                                                                                |
| ---- | -------------------------------------------------------------------------------------- |
| 0    | Done.                                                                                  |
| 1    | Something failed; standard error says what, as `pktito-cli: talk.mp4: File not found`. |
| 2    | No arguments were given.                                                               |

With several files, a failure on one doesn't stop the others; the exit code is then 1. The messages are the app's: [Troubleshooting](/docs/troubleshooting) says what each means. Two to expect:

- `no model yet: choose one in the app, or pktito-cli download parakeet-tdt-0.6b-v2`: run that download.
- `Install ffmpeg to read audio and video here`: on Linux, install ffmpeg.

## Formats

`pktito-cli` reads what the app reads: MP3, MP4, M4A, MOV, WAV, FLAC and more, depending on the system. [Formats](/docs/formats) has the table. It reads files, not standard input.
