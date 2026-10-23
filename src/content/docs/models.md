---
title: Models
description: The two speech models pktito uses, where to download them, and how to use a model file you already have.
order: 3
---

## The two models

| Model                | Transcribes           | Download |
| -------------------- | --------------------- | -------- |
| parakeet-tdt-0.6b-v2 | English               | 624 MB   |
| parakeet-tdt-0.6b-v3 | 25 European languages | 648 MB   |

The multilingual model's languages: Bulgarian, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Italian, Latvian, Lithuanian, Maltese, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish and Ukrainian. Accuracy varies by language: the [model card's table](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3#multilingual-asr) gives the error rate for each.

On its first run pktito offers the model that speaks your system's language. To switch later, use the model menu on the start screen.

## Downloads

pktito downloads its model from models.pktito.net and checks it against the size and SHA-256 below before using it. Each address names the file by the first 12 digits of its SHA-256, so it always serves the same bytes.

### parakeet-tdt-0.6b-v2

- Size: 624,480,196 bytes
- SHA-256: `8bfa6750b83cd7c447bad82057c7a12473563b72b3d35487fcca6da0786d83c7`
- [https://models.pktito.net/8bfa6750b83c/parakeet-tdt-0.6b-v2.pkf](https://models.pktito.net/8bfa6750b83c/parakeet-tdt-0.6b-v2.pkf)

### parakeet-tdt-0.6b-v3

- Size: 647,552,644 bytes
- SHA-256: `35a59c9a433d4da2289640db93e73c42478b576e49a293090ef61b4ae595152a`
- [https://models.pktito.net/35a59c9a433d/parakeet-tdt-0.6b-v3.pkf](https://models.pktito.net/35a59c9a433d/parakeet-tdt-0.6b-v3.pkf)

To check a file you downloaded yourself:

```sh
shasum -a 256 parakeet-tdt-0.6b-v2.pkf     # macOS; sha256sum on Linux
```

On Windows, `Get-FileHash parakeet-tdt-0.6b-v2.pkf` in PowerShell.

## Using a model file you already have

A `.pkf` already on your computer can be used instead of the download.

- **In the app**: choose **Open a model file…** from the model menu on the start screen, or **I already have a model file…** on the first run. Double-clicking a `.pkf` also opens pktito with it in use.
- **In pktito-cli**: `-m` takes the file's path, as in `pktito-cli -m /path/to/parakeet-tdt-0.6b-v2.pkf talk.mp4`. See [pktito-cli](/developers/cli).

A file pktito can't load leaves the model in use as it was, and says why: see [Troubleshooting](/docs/troubleshooting#model-files).

## Attribution

The models are NVIDIA's [parakeet-tdt-0.6b-v2](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2) and [parakeet-tdt-0.6b-v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), modified by pktito: partly quantized to int8. Each file also holds Silero VAD, under the MIT license, which finds the pauses in long recordings. pktito is not affiliated with or endorsed by NVIDIA.
