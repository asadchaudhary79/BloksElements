"use client";

import { siteConfig } from "@/config";
import type { Pattern } from "@/types/pattern";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatternCopyButton } from "./pattern-copy-button";

interface PatternPreviewProps {
  pattern: Pattern;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PatternPreview({
  pattern,
  open,
  onOpenChange,
  onNext,
  onPrev,
}: PatternPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[95vw] lg:max-w-[1200px] w-full h-[95vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-4 pb-3 border-b border-dotted bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                {pattern.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Live preview on landing page
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-full border border-dotted">
                <button
                  className="px-3 py-1 text-sm font-medium text-foreground hover:bg-muted rounded-l-full transition-colors"
                  onClick={onPrev}
                >
                  <IconChevronLeft className="inline size-4 mr-1" />
                  Prev
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-foreground hover:bg-muted rounded-r-full border-l border-dotted transition-colors"
                  onClick={onNext}
                >
                  Next
                  <IconChevronRight className="inline size-4 ml-1" />
                </button>
              </div>
              <PatternCopyButton
                variant="outline"
                size="sm"
                pattern={pattern}
              />
              <Badge variant="outline" className="rounded-full">
                {pattern.category}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-background">
          <div className="relative min-h-full" style={pattern.style}>
            {/* Mock Landing Page Content */}
            <div className="relative z-10">
              {/* Header */}
              <header className="sticky top-0 z-50 border-b border-white/10 dark:border-white/5 bg-background/90 dark:bg-background/80 backdrop-blur-md">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <span className="text-white text-sm font-bold">BE</span>
                      </div>
                      <span className="font-semibold text-lg text-foreground">
                        {siteConfig.name}
                      </span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                      <a
                        href="#"
                        className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                      >
                        Components
                      </a>
                      <a
                        href="#"
                        className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                      >
                        Patterns
                      </a>
                      <a
                        href="#"
                        className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                      >
                        Docs
                      </a>
                      <Button size="sm" className="rounded-full">
                        Get Started
                      </Button>
                    </nav>
                  </div>
                </div>
              </header>

              {/* Hero Section */}
              <section className="relative py-24 sm:py-32">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                      Build beautiful interfaces
                      <span className="block text-emerald-600 dark:text-emerald-400 mt-2">
                        faster than ever
                      </span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                      Copy-paste components and patterns from our library. All
                      components are production-ready and fully customizable.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <Button size="lg" className="rounded-full">
                        Get Started
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full border-dotted"
                      >
                        View Components
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="py-24 sm:py-32">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Everything you need
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                      Build modern web applications with our component library.
                    </p>
                  </div>
                  <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {[
                      {
                        title: "Copy & Paste",
                        description:
                          "Copy components directly into your project. No dependencies required.",
                      },
                      {
                        title: "Fully Customizable",
                        description:
                          "All components are built with Tailwind CSS and fully customizable.",
                      },
                      {
                        title: "Production Ready",
                        description:
                          "Battle-tested components used in production applications.",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 dark:border-white/5 bg-background/70 dark:bg-background/60 backdrop-blur-sm p-8 shadow-lg"
                      >
                        <h3 className="text-lg font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-24 sm:py-32">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Ready to get started?
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                      Start building your next project with our component
                      library.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <Button size="lg" className="rounded-full">
                        Browse Components
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="border-t border-white/10 dark:border-white/5 bg-background/70 dark:bg-background/60 backdrop-blur-sm">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                  <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                             © 2024 {siteConfig.name}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Twitter
                      </a>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Docs
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

