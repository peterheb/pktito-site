---
title: The C library
description: libpktito, the C11 library under the app, with what it needs, its API, its backends and how to build it.
order: 3
---

libpktito is NVIDIA's Parakeet-TDT speech models in C11, the engine under the app, with no Python, PyTorch or ONNX Runtime. It lives at [github.com/peterheb/pktito](https://github.com/peterheb/pktito).

## What it needs

The C library, libm and pthreads. It builds on Linux, macOS, and Windows 10 and later (with MSYS2's MinGW-w64 gcc).

A model is one `.pkf` file, mapped rather than copied: about 650 MB of memory in all while transcribing.

## The API

`core/pktito.h` is the whole interface:

```c
#include "pktito.h"

pk_model *m = pk_model_load("models/parakeet-tdt-0.6b-v2.pkf", err, sizeof err);
pk_asr *a = pk_asr_new(m, 0);                     /* 0: a thread a core */

const pk_tok *t;
long n = pk_asr_run(a, samples, n_samples, &t);   /* 16 kHz mono float */
pk_text(m, t, (size_t)n, text, sizeof text);      /* NeMo's transcript */
/* t[i].frame * pk_model_frame_seconds(m) is when token i was heard */
```

| Function                      | What it does                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `pk_model_load`               | Maps a `.pkf` and checks it before anything in it is used.                      |
| `pk_asr_new`, `pk_asr_run`    | A transcriber, and 16 kHz mono samples in, tokens with times out.               |
| `pk_text`, `pk_words`         | Tokens to UTF-8 text as NeMo writes it, and to words with their times.          |
| `pk_vad_probs`, `pk_segments` | Silero VAD's speech probabilities, and the speech segments from them.           |
| `pk_chunks`                   | A long recording cut at its silences into pieces the model hears whole.         |
| `pk_captions`                 | Words with times to subtitle cues: lines of 42 characters, one or two to a cue. |
| `pk_language`                 | Which of the multilingual model's 25 languages a transcript's words are in.     |
| `pk_backend`                  | The backend in use.                                                             |

A loaded model can be shared across threads; each transcriber belongs to one thread at a time. The library keeps no global state and prints nothing. Recordings longer than about 30 seconds go through `pk_chunks` first. `examples/transcribe.c` is a complete program in one page.

## Backends

A build holds every backend for its CPU family, and the fastest one the CPU supports is picked at load time.

| Backend       | CPUs                                                          |
| ------------- | ------------------------------------------------------------- |
| `neon-dp`     | ARMv8.2 with SDOT: Raspberry Pi 5's Cortex-A76, Apple M chips |
| `neon`        | ARMv8.0: Raspberry Pi 3's Cortex-A53, Pi 4's A72              |
| `avx512-vnni` | AVX512-VNNI: Ice Lake, Tiger Lake, Zen 4                      |
| `avx2-vnni`   | AVX-VNNI: Alder Lake and later, Zen 5                         |
| `avx2`        | Haswell and later                                             |
| `ref`         | Scalar C, for anything                                        |

All compute the same bits as `ref`. `PKTITO_KERNELS=neon` forces a backend, to compare.

## Build

```sh
make                          # every backend of this machine's family, and ref
make BACKEND=ref              # scalar C alone, for anything
make libpktito.a              # the library alone
make check-c                  # the checks: a compiler and a model, on any board
```

On Windows, the same in an [MSYS2](https://www.msys2.org) UCRT64 shell with `pacman -S make diffutils mingw-w64-ucrt-x86_64-gcc`.

The models can be [downloaded](/docs/models) ready to use, or converted from NVIDIA's checkpoints with the repository's converter, which is Python with numpy alone. The README has the steps.

## Agreement with NeMo

The repository holds pktito to NeMo at three levels:

- **The model**: a float64 reference written from NeMo's code gives NeMo's token ids and timestamps exactly, for both models, on four test recordings in English, German and French.
- **The numerics**: pktito multiplies in int8. Against float32 on 200 LibriSpeech recordings, the English model's word error rate is 1.51% for both; on 360 FLEURS recordings in six languages, the multilingual model's is 4.42% against 4.41%.
- **The text**: the detokenizer gives NeMo's text on every vocabulary piece and on thousands of random sequences.

The [README](https://github.com/peterheb/pktito) has the method and the machines.
