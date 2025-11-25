import type { Metadata } from "next";

import { siteConfig } from "@/config";
import { gridPatterns } from "@/content/patterns";
import { PatternBookmarksView } from "./pattern-bookmarks-view";

export const metadata: Metadata = {
  title: "Bookmarked Patterns | Emerald Flow",
  description:
    "Access your saved background patterns and gradients for Emerald Flow. Quickly preview and copy bookmarked designs.",
  alternates: { canonical: "/patterns/bookmarks" },
  openGraph: {
    title: "Bookmarked Patterns | Emerald Flow",
    description:
      "Access your saved background patterns and gradients for Emerald Flow.",
    url: `${siteConfig.url}/patterns/bookmarks`,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Emerald Flow - Bookmarked Patterns",
      },
    ],
  },
};

export default function BookmarkedPatternsPage() {
  return (
    <div className="space-y-10">
      <PatternBookmarksView patterns={gridPatterns} />
    </div>
  );
}


