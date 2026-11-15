---
title: Saving
description: Save a transcript as text, subtitles, Markdown or JSON.
order: 4
---

## Save as

| Format        | File    | What it holds                                  |
| ------------- | ------- | ---------------------------------------------- |
| Text          | `.txt`  | The sentences, one to a line.                  |
| Subtitles     | `.srt`  | Timed caption cues.                            |
| Web subtitles | `.vtt`  | The same cues, as WebVTT.                      |
| Markdown      | `.md`   | A heading, then a paragraph for each sentence. |
| JSON          | `.json` | Sentences, word timings and caption cues.      |

**Timestamps in .txt and .md**, at the bottom of the menu, puts each sentence's start time before it. Ctrl+S saves as text and Ctrl+Shift+S as subtitles (⌘S and ⌘⇧S on a Mac).

## Subtitles and captions

pktito can make the first draft of a video's subtitles. It breaks sentences into caption-friendly cues of one or two lines, at most 42 characters each, and marks any cue that goes by faster than 20 characters a second. Switch a finished transcript from **Sentences** to **Captions** to see them, then save as SRT or WebVTT to import into a video editor, player or captioning tool.

Treat the file as a draft: good captions still need a person's pass for proper names, spelling and consistency.

## JSON

A JSON transcript holds the file's name, its length in seconds, the model used and the language, then every sentence with its words, and the caption cues. All times are in seconds. From chapter 1 of _Alice's Adventures in Wonderland_, shortened to one sentence:

```json
{
  "format": "pktito/1",
  "file": "wonderland_ch_01.flac",
  "duration": 640.505,
  "model": "parakeet-tdt-0.6b-v2",
  "language": "en",
  "segments": [
    {
      "start": 27.601,
      "end": 29.121,
      "text": "And what's the use of a book?",
      "words": [
        { "word": "And", "start": 27.601, "end": 27.681 },
        { "word": "what's", "start": 27.761, "end": 28.081 },
        { "word": "the", "start": 28.081, "end": 28.161 },
        { "word": "use", "start": 28.161, "end": 28.401 },
        { "word": "of", "start": 28.401, "end": 28.481 },
        { "word": "a", "start": 28.481, "end": 28.641 },
        { "word": "book?", "start": 28.641, "end": 29.121 }
      ]
    }
  ],
  "captions": [
    {
      "start": 27.601,
      "end": 29.28,
      "lines": ["And what's the use of a book?"]
    },
    {
      "start": 29.28,
      "end": 32.4,
      "lines": ["thought Alice,", "without pictures or conversation."]
    }
  ]
}
```

With speakers, it also names them, and says whose each sentence and cue is. `pktito-cli` writes the same file; [its reference](/developers/cli#json-output) lists every field.
