import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { blocksMetadata } from "@/content/blocks-metadata";
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
  IconArrowRight,
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
              Free & Open Source
            </Badge>
          </div>

          <div className="space-y-6">
            <h1 className="font-bold text-5xl/[1.1] text-foreground tracking-tight md:text-6xl/[1.1] lg:text-7xl/[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Building Blocks
              <br />
              <span className="bg-linear-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-300 dark:to-emerald-500">
                for the Web
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              Clean, modern building blocks. Copy and paste into your apps.
              Works with all React frameworks. Open Source. Free forever.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450"></div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
          <Button
            asChild
            size="lg"
            className="text-base h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
          >
            <Link href="/demo">
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

      {/* Categories Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="text-xs uppercase tracking-wider"
            >
              Explore
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Explore Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse {totalCategories} categories with {totalBlocks}+
              ready-to-use blocks
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hidden md:flex border-2"
          >
            <Link href="/demo">
              View All
              <IconArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
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
                      <block.thumbnail className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
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
              <Link href="/demo">
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
