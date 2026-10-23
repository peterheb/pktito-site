---
title: Saving
description: Save a transcript as text, subtitles, Markdown or JSON, save a whole batch at once, or copy it.
order: 4
---

## Save as

**Save as**, on a finished transcript, lists the formats with the name each file will get. pktito-cli writes the same bytes for each.

| Format                 | File    | What it holds                                                       |
| ---------------------- | ------- | ------------------------------------------------------------------- |
| Text                   | `.txt`  | The sentences, one to a line.                                       |
| Text with times        | `.txt`  | Each sentence after its start time, as `00:01:01.50  The sentence.` |
| Subtitles              | `.srt`  | The subtitle track: numbered cues with their start and end times.   |
| Web subtitles          | `.vtt`  | The same cues as WebVTT, for video on the web.                      |
| Markdown               | `.md`   | The file's name as a heading, then a paragraph for each sentence.   |
| Markdown with times    | `.md`   | The same, each paragraph after its start time.                      |
| JSON with word timings | `.json` | The sentences, every word's start and end, and the subtitle cues.   |

**Timestamps in .txt and .md**, at the bottom of the menu, switches Text and Markdown to their versions with times. Subtitles and JSON always carry times.

Shortcuts: Ctrl+S saves as text and Ctrl+Shift+S as subtitles (⌘S and ⌘⇧S on a Mac).

[pktito-cli](/developers/cli#json-output) lists the JSON's fields.

## Where it goes

The save dialog opens in the original's folder, with the original's name and the new extension.

With **Save next to the original** checked, in the same menu, pktito saves beside the original with no dialog. A folder it can't write to, such as a disc's, brings up the dialog instead.

pktito never writes over a file. A second save of `talk.txt` is `talk 2.txt` (`talk (2).txt` on Windows).

## Save all

A batch has **Save all** in place of Save as:

- **Text, next to each original**
- **Subtitles, next to each original**
- **All of them into one folder…**: every format (.txt, .srt, .vtt, .md and .json) for each file, in a folder you choose.

Files still being transcribed are saved the same way as each one finishes.

## Copy

The copy button puts the transcript on the clipboard:

- **Copy text**: the sentences, without times.
- **Copy captions (SRT)**: in the Captions view, the cues as an .srt's text, which subtitle editors take.
- **Copy so far**: while a file is still being transcribed, the text up to now.

## Sentences and captions

A finished transcript reads two ways:

- **Sentences**: as the model wrote them, each with its start time. Text and Markdown are saved from these.
- **Captions**: its subtitle track, the cues Subtitles and Web subtitles save. Each cue is one or two lines of at most 42 characters, shown with when it starts and ends. A cue that asks more than 20 characters a second of its reader is marked. A cue cut at a pause in mid-sentence ends in an ellipsis.

Playback and find work in either view.
