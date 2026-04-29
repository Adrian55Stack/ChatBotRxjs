# ChatBot RxJS — AI Chatbot

A full-stack AI chatbot application built with **Angular** (frontend) and **Node.js** (backend). The frontend leverages RxJS for reactive data streams, while the backend exposes a REST API that proxies messages to a **LLaMA** language model via the Groq API.

---

## Project Structure

```
ChatBotRxjs/
├── ChatBotFE/          # Angular frontend
├── ChatBotBE/          # Node.js backend
├── .gitignore          # Root-level gitignore
├── sonar-project.properties
└── README.md
```

---

## Frontend — ChatBotFE

Built with **Angular** and **RxJS**, the frontend manages all user interactions and AI responses through reactive streams using observables, subjects, and pipeable operators.

### Tech Stack

- Angular
- TypeScript
- RxJS — observables, subjects, async pipes
- Node.js (Angular CLI tooling)

### Setup

```bash
cd ChatBotFE
npm install
```

### Run

```bash
npm start
```

The app runs at `http://localhost:4200` by default.

### Test

```bash
npm run test
```

### Build

```bash
npm run build
```

Output is generated in `ChatBotFE/dist/`.

---

## Backend — ChatBotBE

A lightweight **Node.js + Express** server that exposes a REST API endpoint. Incoming messages from the frontend are forwarded to a **LLaMA 3.3 70B** model via the Groq API and the response is returned to the client.

### Tech Stack

- Node.js
- Express
- Groq SDK (LLaMA 3.3 70B)
- dotenv

### Setup

```bash
cd ChatBotBE
npm install
```

Create a `.env` file in `ChatBotBE/`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run

```bash
npm start
```

The server runs at `http://localhost:4000`.

### Test

```bash
npm run test
npm run test:coverage   # with coverage report
```

### Build

No compilation step required — Node.js runs the source directly.

---

## CI/CD

GitHub Actions workflows are defined in `.github/workflows/` and run on every push to `main` and on pull requests.

The pipeline:
1. Checks out the repository
2. Installs dependencies for each project
3. Runs tests and generates coverage reports

---

## .gitignore Setup

The project uses three `.gitignore` files:

| File | Scope |
|------|-------|
| `/.gitignore` | Root — ignores workflow artifacts, editor files, OS files |
| `/ChatBotFE/.gitignore` | Angular-specific — `node_modules`, `dist`, `coverage` |
| `/ChatBotBE/.gitignore` | Node.js-specific — `node_modules`, `coverage`, `.env` |

> ⚠️ Never commit your `.env` file. Your `GROQ_API_KEY` should be stored as a GitHub Actions secret and injected at runtime.

---

## Prerequisites

- Node.js v18+
- npm v9+
- A valid [Groq API key](https://console.groq.com)