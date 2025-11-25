"use client";

import type { Pattern } from "@/types/pattern";
import { usePatternBookmarks } from "@/hooks/use-pattern-bookmarks";
import { PatternGallery } from "../_components/pattern-gallery";
import { Button } from "@/components/ui/button";
import { IconHeart, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

interface PatternBookmarksViewProps {
  patterns: Pattern[];
}

export function PatternBookmarksView({ patterns }: PatternBookmarksViewProps) {
  const { bookmarkedIds } = usePatternBookmarks();
  const bookmarkedPatterns = patterns.filter((pattern) =>
    bookmarkedIds.includes(pattern.id)
  );

  if (bookmarkedPatterns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dotted p-16 text-center space-y-6">
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 p-5">
          <IconHeart className="size-8 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">No bookmarks yet</h2>
          <p className="text-muted-foreground">
            Tap the heart icon on any pattern to save it here for quick access.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/patterns">
            <IconArrowLeft className="mr-2 size-4" />
            Explore patterns
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-600">
          <IconHeart className="size-4" />
          Saved patterns
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Your bookmarked gradients & textures
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Quickly revisit the backgrounds you loved. Use the preview to see them
          on the landing page and copy Tailwind/CSS with one click.
        </p>
      </div>

      <PatternGallery
        patterns={patterns}
        initialCategory="bookmarked"
        hideCategoryFilters
        showBookmarkButton={false}
      />
    </div>
  );
}
