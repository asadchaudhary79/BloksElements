"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconShadow,
  IconScreenshot,
  IconSnowflake,
  IconRocket,
  IconFileTypePdf,
  IconColorSwatch,
  IconLoader,
  IconSquareRounded,
  IconPolygon,
  IconWand,
  IconSparkles,
  IconFilter,
  IconSearch,
  IconX,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "CSS", "Tools", "Images"] as const;
type Category = (typeof CATEGORIES)[number];

const generators = [
  {
    id: "box-shadow",
    name: "Box Shadow Generator",
    description:
      "Create custom box shadows with interactive controls. Adjust offset, blur, spread, color, and opacity.",
    icon: IconShadow,
    href: "/generators/box-shadow",
    features: ["Visual Preview", "Live Updates", "CSS Export"],
    category: "CSS",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "code-screenshot",
    name: "Code Screenshot Generator",
    description:
      "Generate beautiful code screenshots with customizable themes, syntax highlighting, and styling options.",
    icon: IconScreenshot,
    href: "/generators/code-screenshot",
    features: ["Multiple Themes", "Syntax Highlighting", "Export Options"],
    category: "Tools",
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism Generator",
    description:
      "Create stunning glassmorphism effects with adjustable blur, transparency, borders, and gradients.",
    icon: IconSnowflake,
    href: "/generators/glassmorphism",
    features: ["Blur Control", "Transparency", "Gradient Support"],
    category: "CSS",
    createdAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "markdown-to-pdf",
    name: "Markdown to PDF Generator",
    description:
      "Convert Markdown text to PDF documents with customizable styling, fonts, and layout options.",
    icon: IconFileTypePdf,
    href: "/generators/markdown-to-pdf",
    features: ["Live Preview", "Custom Styling", "PDF Download"],
    category: "Tools",
    createdAt: "2024-02-15T00:00:00.000Z",
  },
  {
    id: "gradient",
    name: "Gradient Generator",
    description:
      "Create stunning CSS gradients with visual controls. Design linear and radial gradients with unlimited color stops.",
    icon: IconColorSwatch,
    href: "/generators/gradient",
    features: ["Visual Editor", "Multiple Stops", "CSS Export"],
    category: "CSS",
    createdAt: "2024-03-01T00:00:00.000Z",
  },
  {
    id: "loading-animation",
    name: "Loading Animation Generator",
    description:
      "Generate beautiful CSS loading animations. Choose from spinners, dots, bars, and custom animated effects.",
    icon: IconLoader,
    href: "/generators/loading-animation",
    features: ["Multiple Types", "Customizable", "CSS Export"],
    category: "CSS",
    createdAt: "2024-03-20T00:00:00.000Z",
  },
  {
    id: "fancy-border-radius",
    name: "Fancy Border Radius",
    description:
      "Create organic, blob-like shapes using advanced border-radius values. Perfect for modern, fluid designs.",
    icon: IconSquareRounded,
    href: "/generators/fancy-border-radius",
    features: ["8-Point Control", "Blob Maker", "Randomizer"],
    category: "CSS",
    createdAt: "2025-12-24T10:00:00.000Z", // Recent
  },
  {
    id: "clip-path",
    name: "Clip-Path Generator",
    description:
      "Create complex shapes using CSS clip-path. Choose from polygons, circles, ellipses, and insets.",
    icon: IconPolygon,
    href: "/generators/clip-path",
    features: ["Polygon Presets", "Custom Shapes", "Visual Editor"],
    category: "CSS",
    createdAt: "2025-12-25T08:00:00.000Z", // Recent
  },
  {
    id: "css-filters",
    name: "CSS Filters Generator",
    description:
      "Apply and combine CSS filters like blur, brightness, contrast, and saturation to create stunning image effects.",
    icon: IconWand,
    href: "/generators/css-filters",
    features: ["All CSS Filters", "Instagram Presets", "Live Preview"],
    category: "Images",
    createdAt: "2025-12-23T12:00:00.000Z", // Recent
  },
];

export default function GeneratorsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isNew = (dateString: string) => {
    const today = new Date();
    const createdDate = new Date(dateString);
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  const filteredAndSortedGenerators = useMemo(() => {
    return [...generators]
      .filter((g) => {
        const matchesCategory =
          activeCategory === "All" || g.category === activeCategory;
        const matchesSearch =
          g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.features.some((f) =>
            f.toLowerCase().includes(searchQuery.toLowerCase())
          );
        return matchesCategory && matchesSearch;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [activeCategory, searchQuery]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 pb-20">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-[40px] border border-white/5 bg-slate-950 p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 font-mono">
              <IconSparkles className="w-3.5 h-3.5 animate-pulse" />
              Creative Engine
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
                Powerful Tools for{" "}
                <span className="text-emerald-500">Developers</span>
              </h1>
              <p className="mt-4 text-lg text-slate-400 leading-relaxed font-medium">
                Production-quality generators to speed up your design process.
                Focus on building, we'll handle the complex CSS.
              </p>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-none">
                    Total Library
                  </p>
                  <p className="text-xl font-bold text-white mt-1 leading-none">
                    {generators.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Box in Header */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-md shadow-xl min-w-[280px]">
            <div className="flex items-center gap-2 mb-4 px-1">
              <IconFilter className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Filter By Category
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "h-10 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center border",
                    activeCategory === cat
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 hover:bg-emerald-500"
                      : "text-slate-400 border-white/5 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Action Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-950/50 p-3 rounded-[24px] border border-white/5 backdrop-blur-sm sticky top-4 z-20 shadow-2xl">
        <div className="relative flex-1 group w-full">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
          <Input
            placeholder="Search for tools (e.g. 'box shadow', 'clip-path')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 pr-12 bg-slate-900/50 border-white/10 focus-visible:ring-emerald-500/50 rounded-xl text-sm font-medium text-white transition-all placeholder:text-slate-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-all cursor-pointer"
            >
              <IconX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 px-2 shrink-0">
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest">
            <IconLayoutGrid className="w-4 h-4" />
            Latest First
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedGenerators.map((generator) => {
          const Icon = generator.icon;
          const isRecentlyAdded = isNew(generator.createdAt);

          return (
            <Link
              key={generator.id}
              href={generator.href}
              className="group h-full cursor-pointer"
            >
              <Card className="h-full bg-white/[0.02] border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/[0.02] transition-all duration-500 shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 rounded-[32px] relative overflow-hidden flex flex-col cursor-pointer">
                {isRecentlyAdded && (
                  <div className="absolute top-5 right-5 z-10">
                    <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-emerald-500/40 animate-bounce cursor-pointer">
                      NEW
                    </Badge>
                  </div>
                )}

                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-14 rounded-[22px] bg-slate-900 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10">
                      <Icon className="size-7 text-white group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-white/5 text-slate-400 border-white/10 text-[10px] uppercase font-bold tracking-widest px-3 py-1 group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-colors"
                    >
                      {generator.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    {generator.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-8 pb-8 flex flex-col flex-1 gap-6">
                  <CardDescription className="text-base leading-relaxed text-slate-500 font-medium group-hover:text-slate-400 transition-colors h-[72px] overflow-hidden line-clamp-3">
                    {generator.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-1.5 min-h-[48px] content-start">
                    {generator.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-[10px] rounded-lg bg-white/5 text-slate-500 border border-white/5 font-semibold px-2.5 py-0.5 group-hover:bg-emerald-500/5 group-hover:text-emerald-500/70 transition-colors"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2 mt-auto">
                    <span className="flex items-center justify-center w-full text-white bg-white/5 border border-white/10 group-hover:bg-emerald-600 group-hover:border-emerald-500 group-hover:text-white transition-all duration-300 h-11 rounded-2xl font-bold text-xs gap-2 shadow-sm cursor-pointer">
                      <IconRocket className="size-4 animate-pulse group-hover:scale-110 transition-transform" />
                      Explore Tool
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedGenerators.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 px-10 border-2 border-dashed border-white/10 rounded-[40px] bg-white/[0.02] text-center backdrop-blur-sm">
          <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
            <IconSearch className="w-10 h-10 text-emerald-500 opacity-50" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No tools found</h3>
          <p className="text-slate-500 max-w-sm font-medium mb-8">
            We couldn't find any results matching your search or filters. Try
            adjusting your query.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl px-8 h-11 font-bold cursor-pointer"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
