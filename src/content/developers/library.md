---
title: The C library
description: libpktito, the C11 library under the app, with what it needs, its API, its backends and how to build it.
order: 3
---

The app transcribes with libpktito: NVIDIA's Parakeet TDT speech recognizers in C11, with no NeMo, PyTorch, ONNX Runtime or Python at run time. It has its own repository, [github.com/peterheb/pktito](https://github.com/peterheb/pktito), with a command-line program, `pktito`, beside the library.

## What it needs

The C library, libm and pthreads. It builds on Linux, macOS, and Windows 10 and later (with MSYS2's MinGW-w64 gcc).

A model is one `.pkf` file: the recognizer, its vocabulary, and Silero's VAD to cut long recordings at their pauses. The file is mapped, not copied, and transcribing needs some 25 to 90 MB beyond it, depending on the threads: 651 MB in all on a Raspberry Pi 5 with the English model (the repository's README). A 512 MB board can't hold the int8 0.6B model.

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

A model is read-only once loaded and can be shared by transcribers on any number of threads; a transcriber belongs to one thread at a time and runs its own pool. The library keeps no global state and prints nothing. `pk_asr_run` hears its samples as one utterance, so a recording longer than about 30 seconds goes through `pk_chunks` first. `examples/transcribe.c` is a whole program against the library in a page.

## Backends

A build holds every backend of its CPU family the compiler can make, and the CPU picks the fastest it can run at load time. A binary copied to another machine of the same family runs there at that machine's best.

| Backend       | CPUs                                                          |
| ------------- | ------------------------------------------------------------- |
| `neon-dp`     | ARMv8.2 with SDOT: Raspberry Pi 5's Cortex-A76, Apple M chips |
| `neon`        | ARMv8.0: Raspberry Pi 3's Cortex-A53, Pi 4's A72              |
| `avx512-vnni` | AVX512-VNNI: Ice Lake, Tiger Lake, Zen 4                      |
| `avx2-vnni`   | AVX-VNNI: Alder Lake and later, Zen 5                         |
| `avx2`        | Haswell and later                                             |
| `ref`         | Scalar C, for anything                                        |

`PKTITO_KERNELS=neon` runs a given backend instead, to compare. All of them compute the same bits as `ref`, checked kernel by kernel.

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

And every backend on every machine writes the same transcript of the test recording, byte for byte, as `ref`. The [README](https://github.com/peterheb/pktito) has the method and the machines.
