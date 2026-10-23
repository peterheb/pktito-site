---
title: Building from source
description: Build the pktito app and pktito-cli from source on macOS, Windows and Linux.
order: 5
---

The app's source is [github.com/peterheb/pktito-app](https://github.com/peterheb/pktito-app). It carries a copy of the C library in `vendor/pktito`, so one clone builds everything.

## What you need

- Rust, and the Tauri CLI:

  ```sh
  cargo install tauri-cli --version "^2" --locked
  ```

- A C compiler:
  - **macOS**: Xcode's command line tools.
  - **Windows**: MSYS2's MinGW-w64 gcc, with Rust's `x86_64-pc-windows-gnu` toolchain.
  - **Linux**: gcc or clang.

The build compiles every SIMD backend of the target's CPU family, and the CPU picks the fastest it can run, so one build runs on any CPU of its kind.

## macOS and Windows x64

```sh
cargo tauri dev             # run it
cargo tauri build           # the installer
```

`cargo tauri build` makes a .dmg on macOS, and a setup .exe and .msi on Windows. `pktito-cli` is built with the app and goes in the bundle beside it.

## Windows on Arm

Windows on Arm builds on x64 Windows, cross-compiled. You need rustup's `stable-x86_64-pc-windows-gnullvm` toolchain with the `aarch64-pc-windows-gnullvm` target, and [llvm-mingw](https://github.com/mstorsjo/llvm-mingw)'s `bin` folder on the PATH. Its clang compiles and links, and everything is linked statically.

```sh
cargo +stable-x86_64-pc-windows-gnullvm build --release --target aarch64-pc-windows-gnullvm
```

The program needs only Windows' own DLLs and the Arm64 `WebView2Loader.dll` beside it. The installer has to name that DLL as a resource, since tauri-bundler 2.10.4 adds it only for targets ending in `-gnu`; without it, the installed app doesn't start:

```sh
cargo tauri build --target aarch64-pc-windows-gnullvm --bundles nsis --config \
  '{"bundle":{"resources":{"target/aarch64-pc-windows-gnullvm/release/WebView2Loader.dll":"WebView2Loader.dll"}}}'
```

## Linux

```sh
cargo tauri build --bundles deb   # the .deb
```

The .deb depends on ffmpeg, which pktito uses to read every file on Linux, and recommends xdg-utils, which opens links and folders. It installs `pktito-cli` in `/usr/bin`, and registers `.pkf` model files with their own type and icon.

## Formatting

The Rust follows rustfmt and the page's JavaScript, CSS, HTML and JSON follow Prettier, each with its defaults. Before a commit:

```sh
(cd src-tauri && cargo fmt)
npx prettier@3.6.2 --write .
```

`cargo fmt --check` and `npx prettier@3.6.2 --check .` say whether either is due. `.prettierignore` leaves out files that scripts write and the design system's own files.

## The C library

`scripts/vendor-pktito.sh` copies the library's sources into `vendor/pktito`, and `vendor/pktito/VENDORED` names the commit. To build the library on its own, see [The C library](/developers/library).
