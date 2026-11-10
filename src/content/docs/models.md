---
title: Models
description: The two speech models pktito uses, where to download them, and how to use a model file you already have.
order: 3
---

## The two models

| Model        | Transcribes           | Size                         | File                                                                                     |
| ------------ | --------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| English      | English               | <span class="nowrap">624 MB</span> | [parakeet-tdt-0.6b-v2.pkf](https://models.pktito.net/8bfa6750b83c/parakeet-tdt-0.6b-v2.pkf) |
| Multilingual | 25 European languages | <span class="nowrap">648 MB</span> | [parakeet-tdt-0.6b-v3.pkf](https://models.pktito.net/35a59c9a433d/parakeet-tdt-0.6b-v3.pkf) |

The multilingual model covers Bulgarian, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Italian, Latvian, Lithuanian, Maltese, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish and Ukrainian. Its [model card](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3#multilingual-asr) gives the accuracy for each.

Switch models from the model menu on the start screen.

## On a Mac: the Neural Engine edition

On a Mac with Apple silicon, pktito runs each model on the Neural Engine, the AI accelerator built into the chip: two to five times as fast as on the CPU, leaving the CPU mostly free. The app and `pktito-cli download` get the model's Neural Engine edition there, in two files: the model without its encoder, and the encoder compiled for Core ML.

| Model        | Files                                                                                                                                                                                                  | Size                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| English      | [parakeet-tdt-0.6b-v2-slim.pkf](https://models.pktito.net/e582eb76db19/parakeet-tdt-0.6b-v2-slim.pkf), [parakeet-tdt-0.6b-v2-encoder.mlmodelc.aar](https://models.pktito.net/70272da7508a/parakeet-tdt-0.6b-v2-encoder.mlmodelc.aar) | <span class="nowrap">559 MB</span> |
| Multilingual | [parakeet-tdt-0.6b-v3-slim.pkf](https://models.pktito.net/169ead8b6b98/parakeet-tdt-0.6b-v3-slim.pkf), [parakeet-tdt-0.6b-v3-encoder.mlmodelc.aar](https://models.pktito.net/a7eef40e28b0/parakeet-tdt-0.6b-v3-encoder.mlmodelc.aar) | <span class="nowrap">580 MB</span> |

The first transcription after the download waits several seconds while macOS prepares the encoder for this Mac; later ones start at once.

The Neural Engine computes in its own way, so its transcripts can differ slightly from the CPU's: in AliceBench, 16 of 27,137 words. To use the CPU instead, download the model file above with `pktito-cli download parakeet-tdt-0.6b-v2 --cpu` and run `pktito-cli --cpu`. A model file you open yourself runs on the CPU; if it is one of these two, **Manage models…** offers its Neural Engine encoder.

## On a Snapdragon X PC: the NPU edition

On a Windows PC with a Snapdragon X Elite or X2 Elite, the app runs each model's encoder on the chip's NPU, Qualcomm's AI accelerator, leaving the CPU free. In AliceBench the X2 Elite's NPU is 2.4 times as fast as its CPU (221.3× against 94.0×), and the X Elite's about a third faster. The app downloads the edition for its chip, in two files: the model without its encoder, and the encoder compiled for that NPU.

| Model        | Chip     | Files                                                                                                                                                                                             | Size                               |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| English      | X Elite  | [parakeet-tdt-0.6b-v2-slim.pkf](https://models.pktito.net/e582eb76db19/parakeet-tdt-0.6b-v2-slim.pkf), [parakeet-tdt-0.6b-v2-x1e80100.qnn](https://models.pktito.net/dab2d4d69028/parakeet-tdt-0.6b-v2-x1e80100.qnn) | <span class="nowrap">727 MB</span> |
| English      | X2 Elite | [parakeet-tdt-0.6b-v2-slim.pkf](https://models.pktito.net/e582eb76db19/parakeet-tdt-0.6b-v2-slim.pkf), [parakeet-tdt-0.6b-v2-sc8480xp.qnn](https://models.pktito.net/726db8ecde79/parakeet-tdt-0.6b-v2-sc8480xp.qnn) | <span class="nowrap">727 MB</span> |
| Multilingual | X Elite  | [parakeet-tdt-0.6b-v3-slim.pkf](https://models.pktito.net/169ead8b6b98/parakeet-tdt-0.6b-v3-slim.pkf), [parakeet-tdt-0.6b-v3-x1e80100.qnn](https://models.pktito.net/1208ddc1b2c6/parakeet-tdt-0.6b-v3-x1e80100.qnn) | <span class="nowrap">750 MB</span> |
| Multilingual | X2 Elite | [parakeet-tdt-0.6b-v3-slim.pkf](https://models.pktito.net/169ead8b6b98/parakeet-tdt-0.6b-v3-slim.pkf), [parakeet-tdt-0.6b-v3-sc8480xp.qnn](https://models.pktito.net/237a5a6c51ab/parakeet-tdt-0.6b-v3-sc8480xp.qnn) | <span class="nowrap">750 MB</span> |

Like the Neural Engine, the NPU computes in its own way, so its transcripts can differ slightly from the CPU's: in AliceBench, fewer than 20 of 27,137 words. On other Windows PCs, and in `pktito-cli` on Windows, pktito runs on the CPU.

## Checksums

pktito checks each download against these.

| File                     | SHA-256                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------- |
| parakeet-tdt-0.6b-v2.pkf | <code class="wrap">8bfa6750b83cd7c447bad82057c7a12473563b72b3d35487fcca6da0786d83c7</code> |
| parakeet-tdt-0.6b-v3.pkf | <code class="wrap">35a59c9a433d4da2289640db93e73c42478b576e49a293090ef61b4ae595152a</code> |
| parakeet-tdt-0.6b-v2-slim.pkf | <code class="wrap">e582eb76db19e9fba4d9e15d45ce041dd9a230bac3c2970643aa6808bf966acb</code> |
| parakeet-tdt-0.6b-v2-encoder.mlmodelc.aar | <code class="wrap">70272da7508aff518225caeaea3f0dc7dedb5bf0cc829da72876c9ecae5159a1</code> |
| parakeet-tdt-0.6b-v3-slim.pkf | <code class="wrap">169ead8b6b98c67676d13c40bd592614f9d1a3b3783da027fe03967cd559b100</code> |
| parakeet-tdt-0.6b-v3-encoder.mlmodelc.aar | <code class="wrap">a7eef40e28b009fee25548fe869124d2b9ba7be8c00c2dcb1b2e8e8973524571</code> |
| parakeet-tdt-0.6b-v2-x1e80100.qnn | <code class="wrap">dab2d4d69028caba976c0b82316f83ad49bd3d4bac01b39992cd66904d216513</code> |
| parakeet-tdt-0.6b-v2-sc8480xp.qnn | <code class="wrap">726db8ecde7934510ab0193f52de93601c64506edf1804a240612a823e90d811</code> |
| parakeet-tdt-0.6b-v3-x1e80100.qnn | <code class="wrap">1208ddc1b2c63e68568d692780297d142ad5f57ee3bb05dd86218347edd7809f</code> |
| parakeet-tdt-0.6b-v3-sc8480xp.qnn | <code class="wrap">237a5a6c51abfcb969310d494f70b2663c568a43174b70b9fd3f6d624c6caa7a</code> |

## Using a model file you already have

| Where      | How                                                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span class="nowrap">The app</span> | **Open a model file…** in the model menu on the start screen, or **I already have a model file…** on first launch. Double-clicking a `.pkf` opens it too. |
| <span class="nowrap">pktito-cli</span> | `-m` with the file's path: `pktito-cli -m parakeet-tdt-0.6b-v2.pkf talk.mp4`. See [pktito-cli](/developers/cli).                                       |

If pktito can't load the file, the model in use stays as it was; [Troubleshooting](/docs/troubleshooting#model-files) explains the message.

## Attribution

The models are NVIDIA's [parakeet-tdt-0.6b-v2](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2) and [parakeet-tdt-0.6b-v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), modified by pktito (partly quantized to int8, and the encoder compiled for Apple's Neural Engine and Qualcomm's NPUs). Each file also holds Silero VAD (MIT), which finds the pauses in long recordings. pktito is not affiliated with or endorsed by NVIDIA.
