---
title: For AI agents
description: How an AI agent can transcribe audio and video with pktito-cli, without a window or questions.
order: 2
---

Paste this into an AI agent to have it set up and use `pktito-cli`:

```text
Set up pktito-cli, an offline speech-to-text tool, and use it to
transcribe audio and video files. Its instructions for agents are
at https://pktito.net/llms.txt. On macOS or Linux, download
pktito-cli alone from https://pktito.net/download/cli-macos,
cli-linux (x86-64) or cli-linux-arm64, check it against
https://pktito.net/download/sha256sums, and chmod +x it. On
Windows, install https://pktito.net/download/windows
(windows-arm64 on Arm), which puts pktito-cli on the PATH. Then
run `pktito-cli download parakeet-tdt-0.6b-v2` once (624 MB; use
parakeet-tdt-0.6b-v3 for other European languages) and transcribe
with `pktito-cli -q --json FILE`, reading the JSON from stdout.
```

## Install

Agents can install the GUI app that includes `pktito-cli` from the following links:

| System        | Installer                                     | CLI path                                                                  |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| macOS         | `https://pktito.net/download/macos`           | <code class="wrap">/Applications/pktito.app/Contents/MacOS/pktito-cli</code> |
| Windows x64   | `https://pktito.net/download/windows`         | On the PATH, in a new terminal                                            |
| Windows Arm64 | `https://pktito.net/download/windows-arm64`   | On the PATH, in a new terminal                                            |
| Linux x86-64  | `https://pktito.net/download/linux-deb`       | `/usr/bin/pktito-cli`                                                     |
| Linux Arm64   | `https://pktito.net/download/linux-deb-arm64` | `/usr/bin/pktito-cli`                                                     |

For a server or a sandbox, `pktito-cli` can be installed without the GUI app:

| System               | `pktito-cli` alone                            |
| -------------------- | --------------------------------------------- |
| macOS, Apple silicon | `https://pktito.net/download/cli-macos`       |
| Linux x86-64         | `https://pktito.net/download/cli-linux`       |
| Linux Arm64          | `https://pktito.net/download/cli-linux-arm64` |

```sh
curl -fL -o pktito-cli https://pktito.net/download/cli-linux
chmod +x pktito-cli
```

On Linux it needs glibc 2.34 or later and nothing more. The release's checksums are at `https://pktito.net/download/sha256sums`.

`pktito-cli` reads WAV and AIFF itself on every system, so a sandbox or server that only transcribes WAV needs nothing else. For other formats on Linux, install ffmpeg, or install the .deb with apt (`sudo apt install ./pktito_*.deb`), which brings it.

## Reading further

An agent can read the rest of pktito's documentation as plain text:

- [llms.txt](https://pktito.net/llms.txt): a summary, with a link to each page.
- [llms-full.txt](https://pktito.net/llms-full.txt): every page, in one file.
- Any Docs or Developers page as Markdown, at its address plus `.md`, such as [pktito.net/developers/cli.md](https://pktito.net/developers/cli.md).
