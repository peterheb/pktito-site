---
title: For AI agents
description: How an AI agent can transcribe audio and video with pktito-cli, without a window or questions.
order: 2
---

`pktito-cli` asks no questions, writes the transcript or JSON to standard output, and reports failures in its exit code and on standard error. Everything runs locally; only the model download reaches the internet. [pktito.net/llms.txt](https://pktito.net/llms.txt) summarizes this page.

## Install

`pktito-cli` comes with the app's installers. These addresses always give the latest release:

| System  | Installer                                                                                       | `pktito-cli`                                         |
| ------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| macOS   | `https://pktito.net/download/macos`                                                             | `/Applications/pktito.app/Contents/MacOS/pktito-cli` |
| Windows | `https://pktito.net/download/windows` (x64), `https://pktito.net/download/windows-arm64`        | On the PATH, in a new terminal                       |
| Linux   | `https://pktito.net/download/linux-deb` (x86-64), `https://pktito.net/download/linux-deb-arm64` | `/usr/bin/pktito-cli`                                |

`pktito-cli` reads WAV and AIFF itself on every system, so a sandbox or server that only transcribes WAV needs nothing else. On Linux, install the .deb with apt (`sudo apt install ./pktito_*.deb`) so that ffmpeg, which reads every other format there, comes with it.

## Transcribe

```sh
pktito-cli download parakeet-tdt-0.6b-v2    # once: 624 MB, prints the model's path
pktito-cli -q --json talk.mp4               # the transcript, as JSON on stdout
```

`download` retries while the network is away, so give it a time limit. Use `parakeet-tdt-0.6b-v3` (648 MB) for the 25 European languages. Without `--json`, the output is plain text, one sentence a line.

The JSON's `segments` hold the sentences, each with `start`, `end`, `text` and its `words`; times are in seconds. [pktito-cli](/developers/cli#json-output) has every field and the exit codes.

## Failures to expect

- `no model yet: … pktito-cli download parakeet-tdt-0.6b-v2`: run that download.
- `Install ffmpeg to read audio and video here`: on Linux, install ffmpeg, or convert the file to WAV.

Other messages are explained in [Troubleshooting](/docs/troubleshooting).
