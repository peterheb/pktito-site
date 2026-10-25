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

## Checksums

pktito checks each download against these.

| File                     | SHA-256                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------- |
| parakeet-tdt-0.6b-v2.pkf | <code class="hash">8bfa6750b83cd7c447bad82057c7a12473563b72b3d35487fcca6da0786d83c7</code> |
| parakeet-tdt-0.6b-v3.pkf | <code class="hash">35a59c9a433d4da2289640db93e73c42478b576e49a293090ef61b4ae595152a</code> |

## Using a model file you already have

| Where      | How                                                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span class="nowrap">The app</span> | **Open a model file…** in the model menu on the start screen, or **I already have a model file…** on first launch. Double-clicking a `.pkf` opens it too. |
| <span class="nowrap">pktito-cli</span> | `-m` with the file's path: `pktito-cli -m parakeet-tdt-0.6b-v2.pkf talk.mp4`. See [pktito-cli](/developers/cli).                                       |

If pktito can't load the file, the model in use stays as it was; [Troubleshooting](/docs/troubleshooting#model-files) explains the message.

## Attribution

The models are NVIDIA's [parakeet-tdt-0.6b-v2](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2) and [parakeet-tdt-0.6b-v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), modified by pktito (partly quantized to int8). Each file also holds Silero VAD (MIT), which finds the pauses in long recordings. pktito is not affiliated with or endorsed by NVIDIA.
