<div align="center">

<img src="resources/icons/appIcon.png" alt="NeutralKit Logo" width="80" height="80" />

# NeutralKit

### Neutralinojs Native API Dashboard

**A lightweight desktop dashboard built with Neutralinojs that:**

 Visualizes real system data using native APIs, Tracks open-source contributions interactively,  Demonstrates how lightweight desktop apps can be built without Chromium  

[![Neutralinojs](https://img.shields.io/badge/Neutralinojs-6.5.0-yellow?style=flat-square)](https://neutralinojs.com)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)

</div>

---

## Demo

<p align="center">
<img src="docs/demo.gif" width="900">
</p>

---

## 🆕 Interactive Update

NeutralKit is now a **fully interactive dashboard** with persistent state and real user control.

### 🔹 Local State (Zero Backend)
- Uses `localStorage` for persistence  
- No backend or database required  

**Result:**  
All changes persist across sessions while keeping the app lightweight.

---

### 🔹 Full CRUD Support
- Add / Edit / Delete PRs and Goals  
- Editable stats  
- Clear action buttons (no hidden icons)  

**Result:**  
The dashboard can be reused by any developer to track their work.

---

### 🔹 History & Recovery System
- Deleted items move to **History**  
- One-click restore  
- Confirmation before delete/edit  

**Result:**  
Prevents accidental data loss and improves usability.

---

### 🔹 UI Improvements
- Footer redesigned to match header  
- Improved typography and readability  
- Consistent layout and spacing  

**Result:**  
Cleaner and more professional user experience.

---

### 🔹 Utility Features
- Live clock  
- Auto-refresh system data  
- JSON export  

**Result:**  
The dashboard becomes a functional tool, not just a visual demo.

---

## 🧭 What Is NeutralKit?

NeutralKit is a four-tab system dashboard that helps:

1. Understand Neutralinojs APIs using live system data  
2. Track development and contributions  
3. Visualize how native desktop features can be built efficiently  

---

## 🖥 Features Overview

### 🟢 System Information (Live APIs)

| API | Output |
|-----|--------|
| `computer.getCPUInfo()` | CPU details |
| `computer.getMemoryInfo()` | RAM usage |
| `computer.getDisplays()` | Screen resolution |
| `os.getEnv()` | Environment info |
| `os.getPath()` | System paths |

---

### 🔵 Contribution Tracker

- Track PRs and work items  
- Edit and update entries  
- Mark progress visually  

---

### 🔴 Goals & Planning

- Add and manage goals  
- Edit / delete with confirmation  
- Track completion status  

---

### ⚙️ Architecture View


A detailed two-column diagram showing the complete API call flow and system integration.

#### API Call Flow Example

Using `os.getUserInfo()` as the example:

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

#### Architecture Pattern

Neutralinojs stays lightweight by delegating system operations directly to the OS instead of bundling Chromium or Node.js. The pattern follows: **router entry → `.h` declaration → `.cpp` with platform guards → JS export**.

---


## 📸 Screenshots

| System Data | Contributions |
|:-:|:-:|
| ![Stable APIs](docs/screenshots/stable-apis.png) | ![Contributions](docs/screenshots/contributions.png) |

| Goals | Architecture |
|:-:|:-:|
| ![GSoC Goals](docs/screenshots/gsoc-goals.png) | ![Architecture](docs/screenshots/architecture.png) |


---

## 🚀 Getting Started

Install the Neutralinojs CLI:
```bash
npm install -g @neutralinojs/neu
```

### Run the Application

```bash
# 1. Clone the repository
git clone https://github.com/itssagarK/neutralkit.git
cd neutralkit

# 2. Download the Neutralinojs binaries
neu update

# 3. Run the app
neu run
```


## 📋 Key Improvements & Features

### Version 1.0 — Interactive Dashboard Edition

#### 1. Zero-Backend Local Storage System
- Editable statistics (PR counts, categories)
- Full CRUD operations (Create, Read, Update, Delete) for PRs and Goals
- Smart categorization system for new contributions
- Automatic form-to-card generation

#### 2. Data Safety & History Management
- Soft deletion with History vault
- One-click restoration of deleted items
- Confirmation warnings on destructive actions
- Reset app to original state option

#### 3. Real-Time System Monitoring
- Live updating clock in header
- Auto-refresh toggle for system metrics (3-second intervals)
- JSON export of current system data
- Graceful error handling for API failures

#### 4. Professional UI/UX Enhancements
- Improved text contrast and readability
- Bold, color-coded action buttons (Edit in blue, Delete in red)
- Fixed header and footer with native app feel
- Clean, professional modal dialogs
- Disabled text selection on chrome elements
- Responsive button styling and feedback

#### 5. Complete Content Synchronization
- Expanded API coverage with additional proposed native features
- All 9 contributions accurately represented
- Inline error handling (no ugly alert popups)
- Dynamic competitor support dropdown menus

---

## Why This Project

NeutralKit was built to demonstrate how Neutralinojs APIs work in practice and to highlight areas where the framework could expand.

The dashboard makes it easier to visualize:
- Existing system capabilities with live data
- Real contributions to the codebase with full management features
- Potential API improvements through an interactive, professional interface

NeutralKit serves as both a **technical portfolio piece** and a **working tool** for managing your GSoC open-source contributions and tracking progress

---

## 👤 Author

**Sagar** 

- GitHub: [@itssagarK](https://github.com/itssagarK)
- GSoC Discussion: [gsoc2026 #29](https://github.com/neutralinojs/gsoc2026/discussions/29)
- All PRs: [neutralinojs/neutralinojs](https://github.com/neutralinojs/neutralinojs/pulls?q=is%3Apr+author%3AitssagarK)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ for Neutralinojs

**[View PRs](https://github.com/neutralinojs/neutralinojs/pulls?q=is%3Apr+author%3AitssagarK) · [GSoC Discussion](https://github.com/neutralinojs/gsoc2026/discussions/29) · [Run the App](https://github.com/itssagarK/neutralkit)**

</div>
