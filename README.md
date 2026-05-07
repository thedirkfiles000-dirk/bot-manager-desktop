# Bot Manager

A desktop app for authoring and managing roleplay chatbot profiles for platforms like **PolyBuzz** and **HotChatBots**.

If you've ever tried to write a bot prompt from scratch in a text box, you know the pain: no structure, no validation, no way to manage multiple bots, no idea why the bot keeps breaking character. Bot Manager solves that.

---

## What it does

Bot Manager gives you a structured editor for everything that goes into a bot profile:

- **Characters** — name, appearance, personality, backstory, relationships, skills, story hooks, behavior rules, pet names, dialog examples
- **World** — setting, scenario, canon anchors, triggers, supporting cast, lorebook, boundaries
- **RP Rules** — global and per-character
- **Progression Phases** — soft instructions for how the bot should evolve over the course of a conversation

When you're ready, export to Markdown, YAML, or JSON — formatted for your target platform.

### Key features

- **Variants** — maintain multiple versions of a bot (different scenarios, alternate personalities) without duplicating everything
- **Consistency checker** — flags structural issues and patterns that confuse LLMs before you export
- **Mask Sections** — binary-search tool for isolating content that triggers platform policy violations without losing your data
- **Image management** — upload and manage bot profile images
- **CAPS_KEYS mode** — renders field labels as `UPPER_SNAKE_CASE` in markdown output, which some LLMs respond to more reliably
- **Import/Export** — move bots between machines via JSON with full schema validation

---

## Built with

- [Tauri 2](https://tauri.app/) — Rust-backed desktop runtime (Windows, macOS, Linux)
- [Vue 3](https://vuejs.org/) + [Vuetify 4](https://vuetifyjs.com/) — UI
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vite 7](https://vite.dev/) — build tooling

---

## Building from source

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) — `npm install -g pnpm`
- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain)
- Tauri prerequisites for your OS — see [Tauri Prerequisites](https://tauri.app/start/prerequisites/)

### Development

```bash
pnpm install
pnpm run tauri:dev
```

### Production build

```bash
pnpm run tauri:build
```

Output is in `src-tauri/target/release/bundle/`.

---

## Data storage

Bots are stored locally at:

| OS      | Path |
|---------|------|
| Windows | `%APPDATA%\Bot Manager\bots\` |
| macOS   | `~/Library/Application Support/Bot Manager/bots/` |
| Linux   | `~/.local/share/Bot Manager/bots/` |

Each bot is a folder containing `bot.json` and any associated images. No accounts, no cloud, no telemetry.

---

## Status

Actively used and developed. Expect rough edges — this started as a personal tool and has grown from there. Bug reports and PRs welcome.

---

## License

[MIT](LICENSE)
