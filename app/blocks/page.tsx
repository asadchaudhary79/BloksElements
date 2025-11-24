import type { Metadata } from "next";
import Link from "next/link";

import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { blocksMetadata } from "@/content/blocks-metadata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconArrowRight,
  IconFileCode,
  IconFolder,
  IconSparkles,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Blocks Library | Emerald Flow",
  description:
    "Browse every category of ready-to-use shadcn/ui blocks. Preview, copy, and ship faster.",
  alternates: { canonical: "/blocks" },
};

export default function BlocksLibraryPage() {
  const totalBlocks = blocksMetadata.length;
  const totalCategories = blocksCategoriesMetadata.length;

  return (
    <div className="flex flex-col gap-16">
      <section className="rounded-[32px] border border-dotted border-border/60 bg-linear-to-b from-background/80 to-background/30 p-10 shadow-[0_30px_120px_rgba(15,23,42,0.12)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6 max-w-2xl">
            <Badge
              variant="outline"
              className="text-xs uppercase tracking-[0.3em]"
            >
              Library
            </Badge>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Explore every block
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Quickly browse curated categories of dashboards, AI tools, auth
                flows, and more. Each block is production-ready, theme-aware,
                and built on shadcn/ui + Tailwind CSS.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="rounded-2xl border border-dotted px-5 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Blocks
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  {totalBlocks}+
                </p>
              </div>
              <div className="rounded-2xl border border-dotted px-5 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Categories
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  {totalCategories}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/docs">
                  Start Building
                  <IconArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2"
              >
                <Link href="/patterns">Browse patterns</Link>
              </Button>
            </div>
          </div>
          <Card className="w-full max-w-md border border-emerald-500/30 bg-emerald-500/5">
            <CardHeader>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                <IconSparkles className="size-4" />
                Preview Tips
              </div>
              <CardTitle className="text-2xl">Copy smarter</CardTitle>
              <CardDescription className="text-base">
                Every block ships with ready JSX, responsive layouts, and
                dark-mode polish. Click any category below to preview the entire
                set.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {[
                "Works with Next.js App Router",
                "No vendor lock-in — copy & own the code",
                "Perfect for dashboards, SaaS, marketing",
              ].map((tip) => (
                <div
                  key={tip}
                  className="flex items-center gap-2 rounded-full border border-dotted border-emerald-500/20 px-4 py-2 text-emerald-100/80"
                >
                  <span className="size-2 rounded-full bg-emerald-400" />
                  {tip}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3">
          <Badge
            variant="outline"
            className="text-xs uppercase tracking-[0.3em]"
          >
            Categories
          </Badge>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Explore Categories
              </h2>
              <p className="text-lg text-muted-foreground">
                Browse {totalCategories} curated collections with {totalBlocks}+
                blocks.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2"
            >
              <Link href="/docs">
                See blocks in action
                <IconArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blocksCategoriesMetadata.map((block) => (
            <Link
              href={`/${block.id}`}
              key={`${block.id}-${block.name}`}
              className="group"
            >
              <Card className="relative h-full overflow-hidden border border-white/10 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:border-emerald-500/60 hover:shadow-[0_25px_45px_rgba(16,185,129,0.25)]">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 via-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="relative pb-6">
                  <div className="relative mb-8">
                    <div className="aspect-video w-full rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center overflow-hidden shadow-inner shadow-black/40 transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/20">
                      <block.thumbnail className="h-full w-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <div className="absolute -bottom-4 left-5 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 shadow-lg shadow-emerald-500/20">
                      <IconFileCode className="size-3.5" />
                      {block.count} blocks
                    </div>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                      {block.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Curated components for modern UI.
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="relative pt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <IconFolder className="size-4 text-emerald-500/80" />
                      <span className="font-medium">View details</span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                      Explore
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
