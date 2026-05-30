# ChatBotRxjs

Main monorepo for the ChatBot fullstack application. Composed of two independent submodules — a frontend and a backend — each maintained in their own repository.

---

## Project Structure

ChatBotRxjs/
├── ChatBotFE/          # Angular frontend submodule
├── ChatBotBE/          # Node.js backend submodule
├── .gitmodules
├── .gitignore
└── README.md

---

## Submodules

- [ChatBotFE](https://github.com/Adrian55Stack/ChatBotFE) — Angular 19 frontend, handles UI and API calls towards the backend
- [ChatBotBE](https://github.com/Adrian55Stack/ChatBotBE) — Node.js backend, receives client calls and forwards them to Grok AI

---

## Getting Started

### Clone with submodules

```bash
git clone --recurse-submodules https://github.com/Adrian55Stack/ChatBotRxjs
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

### Update submodules to latest

```bash
git submodule update --remote
```

---

## Prerequisites

- Node.js v18+
- npm v9+
- A valid Grok API key

---

## CI/CD

GitHub Actions workflows are defined in `.github/workflows/` and run on every push to `main` and on pull requests. Each submodule has its own independent pipeline.

---

## .gitignore Setup

| File | Scope |
|------|-------|
| `/.gitignore` | Root — ignores workflow artifacts, editor files, OS files |
| `/ChatBotFE/.gitignore` | Angular-specific — `node_modules`, `dist`, `coverage` |
| `/ChatBotBE/.gitignore` | Node.js-specific — `node_modules`, `coverage`, `.env` |