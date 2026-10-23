---
title: pktito-cli
description: Reference for pktito-cli, the app's transcription from a terminal, with its options, JSON output and exit codes.
order: 1
---

`pktito-cli` transcribes from a terminal. It reads every file the app reads, uses the model the app is set to unless told another, and writes Save's five formats with the app's own code, so its files and the app's are the same bytes.

## Getting it on the PATH

`pktito-cli` comes with the app; there is no separate download.

- **Windows**: the installer adds pktito's folder to your PATH, and the uninstaller takes it out. Open a new terminal after installing.
- **Linux**: the .deb installs it in `/usr/bin`.
- **macOS**: choose **Install Command Line Tool…** from the pktito menu. It links `pktito-cli` into `/usr/local/bin`, asking for an administrator's password where that folder needs one. Until then it is at `/Applications/pktito.app/Contents/MacOS/pktito-cli`.

```sh
pktito-cli --version
```

## Usage

```text
usage: pktito-cli [options] FILE...    transcribe audio or video: one file's
                                      transcript on the terminal, several's
                                      each beside its file
       pktito-cli models               the models, which are here, which is in use
       pktito-cli download MODEL       a model, for the app and pktito-cli both
       pktito-cli bench PATH...        how fast this computer transcribes: each
                                      file, or a folder's audio and video,
                                      timed, and the whole as times real time
  -m, --model MODEL    a model's name (pktito-cli models lists them) or a .pkf
                       file (default: the one the app uses)
  -f, --format F       txt, md, srt, vtt or json (default txt); or --txt, --md,
                       --srt, --vtt, --json
      --times          each sentence's time before it, in txt and md
  -o, --output PATH    one file's transcript to PATH; several's into the
                       folder PATH
  -t, --threads N      threads (default: one a core)
  -q, --quiet          no progress
bench takes -m, -t, -q and --json (its results as JSON, each file's with a
SHA-256 of its transcript).
```

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
| `-q`, `--quiet`       | No progress, and no line naming each file written.                                                                                                                                       |
| `-h`, `--help`        | The usage text.                                                                                                                                                                          |
| `--version`           | `pktito-cli` and its version.                                                                                                                                                            |

The formats are the app's: [Saving](/docs/saving) says what each holds.

## Where transcripts go

- **One file, no `-o`**: the transcript goes to standard output.
- **Several files, no `-o`**: each transcript is written beside its file, as `talk.txt` for `talk.mp4`.
- **With `-o`**: to that file, or into that folder.

Nothing is written over. When `talk.txt` exists, the new file is `talk 2.txt` (`talk (2).txt` on Windows). Each file written is named on standard error, unless `-q`.

`pktito-cli` reads files, not standard input.

## Progress

Progress ("talk.mp4: transcribing 42%") goes to standard error, and only when standard error is a terminal. Redirected or piped, it stays silent; `-q` silences it on a terminal too. Errors always go to standard error.

## models

```sh
pktito-cli models
```

One line a model: its name, label, languages, size, and whether it is "not downloaded", "downloaded" or "in use". A model file of your own that the app uses is listed after them.

## download

```sh
pktito-cli download parakeet-tdt-0.6b-v2
```

Downloads a model into the app's models folder, where the app finds it too. It takes the same names as `-m`. It asks nothing, resumes a download that stopped, keeps trying while the network is away, and checks the file's size and SHA-256 before keeping it. When it finishes, or when the model is already there, it prints the model file's path on standard output. If the app had no model yet, this one becomes the one in use.

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

Times are rounded to the millisecond and written as plain numbers, `60` rather than `60.000`.

## bench

```sh
pktito-cli bench recordings/
```

Times the transcription of each file named, or of a folder's audio and video (not its subfolders), and gives the whole as times real time: the audio's length over the time it took. Reading the file is left out of the time. It takes `-m`, `-t`, `-q` and `--json`.

The text output starts with the version, model, backend and threads, then a line a file (its length, the seconds it took, times real time, its name) and a last line for all of them.

`--json` gives `pktito_cli`, `model`, `backend`, `threads`, `audio_s`, `seconds` and `x_real_time` for the whole, and `files`, each with `file`, `audio_s`, `seconds`, `x_real_time` and `transcript_sha256`. [AliceBench](/developers/benchmarks) is built on it.

## Exit codes

| Code | When                                                                                                                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0    | Every file was transcribed and written; or `models`, `download`, `--help` or `--version` succeeded.                                                                                                          |
| 1    | Something failed: an unknown option or format, no files given, no model, a model that isn't downloaded or won't load, a download that failed, or any one file that couldn't be read, transcribed or written. |
| 2    | Run with no arguments at all; it prints the usage.                                                                                                                                                           |

With several files, one that fails is named on standard error with the reason, as `pktito-cli: talk.mp4: File not found`, and the rest are still transcribed; the exit code is then 1. `bench` exits 1 when any file couldn't be timed.

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
