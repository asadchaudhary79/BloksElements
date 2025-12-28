"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Layers,
  Palette,
  Settings2,
  Download,
  Code,
  Zap,
  Waves,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface WaveLayer {
  id: string;
  color: string;
  opacity: number;
  points: { x: number; y: number }[];
}

const THEME_PRESETS = [
  { name: "Emerald", color: "#10b981" },
  { name: "Indigo", color: "#6366f1" },
  { name: "Rose", color: "#f43f5e" },
  { name: "Amber", color: "#f59e0b" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Slate", color: "#64748b" },
];

export default function SVGWavesGeneratorPage() {
  const [layers, setLayers] = useState<number>(4);
  const [complexity, setComplexity] = useState<number>(6);
  const [height, setHeight] = useState<number>(100);
  const [baseColor, setBaseColor] = useState<string>("#10b981");
  const [seed, setSeed] = useState<number>(0.5);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [waveMode, setWaveMode] = useState<"smooth" | "step" | "sharp">(
    "smooth"
  );
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(5);
  const [useGradient, setUseGradient] = useState<boolean>(true);
  const [gradientColor, setGradientColor] = useState<string>("#064e3b");

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  // Animation logic
  const [animationOffset, setAnimationOffset] = useState(0);
  useEffect(() => {
    if (!isAnimated) return;
    let frame: number;
    const animate = () => {
      setAnimationOffset(
        (prev: number) => (prev + animationSpeed / 500) % (Math.PI * 2)
      );
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isAnimated, animationSpeed]);

  const generatePoints = (
    comp: number,
    h: number,
    s: number,
    layerIndex: number
  ) => {
    const points = [];
    const step = 100 / (comp - 1);
    for (let i = 0; i < comp; i++) {
      const x = i * step;
      // Combine static seed with optional animation offset
      const timeComp = isAnimated ? animationOffset + layerIndex * 0.5 : 0;
      const angle = i * 0.8 + s * 10 + layerIndex * 0.4 + timeComp;
      const waveY = Math.sin(angle) * 25 + 50;
      const noise = (Math.sin(angle * 2.3) + Math.cos(angle * 1.7)) * 10;

      points.push({
        x,
        y: Math.max(0, Math.min(100, waveY + noise)),
      });
    }
    return points;
  };

  const waveLayers = useMemo(() => {
    const newLayers: WaveLayer[] = [];
    for (let i = 0; i < layers; i++) {
      const opacity = 1 - i * 0.15; // Solid but elegant overlapping
      const layerHeight = height - i * (height / layers / 2);
      newLayers.push({
        id: `layer-${i}`,
        color: baseColor,
        opacity: Math.max(0.1, opacity),
        points: generatePoints(complexity, layerHeight, seed, i),
      });
    }
    return newLayers;
  }, [
    layers,
    complexity,
    height,
    baseColor,
    seed,
    isAnimated ? animationOffset : null,
  ]);

  const getPathData = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";

    let d = `M ${points[0].x} ${points[0].y}`;

    if (waveMode === "smooth") {
      for (let i = 0; i < points.length - 1; i++) {
        const curr = points[i];
        const next = points[i + 1];
        const midX = (curr.x + next.x) / 2;
        const midY = (curr.y + next.y) / 2;
        d += ` Q ${curr.x} ${curr.y}, ${midX} ${midY}`;
        if (i === points.length - 2) {
          d += ` T ${next.x} ${next.y}`;
        }
      }
    } else if (waveMode === "step") {
      for (let i = 0; i < points.length - 1; i++) {
        d += ` L ${points[i + 1].x} ${points[i].y}`; // Horizontal then vertical
        d += ` L ${points[i + 1].x} ${points[i + 1].y}`;
      }
    } else {
      // sharp
      for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i].y}`;
      }
    }

    if (isFlipped) {
      d += ` L 100 0 L 0 0 Z`;
    } else {
      d += ` L 100 100 L 0 100 Z`;
    }

    return d;
  };

  const svgCode = useMemo(() => {
    const gradientId = "wave-gradient";
    const gradientDef = useGradient
      ? `  <defs>\n    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">\n      <stop offset="0%" stop-color="${baseColor}" />\n      <stop offset="100%" stop-color="${gradientColor}" />\n    </linearGradient>\n  </defs>`
      : "";

    return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
${gradientDef}
${waveLayers
  .map(
    (layer: WaveLayer) =>
      `  <path d="${getPathData(layer.points)}" fill="${
        useGradient ? `url(#${gradientId})` : layer.color
      }" opacity="${layer.opacity.toFixed(2)}" />`
  )
  .join("\n")}
</svg>`;
  }, [waveLayers, isFlipped, waveMode, useGradient, baseColor, gradientColor]);

  const downloadSVG = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "emerald-wave.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black text-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-white/5 bg-black px-6 shrink-0 z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <Link
            href="/generators"
            className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all hover:bg-emerald-500/20 hover:text-emerald-400 border border-white/5"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              WaveForge <span className="text-emerald-500">SVG</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black px-1.5 py-0 leading-none">
                PRO
              </Badge>
            </h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              Next-Gen Visual Assets
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-4 text-xs font-bold gap-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setSeed(Math.random())}
          >
            <RefreshCw
              className={cn("w-4 h-4", isAnimated && "animate-spin")}
            />
            Reseed
          </Button>
          <div className="h-6 w-px bg-white/5 mx-1" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(svgCode)}
            className="gap-2 h-10 px-5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white border-none font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95"
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            COPY GENERATED
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={downloadSVG}
            className="h-10 w-10 text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 rounded-xl"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[380px] border-r border-white/5 bg-black flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-10">
            {/* Theme & Style */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-emerald-500">
                  <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Palette className="w-4 h-4" />
                  </div>
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em]">
                    Look & Feel
                  </Label>
                </div>
              </div>

              <div className="space-y-6 bg-white/3 p-6 rounded-[24px] border border-white/5 shadow-inner">
                {/* Presets Grid */}
                <div className="grid grid-cols-6 gap-2">
                  {THEME_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onMouseEnter={() => {
                        setBaseColor(p.color);
                        if (useGradient) setGradientColor(p.color + "88");
                      }}
                      onClick={() => setBaseColor(p.color)}
                      className={cn(
                        "size-10 rounded-xl border-2 transition-all hover:scale-110 active:scale-90",
                        baseColor === p.color
                          ? "border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                          : "border-transparent"
                      )}
                      style={{ backgroundColor: p.color }}
                      title={p.name}
                    />
                  ))}
                </div>

                <div className="space-y-5 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Gradient Mode
                    </Label>
                    <Switch
                      checked={useGradient}
                      onCheckedChange={setUseGradient}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                  {useGradient && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-bold text-slate-500 uppercase">
                          Top Color
                        </Label>
                        <input
                          type="color"
                          value={baseColor}
                          onChange={(e) => setBaseColor(e.target.value)}
                          className="w-full h-10 bg-transparent rounded-xl cursor-pointer border-2 border-white/5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-bold text-slate-500 uppercase">
                          Bottom Color
                        </Label>
                        <input
                          type="color"
                          value={gradientColor}
                          onChange={(e) => setGradientColor(e.target.value)}
                          className="w-full h-10 bg-transparent rounded-xl cursor-pointer border-2 border-white/5"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Shape Control */}
            <section className="space-y-6">
              <div className="flex items-center gap-2.5 text-emerald-500">
                <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Waves className="w-4 h-4" />
                </div>
                <Label className="text-[11px] font-black uppercase tracking-[0.2em]">
                  Wave Shaping
                </Label>
              </div>

              <div className="space-y-6 bg-white/3 p-6 rounded-[24px] border border-white/5">
                <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                  {(["smooth", "step", "sharp"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setWaveMode(m)}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all",
                        waveMode === m
                          ? "bg-emerald-500 text-white shadow-lg"
                          : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="space-y-8 pt-4">
                  {[
                    {
                      label: "Layers",
                      val: layers,
                      set: setLayers,
                      min: 1,
                      max: 12,
                    },
                    {
                      label: "Complexity",
                      val: complexity,
                      set: setComplexity,
                      min: 2,
                      max: 24,
                    },
                    {
                      label: "Amplitude",
                      val: height,
                      set: setHeight,
                      min: 50,
                      max: 200,
                    },
                  ].map((s) => (
                    <div key={s.label} className="space-y-3">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        <span>{s.label}</span>
                        <span className="text-emerald-500 font-mono">
                          {s.val}
                        </span>
                      </div>
                      <Slider
                        value={[s.val]}
                        onValueChange={([v]) => s.set(v)}
                        min={s.min}
                        max={s.max}
                        step={1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Motion FX */}
            <section className="space-y-6 pb-4">
              <div className="flex items-center gap-2.5 text-emerald-500">
                <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <Label className="text-[11px] font-black uppercase tracking-[0.2em]">
                  Motion Engine
                </Label>
              </div>

              <div className="space-y-6 bg-emerald-500/5 p-6 rounded-[24px] border border-emerald-500/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-bold text-emerald-400">
                      Live Animation
                    </Label>
                    <p className="text-[9px] text-emerald-500/60 font-medium">
                      Real-time fluid dynamics
                    </p>
                  </div>
                  <Switch
                    checked={isAnimated}
                    onCheckedChange={setIsAnimated}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
                {isAnimated && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-emerald-400/80">
                      <span>Flow Speed</span>
                      <span>{animationSpeed}x</span>
                    </div>
                    <Slider
                      value={[animationSpeed]}
                      onValueChange={([v]) => setAnimationSpeed(v)}
                      min={1}
                      max={20}
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        </aside>

        {/* Main Stage */}
        <main className="flex-1 flex flex-col items-center justify-center p-12 bg-black relative overflow-hidden">
          {/* Immersive Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-emerald-500/5 blur-[120px] rounded-full opacity-30" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-5xl aspect-21/9 bg-white/2 rounded-[48px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col group backdrop-blur-md">
            <div className="absolute top-8 left-8 flex items-center gap-4 z-20">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                <div
                  className={cn(
                    "size-2 rounded-full",
                    isAnimated
                      ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"
                      : "bg-slate-600"
                  )}
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  Live Render
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[9px] font-bold px-3 py-1 uppercase tracking-widest"
              >
                {waveMode}
              </Badge>
            </div>

            <div className="absolute top-8 right-8 z-20 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-10 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {isFlipped ? (
                  <Minimize2 className="size-4" />
                ) : (
                  <Maximize2 className="size-4" />
                )}
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full transition-all duration-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                {useGradient && (
                  <defs>
                    <linearGradient
                      id="live-wave-gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={baseColor} />
                      <stop offset="100%" stopColor={gradientColor} />
                    </linearGradient>
                  </defs>
                )}
                {waveLayers.map((layer: WaveLayer) => (
                  <path
                    key={layer.id}
                    d={getPathData(layer.points)}
                    fill={
                      useGradient ? "url(#live-wave-gradient)" : layer.color
                    }
                    opacity={layer.opacity}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-20 pointer-events-none">
              <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] border border-white/5">
                Points:{" "}
                <span className="text-emerald-500">{complexity * layers}</span>
              </div>
              <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] border border-white/5">
                Resolution:{" "}
                <span className="text-emerald-500">Vector Scalable</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-16 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 px-8 py-4 bg-white/3 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="flex -space-x-3">
                {THEME_PRESETS.slice(0, 4).map((p, i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full border-2 border-[#020617] shadow-lg"
                    style={{ backgroundColor: p.color }}
                  />
                ))}
              </div>
              <div className="h-6 w-px bg-white/10" />
              <p className="text-[11px] font-bold text-slate-400 max-w-xs text-center leading-relaxed">
                Generated waves are optimized for{" "}
                <span className="text-emerald-500">
                  React, Tailwind, and Next.js
                </span>{" "}
                landing pages.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
