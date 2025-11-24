import type { Metadata } from "next";

import { gridPatterns } from "@/content/patterns";
import { PatternGallery } from "./_components/pattern-gallery";

export const metadata: Metadata = {
  title: "Patterns | Emerald Flow",
  description:
    "Curated collection of gradient, glow, and grid patterns ready to copy into your projects.",
  openGraph: {
    title: "Patterns | Emerald Flow",
    description:
      "Browse 100+ decorative, gradient, and geometric backgrounds ready to copy into your project.",
  },
};

export default function PatternsPage() {
  const totalPatterns = gridPatterns.length;
  const totalCategories = new Set(gridPatterns.map((pattern) => pattern.category)).size;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="rounded-[32px] border border-dotted border-border/60 bg-linear-to-b from-background/80 to-background/30 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-dotted px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Patterns Library
            </p>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Copy beautiful gradients & textures
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                Drop-in backgrounds inspired by real-world UI kits. Preview every style,
                then copy the JSX snippet to bring the exact glow into your layout. Each
                pattern is theme-aware and crafted for production interfaces.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="rounded-2xl border border-dotted px-4 py-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Total patterns
                </p>
                <p className="text-xl font-semibold text-foreground">{totalPatterns}</p>
              </div>
              <div className="rounded-2xl border border-dotted px-4 py-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Categories
                </p>
                <p className="text-xl font-semibold text-foreground">{totalCategories}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-dotted border-emerald-500/30 bg-linear-to-b from-emerald-500/10 via-emerald-500/5 to-transparent p-5 text-sm text-foreground shadow-[0_20px_80px_rgba(16,185,129,0.15)]">
            <p className="font-semibold">How to use</p>
            <ol className="mt-3 space-y-2 text-muted-foreground">
              <li>1. Browse the previews and pick a vibe.</li>
              <li>2. Click “Copy code”.</li>
              <li>3. Paste inside any container on your page.</li>
            </ol>
          </div>
        </div>
      </section>

      <PatternGallery patterns={gridPatterns} />
    </div>
  );
}


