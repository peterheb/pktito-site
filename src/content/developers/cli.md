---
title: pktito-cli
description: Reference for pktito-cli, the app's transcription from a terminal, with its options, JSON output and exit codes.
order: 1
---

`pktito-cli` is the app's transcription from a terminal: the same files in, the same model, and the same files out.

## Getting it on the PATH

The CLI is installed with the desktop application as `pktito-cli`:

- **Windows**: the installer adds it to the PATH; open a new terminal after installing.
- **Linux**: the .deb installs it in `/usr/bin`.
- **macOS**: choose **Install Command Line Tool…** from the pktito menu, which links it into `/usr/local/bin`. Until then it is at `/Applications/pktito.app/Contents/MacOS/pktito-cli`.

For headless servers or sandboxes, `pktito-cli` can be downloaded separately for macOS and Linux: see [For AI agents](/developers/agents#install).

## Usage

```sh
pktito-cli download parakeet-tdt-0.6b-v3
pktito-cli talk.mp4      # outputs sentences to terminal
pktito-cli --srt *.mp4   # subtitles beside each file
pktito-cli -m multilingual -f json -o out interview.m4a
pktito-cli models        # which are here, which is in use
```

## Options

| Option                | Effect                                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `-m`, `--model MODEL` | A model's name (`parakeet-tdt-0.6b-v2`), its label (`english`, `multilingual`), the last part of its name (`v2`, `v3`), or the path to a `.pkf`. |
| `-f`, `--format F`    | `txt`, `md`, `srt`, `vtt` or `json`. `--txt`, `--md`, `--srt`, `--vtt` and `--json` are the same.                                              |
| `--times`             | Include timestamps when outputting `txt` and `md`.                                                                                             |
| `-o`, `--output PATH` | For one file, the file to write. For several, or a PATH that is a folder or ends in `/`, the folder to write into.                             |
| `-t`, `--threads N`   | Threads to use. The default is usually optimal, but on some machines, specifically setting the thread count improves performance.              |
| `-q`, `--quiet`       | Do not output progress updates.                                                                                                                |
| `-h`, `--help`        | Display the usage text.                                                                                                                        |
| `--version`           | `pktito-cli` and its version.                                                                                                                  |

## Where transcripts go

- **One file, no `-o`**: the transcript goes to standard output.
- **Several files, no `-o`**: each transcript is written beside its file, as `talk.txt` for `talk.mp4`.
- **With `-o`**: to that file, or into that folder.

Transcripts are never overwritten; a second `talk.txt` becomes `talk 2.txt`.

`pktito-cli` uses the standard streams like this:

- **stdin**: not used (`pktito-cli` only reads files)
- **stdout**: single-file output
- **stderr**: status messages

## models

```sh
pktito-cli models
```

Lists each model, its size, and whether it is downloaded or in use.

## download

```sh
pktito-cli download parakeet-tdt-0.6b-v2
```

Downloads a model for the app and `pktito-cli` both, taking the same names as `-m`. Supports standard proxy servers (`HTTPS_PROXY`, `ALL_PROXY`, including SOCKS).

The models folder is `models` in the app's data folder:

| System  | Folder                                         |
| ------- | ---------------------------------------------- |
| macOS   | `~/Library/Application Support/net.pktito.app` |
| Windows | `%APPDATA%\net.pktito.app`                     |
| Linux   | `~/.local/share/net.pktito.app`                |

## JSON output

`-f json` writes one object:

```json
{
  "file": "talk.mp4",
  "duration": 63,
  "model": "parakeet-tdt-0.6b-v2",
  "segments": [
    {
      "start": 0,
      "end": 0.9,
      "text": "Hello there.",
      "words": [
        { "start": 0, "end": 0.4, "text": "Hello" },
        { "start": 0.4, "end": 0.9, "text": "there." }
      ]
    }
  ],
  "captions": [{ "start": 0, "end": 1.5, "lines": ["Hello there."] }]
}
```

| Field                      | Meaning                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `file`                     | The transcribed file's name, without its folder.                                         |
| `duration`                 | The recording's length, in seconds.                                                      |
| `model`                    | The name of the model that made the transcript.                                          |
| `segments`                 | The sentences, in order.                                                                 |
| `segments[].start`, `.end` | When the sentence starts and ends, in seconds.                                           |
| `segments[].text`          | The sentence, punctuated and cased.                                                      |
| `segments[].words`         | Its words, each with `start`, `end` (seconds) and `text`, the word with its punctuation. |
| `captions`                 | The subtitle track's cues, the ones `srt` and `vtt` write.                               |
| `captions[].start`, `.end` | When the cue is shown and hidden, in seconds.                                            |
| `captions[].lines`         | The cue's text, as its one or two lines.                                                 |

Times are in seconds, to the millisecond.

## bench

```sh
pktito-cli bench recordings/
```

Times the transcription of each file, or of a folder's audio and video, and gives the total as times real time. Decoding the file isn't counted. It takes `-m`, `-t`, `-q` and `--json`. Its first lines name the backend the CPU picked and the compiler that built the engine.

`--json` outputs the benchmark results as JSON on standard output, to redirect to a `.json` file. [AliceBench](/developers/benchmarks) is built on it.

### Finding the fastest thread count

By default pktito uses a thread for each core. On a chip with two kinds of core, such as Intel's performance and efficiency cores or an Arm chip's big and little ones, it also times the fast cores alone against all of them early in the first long recording, and keeps whichever was quicker. That choice is a quick guess. Hyperthreading, other work on the machine, or a close race can make it pick the slower one.

If you will transcribe a lot on one machine, look up your CPU's architecture and try benchmarking with the thread count fixed at a few key values: the number of full cores (vs. threads), the number of fast cores (vs. efficiency cores), or the count of all cores (fast and slow).

```sh
pktito-cli bench recordings/         # the default
pktito-cli bench -t 8 recordings/    # e.g. the fast cores
pktito-cli bench -t 12 recordings/   # e.g. all cores
```

## Exit codes

| Code | When                                        |
| ---- | ------------------------------------------- |
| 0    | Success.                                    |
| 1    | Something failed; standard error says what. |
| 2    | No arguments; it prints the usage.          |

With several files, one failure doesn't stop the rest.

## In scripts

```sh
# every recording in a folder, as subtitles beside each
pktito-cli -q --srt recordings/*.mp4

# into another folder, as JSON
pktito-cli -q --json -o transcripts/ recordings/*.m4a

# one file to a variable, stopping on failure
text=$(pktito-cli -q interview.wav) || exit 1
```

In PowerShell:

```powershell
pktito-cli -q --srt (Get-ChildItem recordings\*.mp4).FullName
if ($LASTEXITCODE) { Write-Error "some files failed" }
```

## Environment variables

A command-line option takes precedence over its variable (`-t` over `PKTITO_THREADS`).

| Variable                                               | Effect                                                                                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `PKTITO_THREADS`                                       | Threads to use, as `-t`. The app reads it too.                                                                                          |
| `PKTITO_DECODER`                                       | `ffmpeg` reads every file through ffmpeg; `os` uses the system's media support alone, never pktito's WAV and AIFF reader or ffmpeg. The app reads it too. |
| `HTTPS_PROXY`, `HTTP_PROXY`, `ALL_PROXY`, `NO_PROXY`   | The proxy for `download`, read as curl reads them, in either case. `ALL_PROXY` can be SOCKS.                                            |
| `PKTITO_MODEL_BASE`                                    | Where `download` gets models, in place of `https://models.pktito.net`: a mirror with the same layout.                                   |
| `PKTITO_KERNELS`                                       | Forces a compute backend (`ref`, `neon`, `neon-dp`, `avx2`, `avx2-vnni`, `avx512-vnni`, `amx-int8`), for comparing them; the CPU picks one otherwise. |
