"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const DEFAULT_FILTERS = {
  blur: 0, // px
  brightness: 100, // %
  contrast: 100, // %
  grayscale: 0, // %
  hueRotate: 0, // deg
  invert: 0, // %
  opacity: 100, // %
  saturate: 100, // %
  sepia: 0, // %
};

const FILTER_PRESETS = [
  { name: "Reset", values: { ...DEFAULT_FILTERS } },
  {
    name: "1977",
    values: { ...DEFAULT_FILTERS, sepia: 50, hueRotate: -30, saturate: 140 },
  },
  {
    name: "Willow",
    values: {
      ...DEFAULT_FILTERS,
      grayscale: 100,
      contrast: 95,
      brightness: 90,
    },
  },
  {
    name: "Sutro",
    values: {
      ...DEFAULT_FILTERS,
      brightness: 90,
      contrast: 120,
      saturate: 140,
      hueRotate: -10,
    },
  },
  {
    name: "Cyberpunk",
    values: { ...DEFAULT_FILTERS, saturate: 200, contrast: 120, hueRotate: 20 },
  },
  {
    name: "Noir",
    values: {
      ...DEFAULT_FILTERS,
      grayscale: 100,
      contrast: 150,
      brightness: 80,
      blur: 0.5,
    },
  },
  {
    name: "Dreamy",
    values: { ...DEFAULT_FILTERS, blur: 2, brightness: 110, saturate: 80 },
  },
  {
    name: "Vintage",
    values: { ...DEFAULT_FILTERS, sepia: 70, contrast: 90, brightness: 110 },
  },
  {
    name: "Dramatic",
    values: { ...DEFAULT_FILTERS, contrast: 150, brightness: 90 },
  },
  {
    name: "Vibrant",
    values: { ...DEFAULT_FILTERS, saturate: 180 },
  },
  {
    name: "Misty",
    values: { ...DEFAULT_FILTERS, blur: 1, brightness: 105, opacity: 90 },
  },
  {
    name: "Old Movie",
    values: {
      ...DEFAULT_FILTERS,
      grayscale: 100,
      sepia: 30,
      contrast: 120,
    },
  },
];

export default function CSSFiltersGeneratorPage() {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  );

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleFilterChange = (key: keyof typeof filters, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filterValues = `${filters.blur > 0 ? `blur(${filters.blur}px) ` : ""}${
    filters.brightness !== 100 ? `brightness(${filters.brightness}%) ` : ""
  }${filters.contrast !== 100 ? `contrast(${filters.contrast}%) ` : ""}${
    filters.grayscale > 0 ? `grayscale(${filters.grayscale}%) ` : ""
  }${filters.hueRotate !== 0 ? `hue-rotate(${filters.hueRotate}deg) ` : ""}${
    filters.invert > 0 ? `invert(${filters.invert}%) ` : ""
  }${filters.opacity !== 100 ? `opacity(${filters.opacity}%) ` : ""}${
    filters.saturate !== 100 ? `saturate(${filters.saturate}%) ` : ""
  }${filters.sepia > 0 ? `sepia(${filters.sepia}%) ` : ""}`.trim();

  const cssCode = filterValues ? `filter: ${filterValues};` : "filter: none;";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b bg-background px-4 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/generators"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm tracking-tight sm:text-base">
              Filters Generator
            </h1>
            <Badge variant="outline" className="hidden sm:flex">
              PHOTO FX
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs cursor-pointer"
              asChild
            >
              <label htmlFor="image-upload">
                <ImageIcon className="w-3.5 h-3.5" />
                Upload Image
              </label>
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(cssCode)}
            className="gap-2 h-8 text-xs font-semibold border-emerald-500/30 hover:bg-emerald-500/10"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            Copy CSS
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-80 border-r bg-muted/5 flex flex-col shrink-0">
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-8 pb-24">
              {/* Presets */}
              <div className="space-y-4">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest flex items-center gap-2">
                  <RotateCcw className="w-3 h-3" /> Presets
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {FILTER_PRESETS.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setFilters(preset.values)}
                      className={cn(
                        "h-8 text-[10px] font-medium justify-center px-1 transition-all text-center",
                        JSON.stringify(filters) ===
                          JSON.stringify(preset.values)
                          ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                          : "hover:bg-muted"
                      )}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="opacity-50" />

              {/* Sliders */}
              <div className="space-y-6">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest flex items-center gap-2">
                  <Sliders className="w-3 h-3" /> Adjustments
                </Label>

                <div className="space-y-5">
                  {[
                    {
                      label: "Blur",
                      key: "blur",
                      max: 20,
                      step: 0.1,
                      unit: "px",
                    },
                    {
                      label: "Brightness",
                      key: "brightness",
                      max: 200,
                      unit: "%",
                    },
                    { label: "Contrast", key: "contrast", max: 200, unit: "%" },
                    {
                      label: "Saturation",
                      key: "saturate",
                      max: 200,
                      unit: "%",
                    },
                    {
                      label: "Grayscale",
                      key: "grayscale",
                      max: 100,
                      unit: "%",
                    },
                    { label: "Sepia", key: "sepia", max: 100, unit: "%" },
                    { label: "Invert", key: "invert", max: 100, unit: "%" },
                    { label: "Opacity", key: "opacity", max: 100, unit: "%" },
                    {
                      label: "Hue Rotate",
                      key: "hueRotate",
                      min: -180,
                      max: 180,
                      unit: "deg",
                    },
                  ].map((s) => (
                    <div key={s.key} className="space-y-3">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-medium text-muted-foreground">
                          {s.label}
                        </span>
                        <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[10px]">
                          {filters[s.key as keyof typeof filters]}
                          {s.unit}
                        </span>
                      </div>
                      <Slider
                        value={[filters[s.key as keyof typeof filters]]}
                        onValueChange={([v]) =>
                          handleFilterChange(s.key as keyof typeof filters, v)
                        }
                        min={s.min ?? 0}
                        max={s.max}
                        step={s.step ?? 1}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Code Panel */}
          <div className="mt-auto border-t p-4 bg-background/50 backdrop-blur-sm">
            <Label className="text-[10px] font-semibold uppercase text-muted-foreground tracking-widest mb-3 block">
              CSS Output
            </Label>
            <div className="bg-muted/50 p-3 rounded-lg border border-border/50 relative group">
              <code className="text-[10px] font-mono text-muted-foreground break-all leading-relaxed block pr-8">
                {cssCode}
              </code>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(cssCode)}
              >
                {isCopied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Stage */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-dot-pattern">
          <div
            className="relative shadow-2xl overflow-hidden rounded-lg transition-all duration-200"
            style={{
              filter: filterValues || "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-full max-h-[600px] object-cover"
            />
          </div>

          <div className="mt-6 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() =>
                setImageUrl(
                  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                )
              }
            >
              Synthwave
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() =>
                setImageUrl(
                  "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                )
              }
            >
              Nature
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() =>
                setImageUrl(
                  "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                )
              }
            >
              Portrait
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
