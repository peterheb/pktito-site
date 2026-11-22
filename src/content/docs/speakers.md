---
title: Speakers
description: See who said what, name the speakers, and find where each one talks.
order: 4
---

## Turn it on

The **Speakers** switch is on the start screen, beside the model. With it on, pktito tells the voices in a recording apart and starts a new paragraph each time the speaker changes, with the speaker's name at its head: Speaker 1, Speaker 2 and so on, in the order they first talk.

The first time, pktito asks to download a second model, the speaker model, about 100 MB. Like the speech model it is open source, from NVIDIA, and it runs on your computer. Transcribing takes longer with Speakers on.

The switch decides new transcriptions. In a transcript made without speakers, **Find the speakers** in the Speakers menu listens to the recording again and adds them; the words stay as they are.

## Names

Click a speaker's name in the transcript for **Who's speaking**. **Rename** gives that speaker a name, which shows everywhere they talk and in the files you save. If the line went to the wrong person, pick the right one, or **New speaker**; **Undo** takes it back.

## Finding a speaker

The band under the player shows who talks when, a color for each speaker. **Show speaker legend** in the Speakers menu lists the speakers above the transcript: click one to find where they speak, and step through their turns with Find's arrows. Add words to look for what that speaker said, and **Only matches** hides everything else.

## Limits

The speaker model tells up to eight speakers apart. With more voices than that, some get mixed up. Voices talking over each other, and very short turns, are the hardest.

To read a transcript without the names, choose **Hide speakers**. They come back with **Show who said what**.

## In saved files

Every format carries the speakers: a name at the head of each turn in text and Markdown, a name on each cue in SRT and WebVTT, and each speaker's `id` and `name` in [JSON](/docs/saving).
