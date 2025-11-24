# Emerald Flow

Emerald Flow is a curated library of **Next.js + shadcn/ui** building blocks, background patterns, and documentation helpers. Every component is production-ready, WCAG-friendly, and themed for the emerald glow aesthetic used throughout the app.

- ✨ 60+ blocks across 10 categories (dialogs, AI layouts, stats, tables, cards, etc.)
- 🌌 Gradient/pattern gallery with Tailwind + plain CSS snippets
- 📚 Full-width docs experience with code editor, search, pagination, and quick-start recipes
- 🧱 Registry compatible with the shadcn CLI (`@emeraldflow/*`)

Live site: [emeraldflow.dev](https://bloks-elements.vercel.app/) · [Docs](https://bloks-elements.vercel.app/docs)

---

## Quick Start

### 1. Configure the registry

Add the remote registry to your `components.json` file:

```json
{
  "registries": {
    "@emeraldflow": "https://bloks-elements.vercel.app/r/{name}.json"
  }
}
```

### 2. Install a block

```bash
# Login form
npx shadcn@latest add @emeraldflow/login-01

# Dialog variation
npx shadcn@latest add @emeraldflow/dialog-07

# Sidebar workspace
npx shadcn@latest add @emeraldflow/sidebar-04
```

### 3. Direct registry URL (optional)

```bash
npx shadcn@latest add https://bloks-elements.vercel.app/r/login-01.json
```

---

## Features

- **Theme-ready UI** – Tailwind tokens, linear gradients, and glow backdrops tuned for dark+light
- **Patterns gallery** – copy Tailwind or plain CSS for 60+ gradient/mesh backgrounds
- **Docs workspace** – sidebar navigation, live file tree editor, block search, and pagination
- **Copy-first UX** – every block ships with preview, pagination, installation command, and code sample
- **Open source** – MIT-licensed, no hidden dependencies, own the code you copy

---

## Project Structure

```
blocks/
├── app/                    # Next.js 16 app router routes (landing, docs, blocks, patterns)
├── components/             # Layout + UI primitives (header, footer, registry setup, etc.)
├── content/
│   ├── components/         # Block implementations grouped by category
│   ├── markdown/           # MDX docs for each block
│   ├── blocks-metadata.ts  # Registry metadata
│   ├── blocks-categories.tsx
│   └── patterns.ts         # Gradient/pattern definitions
├── public/r/               # Generated JSON registry entries
├── scripts/                # Registry generation + markdown helpers
└── config.ts               # Site metadata + external links
```

---

## Scripts

```bash
bun run dev             # Start Next.js dev server (Turbopack)
bun run build           # Production build
bun run start           # Start production server

bun run generate:registry    # Build /public/r/*.json index
bun run generate:markdown    # Sync MDX docs
bun run validate:registry    # Sanity check registry entries

bunx ultracite lint          # Biome lint
```

---

## Contributing

We love contributions! Please read the [contributing guide](./CONTRIBUTING.md) for development setup, scripts, and pull-request workflow.

---

## License

Licensed under the [MIT license](https://github.com/asadchaudhary79/BloksElements/blob/main/LICENSE.md).
