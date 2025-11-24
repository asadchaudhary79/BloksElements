import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { blocksMetadata } from "@/content/blocks-metadata";
import { gridPatterns } from "@/content/patterns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconRocket,
  IconCode,
  IconSparkles,
  IconCopy,
  IconFileCode,
  IconFolder,
  IconHeart,
  IconCheck,
  IconBrandGithub,
  IconShield,
  IconChartBar,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Shadcn Blocks - 60+ Free shadcn/ui Components for React",
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shadcn Blocks - 60+ Free shadcn/ui Components for React",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "blockselements.co",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "blockselements.co - Free shadcn/ui blocks and components",
      },
    ],
  },
};

export default function Home() {
  const totalBlocks = blocksMetadata.length;
  const totalCategories = blocksCategoriesMetadata.length;
  const totalPatterns = gridPatterns.length;
  const latestBlocks = [...blocksMetadata].slice(-4).reverse();
  const latestPatterns = [...gridPatterns].slice(-4).reverse();
  const categoryLabelMap = Object.fromEntries(
    blocksCategoriesMetadata.map((category) => [category.id, category.name])
  );

  return (
    <div className="w-full space-y-32 pb-24">
      {/* Hero Section */}
      <section className="space-y-10 text-center max-w-5xl mx-auto pt-16 pb-8">
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge
              variant="secondary"
              className="text-sm px-4 py-1.5 border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              <IconSparkles className="size-3.5 mr-1.5" />
              Latest drop · {latestPatterns[0]?.name ?? "Fresh patterns"}
            </Badge>
          </div>

          <div className="space-y-6">
            <h1 className="font-bold text-5xl/[1.1] text-foreground tracking-tight md:text-6xl/[1.1] lg:text-7xl/[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Ship polished React UI
              <span className="block bg-linear-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-300 dark:to-emerald-500">
                with blocks & patterns
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              Clean, modern building blocks paired with atmospheric background patterns.
              Copy the JSX, drop it in your Next.js app, and keep shipping. Open source,
              theme aware, and updated every week.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
          <Button
            asChild
            size="lg"
            className="text-base h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
          >
            <Link href="/docs">
              <IconRocket className="size-5" />
              Explore Blocks
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base h-12 px-8 border-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
          >
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <IconBrandGithub className="size-5" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="pt-8">
          <div className="grid gap-4 border border-border/60 rounded-3xl bg-background/40 p-6 sm:grid-cols-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Blocks
              </p>
              <p className="text-3xl font-semibold">{totalBlocks}+</p>
              <p className="text-sm text-muted-foreground">
                Production-ready shadcn/ui compositions
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Categories
              </p>
              <p className="text-3xl font-semibold">{totalCategories}</p>
              <p className="text-sm text-muted-foreground">
                From AI dashboards to marketing pages
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Patterns
              </p>
              <p className="text-3xl font-semibold">{totalPatterns}</p>
              <p className="text-sm text-muted-foreground">
                Gradient backdrops ready for any layout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Build beautiful, accessible user interfaces with our comprehensive
            component library
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
            <CardHeader className="pb-4">
              <div className="size-14 rounded-xl bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconSparkles className="size-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-xl">Beautiful & Accessible</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                All blocks follow WCAG guidelines and use Radix UI primitives
                for maximum accessibility.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
            <CardHeader className="pb-4">
              <div className="size-14 rounded-xl bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconCode className="size-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-xl">Type-Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Full TypeScript support with proper types and IntelliSense
                autocomplete for the best developer experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
            <CardHeader className="pb-4">
              <div className="size-14 rounded-xl bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconRocket className="size-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-xl">Framework Agnostic</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Works with any React framework - Next.js, Remix, Vite, and more.
                No vendor lock-in.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
            <CardHeader className="pb-4">
              <div className="size-14 rounded-xl bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconCopy className="size-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-xl">Copy & Own</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                No dependencies. Copy the code and own it completely. Customize
                freely.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Latest Drops Section */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            Fresh drops
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            New patterns & blocks
          </h2>
          <p className="text-lg text-muted-foreground">
            We add new gradients and ready-to-ship blocks every week. Here’s what just landed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2">
            <CardHeader className="space-y-3">
              <Badge variant="secondary" className="w-fit bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20">
                Patterns
              </Badge>
              <CardTitle className="text-2xl">Latest background vibes</CardTitle>
              <CardDescription>
                Drop these gradients behind your hero sections, pricing tables, and product shots.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {latestPatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card/60 p-3"
                >
                  <div className="relative size-12 rounded-xl border border-white/10 overflow-hidden">
                    <div className="absolute inset-0" style={pattern.style} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">{pattern.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {pattern.category} pattern
                    </p>
                  </div>
                  {pattern.badge ? (
                    <Badge variant="outline" className="text-xs">
                      {pattern.badge}
                    </Badge>
                  ) : null}
                </div>
              ))}
              <Button asChild variant="outline" size="lg" className="w-full rounded-full border-2">
                <Link href="/patterns">Browse patterns</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="space-y-3">
              <Badge variant="secondary" className="w-fit bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20">
                Blocks
              </Badge>
              <CardTitle className="text-2xl">Newest component drops</CardTitle>
              <CardDescription>
                From AI chat layouts to dialog flows — here are the latest blocks in the library.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {latestBlocks.map((block) => (
                <Link
                  key={block.id}
                  href={`/${block.category}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card/60 p-3 transition hover:border-emerald-500/60 hover:-translate-y-0.5"
                >
                  <div className="size-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 flex items-center justify-center">
                    <IconFileCode className="size-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">{block.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {categoryLabelMap[block.category] ?? block.category}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs uppercase tracking-[0.2em]">
                    New
                  </Badge>
                </Link>
              ))}
              <Button asChild size="lg" className="w-full rounded-full">
                <Link href="/blocks">View all categories</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pattern Spotlight */}
      <section className="relative overflow-hidden rounded-[32px] border border-emerald-500/20 bg-background p-10">
        <div
          className="absolute inset-0 opacity-70"
          style={latestPatterns[0]?.style}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/70 to-background/90" />
        <div className="relative grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/30 w-fit">
              Design + Build
            </Badge>
            <h3 className="text-4xl font-bold text-white">
              Pair gradients with ready-made blocks
            </h3>
            <p className="text-lg text-white/80">
              Use patterns from the new gallery to make every section feel intentional. Combine
              them with dashboard-ready blocks and your app feels premium instantly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-emerald-700 hover:bg-slate-100">
                <Link href="/patterns">Open pattern gallery</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white/60 text-white hover:bg-white/10">
                <Link href="/blocks">Browse block categories</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/30 bg-black/30 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Featured pattern
            </p>
            <h4 className="mt-2 text-2xl font-semibold text-white">
              {latestPatterns[0]?.name}
            </h4>
            <p className="mt-2 text-white/70 text-sm">
              {latestPatterns[0]?.description ??
                "A soft glow designed to center attention on your hero content."}
            </p>
            <div className="mt-6 space-y-3 text-white/80 text-sm">
              <div className="flex items-center justify-between">
                <span>Category</span>
                <span className="capitalize">{latestPatterns[0]?.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Copy options</span>
                <span>Tailwind CSS · Plain CSS</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Blocks Preview */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            Popular
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Popular Blocks
          </h2>
          <p className="text-lg text-muted-foreground">
            Most used components by developers worldwide
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Login Forms",
              count: 9,
              category: "login",
              icon: IconShield,
            },
            {
              name: "Dialogs",
              count: 12,
              category: "dialogs",
              icon: IconSparkles,
            },
            {
              name: "File Upload",
              count: 6,
              category: "file-upload",
              icon: IconFileCode,
            },
            {
              name: "Stats Cards",
              count: 12,
              category: "stats",
              icon: IconChartBar,
            },
            {
              name: "Sidebars",
              count: 6,
              category: "sidebar",
              icon: IconFolder,
            },
            { name: "AI Chat", count: 6, category: "ai", icon: IconRocket },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.category} href={`/${item.category}`}>
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 hover:-translate-y-1 border-2 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="size-12 rounded-lg bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="size-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      >
                        {item.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <IconCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-medium">Ready to use</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <Card className="border-2 bg-linear-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-500/20 dark:via-emerald-500/10 dark:to-transparent overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <CardHeader className="text-center space-y-6 pb-8 relative">
            <div className="size-20 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
              <IconHeart className="size-10 text-white" />
            </div>
            <div className="space-y-3">
              <CardTitle className="text-4xl md:text-5xl font-bold">
                Ready to Build Something Amazing?
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                Join thousands of developers using Blocks Elements to create
                beautiful, accessible interfaces. Start building today.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8 relative">
            <Button
              asChild
              size="lg"
              className="text-base h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
            >
              <Link href="/docs">
                <IconRocket className="size-5" />
                Explore All Blocks
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base h-12 px-8 border-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
            >
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <IconBrandGithub className="size-5" />
                Star on GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
