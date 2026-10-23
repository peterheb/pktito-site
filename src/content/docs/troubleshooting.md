---
title: Troubleshooting
description: What each message pktito shows means, and what to do about it.
order: 5
---

Where a message has a **Details** box or a tooltip, it holds what the system or the server said, which helps when [reporting a problem](https://github.com/peterheb/pktito-app/issues).

## Reading a file

| Message                                           | What to do                                                                                                                        |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| File not found                                    | The file was moved, renamed or deleted after it was added. Add it again from where it is now.                                     |
| Not audio or video                                | The file isn't a recording, whatever its name says.                                                                               |
| No audio track                                    | The file has video but no sound to transcribe.                                                                                    |
| Can't read this file. Installing ffmpeg may help. | Your system can't read this format. Install ffmpeg and add the file again: [Formats](/docs/formats) shows which formats need it.  |
| Can't read this file                              | The file couldn't be read, and may be damaged. Details says what went wrong.                                                      |
| Install ffmpeg to read audio and video here       | On Linux pktito reads files through ffmpeg. Install it with your package manager, for example `sudo apt install ffmpeg`.          |
| Couldn't start ffmpeg                             | ffmpeg was found but didn't run. Reinstall it, or check that `ffmpeg -version` works in a terminal.                               |
| Can't convert this audio                          | The audio's channel layout or sample rate is one pktito can't bring to mono 16 kHz. Convert the file to WAV or MP3 and try again. |
| No speech in this file                            | The transcription finished and heard no speech.                                                                                   |

## Downloading the model

A download that stops keeps what it has, and **Try again** asks only for the rest. **Use a model file…** skips the download: see [Models](/docs/models).

| Message                            | What to do                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Can't reach models.pktito.net      | Check the internet connection. pktito retries automatically.                                                                                  |
| Connection lost                    | The connection dropped partway. pktito retries automatically and picks up where it stopped.                                                   |
| models.pktito.net isn't answering  | The server is busy or down. pktito retries automatically.                                                                                     |
| Model not found                    | The server answered that it doesn't have the file. Details has its answer; please [report it](https://github.com/peterheb/pktito-app/issues). |
| The download was damaged           | The finished file didn't match its SHA-256 and was deleted. Choose **Try again**.                                                             |
| models.pktito.net sent too much    | The server sent more than the model's size, and the download was discarded. Choose **Try again**.                                             |
| Not enough disk space              | The models need about 650 MB each. Free some space and choose **Try again**.                                                                  |
| Couldn't save the model            | pktito couldn't write to its data folder. Details names the folder and the reason.                                                            |
| Couldn't check the download        | The downloaded file couldn't be read back to check it. Choose **Try again**.                                                                  |
| … is downloading. Cancel it first. | Another model is already downloading. Cancel it, or wait for it to finish.                                                                    |

## Model files

| Message                          | What to do                                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Choose a model first             | No model is set up yet. Choose one from the model menu on the start screen.                                                                     |
| Needs a newer version of pktito  | The model file was made for a later pktito. Update the app.                                                                                     |
| Not a pktito model               | The file isn't a `.pkf` model.                                                                                                                  |
| Can't open the model file        | The file was moved, deleted, or can't be read with your permissions.                                                                            |
| Model file incomplete or damaged | The file is cut short or corrupted, often from a download that stopped. Download it again and check its SHA-256 against [Models](/docs/models). |
| Can't load the model             | The model in use couldn't be loaded. Choose it again from the model menu, or download it again.                                                 |

A model file pktito can't load leaves the model in use as it was.

## Transcribing

| Message                                            | What to do                                                                              |
| -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Not enough memory. Close other apps and try again. | Transcribing takes about 700 MB of memory. Close other apps and choose **Start again**. |
| Couldn't transcribe                                | Choose **Start again**. If it fails again, Details says why.                            |
| Something went wrong                               | Something unexpected happened. Details holds the particulars for a bug report.          |

## Playback

| Message                                                            | What to do                                                                                                                                                              |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can't play: the original file was moved or deleted                 | pktito keeps the audio of recent transcripts for a while, then reads the original again. Put the original back where it was, or transcribe it again from its new place. |
| Can't play: the original file has changed since it was transcribed | The original was edited after it was transcribed. Transcribe it again.                                                                                                  |
| Can't play                                                         | Playback failed; the tooltip says why.                                                                                                                                  |

## Saving and copying

| Message         | What to do                                                                |
| --------------- | ------------------------------------------------------------------------- |
| Couldn't save … | The folder can't be written to, or the disk is full. Save somewhere else. |
| Couldn't copy   | Try again, or save the transcript instead.                                |

## Links and folders on Linux

| Message                         | What to do                                                       |
| ------------------------------- | ---------------------------------------------------------------- |
| Install xdg-utils to open links | `sudo apt install xdg-utils`, then try the link again.           |
| Install xdg-utils to show files | `sudo apt install xdg-utils`, then try **Show in folder** again. |
| Couldn't open the link          | Copy the address into your browser.                              |
| Couldn't show the file          | Open the folder in your file manager.                            |

## The command line tool

On a Mac, **Install Command Line Tool…** in the pktito menu puts `pktito-cli` in `/usr/local/bin`.

| Message                                               | What to do                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------- |
| Installed pktito-cli in /usr/local/bin                | Done. Open a new terminal window and run `pktito-cli --help`. |
| pktito-cli is installed already                       | Nothing to do.                                                |
| pktito-cli is missing from the app. Reinstall pktito. | Download pktito again and replace the app.                    |
| Couldn't install pktito-cli                           | Details says why.                                             |
