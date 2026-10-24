---
title: pktito-cli
description: Reference for pktito-cli, the app's transcription from a terminal, with its options, JSON output and exit codes.
order: 1
---

`pktito-cli` is the app's transcription from a terminal: the same files in, the same model, and the same files out.

## Getting it on the PATH

It comes with the app.

- **Windows**: the installer adds it to the PATH; open a new terminal after installing.
- **Linux**: the .deb installs it in `/usr/bin`.
- **macOS**: choose **Install Command Line Tool…** from the pktito menu, which links it into `/usr/local/bin`. Until then it is at `/Applications/pktito.app/Contents/MacOS/pktito-cli`.

## Usage

```sh
pktito-cli talk.mp4                      # the transcript, on the terminal
pktito-cli --srt *.mp4                   # subtitles beside each file
pktito-cli -m multilingual -f json -o out interview.m4a
pktito-cli models                        # which are here, which is in use
pktito-cli download parakeet-tdt-0.6b-v3
```

## Options

| Option                | Effect                                                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-m`, `--model MODEL` | A model's name (`parakeet-tdt-0.6b-v2`), its label (`english`, `multilingual`), the last part of its name (`v2`, `v3`), or the path to a `.pkf`. A named model must be downloaded first. |
| `-f`, `--format F`    | `txt`, `md`, `srt`, `vtt` or `json`. `--txt`, `--md`, `--srt`, `--vtt` and `--json` are the same.                                                                                        |
| `--times`             | Each sentence's start time before it, in `txt` and `md`.                                                                                                                                 |
| `-o`, `--output PATH` | For one file, the file to write. For several, or a PATH that is a folder or ends in `/`, the folder to write into, made if it isn't there.                                               |
| `-t`, `--threads N`   | Threads to use. The default is one a core, or `PKTITO_THREADS` when it is set.                                                                                                           |
| `-q`, `--quiet`       | No progress, and no line naming each file written. Progress only shows on a terminal anyway.                                                                                             |
| `-h`, `--help`        | The usage text.                                                                                                                                                                          |
| `--version`           | `pktito-cli` and its version.                                                                                                                                                            |

[Saving](/docs/saving) says what each format holds.

## Where transcripts go

- **One file, no `-o`**: the transcript goes to standard output.
- **Several files, no `-o`**: each transcript is written beside its file, as `talk.txt` for `talk.mp4`.
- **With `-o`**: to that file, or into that folder.

Nothing is written over: a second `talk.txt` becomes `talk 2.txt`. Errors go to standard error. `pktito-cli` reads files, not standard input.

## models

```sh
pktito-cli models
```

Lists each model, its size, and whether it is downloaded or in use.

## download

```sh
pktito-cli download parakeet-tdt-0.6b-v2
```

Downloads a model for the app and `pktito-cli` both, taking the same names as `-m`. It asks nothing, resumes, retries while the network is away, and prints the model file's path when done.

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

Times the transcription of each file, or of a folder's audio and video, and gives the total as times real time. Decoding the file isn't counted. It takes `-m`, `-t`, `-q` and `--json`.

`--json` gives `pktito_cli`, `model`, `backend`, `threads`, `audio_s`, `seconds` and `x_real_time` for the whole, and `files`, each with `file`, `audio_s`, `seconds`, `x_real_time` and `transcript_sha256`. [AliceBench](/developers/benchmarks) is built on it.

### Finding the fastest thread count

By default pktito uses a thread for each core. On a chip with two kinds of core, such as Intel's performance and efficiency cores or an Arm chip's big and little ones, it also times the fast cores alone against all of them early in the first long recording, and keeps whichever was quicker. That choice is a quick guess. Hyperthreading, other work on the machine, or a close race can make it pick the slower one.

If you will transcribe a lot on one machine, bench a few of your own files at the default, then at a few fixed thread counts, and keep the fastest:

```sh
pktito-cli bench recordings/          # the default
pktito-cli bench -t 8 recordings/     # e.g. the number of performance cores
pktito-cli bench -t 12 recordings/
```

Then pass `-t` when you transcribe, or set `PKTITO_THREADS`, which `pktito-cli` and the app both read. The transcript is the same at any thread count; only the speed changes.

## Exit codes

| Code | When                                        |
| ---- | ------------------------------------------- |
| 0    | Success.                                    |
| 1    | Something failed; standard error says what. |
| 2    | No arguments; it prints the usage.          |

With several files, one failure doesn't stop the rest: it's reported as `pktito-cli: talk.mp4: File not found`, and the exit code is 1.

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
