"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { IconGridDots, IconEye } from "@tabler/icons-react";

import type { Pattern } from "@/types/pattern";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PatternPreview } from "./pattern-preview";
import { PatternCopyButton } from "./pattern-copy-button";

interface PatternGalleryProps {
  patterns: Pattern[];
}

export function PatternGallery({ patterns }: PatternGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(patterns.map((pattern) => pattern.category))
    );
    return ["all", ...unique];
  }, [patterns]);

  const filteredPatterns = useMemo(() => {
    return patterns.filter((pattern) => {
      const matchesCategory =
        selectedCategory === "all" ||
        pattern.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery =
        !query.trim() ||
        pattern.name.toLowerCase().includes(query.toLowerCase()) ||
        pattern.category.toLowerCase().includes(query.toLowerCase()) ||
        pattern.description?.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [patterns, query, selectedCategory]);

  useEffect(() => {
    if (
      previewIndex !== null &&
      (filteredPatterns.length === 0 || !filteredPatterns[previewIndex])
    ) {
      setPreviewIndex(null);
      setIsPreviewOpen(false);
    }
  }, [filteredPatterns, previewIndex]);

  const previewPattern =
    previewIndex !== null ? filteredPatterns[previewIndex] : null;

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const handleNext = () => {
    if (!filteredPatterns.length) return;
    setPreviewIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % filteredPatterns.length;
    });
  };

  const handlePrev = () => {
    if (!filteredPatterns.length) return;
    setPreviewIndex((prev) => {
      if (prev === null) return filteredPatterns.length - 1;
      return (prev - 1 + filteredPatterns.length) % filteredPatterns.length;
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-2 md:max-w-md">
          <label className="text-sm font-medium text-muted-foreground">
            Search patterns
          </label>
          <Input
            placeholder="Search by name, category or vibe..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 rounded-full border-dotted bg-background/60 backdrop-blur-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full border border-dotted px-4 py-1.5 text-sm transition-all",
                selectedCategory === category
                  ? "bg-foreground text-background shadow-lg shadow-emerald-500/20"
                  : "bg-background/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {category === "all"
                ? "All"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredPatterns.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dotted p-12 text-center">
          <IconGridDots className="mb-4 size-10 text-muted-foreground" />
          <p className="text-lg font-semibold">No patterns found</p>
          <p className="text-muted-foreground">
            Try adjusting your search or category filters to discover more
            gradients and textures.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatterns.map((pattern, index) => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              onPreview={() => openPreview(index)}
            />
          ))}
        </div>
      )}

      {previewPattern ? (
        <PatternPreview
          pattern={previewPattern}
          open={isPreviewOpen}
          onOpenChange={(open) => {
            setIsPreviewOpen(open);
            if (!open) {
              setPreviewIndex(null);
            }
          }}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      ) : null}
    </section>
  );
}

function PatternCard({
  pattern,
  onPreview,
}: {
  pattern: Pattern;
  onPreview: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onPreview();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Preview ${pattern.name}`}
      onClick={onPreview}
      onKeyDown={handleKeyDown}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-dotted border-border/70 bg-background/70 shadow-[0_20px_80px_rgba(0,0,0,0.05)] backdrop-blur cursor-pointer transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
    >
      <div className="relative h-56 overflow-hidden border-b border-dotted">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={pattern.style}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-linear-to-br from-background/5 via-transparent to-background/15" />
        <button
          onClick={(event) => {
            event.stopPropagation();
            onPreview();
          }}
          className="absolute top-3 right-3 z-10 rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background/90"
        >
          <IconEye className="mr-1.5 inline size-3.5" />
          Preview
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {pattern.name}
              </h3>
              {pattern.description ? (
                <p className="text-sm text-muted-foreground">
                  {pattern.description}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {pattern.category.charAt(0).toUpperCase() +
                    pattern.category.slice(1)}{" "}
                  pattern
                </p>
              )}
            </div>
            {pattern.badge ? (
              <Badge
                variant="default"
                className="bg-emerald-500/20 text-emerald-600"
              >
                {pattern.badge}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-dotted px-3 py-1 text-xs"
          >
            {pattern.category}
          </Badge>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full border-dotted"
              onClick={(event) => {
                event.stopPropagation();
                onPreview();
              }}
            >
              <IconEye className="mr-2 size-4" />
              Preview
            </Button>
            <PatternCopyButton size="sm" variant="outline" pattern={pattern} />
          </div>
        </div>
      </div>
    </div>
  );
}
