---
title: Saving
description: Save a transcript as text, subtitles, Markdown or JSON, save a whole batch at once, or copy it.
order: 4
---

## Save as

| Format                 | File    | What it holds                                                     |
| ---------------------- | ------- | ----------------------------------------------------------------- |
| Text                   | `.txt`  | The sentences, one to a line.                                     |
| Subtitles              | `.srt`  | Numbered cues with their start and end times.                     |
| Web subtitles          | `.vtt`  | The same cues as WebVTT.                                          |
| Markdown               | `.md`   | The file's name as a heading, then a paragraph for each sentence. |
| JSON with word timings | `.json` | The sentences, every word's start and end, and the subtitle cues. |

**Timestamps in .txt and .md**, at the bottom of the menu, puts each sentence's start time before it. Ctrl+S saves as text and Ctrl+Shift+S as subtitles (⌘S and ⌘⇧S on a Mac). `pktito-cli` writes the same files; [its reference](/developers/cli#json-output) lists the JSON's fields.

## Where it goes

With **Save next to the original** checked, the transcript is saved beside the original. Otherwise a dialog asks. pktito never writes over a file: a second `talk.txt` becomes `talk 2.txt` (`talk (2).txt` on Windows).

## Save all

A batch has **Save all**: text or subtitles next to each original, or every format into one folder. Files still being transcribed are saved as each one finishes.

## Copy

The copy button copies the text, or in the Captions view the cues as SRT. While a file is still being transcribed, it copies the text so far.

## Sentences and captions

A finished transcript can show its **Sentences**, as the model wrote them, or its **Captions**: the subtitle cues, one or two lines of at most 42 characters each. A cue that asks more than 20 characters a second of its reader is marked.
