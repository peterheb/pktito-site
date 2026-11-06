---
title: pktito-server
description: OpenAI's speech-to-text API on your own server, running pktito on the CPU.
order: 3.5
---

pktito-server answers OpenAI's `POST /v1/audio/transcriptions` with [libpktito](/developers/library), on the CPU. It uses only the cores you give it, so it can share a machine with an LLM. Source: [github.com/peterheb/pktito-server](https://github.com/peterheb/pktito-server).

## Why run it

pktito-server gives a local inference server a speech-to-text endpoint, on CPU cores the LLM leaves idle. It's small: under 1 GB in all at `-t 4`, the 600 MB model included. On one of three DGX Sparks serving GLM-5.3-Flash together, a busy server at `-t 4`, transcribing at 66–70× real time, slowed the LLM's token generation by 1.4% at most. Idle, it costs nothing.

## Run it in Docker

The easiest way. The image is for x86-64 and Arm64 Linux. Put a model from [Models](/docs/models) in `models/`, then:

```sh
(umask 077; echo "PKTITO_API_KEY=$(openssl rand -hex 24)" > pktito.env)
docker run -d --name pktito-server --restart unless-stopped --init \
  --memory 3g --memory-swap 3g --read-only --cap-drop ALL \
  --security-opt no-new-privileges --env-file pktito.env \
  -p 127.0.0.1:8000:8000 -v "$PWD/models:/models:ro" \
  ghcr.io/peterheb/pktito-server:0.9.6 -m /models/parakeet-tdt-0.6b-v2.pkf -t 8 \
  --max-requests 4 --max-hours 1 --max-upload-mb 128
```

```sh
curl -s -H "Authorization: Bearer $(cut -d= -f2 pktito.env)" \
  -F file=@talk.wav 127.0.0.1:8000/v1/audio/transcriptions
```

It reads WAV and AIFF. For MP3, FLAC, M4A, Ogg and the rest, give it ffmpeg. The image has only the C library, so a distribution's ffmpeg won't run in it; on Linux, this fetches a self-contained build, checks it, and runs the server with it:

```sh
a=linux64; [ "$(uname -m)" = x86_64 ] || a=linuxarm64
b=ffmpeg-n9.0-latest-$a-lgpl-9.0
curl -fLO https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/$b.tar.xz
curl -fLO https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/checksums.sha256
grep " $b.tar.xz\$" checksums.sha256 | sha256sum -c - &&
  mkdir -p ffmpeg && tar xJf $b.tar.xz -C ffmpeg --strip-components 2 $b/bin/ffmpeg &&
  chmod 711 ffmpeg/ffmpeg
docker rm -f pktito-server
docker run -d --name pktito-server --restart unless-stopped --init \
  --memory 3g --memory-swap 3g --read-only --cap-drop ALL \
  --security-opt no-new-privileges --env-file pktito.env \
  -p 127.0.0.1:8000:8000 -v "$PWD/models:/models:ro" \
  -v "$PWD/ffmpeg:/opt/ffmpeg:ro" \
  ghcr.io/peterheb/pktito-server:0.9.6 -m /models/parakeet-tdt-0.6b-v2.pkf -t 8 \
  --max-requests 4 --max-hours 1 --max-upload-mb 128 --ffmpeg /opt/ffmpeg/ffmpeg
```

Updating ffmpeg is up to you. [DOCKER.md](https://github.com/peterheb/pktito-server/blob/main/DOCKER.md) says why the `chmod`, and how to update it.

## Or build it

On Linux or macOS, beside libpktito 0.9.6:

```sh
cd libpktito && make libpktito.a
cd ../pktito-server && cargo build --release
```

## Options

| Option               |                                                     |
| -------------------- | --------------------------------------------------- |
| `-m FILE.pkf`        | A model to serve; repeat for more.                  |
| `-t N`               | Threads in all (default: one per core).             |
| `-w N`               | Workers (default: one per 4 threads).               |
| `-l ADDR`            | Listen address (default `127.0.0.1:8000`).          |
| `--api-key KEY`      | Require a bearer key, or set `PKTITO_API_KEY`.      |
| `--max-upload-mb MB` | Largest upload (256).                               |
| `--max-hours H`      | Longest recording (4).                              |
| `--max-requests N`   | Requests at once (16); more get a 503.              |
| `--ffmpeg PATH`      | ffmpeg for formats other than WAV and AIFF.         |

Memory: about 600 MB for the model, plus roughly `--max-requests` × (`--max-upload-mb` + 230 MB × `--max-hours`). About 2 GB in all with the limits above.

## The API

OpenAI's clients work unchanged:

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="KEY")
with open("talk.wav", "rb") as f:
    print(client.audio.transcriptions.create(model="parakeet-tdt-0.6b-v2", file=f).text)
```

Formats: `json`, `text`, `srt`, `vtt`, `verbose_json`, and `pktito_json`. `stream=true` sends server-sent events. `/health`, `/metrics` (Prometheus) and `/v1/models` are there too. [The README](https://github.com/peterheb/pktito-server#readme) has the rest.
