---
title: pktito-server
description: OpenAI's speech-to-text API on your own server, with pktito's engine on the CPU, for a machine that has other work to do.
order: 3.5
---

pktito-server answers OpenAI's `POST /v1/audio/transcriptions` with NVIDIA's Parakeet models on the CPU, through [libpktito](/developers/library). It is made for a machine that has other work to do, an LLM beside it, say: it takes the cores it is given, and the requests share them. Each answer is the transcript `pktito-cli` gives the same recording.

The easiest way to get it online is Docker: one image for x86-64 and Arm64 Linux, the model mounted from the host, and a key on the API.

## Run it in Docker

Docker pulls the image for the machine's architecture, and libpktito picks its kernels by the CPU when the server starts. Put a model in `models/` ([Models](/docs/models) links both, with their checksums), make a key, and start it:

```sh
docker pull ghcr.io/peterheb/pktito-server:0.9.6
(umask 077; echo "PKTITO_API_KEY=$(openssl rand -hex 24)" > pktito.env)
docker run -d --name pktito-server --restart unless-stopped --init \
  --memory 3g --memory-swap 3g --read-only --cap-drop ALL \
  --security-opt no-new-privileges --env-file pktito.env \
  -p 127.0.0.1:8000:8000 -v "$PWD/models:/models:ro" \
  ghcr.io/peterheb/pktito-server:0.9.6 -m /models/parakeet-tdt-0.6b-v2.pkf -t 8 \
  --max-requests 4 --max-hours 1 --max-upload-mb 128
```

Then check it. `/health` needs no key; a transcription does:

```sh
curl -s 127.0.0.1:8000/health
curl -s -H "Authorization: Bearer $(cut -d= -f2 pktito.env)" \
  -F file=@talk.wav 127.0.0.1:8000/v1/audio/transcriptions
```

`-p 127.0.0.1:8000:8000` keeps it to this machine. To serve others, publish it on the address they reach the machine at, and keep the key: anyone who can reach that address can send it uploads. The limits keep the container under its 3 GB (Memory, below).

**Formats.** The server reads WAV and AIFF itself. For MP3, M4A, FLAC, Ogg, a browser's WebM or a video's sound, give it an ffmpeg, 6.0 or later: the image has none, so the build and its updates stay yours. Mount a self-contained one, such as BtbN's FFmpeg-Builds, with `-v "$PWD/ffmpeg:/opt/ffmpeg:ro"` and add `--ffmpeg /opt/ffmpeg/ffmpeg`. Each upload gets its own ffmpeg, with no network address or path to open, no key in its environment, and limits on its memory and time. The server's DOCKER.md has the commands.

## Or build it

From source, on Linux or macOS, beside a clone of libpktito 0.9.6:

```sh
cd libpktito && make libpktito.a
cd ../pktito-server && cargo build --release
```

```sh
./target/release/pktito-server -m parakeet-tdt-0.6b-v2.pkf -t 8
```

The server reads WAV and AIFF itself; for MP3, MP4, FLAC and the rest, give it ffmpeg 6.0 or later with `--ffmpeg PATH`.

## Run it

| Option               | What it does                                                                       |
| -------------------- | ---------------------------------------------------------------------------------- |
| `-m FILE.pkf`        | A model to serve. Give it twice for both; the first is the default.                |
| `-t N`               | Threads in all, one a core unless given. A multiple of 4 gives each worker 4.      |
| `-w N`               | Workers, the threads dealt among them; one for every 4 threads unless given.       |
| `-l ADDR`            | The address to listen on, `127.0.0.1:8000` unless given.                           |
| `--api-key KEY`      | Require `Authorization: Bearer KEY` on `/v1`, or set `PKTITO_API_KEY`.             |
| `--max-upload-mb MB` | The largest upload, 256 MB unless given.                                           |
| `--max-hours H`      | The longest recording, 4 hours unless given.                                       |
| `--max-requests N`   | The most requests at once, 16 unless given; one more is answered 503.              |
| `--ffmpeg PATH`      | The ffmpeg to decode other formats with, each upload in its own limited process.   |

Requests share the workers a part of a recording at a time, 30 seconds at most, so a short request sent behind long ones waits for one part, not for them to finish. A request alone has every worker.

**Memory.** The model is about 600 MB, mapped from its file and shared; each worker adds about 70 MB, and each request holds its upload and then its audio, 230 MB an hour. The requests together come to about `--max-requests` × (`--max-upload-mb` + 230 MB × `--max-hours`): 1.4 GB with the limits above, and 19 GB at the defaults, so set the limits to what the machine can spare.

## Beside an LLM

On an NVIDIA DGX Spark serving an LLM, measured November 4, 2026:

- **Idle, or a recording every 10 seconds**, the server cost the LLM nothing measurable.
- **Busy with `-t 4`**, two requests at once without a break, it cost the LLM 1.4% at most and still transcribed 66 to 70 times faster than real time.
- **Busy with every core**, it cost the LLM 4 to 7%, at about 150 times real time.

So give it a few cores with `-t`, and don't pin it to some: on the GB10, pinned workers were slower and the LLM no faster. Measure your own: the LLM, its load and the machine change these figures.

## The API

`POST /v1/audio/transcriptions` takes OpenAI's form: `file`, `model`, `language`, `response_format` (`json`, `text`, `srt`, `vtt`, `verbose_json` with segments or words, or `pktito_json`, `pktito-cli`'s JSON byte for byte), and `stream` for OpenAI's server-sent events, a part at a time. `prompt` and `temperature` are read and left: a transducer has nothing they set. OpenAI's clients work unchanged:

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="KEY")
with open("talk.wav", "rb") as f:
    print(client.audio.transcriptions.create(model="parakeet-tdt-0.6b-v2", file=f).text)
```

Also:

- `POST /v1/audio/vad`: the recording's speech, as start and end times.
- `GET /v1/models`: the models the server has.
- `GET /health`, `/ping`, `/version` and `/metrics` (Prometheus), with no key: what the server runs and how busy it is, never what a request sent.

Errors are OpenAI's: 400 for an upload it cannot take, 401 without the key, 404 for a model it doesn't have, 408 for an upload that stopped, 413 over `--max-upload-mb`, and 503 with every request slot taken.

The server's README has the rest: how requests share the threads, the measurements behind the figures above, what ffmpeg is allowed, and the tests.
