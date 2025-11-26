"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  IconGridDots,
  IconEye,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";

import type { Pattern } from "@/types/pattern";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PatternPreview } from "./pattern-preview";
import { PatternCopyButton } from "./pattern-copy-button";
import { usePatternBookmarks } from "@/hooks/use-pattern-bookmarks";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PatternGalleryProps {
  patterns: Pattern[];
  initialCategory?: string;
  hideCategoryFilters?: boolean;
  showBookmarkButton?: boolean;
}

export function PatternGallery({
  patterns,
  initialCategory = "all",
  hideCategoryFilters = false,
  showBookmarkButton = true,
}: PatternGalleryProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [query, setQuery] = useState("");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { bookmarkedIds, toggleBookmark, isBookmarked } =
    usePatternBookmarks();

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory]);

  const baseCategories = useMemo(() => {
    const unique = Array.from(
      new Set(patterns.map((pattern) => pattern.category))
    );
    return ["all", ...unique];
  }, [patterns]);

  const hasBookmarks = bookmarkedIds.length > 0;

  const categories = useMemo(() => {
    if (hasBookmarks) {
      return ["bookmarked", ...baseCategories];
    }
    return baseCategories;
  }, [baseCategories, hasBookmarks]);

  const filteredPatterns = useMemo(() => {
    return patterns.filter((pattern) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "bookmarked"
          ? bookmarkedIds.includes(pattern.id)
          : pattern.category.toLowerCase() === selectedCategory.toLowerCase());
      const matchesQuery =
        !query.trim() ||
        pattern.name.toLowerCase().includes(query.toLowerCase()) ||
        pattern.category.toLowerCase().includes(query.toLowerCase()) ||
        pattern.description?.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [patterns, query, selectedCategory, bookmarkedIds]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatterns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatterns = filteredPatterns.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  useEffect(() => {
    if (
      previewIndex !== null &&
      (paginatedPatterns.length === 0 || previewIndex >= paginatedPatterns.length)
    ) {
      setPreviewIndex(null);
      setIsPreviewOpen(false);
    }
  }, [paginatedPatterns, previewIndex]);

  // Find the actual index in filteredPatterns for preview
  const getPreviewPattern = () => {
    if (previewIndex === null) return null;
    const actualIndex = startIndex + previewIndex;
    return filteredPatterns[actualIndex] || null;
  };

  const previewPattern = getPreviewPattern();

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const handleNext = () => {
    if (!filteredPatterns.length) return;
    const currentActualIndex =
      previewIndex !== null ? startIndex + previewIndex : 0;
    const nextIndex = (currentActualIndex + 1) % filteredPatterns.length;
    const nextPage = Math.floor(nextIndex / itemsPerPage) + 1;
    const nextPageIndex = nextIndex % itemsPerPage;

    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
    }
    setPreviewIndex(nextPageIndex);
  };

  const handlePrev = () => {
    if (!filteredPatterns.length) return;
    const currentActualIndex =
      previewIndex !== null
        ? startIndex + previewIndex
        : filteredPatterns.length - 1;
    const prevIndex =
      (currentActualIndex - 1 + filteredPatterns.length) %
      filteredPatterns.length;
    const prevPage = Math.floor(prevIndex / itemsPerPage) + 1;
    const prevPageIndex = prevIndex % itemsPerPage;

    if (prevPage !== currentPage) {
      setCurrentPage(prevPage);
    }
    setPreviewIndex(prevPageIndex);
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
        {!hideCategoryFilters ? (
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
                  : category === "bookmarked"
                    ? "Bookmarks"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {showBookmarkButton ? (
        <div className="flex justify-end">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-dotted"
          >
            <Link href="/patterns/bookmarks">
              <IconHeart className="mr-2 size-4" />
              Saved patterns
              {hasBookmarks ? ` (${bookmarkedIds.length})` : ""}
            </Link>
          </Button>
        </div>
      ) : null}

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
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPatterns.map((pattern, index) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                onPreview={() => openPreview(index)}
                isBookmarked={isBookmarked(pattern.id)}
                onToggleBookmark={() => toggleBookmark(pattern.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 pt-6">
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {startIndex + 1}-{Math.min(endIndex, filteredPatterns.length)}
                </span>{" "}
                of {filteredPatterns.length} patterns
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(1, prev - 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={cn(
                        currentPage === 1 && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) => {
                    if (page === "ellipsis") {
                      return (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page as number);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          isActive={currentPage === page}
                          className="rounded-full border-dotted"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={cn(
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
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
          isBookmarked={previewPattern ? isBookmarked(previewPattern.id) : false}
          onToggleBookmark={() => {
            if (!previewPattern) return;
            toggleBookmark(previewPattern.id);
          }}
        />
      ) : null}
    </section>
  );
}

function PatternCard({
  pattern,
  onPreview,
  isBookmarked,
  onToggleBookmark,
}: {
  pattern: Pattern;
  onPreview: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
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
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-dotted border-border/70 bg-background/70 shadow-[0_20px_80px_rgba(0,0,0,0.05)] backdrop-blur cursor-pointer transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60",
        isBookmarked &&
          "border-emerald-400/60 shadow-[0_25px_60px_rgba(16,185,129,0.2)]"
      )}
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
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggleBookmark();
          }}
          aria-pressed={isBookmarked}
          className={cn(
            "absolute top-3 left-3 z-10 flex items-center justify-center rounded-full border border-white/20 bg-background/80 p-1.5 text-foreground transition hover:bg-background/90",
            isBookmarked && "border-emerald-400/60 text-emerald-500"
          )}
        >
          {isBookmarked ? (
            <IconHeartFilled className="size-4" />
          ) : (
            <IconHeart className="size-4" />
          )}
          <span className="sr-only">
            {isBookmarked ? "Remove bookmark" : "Bookmark pattern"}
          </span>
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
            {isBookmarked ? (
              <Badge
                variant="outline"
                className="rounded-full border-emerald-500/40 text-emerald-500"
              >
                Bookmarked
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
