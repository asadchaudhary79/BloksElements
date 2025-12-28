"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Palette,
  Maximize2,
  Plus,
  Trash2,
  Download,
  Zap,
  Move,
  Grid3X3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MeshPoint {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

const DEFAULT_POINTS: MeshPoint[] = [
  { id: "1", x: 20, y: 20, color: "#10b981", size: 60 },
  { id: "2", x: 80, y: 20, color: "#6366f1", size: 50 },
  { id: "3", x: 50, y: 80, color: "#f43f5e", size: 70 },
  { id: "4", x: 80, y: 80, color: "#f59e0b", size: 55 },
];

export default function MeshGradientGeneratorPage() {
  const [points, setPoints] = useState<MeshPoint[]>(DEFAULT_POINTS);
  const [isAnimated, setIsAnimated] = useState(true);
  const [speed, setSpeed] = useState(5);
  const [blur, setBlur] = useState(40);
  const [activePointId, setActivePointId] = useState<string | null>(null);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  // Animation simulation
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!isAnimated) return;
    let frame: number;
    const animate = () => {
      setTime((t) => t + speed / 1000);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isAnimated, speed]);

  const animatedPoints = useMemo(() => {
    if (!isAnimated) return points;
    return points.map((p, i) => ({
      ...p,
      x: p.x + Math.sin(time + i) * 10,
      y: p.y + Math.cos(time * 0.8 + i) * 10,
    }));
  }, [points, time, isAnimated]);

  const generateCSS = (pts: MeshPoint[]) => {
    const gradients = pts.map(
      (p) =>
        `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent ${p.size}%)`
    );
    return `background-color: #000000;
background-image: 
  ${gradients.join(",\n  ")};
filter: blur(${blur}px);`;
  };

  const cssCode = useMemo(() => generateCSS(points), [points, blur]);

  const handleAddPoint = () => {
    const newPoint: MeshPoint = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      size: 50,
    };
    setPoints([...points, newPoint]);
  };

  const handleUpdatePoint = (id: string, updates: Partial<MeshPoint>) => {
    setPoints(points.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleRemovePoint = (id: string) => {
    if (points.length <= 2) return;
    setPoints(points.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black text-slate-200 overflow-hidden">
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
              MeshForge <span className="text-emerald-500">Flux</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black px-1.5 py-0 leading-none">
                NEW
              </Badge>
            </h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              Liquid Gradient Engine
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-4 text-xs font-bold gap-2 text-slate-400 hover:text-white hover:bg-white/5"
            onClick={() => setPoints(DEFAULT_POINTS)}
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
          <div className="h-6 w-px bg-white/5 mx-1" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(cssCode)}
            className="gap-2 h-10 px-5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white border-none font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            COPY STYLES
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[380px] border-r border-white/5 bg-black flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-10">
            {/* Points Management */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-emerald-500">
                  <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Grid3X3 className="w-4 h-4" />
                  </div>
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em]">
                    Color Nodes
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-emerald-500"
                  onClick={handleAddPoint}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {points.map((p) => (
                  <div
                    key={p.id}
                    className={cn(
                      "group p-4 rounded-2xl border transition-all",
                      activePointId === p.id
                        ? "bg-white/10 border-emerald-500/50"
                        : "bg-white/5 border-white/5 hover:bg-white/[0.07]"
                    )}
                    onMouseEnter={() => setActivePointId(p.id)}
                    onMouseLeave={() => setActivePointId(null)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="size-6 rounded-full border border-white/20"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="text-[10px] font-bold text-slate-400 uppercase flex-1">
                        Node {p.id.substr(0, 4)}
                      </span>
                      <input
                        type="color"
                        value={p.color}
                        onChange={(e) =>
                          handleUpdatePoint(p.id, { color: e.target.value })
                        }
                        className="size-6 bg-transparent border-none cursor-pointer opacity-0 absolute w-6 h-6"
                      />
                      <Palette className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 text-slate-600 hover:text-rose-500"
                        onClick={() => handleRemovePoint(p.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                        <span>Radius Impact</span>
                        <span className="text-emerald-500">{p.size}%</span>
                      </div>
                      <Slider
                        value={[p.size]}
                        onValueChange={([v]) =>
                          handleUpdatePoint(p.id, { size: v })
                        }
                        min={10}
                        max={150}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Global Settings */}
            <section className="space-y-6 pb-8">
              <div className="flex items-center gap-2.5 text-emerald-500">
                <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <Label className="text-[11px] font-black uppercase tracking-[0.2em]">
                  Global Processing
                </Label>
              </div>

              <div className="space-y-8 bg-white/5 p-6 rounded-[24px] border border-white/5">
                <div className="space-y-4">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Blending Blur</span>
                    <span className="text-emerald-500">{blur}px</span>
                  </div>
                  <Slider
                    value={[blur]}
                    onValueChange={([v]) => setBlur(v)}
                    min={0}
                    max={100}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Animation Speed</span>
                    <span className="text-emerald-500">
                      {isAnimated ? `${speed}x` : "Paused"}
                    </span>
                  </div>
                  <Slider
                    value={[speed]}
                    onValueChange={([v]) => setSpeed(v)}
                    min={1}
                    max={20}
                    disabled={!isAnimated}
                  />
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full h-8 text-[10px] font-black uppercase tracking-widest border border-white/5 rounded-xl",
                      isAnimated
                        ? "text-emerald-500 bg-emerald-500/10"
                        : "text-slate-500 bg-white/5"
                    )}
                    onClick={() => setIsAnimated(!isAnimated)}
                  >
                    {isAnimated ? "Stop Animation" : "Start Animation"}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </aside>

        {/* Main Stage */}
        <main className="flex-1 flex flex-col items-center justify-center p-12 bg-black relative overflow-hidden">
          <div className="relative z-10 w-full max-w-4xl aspect-video bg-black rounded-[40px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center group backdrop-blur-md">
            {/* Mesh Preview Area */}
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{
                backgroundColor: "#000000",
                backgroundImage: animatedPoints
                  .map(
                    (p) =>
                      `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent ${p.size}%)`
                  )
                  .join(","),
                filter: `blur(${blur}px)`,
              }}
            />

            {/* Interaction Layer (Overlay) */}
            <div className="absolute inset-0 z-20 pointer-events-none group-hover:pointer-events-auto">
              {points.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    "absolute size-8 -ml-4 -mt-4 rounded-full border-2 border-white/50 cursor-move transition-transform active:scale-95 flex items-center justify-center pointer-events-auto",
                    activePointId === p.id
                      ? "scale-125 z-30"
                      : "opacity-0 group-hover:opacity-40"
                  )}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    backgroundColor: p.color,
                  }}
                  onMouseDown={(e) => {
                    const rect = (
                      e.currentTarget.parentElement as HTMLElement
                    ).getBoundingClientRect();
                    const moveHandler = (mE: MouseEvent) => {
                      const x = ((mE.clientX - rect.left) / rect.width) * 100;
                      const y = ((mE.clientY - rect.top) / rect.height) * 100;
                      handleUpdatePoint(p.id, {
                        x: Math.max(0, Math.min(100, x)),
                        y: Math.max(0, Math.min(100, y)),
                      });
                    };
                    const upHandler = () => {
                      window.removeEventListener("mousemove", moveHandler);
                      window.removeEventListener("mouseup", upHandler);
                    };
                    window.addEventListener("mousemove", moveHandler);
                    window.addEventListener("mouseup", upHandler);
                    setActivePointId(p.id);
                  }}
                >
                  <Move className="size-3 text-white" />
                </div>
              ))}
            </div>

            <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl z-20">
              <div
                className={cn(
                  "size-2 rounded-full",
                  isAnimated ? "bg-emerald-500 animate-pulse" : "bg-slate-600"
                )}
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Flux Preview
              </span>
            </div>

            <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
              <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                {points.length} nodes active
              </Badge>
            </div>
          </div>

          <div className="relative z-10 mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-2">
                <Move className="w-3.5 h-3.5 text-emerald-500" />
                Drag nodes to shape the flow
              </span>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                GPU Accelerated
              </span>
            </div>
            <p className="text-slate-500 text-[10px] font-medium max-w-sm text-center leading-relaxed opacity-70">
              Mesh gradients create seamless color transitions perfect for
              futuristic backgrounds, headers, and hero sections.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
