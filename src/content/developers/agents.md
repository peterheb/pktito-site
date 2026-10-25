---
title: For AI agents
description: How an AI agent can transcribe audio and video with pktito-cli, without a window or questions.
order: 2
---

`pktito-cli` asks no questions, writes the transcript or JSON to standard output, and reports failures in its exit code and on standard error. Everything runs locally; only the model download reaches the internet. [pktito.net/llms.txt](https://pktito.net/llms.txt) summarizes this page.

## Install

`pktito-cli` comes with the app's installers, and on its own. These addresses always give the latest release:

| System  | Installer                                                                                       | `pktito-cli`                                         |
| ------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| macOS   | `https://pktito.net/download/macos`                                                             | `/Applications/pktito.app/Contents/MacOS/pktito-cli` |
| Windows | `https://pktito.net/download/windows` (x64), `https://pktito.net/download/windows-arm64`        | On the PATH, in a new terminal                       |
| Linux   | `https://pktito.net/download/linux-deb` (x86-64), `https://pktito.net/download/linux-deb-arm64` | `/usr/bin/pktito-cli`                                |

For a server or a sandbox, `pktito-cli` alone, with nothing installed:

| System               | `pktito-cli` alone                            |
| -------------------- | --------------------------------------------- |
| macOS, Apple silicon | `https://pktito.net/download/cli-macos`       |
| Linux x86-64         | `https://pktito.net/download/cli-linux`       |
| Linux Arm64          | `https://pktito.net/download/cli-linux-arm64` |

```sh
curl -fL -o pktito-cli https://pktito.net/download/cli-linux && chmod +x pktito-cli
```

On Linux it needs glibc 2.34 or later and nothing more. The release's checksums are at `https://pktito.net/download/sha256sums`.

`pktito-cli` reads WAV and AIFF itself on every system, so a sandbox or server that only transcribes WAV needs nothing else. For other formats on Linux, install ffmpeg, or install the .deb with apt (`sudo apt install ./pktito_*.deb`), which brings it.

## Transcribe

```sh
pktito-cli download parakeet-tdt-0.6b-v2    # once: 624 MB, prints the model's path
pktito-cli -q --json talk.mp4               # the transcript, as JSON on stdout
```

`download` goes through the sandbox's `HTTPS_PROXY` or `ALL_PROXY`, and gives up after 5 failed tries in a row, exiting 1; run it again to go on from where it stopped. Use `parakeet-tdt-0.6b-v3` (648 MB) for the 25 European languages. Without `--json`, the output is plain text, one sentence a line.

The JSON's `segments` hold the sentences, each with `start`, `end`, `text` and its `words`; times are in seconds. [pktito-cli](/developers/cli#json-output) has every field and the exit codes.

## Failures to expect

- `no model yet: … pktito-cli download parakeet-tdt-0.6b-v2`: run that download.
- `5 tries in a row failed`: the download can't reach models.pktito.net. Check the proxy variables, then run it again.
- `Install ffmpeg to read audio and video here`: on Linux, install ffmpeg, or convert the file to WAV.

Other messages are explained in [Troubleshooting](/docs/troubleshooting).
