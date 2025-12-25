"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Droplets,
  Zap,
  Move,
  Layout,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const PATTERNS = [
  {
    name: "Mesh Gradient",
    value: "mesh",
    css: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%), radial-gradient(at 0% 50%, hsla(339,49%,30%,1) 0, transparent 50%), radial-gradient(at 100% 50%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 0% 100%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 100%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(339,49%,30%,1) 0, transparent 50%)",
  },
  {
    name: "Vibrant",
    value: "vibrant",
    css: "linear-gradient(to right bottom, #4338ca, #c026d3, #db2777)",
  },
  {
    name: "Ocean",
    value: "ocean",
    css: "linear-gradient(to right bottom, #1e40af, #3b82f6, #93c5fd)",
  },
  {
    name: "Forest",
    value: "forest",
    css: "linear-gradient(to right bottom, #14532d, #16a34a, #bef264)",
  },
  {
    name: "Sunset",
    value: "sunset",
    css: "linear-gradient(to right bottom, #7c2d12, #ea580c, #fcd34d)",
  },
  {
    name: "Checkerboard",
    value: "checker",
    css: "repeating-conic-gradient(#80808020 0% 25%, transparent 0% 50%) 50% / 20px 20px",
  },
];

export default function GlassmorphismGeneratorPage() {
  // Glass Properties
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.25);
  const [saturation, setSaturation] = useState(180);
  const [glassColor, setGlassColor] = useState("#ffffff");

  // Border Properties
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [borderOpacity, setBorderOpacity] = useState(0.3);
  const [borderRadius, setBorderRadius] = useState(16);

  // Background
  const [bgType, setBgType] = useState<"pattern" | "solid">("pattern");
  const [bgPattern, setBgPattern] = useState("vibrant");
  const [bgSolidColor, setBgSolidColor] = useState("#f0f0f0");
  const [customBg, setCustomBg] = useState("");

  // Content
  const [contentTitle, setContentTitle] = useState("Glassmorphism");
  const [contentText, setContentText] = useState(
    "Create beautiful frosted glass effects for your modern web applications."
  );

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(255,255,255,${alpha})`;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const glassStyle = {
    background: hexToRgba(glassColor, opacity),
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: `${borderWidth}px solid ${hexToRgba(borderColor, borderOpacity)}`,
    borderRadius: `${borderRadius}px`,
  };

  const cssCode = `.glass-panel {
  background: ${hexToRgba(glassColor, opacity)};
  backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  border: ${borderWidth}px solid ${hexToRgba(borderColor, borderOpacity)};
  border-radius: ${borderRadius}px;
}`;

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden font-sans">
      {/* Header */}
      <header className="flex h-16 items-center border-b px-6 shrink-0 bg-background/50 backdrop-blur z-20">
        <Link
          href="/generators"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mr-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <h1 className="font-semibold tracking-tight">
            Glassmorphism Generator
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(cssCode)}
            className="gap-2"
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            Copy CSS
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r bg-muted/5 flex flex-col shrink-0">
          <Tabs defaultValue="settings" className="flex-1 flex flex-col">
            <div className="px-4 pt-4 pb-0">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-20">
              <TabsContent value="settings" className="space-y-6 mt-0">
                {/* Glass Effect */}
                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 flex items-center gap-2">
                    <Zap className="w-3 h-3" /> Glass Effect
                  </Label>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Blur</span>
                      <span className="text-muted-foreground">{blur}px</span>
                    </div>
                    <Slider
                      value={[blur]}
                      onValueChange={([v]) => setBlur(v)}
                      max={50}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Opacity</span>
                      <span className="text-muted-foreground">
                        {Math.round(opacity * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[opacity]}
                      onValueChange={([v]) => setOpacity(v)}
                      max={1}
                      step={0.01}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Saturation</span>
                      <span className="text-muted-foreground">
                        {saturation}%
                      </span>
                    </div>
                    <Slider
                      value={[saturation]}
                      onValueChange={([v]) => setSaturation(v)}
                      min={0}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Tint Color</Label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded border overflow-hidden shrink-0 relative">
                        <input
                          type="color"
                          value={glassColor}
                          onChange={(e) => setGlassColor(e.target.value)}
                          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                        />
                      </div>
                      <Input
                        value={glassColor}
                        onChange={(e) => setGlassColor(e.target.value)}
                        className="h-8 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Border Settings */}
                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Border & Shape
                  </Label>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Border Radius</span>
                      <span className="text-muted-foreground">
                        {borderRadius}px
                      </span>
                    </div>
                    <Slider
                      value={[borderRadius]}
                      onValueChange={([v]) => setBorderRadius(v)}
                      max={50}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Border Width</span>
                      <span className="text-muted-foreground">
                        {borderWidth}px
                      </span>
                    </div>
                    <Slider
                      value={[borderWidth]}
                      onValueChange={([v]) => setBorderWidth(v)}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Border Opacity</span>
                      <span className="text-muted-foreground">
                        {Math.round(borderOpacity * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[borderOpacity]}
                      onValueChange={([v]) => setBorderOpacity(v)}
                      max={1}
                      step={0.05}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Border Color</Label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded border overflow-hidden shrink-0 relative">
                        <input
                          type="color"
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                        />
                      </div>
                      <Input
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="h-8 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Preview Background */}
                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 flex items-center gap-2">
                    <Move className="w-3 h-3" /> Background Style
                  </Label>

                  <Tabs
                    value={bgType}
                    onValueChange={(v) => setBgType(v as any)}
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-2 mb-4">
                      <TabsTrigger value="pattern">Patterns</TabsTrigger>
                      <TabsTrigger value="solid">Solid Color</TabsTrigger>
                    </TabsList>

                    <TabsContent value="pattern" className="space-y-4 mt-0">
                      <div className="grid grid-cols-3 gap-2">
                        {PATTERNS.map((p) => (
                          <button
                            key={p.value}
                            onClick={() => setBgPattern(p.value)}
                            className={cn(
                              "aspect-square rounded-md border overflow-hidden relative group",
                              bgPattern === p.value
                                ? "ring-2 ring-primary border-primary"
                                : "hover:border-primary/50"
                            )}
                          >
                            <div
                              className="absolute inset-0"
                              style={{ background: p.css }}
                            />
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Custom Css</Label>
                        <Input
                          placeholder="e.g. linear-gradient(...)"
                          value={customBg}
                          onChange={(e) => {
                            setCustomBg(e.target.value);
                            setBgPattern("custom");
                          }}
                          className="h-8 text-xs"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="solid" className="space-y-4 mt-0">
                      <div className="space-y-2">
                        <Label className="text-xs">Background Color</Label>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded border overflow-hidden shrink-0 relative">
                            <input
                              type="color"
                              value={bgSolidColor}
                              onChange={(e) => setBgSolidColor(e.target.value)}
                              className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                            />
                          </div>
                          <Input
                            value={bgSolidColor}
                            onChange={(e) => setBgSolidColor(e.target.value)}
                            className="h-8 font-mono text-xs"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6 mt-0">
                {/* Text Content */}
                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 flex items-center gap-2">
                    <Type className="w-3 h-3" /> Content
                  </Label>

                  <div className="space-y-2">
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={contentTitle}
                      onChange={(e) => setContentTitle(e.target.value)}
                      className="h-8"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Body</Label>
                    <Textarea
                      value={contentText}
                      onChange={(e) => setContentText(e.target.value)}
                      className="h-20 text-xs resize-none"
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 bg-muted/20 flex flex-col min-w-0">
          <div className="flex-1 overflow-auto flex items-center justify-center relative bg-background">
            {/* Preview Background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  bgType === "solid"
                    ? bgSolidColor
                    : bgPattern === "custom"
                    ? customBg
                    : PATTERNS.find((p) => p.value === bgPattern)?.css,
              }}
            />

            {/* Glass Card */}
            <div
              className="relative px-8 py-8 w-[400px] flex flex-col gap-4 shadow-xl transition-all duration-200"
              style={glassStyle}
            >
              <h3
                className="text-2xl font-bold tracking-tight"
                style={{
                  color: hexToRgba(
                    glassColor === "#000000" ? "#ffffff" : "#000000",
                    0.9
                  ),
                }}
              >
                {contentTitle}
              </h3>
              <p
                className="text-sm font-medium leading-relaxed"
                style={{
                  color: hexToRgba(
                    glassColor === "#000000" ? "#ffffff" : "#000000",
                    0.7
                  ),
                }}
              >
                {contentText}
              </p>

              <div className="mt-2 flex gap-3">
                <div
                  className="h-8 w-24 rounded-md"
                  style={{
                    background: hexToRgba(
                      glassColor === "#000000" ? "#ffffff" : "#000000",
                      0.1
                    ),
                  }}
                />
                <div
                  className="h-8 w-16 rounded-md"
                  style={{
                    background: hexToRgba(
                      glassColor === "#000000" ? "#ffffff" : "#000000",
                      0.1
                    ),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Code Panel */}
          <div className="h-32 bg-background border-t p-4 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Generated Code
              </div>
            </div>
            <div className="bg-muted rounded-md p-3 font-mono text-xs text-muted-foreground overflow-x-auto whitespace-pre h-full flex items-start justify-between group relative">
              <code>{cssCode}</code>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 absolute top-2 right-2 opacity-50 hover:opacity-100"
                onClick={() => copyToClipboard(cssCode)}
              >
                {isCopied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
