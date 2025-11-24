# Contributing

Thanks for helping shape **Emerald Flow**! This guide explains how to run the project locally, add new blocks/patterns, and submit changes to the shadcn-compatible registry.

## Development

### Prerequisites

- **Bun** - This project uses Bun as the package manager
- **Node.js 18+** - Required for Next.js

### Getting Started

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/BloksElements.git
   cd BloksElements
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Start the development server:

   ```bash
   bun run dev
   ```

   The development server will be available at `http://localhost:3000`.

### Scripts

```bash
# Development
bun run dev              # Start dev server with Turbopack
bun run build            # Build the project
bun run start            # Start production server

# Registry Management
bun run generate:registry    # Generate registry.json
bun run generate:markdown    # Generate MDX documentation
bun run validate:registry    # Validate registry structure

# Code Quality
bunx ultracite lint         # Lint codebase with Biome
```

### Project Structure

```
blocks/
├── app/                        # Next.js App Router routes (landing, docs, blocks, patterns)
├── components/                 # Shared UI + layout components
├── content/
│   ├── components/             # Block implementations grouped by category
│   ├── markdown/               # Generated MDX docs per block
│   ├── blocks-metadata.ts      # Registry metadata
│   ├── blocks-categories.tsx   # Category definitions
│   └── patterns.ts             # Gradient/pattern definitions
├── public/
│   └── r/                      # Generated registry JSON files
├── scripts/                    # Registry + doc generation helpers
└── config.ts                   # Global site metadata
```

### Adding New Blocks or Patterns

1. **Create the component/pattern**
   - Blocks → `content/components/{category}/{block-id}.tsx`
   - Patterns → append to `content/patterns.ts`
2. **Register metadata**
   - Blocks → `content/blocks-metadata.ts`
   - Categories (if new) → `content/blocks-categories.tsx`
3. **Map the component** in `content/blocks-components.tsx`
4. **Export from category index** (`content/components/{category}/index.ts`)
5. **Regenerate docs/registry**
   ```bash
   bun run generate:markdown
   bun run generate:registry
   ```

See [CLAUDE.md](./CLAUDE.md) for detailed component standards, prop naming conventions, and accessibility guidelines.

## Contributing Process

1. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b your-branch-name
   ```

2. Make your changes to the codebase.

3. Build and test the project:

   ```bash
   bun run build
   ```

4. Test the application to ensure your changes work as expected.

5. Run linting to ensure code quality:

   ```bash
   bunx ultracite lint
   ```

6. Commit your changes:

   ```bash
   git commit -m "Your descriptive commit message"
   ```

7. Push your changes to your fork:

   ```bash
   git push -u origin your-branch-name
   ```

8. Open a pull request on the original repository.

### PR Checklist

- [ ] Screenshots for visual changes (if UI)
- [ ] Lint + build succeeded
- [ ] Registry/MDX regenerated when necessary
- [ ] Added docs/metadata for new blocks

Thank you for contributing to Emerald Flow!
