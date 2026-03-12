<div align="center">

<img src="resources/icons/appIcon.png" alt="NeutralKit Logo" width="80" height="80" />

# NeutralKit

### GSoC 2026 · Neutralinojs Native API Dashboard

**A live system dashboard that visualizes existing Neutralinojs APIs, demonstrates 9 real contributions, and proposes 6 missing APIs — all built with zero Chromium, zero Node.js, ~1MB binary.**

[![GSoC 2026](https://img.shields.io/badge/GSoC-2026-orange?style=flat-square&logo=google)](https://summerofcode.withgoogle.com/)
[![Neutralinojs](https://img.shields.io/badge/Neutralinojs-6.5.0-yellow?style=flat-square)](https://neutralinojs.com)
[![Project](https://img.shields.io/badge/Project%203-Extending%20Native%20API-blue?style=flat-square)](https://github.com/neutralinojs/gsoc2026)
[![PRs](https://img.shields.io/badge/Contributions-9%20PRs-green?style=flat-square)](https://github.com/neutralinojs/neutralinojs/pulls?q=is%3Apr+author%3AitssagarK)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)

</div>

---

## 📸 Screenshots

| Stable APIs — Live Data | My Contributions — 9 PRs |
|:-:|:-:|
| ![Stable APIs](docs/screenshots/stable-apis.png) | ![Contributions](docs/screenshots/contributions.png) |

| GSoC Goals — 6 Missing APIs | Architecture — Call Flow |
|:-:|:-:|
| ![GSoC Goals](docs/screenshots/gsoc-goals.png) | ![Architecture](docs/screenshots/architecture.png) |

---

## 🧭 What Is NeutralKit?

NeutralKit is a four-tab system dashboard that serves three purposes simultaneously:

1. **Proof of framework understanding** — fetches real live data from `computer.getCPUInfo()`, `computer.getMemoryInfo()`, `computer.getDisplays()`, `os.getEnv()`, and `os.getPath()` and displays it in a clean dashboard UI
2. **Contribution portfolio** — every one of my 9 PRs has a dedicated card with live API calls where applicable, showing what was built and why it mattered
3. **GSoC proposal visualizer** — 6 APIs that are completely absent from Neutralinojs but present in every competitor are shown with mock data, use cases, OS-level implementation details, and a competitor matrix

> Built entirely with HTML, CSS, and the Neutralinojs JavaScript API — no Electron, no Node.js, no new dependencies.

---

## 🖥 Four Tabs, Four Purposes

### 🟢 Tab 1 — Stable APIs
Live data fetched from the running binary the moment the app starts.

| API | What It Shows |
|-----|--------------|
| `computer.getCPUInfo()` | Model, logical thread count, architecture |
| `computer.getMemoryInfo()` | Total / used / free RAM with animated progress bar |
| `computer.getDisplays()` | Resolution of all connected displays |
| `os.getEnv("USERNAME")` | Current user and home directory |
| `os.getPath("documents")` | Documents and Downloads paths |

Also includes a live **bundle size comparison chart** — Electron (150MB) vs NW.js (100MB) vs Tauri (3MB) vs Neutralinojs (~1MB).

---

### 🔵 Tab 2 — My 9 Contributions

A stats bar shows the breakdown at a glance:

```
9 Total PRs  ·  2 New APIs  ·  3 Bug Fixes  ·  2 Test PRs  ·  1 Security Find  ·  3 Docs PRs
```

#### New APIs (C++ Implementations)

**[PR #1632](https://github.com/neutralinojs/neutralinojs/pull/1632) — `os.getUserInfo()`**
Brand new cross-platform user info API. Uses `getpwuid(getuid())` on Linux/macOS and `GetUserName()` + `USERPROFILE` on Windows. Returns `username`, `homeDirectory`, `shell`, and `uid`.
Also discovered and fixed a silent bug — `os.getPath()` was never registered in `server/router.cpp`, making it silently fail on every platform since it was introduced.

**[PR #1616](https://github.com/neutralinojs/neutralinojs/pull/1616) — `os.getPath("desktop")`**
The sago library had `getDesktopFolder()` available but it was never called. 2-line C++ fix that unlocks desktop path support across all platforms.

#### Bug Fixes

**[PR #1630](https://github.com/neutralinojs/neutralinojs/pull/1630) — 3 memory leaks in `os.setTray()`**
- `HICON` was never destroyed after `GetHICON()` — leak on every tray icon update
- Previous `HICON` was never cleaned up when the icon changed — accumulates over app lifetime
- `LPWSTR` menu item strings beyond the new count were never freed — grows on every tray update
Closes issue [#671](https://github.com/neutralinojs/neutralinojs/issues/671) open since 2021.

**[PR #1615](https://github.com/neutralinojs/neutralinojs/pull/1615) — `showOpenDialog()` path fix**
Missing `helpers::unNormalizePath` call caused wrong path separators on Windows. One-line fix.

**[PR #1629](https://github.com/neutralinojs/neutralinojs/pull/1629) — Platform-aware CI timeouts**
Hardcoded 20s timeouts in `spec/runner.js` and `spec/index.js` caused Windows CI to fail consistently. Made timeouts platform-aware (`win32 ? 40000 : 20000`), fixed a missing `await` in `spec/os.spec.js`.
Result: **44 → 45 OS tests passing, 13 → 14 app tests passing** on Windows CI.

#### Test Cases

**[PR #1608](https://github.com/neutralinojs/neutralinojs/pull/1608) — 7 missing `os.getPath()` test cases**
Added tests for `config`, `data`, `cache`, `pictures`, `music`, `video`, and `temp` path types that had zero coverage.

#### Documentation — [neutralinojs.github.io](https://github.com/neutralinojs/neutralinojs.github.io)

| PR | File | Fix |
|----|------|-----|
| [#425](https://github.com/neutralinojs/neutralinojs.github.io/pull/425) | `os.md` | Wrong param name, double period, missing Boolean type |
| [#426](https://github.com/neutralinojs/neutralinojs.github.io/pull/426) | `storage.md` | Extra `);` in code examples, wrong type Object→String |
| [#427](https://github.com/neutralinojs/neutralinojs.github.io/pull/427) | `window.md` | Wrong return type, missing colon, typo in snapshot |

#### Security Research

Identified a **supply chain attack attempt** in PR #1580 — `String.fromCharCode` obfuscation injected into `spec/runner.js` line 117, with a hidden `config.bat` concealed via `.gitignore`. Reported to maintainers before it could be merged.

---

### 🔴 Tab 3 — GSoC Goals: 6 Missing APIs

Every API below uses only OS-native calls — zero new dependencies, bundle stays at ~1MB.

| API | OS Implementation | Competitor Support |
|-----|------------------|--------------------|
| `os.getNetworkInterfaces()` | `getifaddrs()` / `GetAdaptersAddresses()` | Electron ✓ · Tauri ✓ · Node.js ✓ · **NL ✗** |
| `os.getHostname()` | `gethostname()` / `GetComputerName()` | Electron ✓ · Tauri ✓ · Node.js ✓ · **NL ✗** |
| `filesystem.getPermissions(path)` | `stat()` / `GetFileSecurity()` | Node.js ✓ · Tauri ✓ · **NL ✗** |
| `filesystem.setPermissions(path, mode)` | `chmod()` / `SetFileSecurity()` | Node.js ✓ · Tauri ✓ · **NL ✗** |
| `window.setProgressBar(value)` | `ITaskbarList3` / `NSDockTile` | Electron ✓ · Tauri ✓ · **NL ✗** |
| `os.setPowerSaveMode(enabled)` | `SetThreadExecutionState()` / `IOPMAssertionCreateWithName()` | Electron ✓ · Tauri ✓ · **NL ✗** |

#### ⚡ Novel Idea — `os.watchClipboard()`

Every desktop framework today requires **polling**:

```js
// What Electron and Tauri force you to do today
setInterval(() => {
  const text = clipboard.readText();
  if (text !== last) { handleChange(text); last = text; }
}, 500); // wastes CPU every 500ms forever
```

NeutralKit proposes **native OS push-events** instead:

```js
// What os.watchClipboard() would look like
Neutralino.events.on('clipboardChange', (e) => {
  console.log(e.detail.text); // fired instantly by the OS
});
```

| Platform | Native Mechanism |
|----------|-----------------|
| Windows | `AddClipboardFormatListener()` + `WM_CLIPBOARDUPDATE` |
| Linux | `XFixesSelectSelectionInput()` via X11 |
| macOS | `NSPasteboard.changeCount` via run loop |

~150 lines of C++, zero new dependencies, fits directly into Neutralinojs's existing events infrastructure. **Electron polls. Tauri polls. Everyone polls.** This would make Neutralinojs the first desktop framework with a truly event-driven clipboard watcher.

---

### ⚙️ Tab 4 — Architecture

A detailed two-column diagram showing:

**Left — The full API call flow** (using `os.getUserInfo()` as the example):
```
Neutralino.os.getUserInfo()          ← JavaScript
        ↓  WebSocket IPC · JSON
server/router.cpp → os namespace     ← C++ Router
        ↓  Direct OS API call
  Windows: GetUserName()             ← OS Layer
  Linux/macOS: getpwuid(getuid())
        ↓  JSON response
{ username, homeDirectory, uid }     ← Back to JS
```

**Right — 6 design principles** every proposed API follows: zero new dependencies, consistent 4-file pattern, cross-platform `#ifdef` guards, OS delegation philosophy, test coverage first, and the zero-poll clipboard events approach.

---

## 🚀 Getting Started

### Prerequisites
- [Neutralinojs CLI](https://neutralinojs.com/docs/getting-started/your-first-neutralinojs-app) — install with `npm i -g @neutralinojs/neu`

### Run locally

```bash
# 1. Clone the repository
git clone https://github.com/itssagarK/neutralkit.git
cd neutralkit

# 2. Download the Neutralinojs binaries
neu update

# 3. Run the app
neu run
```

The dashboard opens immediately. The **Stable APIs** tab fetches live data from your machine on load.

> **Note:** Cards in the **My Contributions** tab marked "Needs fork binary" require building from [my fork](https://github.com/itssagarK/neutralinojs) since PR #1632 and PR #1616 are not yet in the official release.

---

## 🛠 Neutralinojs APIs Used

| Module | API | Purpose in NeutralKit |
|--------|-----|----------------------|
| `computer` | `getCPUInfo()` | Live CPU model and architecture |
| `computer` | `getMemoryInfo()` | RAM usage with animated bar |
| `computer` | `getDisplays()` | Screen resolution |
| `os` | `getEnv()` | Environment variables |
| `os` | `getPath()` | System directory paths |
| `os` | `getUserInfo()` | *(Fork)* New API from PR #1632 |

---

## 📁 Project Structure

```
neutralkit/
├── resources/
│   ├── index.html          # Single-file app — all UI, CSS, and JS
│   ├── js/
│   │   ├── neutralino.js   # Neutralinojs client library
│   │   └── neutralino.d.ts # TypeScript definitions
│   └── icons/
│       ├── appIcon.png
│       └── trayIcon.png
├── neutralino.config.json  # App configuration
├── .gitignore
├── LICENSE
└── README.md
```

---

## 👤 Author

**Sagar** — BTech CSE · GSoC 2026 Applicant · Neutralinojs Project 3

- GitHub: [@itssagarK](https://github.com/itssagarK)
- GSoC Discussion: [gsoc2026 #29](https://github.com/neutralinojs/gsoc2026/discussions/29)
- All PRs: [neutralinojs/neutralinojs](https://github.com/neutralinojs/neutralinojs/pulls?q=is%3Apr+author%3AitssagarK)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ for Neutralinojs · GSoC 2026 · Project 3 — Extending the Existing Native API

**[View PRs](https://github.com/neutralinojs/neutralinojs/pulls?q=is%3Apr+author%3AitssagarK) · [GSoC Discussion](https://github.com/neutralinojs/gsoc2026/discussions/29) · [Run the App](https://github.com/itssagarK/neutralkit)**

</div>
