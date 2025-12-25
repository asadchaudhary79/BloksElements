"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Plus,
  Download,
  History,
  Info,
  Layers,
  Monitor,
  Smartphone,
  Maximize2,
  Code2,
  Palette,
  Undo2,
  Settings2,
  Type,
  Shuffle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

// --- Types ---

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

interface GradientState {
  type: "linear" | "radial";
  angle: number;
  shape: "circle" | "ellipse";
  stops: ColorStop[];
}

// --- Presets (Expanded) ---

const PRESETS = [
  {
    name: "Hyper",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#da4453", position: 0 },
      { color: "#89216b", position: 100 },
    ],
  },
  {
    name: "Oceanic",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#2193b0", position: 0 },
      { color: "#6dd5ed", position: 100 },
    ],
  },
  {
    name: "Cotton Candy",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#eca99c", position: 0 },
      { color: "#f6dbb6", position: 100 },
    ],
  },
  {
    name: "Gotham",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#2c3e50", position: 0 },
      { color: "#000000", position: 100 },
    ],
  },
  {
    name: "Sunset",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#ff9966", position: 0 },
      { color: "#ff5e62", position: 100 },
    ],
  },
  {
    name: "Mojito",
    type: "linear",
    angle: 0,
    stops: [
      { color: "#1d976c", position: 0 },
      { color: "#93f9b9", position: 100 },
    ],
  },
  {
    name: "Sublime",
    type: "radial",
    shape: "circle",
    stops: [
      { color: "#fc5c7d", position: 0 },
      { color: "#6a82fb", position: 100 },
    ],
  },
  {
    name: "Witching",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#c31432", position: 0 },
      { color: "#240b36", position: 100 },
    ],
  },
  {
    name: "Azure Pop",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#1fa2ff", position: 0 },
      { color: "#12d8fa", position: 50 },
      { color: "#a6ffcb", position: 100 },
    ],
  },
  {
    name: "Love Kiss",
    type: "linear",
    angle: 0,
    stops: [
      { color: "#ff0844", position: 0 },
      { color: "#ffb199", position: 100 },
    ],
  },
  {
    name: "Clean Mirror",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#93a5cf", position: 0 },
      { color: "#e4efe9", position: 100 },
    ],
  },
  {
    name: "Premium Dark",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#434343", position: 0 },
      { color: "#000000", position: 100 },
    ],
  },
  {
    name: "Cold Blue",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#243949", position: 0 },
      { color: "#517fa4", position: 100 },
    ],
  },
  {
    name: "Eternal Constance",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#09203f", position: 0 },
      { color: "#537895", position: 100 },
    ],
  },
  {
    name: "Midnight City",
    type: "linear",
    angle: 0,
    stops: [
      { color: "#232526", position: 0 },
      { color: "#414345", position: 100 },
    ],
  },
  {
    name: "Royal",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#141e30", position: 0 },
      { color: "#243b55", position: 100 },
    ],
  },
  {
    name: "Miami",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#8ec5fc", position: 0 },
      { color: "#e0c3fc", position: 100 },
    ],
  },
  {
    name: "Grown Early",
    type: "linear",
    angle: 0,
    stops: [
      { color: "#0ba360", position: 0 },
      { color: "#3cba92", position: 100 },
    ],
  },
  {
    name: "Morning Salad",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#B7F8DB", position: 0 },
      { color: "#50A7C2", position: 100 },
    ],
  },
  {
    name: "Deep Relief",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#70e1f5", position: 0 },
      { color: "#ffd194", position: 100 },
    ],
  },
  {
    name: "Sea Blizz",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#1c92d2", position: 0 },
      { color: "#f2fcfe", position: 100 },
    ],
  },
  {
    name: "Passion",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#e53935", position: 0 },
      { color: "#e35d5b", position: 100 },
    ],
  },
  {
    name: "Fruit",
    type: "linear",
    angle: 140,
    stops: [
      { color: "#d299c2", position: 0 },
      { color: "#fef9d7", position: 100 },
    ],
  },
  {
    name: "Plum",
    type: "linear",
    angle: 225,
    stops: [
      { color: "#cc2b5e", position: 0 },
      { color: "#753a88", position: 100 },
    ],
  },
  {
    name: "Aurora",
    type: "linear",
    angle: 60,
    stops: [
      { color: "#0f2027", position: 0 },
      { color: "#203a43", position: 50 },
      { color: "#2c5364", position: 100 },
    ],
  },
  {
    name: "Pink Flavour",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#800080", position: 0 },
      { color: "#ffc0cb", position: 100 },
    ],
  },
  {
    name: "Fly High",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#48c6ef", position: 0 },
      { color: "#6f86d6", position: 100 },
    ],
  },
  {
    name: "Strong Stick",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#a8caba", position: 0 },
      { color: "#5d4157", position: 100 },
    ],
  },
];

export default function GradientGeneratorPage() {
  // --- State ---
  const [gradient, setGradient] = useState<GradientState>({
    type: "linear",
    angle: 135,
    shape: "ellipse",
    stops: [
      { id: "1", color: "#8b5cf6", position: 0 },
      { id: "2", color: "#3b82f6", position: 100 },
    ],
  });

  const [history, setHistory] = useState<GradientState[]>([]);
  const [showTextOverlay, setShowTextOverlay] = useState(true);
  const [textOverlayContent, setTextOverlayContent] =
    useState("Gradient Genius");
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  // --- Actions ---

  const addToHistory = useCallback((newState: GradientState) => {
    setHistory((prev) => {
      const newHistory = [newState, ...prev].slice(0, 20); // Keep last 20
      return newHistory;
    });
  }, []);

  const updateGradient = (updates: Partial<GradientState>) => {
    setGradient((prev) => ({ ...prev, ...updates }));
  };

  const addStop = () => {
    const newStop = {
      id: Math.random().toString(36).substr(2, 9),
      color: "#ffffff",
      position: 50,
    };
    setGradient((prev) => ({
      ...prev,
      stops: [...prev.stops, newStop].sort((a, b) => a.position - b.position),
    }));
  };

  const removeStop = (id: string) => {
    if (gradient.stops.length <= 2) return;
    setGradient((prev) => ({
      ...prev,
      stops: prev.stops.filter((s) => s.id !== id),
    }));
  };

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setGradient((prev) => ({
      ...prev,
      stops: prev.stops.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const randomize = () => {
    addToHistory(gradient);
    const randomColor = () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    const type = Math.random() > 0.3 ? "linear" : "radial";
    setGradient({
      type: type as any,
      angle: Math.floor(Math.random() * 360),
      shape: "ellipse",
      stops: [
        { id: "1", color: randomColor(), position: 0 },
        { id: "2", color: randomColor(), position: 100 },
        ...(Math.random() > 0.5
          ? [
              {
                id: "3",
                color: randomColor(),
                position: Math.floor(Math.random() * 80) + 10,
              },
            ]
          : []),
      ].sort((a, b) => a.position - b.position),
    });
  };

  // --- Code Generation ---

  const getCSS = (g: GradientState) => {
    const stopsStr = [...g.stops]
      .sort((a, b) => a.position - b.position)
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    return g.type === "linear"
      ? `linear-gradient(${g.angle}deg, ${stopsStr})`
      : `radial-gradient(${g.shape}, ${stopsStr})`;
  };

  const getTailwind = (g: GradientState) => {
    const stopsStr = [...g.stops]
      .sort((a, b) => a.position - b.position)
      .map((s) => `${s.color} ${s.position}%`)
      .join(",");
    const safeStops = stopsStr.replace(/, /g, ",").replace(/ /g, "_");

    return g.type === "linear"
      ? `bg-[linear-gradient(${g.angle}deg,${safeStops})]`
      : `bg-[radial-gradient(${g.shape},${safeStops})]`;
  };

  const copyToClipboard = (text: string, type: "css" | "tailwind") => {
    navigator.clipboard.writeText(text);
    if (type === "css") {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } else {
      setCopiedTailwind(true);
      setTimeout(() => setCopiedTailwind(false), 2000);
    }
  };

  const downloadImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let grd;
    if (gradient.type === "linear") {
      grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    } else {
      grd = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        100,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
    }

    [...gradient.stops]
      .sort((a, b) => a.position - b.position)
      .forEach((stop) => {
        grd.addColorStop(stop.position / 100, stop.color);
      });

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "gradient-genius.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const currentCSS = getCSS(gradient);
  const currentTailwind = getTailwind(gradient);

  // --- Render ---

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b bg-background px-4 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/generators"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm tracking-tight sm:text-base">
              Gradient Genius
            </h1>
            <Badge
              variant="outline"
              className="text-[10px] uppercase font-mono tracking-widest hidden sm:flex"
            >
              v2.0
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={randomize}
            className="gap-2 text-xs h-8"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Randomize
          </Button>
          <Button
            size="sm"
            onClick={downloadImage}
            className="gap-2 text-xs h-8"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PNG</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-[340px] border-r bg-muted/10 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin">
          <div className="p-4 space-y-6">
            {/* Visual Gradient Strip */}
            <div
              className="relative h-12 w-full rounded-md shadow-inner border border-border/50 overflow-hidden group hover:shadow-md transition-all ease-in-out cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${[...gradient.stops]
                  .sort((a, b) => a.position - b.position)
                  .map((s) => `${s.color} ${s.position}%`)
                  .join(", ")})`,
              }}
              onClick={addStop}
              title="Click to add stop (simulated)"
            >
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Plus className="w-5 h-5 text-white drop-shadow-md" />
              </div>
            </div>

            {/* Gradient Type */}
            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
                Type & Angle
              </Label>
              <div className="flex items-center gap-2">
                <Select
                  value={gradient.type}
                  onValueChange={(v: any) => updateGradient({ type: v })}
                >
                  <SelectTrigger className="w-[120px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>

                {gradient.type === "linear" && (
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs font-mono w-8 text-right text-muted-foreground">
                      {gradient.angle}°
                    </span>
                    <Slider
                      className="flex-1"
                      min={0}
                      max={360}
                      step={1}
                      value={[gradient.angle]}
                      onValueChange={([v]) => updateGradient({ angle: v })}
                    />
                  </div>
                )}
                {gradient.type === "radial" && (
                  <Select
                    value={gradient.shape}
                    onValueChange={(v: any) => updateGradient({ shape: v })}
                  >
                    <SelectTrigger className="flex-1 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="ellipse">Ellipse</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <Separator />

            {/* Stops List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
                  Color Stops
                </Label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={addStop}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="space-y-3">
                {gradient.stops
                  .sort((a, b) => a.position - b.position)
                  .map((stop, index) => (
                    <div
                      key={stop.id}
                      className="flex items-center gap-3 group animate-in slide-in-from-left-2 duration-200"
                    >
                      <Popover>
                        <PopoverTrigger asChild>
                          <div
                            className="w-8 h-8 rounded-full border shadow-sm cursor-pointer shrink-0 transition-transform hover:scale-110"
                            style={{ backgroundColor: stop.color }}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3">
                          <div className="space-y-2">
                            <Label className="text-xs">Color Hex</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                className="w-10 h-10 p-0 border-0"
                                value={stop.color}
                                onChange={(e) =>
                                  updateStop(stop.id, { color: e.target.value })
                                }
                              />
                              <Input
                                className="w-24 h-10 font-mono text-xs uppercase"
                                value={stop.color}
                                onChange={(e) =>
                                  updateStop(stop.id, { color: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <div className="flex-1 space-y-1">
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[stop.position]}
                          onValueChange={([v]) =>
                            updateStop(stop.id, { position: v })
                          }
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>Stop {index + 1}</span>
                          <span className="font-mono">{stop.position}%</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                        onClick={() => removeStop(stop.id)}
                        disabled={gradient.stops.length <= 2}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            <Separator />

            {/* Presets Grid */}
            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
                Presets
              </Label>
              <ScrollArea className="h-[280px]">
                <div className="grid grid-cols-7 gap-1.5 pr-2">
                  {PRESETS.map((preset) => {
                    const bg =
                      preset.type === "linear"
                        ? `linear-gradient(${preset.angle}deg, ${preset.stops
                            .map((s) => `${s.color} ${s.position}%`)
                            .join(", ")})`
                        : `radial-gradient(circle, ${preset.stops
                            .map((s) => `${s.color} ${s.position}%`)
                            .join(", ")})`;

                    return (
                      <button
                        key={preset.name}
                        className="aspect-square rounded-md border shadow-sm transition-all active:scale-95 relative cursor-pointer"
                        style={{ background: bg }}
                        onClick={() => {
                          addToHistory(gradient);
                          setGradient({
                            type: preset.type as any,
                            angle: preset.angle || 0,
                            shape: (preset as any).shape || "ellipse",
                            stops: preset.stops.map((s, i) => ({
                              id: i.toString(),
                              ...s,
                            })),
                          });
                        }}
                        title={preset.name}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* Overlay Options */}
            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
                Preview Options
              </Label>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-text" className="text-xs font-normal">
                  Show Text Overlay
                </Label>
                <Switch
                  id="show-text"
                  checked={showTextOverlay}
                  onCheckedChange={setShowTextOverlay}
                />
              </div>
              {showTextOverlay && (
                <Input
                  value={textOverlayContent}
                  onChange={(e) => setTextOverlayContent(e.target.value)}
                  className="h-8 text-xs"
                  placeholder="Enter test text..."
                />
              )}
            </div>
          </div>

          {/* History Tab */}
          {history.length > 0 && (
            <div className="mt-auto border-t bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <History className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  Recent History
                </span>
              </div>
              <ScrollArea className="w-full whitespace-nowrap pb-2">
                <div className="flex gap-2">
                  {history.map((h, i) => (
                    <button
                      key={i}
                      className="w-6 h-6 rounded-full border shadow-sm shrink-0"
                      style={{ background: getCSS(h) }}
                      onClick={() => setGradient(h)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 flex flex-col relative bg-muted/30">
          {/* The Gradient Stage */}
          <div className="flex-1 relative flex items-center justify-center p-8 bg-dot-pattern">
            <div
              className="w-full h-full rounded-2xl shadow-2xl transition-all duration-300 relative overflow-hidden flex items-center justify-center border border-border/10"
              style={{ background: currentCSS }}
            >
              {/* Text Overlay */}
              {showTextOverlay && (
                <div className="text-center p-8 max-w-2xl break-words animate-in zoom-in-50 duration-500">
                  <h1
                    className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-lg text-white mb-2"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                  >
                    {textOverlayContent}
                  </h1>
                  <p
                    className="text-white/90 text-xl font-medium drop-shadow-md"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                  >
                    Beautiful CSS Gradients
                  </p>
                </div>
              )}

              {/* Quick Actions overlay */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="h-9 shadow-lg backdrop-blur-md bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black transition-all"
                    onClick={() => copyToClipboard(currentCSS, "css")}
                  >
                    {copiedCSS ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Code2 className="w-4 h-4 mr-2" />
                    )}
                    {copiedCSS ? "Copied CSS!" : "Copy CSS"}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="h-9 shadow-lg backdrop-blur-md bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black transition-all"
                    onClick={() => copyToClipboard(currentTailwind, "tailwind")}
                  >
                    {copiedTailwind ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Monitor className="w-4 h-4 mr-2" />
                    )}
                    {copiedTailwind ? "Copied Tailwind!" : "Copy Tailwind"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar for Code Display (Optional, could just rely on floating buttons) */}
          <div className="h-auto min-h-[60px] border-t bg-background p-4 flex items-center justify-between gap-4">
            <div className="flex-1 font-mono text-[10px] text-muted-foreground break-all bg-muted/30 p-2 rounded border truncate max-h-[60px] overflow-hidden">
              {currentCSS}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
