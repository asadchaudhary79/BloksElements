"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "emerald-flow-pattern-bookmarks";

export function usePatternBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookmarkedIds(parsed);
        }
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Failed to read bookmarks", error);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isInitialized) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch (error) {
      console.error("Failed to persist bookmarks", error);
    }
  }, [bookmarkedIds, isInitialized]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarkedIds.includes(id),
    [bookmarkedIds]
  );

  return { bookmarkedIds, toggleBookmark, isBookmarked };
}
