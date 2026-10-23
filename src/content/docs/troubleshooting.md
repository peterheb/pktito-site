---
title: Troubleshooting
description: What pktito's messages mean, and what to do about them.
order: 5
---

A message's **Details**, or its tooltip, has what the system or the server said. Include it when [reporting a problem](https://github.com/peterheb/pktito-app/issues).

## Reading a file

| Message                                           | What to do                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| File not found                                    | The file was moved or deleted after it was added. Add it again from where it is now. |
| Not audio or video                                | The file isn't a recording, whatever its name says.                                  |
| No audio track                                    | The video has no sound.                                                              |
| Can't read this file. Installing ffmpeg may help. | Install ffmpeg; [Formats](/docs/formats) shows which formats need it.                |
| Can't read this file                              | The file may be damaged.                                                             |
| Install ffmpeg to read audio and video here       | On Linux: `sudo apt install ffmpeg`.                                                 |
| Couldn't start ffmpeg                             | Check that `ffmpeg -version` works in a terminal, or reinstall ffmpeg.               |
| Can't convert this audio                          | Convert the file to WAV or MP3.                                                      |

## Downloading the model

Network errors (**Can't reach models.pktito.net**, **Connection lost**, **isn't answering**) are retried automatically, and the download resumes where it stopped.

| Message                            | What to do                                                       |
| ---------------------------------- | ---------------------------------------------------------------- |
| The download was damaged           | Choose **Try again**.                                            |
| Not enough disk space              | Free about 650 MB and choose **Try again**.                      |
| Couldn't save the model            | pktito can't write to its data folder; Details names the folder. |
| Model not found                    | [Report it](https://github.com/peterheb/pktito-app/issues).      |
| … is downloading. Cancel it first. | Cancel the other download, or wait for it to finish.             |

## Model files

| Message                          | What to do                                                               |
| -------------------------------- | ------------------------------------------------------------------------ |
| Choose a model first             | Choose one from the model menu on the start screen.                      |
| Needs a newer version of pktito  | Update pktito.                                                           |
| Not a pktito model               | The file isn't a `.pkf` model.                                           |
| Model file incomplete or damaged | Download it again, and check its SHA-256 against [Models](/docs/models). |

## Transcribing and playback

| Message                                                            | What to do                                                        |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Not enough memory. Close other apps and try again.                 | Transcribing takes about 700 MB. Then choose **Start again**.     |
| Can't play: the original file was moved or deleted                 | Put the original back, or transcribe it again from its new place. |
| Can't play: the original file has changed since it was transcribed | Transcribe it again.                                              |

## Linux

| Message                                                          | What to do                   |
| ---------------------------------------------------------------- | ---------------------------- |
| Install xdg-utils to open links, Install xdg-utils to show files | `sudo apt install xdg-utils` |

## Install Command Line Tool on a Mac

| Message                                               | What to do                                 |
| ----------------------------------------------------- | ------------------------------------------ |
| Installed pktito-cli in /usr/local/bin                | Open a new terminal and run `pktito-cli`.  |
| pktito-cli is missing from the app. Reinstall pktito. | Download pktito again and replace the app. |
