"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Play,
  Settings2,
  Code2,
  Monitor,
  LayoutGrid,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// --- Types & Config ---

type AnimationType =
  | "spinner-classic"
  | "spinner-dots"
  | "spinner-ring"
  | "spinner-bars"
  | "dots-pulse"
  | "dots-bounce"
  | "dots-wave"
  | "dots-grid"
  | "bars-wave"
  | "bars-scale"
  | "bars-music"
  | "pulse-ring"
  | "pulse-solid"
  | "ripple"
  | "heartbeat"
  | "infinity"
  | "hourglass"
  | "atom"
  | "orbit"
  | "square-spin"
  | "cube-flip"
  | "battery"
  | "wifi"
  | "pacman";

const ANIMATIONS: { value: AnimationType; label: string; offset?: number }[] = [
  { value: "spinner-classic", label: "Classic Spinner" },
  { value: "spinner-ring", label: "Ring Spinner" },
  { value: "spinner-dots", label: "Circle Dots" },
  { value: "spinner-bars", label: "Circle Bars" },
  { value: "dots-pulse", label: "Pulsing Dots" },
  { value: "dots-bounce", label: "Bouncing Dots" },
  { value: "dots-wave", label: "Waving Dots" },
  { value: "dots-grid", label: "Grid Pulse" },
  { value: "bars-wave", label: "Wave Bars" },
  { value: "bars-scale", label: "Scaling Bars" },
  { value: "bars-music", label: "Music Equalizer" },
  { value: "pulse-ring", label: "Pulse Ring" },
  { value: "pulse-solid", label: "Pulse Solid" },
  { value: "ripple", label: "Ripple Effect" },
  { value: "heartbeat", label: "Heartbeat" },
  { value: "infinity", label: "Infinity Loop" },
  { value: "hourglass", label: "Hourglass" },
  { value: "atom", label: "Atom Orbit" },
  { value: "orbit", label: "Planetary Orbit" },
  { value: "square-spin", label: "Square Spin" },
  { value: "cube-flip", label: "Cube Flip" },
  { value: "battery", label: "Battery Charge" },
  { value: "wifi", label: "Wifi Signal" },
  { value: "pacman", label: "Pacman" },
];

export default function LoadingAnimationGeneratorPage() {
  const [activeAnim, setActiveAnim] =
    useState<AnimationType>("spinner-classic");
  const [color, setColor] = useState("#3b82f6");
  const [size, setSize] = useState(48);
  const [speed, setSpeed] = useState(1);
  const [thickness, setThickness] = useState(4);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [copiedHTML, setCopiedHTML] = useState(false);

  // --- Generators ---

  const { css, html, keyframes, styles } = useMemo(() => {
    const duration = `${1 / speed}s`;
    const animName = activeAnim; // Simplified naming for this contained environment

    let kf = "";
    let styles = "";
    let element = "";

    // Common keyframes reused (if simple) or specific per type
    // We'll define specific keyframes to prevent conflicts and ensure copy-pasteability

    switch (activeAnim) {
      case "spinner-classic":
        kf = `@keyframes spin { to { transform: rotate(360deg); } }`;
        styles = `
.loader {
  width: ${size}px;
  height: ${size}px;
  border: ${thickness}px solid ${color}33;
  border-top-color: ${color};
  border-radius: 50%;
  animation: spin ${duration} linear infinite;
}`;
        element = `<div class="loader"></div>`;
        break;

      case "spinner-ring":
        kf = `@keyframes ring { 
  0% { transform: rotate(0deg); box-shadow: 1px 3px 2px #e65c00; } 
  50% { transform: rotate(180deg); box-shadow: 1px 3px 2px #18b201; } 
  100% { transform: rotate(360deg); box-shadow: 1px 3px 2px #0456c8; } 
}`; // Simplified ring
        // Actually let's do a dual ring
        kf = `@keyframes dual-ring { 
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); } 
}`;
        styles = `
.loader {
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  border: ${thickness}px solid transparent;
  border-top-color: ${color};
  border-bottom-color: ${color};
  animation: dual-ring ${duration} linear infinite;
}`;
        element = `<div class="loader"></div>`;
        break;

      case "spinner-dots":
        kf = `@keyframes spinner-dots { 
  0%, 100% { opacity: 1; transform: scale(1); } 
  50% { opacity: 0.25; transform: scale(0.5); } 
}`;
        styles = `
.loader {
  position: relative;
  width: ${size}px;
  height: ${size}px;
}
.loader div {
  width: ${size * 0.25}px;
  height: ${size * 0.25}px;
  background: ${color};
  border-radius: 50%;
  position: absolute;
  left: 37.5%;
  top: 37.5%;
  animation: spinner-dots ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { transform: rotate(0deg) translate(${
          size * 0.35
        }px); animation-delay: -0.875s; }
.loader div:nth-child(2) { transform: rotate(45deg) translate(${
          size * 0.35
        }px); animation-delay: -0.75s; }
.loader div:nth-child(3) { transform: rotate(90deg) translate(${
          size * 0.35
        }px); animation-delay: -0.625s; }
.loader div:nth-child(4) { transform: rotate(135deg) translate(${
          size * 0.35
        }px); animation-delay: -0.5s; }
.loader div:nth-child(5) { transform: rotate(180deg) translate(${
          size * 0.35
        }px); animation-delay: -0.375s; }
.loader div:nth-child(6) { transform: rotate(225deg) translate(${
          size * 0.35
        }px); animation-delay: -0.25s; }
.loader div:nth-child(7) { transform: rotate(270deg) translate(${
          size * 0.35
        }px); animation-delay: -0.125s; }
.loader div:nth-child(8) { transform: rotate(315deg) translate(${
          size * 0.35
        }px); animation-delay: 0s; }
`;
        element = `<div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
        break;

      case "dots-pulse":
        kf = `@keyframes dots-pulse { 
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; } 
  40% { transform: scale(1); opacity: 1; } 
}`;
        styles = `
.loader {
  display: flex;
  gap: ${size * 0.15}px;
}
.loader div {
  width: ${size * 0.25}px;
  height: ${size * 0.25}px;
  background: ${color};
  border-radius: 50%;
  animation: dots-pulse ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: -0.32s; }
.loader div:nth-child(2) { animation-delay: -0.16s; }
.loader div:nth-child(3) { animation-delay: 0s; }
`;
        element = `<div class="loader"><div></div><div></div><div></div></div>`;
        break;

      case "dots-bounce":
        kf = `@keyframes dots-bounce { 
  0%, 100% { transform: translateY(0); } 
  50% { transform: translateY(-${size * 0.5}px); } 
}`;
        styles = `
.loader {
  display: flex;
  gap: ${size * 0.15}px;
  padding-top: ${size * 0.5}px;
}
.loader div {
  width: ${size * 0.25}px;
  height: ${size * 0.25}px;
  background: ${color};
  border-radius: 50%;
  animation: dots-bounce ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: -0.32s; }
.loader div:nth-child(2) { animation-delay: -0.16s; }
`;
        element = `<div class="loader"><div></div><div></div><div></div></div>`;
        break;

      case "dots-wave":
        kf = `@keyframes dots-wave { 
  0%, 100% { transform: translateY(0); } 
  25% { transform: translateY(-10px); } 
  75% { transform: translateY(10px); } 
}`; // Simplified
        styles = `
.loader {
  display: flex;
  gap: ${size * 0.1}px;
}
.loader div {
  width: ${size * 0.2}px;
  height: ${size * 0.2}px;
  background: ${color};
  border-radius: 50%;
  animation: dots-wave ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: -0.4s; }
.loader div:nth-child(2) { animation-delay: -0.3s; }
.loader div:nth-child(3) { animation-delay: -0.2s; }
.loader div:nth-child(4) { animation-delay: -0.1s; }
.loader div:nth-child(5) { animation-delay: 0s; }
`;
        element = `<div class="loader"><div></div><div></div><div></div><div></div><div></div></div>`;
        break;

      case "bars-wave":
        kf = `@keyframes bars-wave { 
  0%, 40%, 100% { transform: scaleY(0.4); } 
  20% { transform: scaleY(1); } 
}`;
        styles = `
.loader {
  display: flex;
  align-items: center;
  gap: ${size * 0.1}px;
  height: ${size}px;
}
.loader div {
  background: ${color};
  width: ${size * 0.15}px;
  height: 100%;
  animation: bars-wave ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: -0.4s; }
.loader div:nth-child(2) { animation-delay: -0.3s; }
.loader div:nth-child(3) { animation-delay: -0.2s; }
.loader div:nth-child(4) { animation-delay: -0.1s; }
.loader div:nth-child(5) { animation-delay: 0s; }
`;
        element = `<div class="loader"><div></div><div></div><div></div><div></div><div></div></div>`;
        break;

      case "pulse-ring":
        kf = `@keyframes pulse-ring { 
  0% { transform: scale(0.1); opacity: 1; } 
  100% { transform: scale(1); opacity: 0; } 
}`;
        styles = `
.loader {
  position: relative;
  width: ${size}px;
  height: ${size}px;
}
.loader div {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: ${thickness}px solid ${color};
  animation: pulse-ring ${duration} cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.loader div:nth-child(1) { animation-delay: -0.3s; }
.loader div:nth-child(2) { animation-delay: -0.15s; }
`;
        element = `<div class="loader"><div></div><div></div></div>`;
        break;

      case "ripple":
        kf = `@keyframes ripple { 
  0% { top: ${size * 0.45}px; left: ${
          size * 0.45
        }px; width: 0; height: 0; opacity: 0; } 
  4.9% { top: ${size * 0.45}px; left: ${
          size * 0.45
        }px; width: 0; height: 0; opacity: 0; } 
  5% { top: ${size * 0.45}px; left: ${
          size * 0.45
        }px; width: 0; height: 0; opacity: 1; } 
  100% { top: 0px; left: 0px; width: ${size}px; height: ${size}px; opacity: 0; } 
}`;
        styles = `
.loader {
  display: inline-block;
  position: relative;
  width: ${size}px;
  height: ${size}px;
}
.loader div {
  position: absolute;
  border: ${thickness}px solid ${color};
  opacity: 1;
  border-radius: 50%;
  animation: ripple ${duration} cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.loader div:nth-child(2) { animation-delay: -0.5s; }
`;
        element = `<div class="loader"><div></div><div></div></div>`;
        break;

      case "dots-grid":
        kf = `@keyframes dots-grid { 
  0%, 100% { opacity: 1; } 
  50% { opacity: 0.3; } 
}`;
        styles = `
.loader {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${size * 0.1}px;
  width: ${size}px;
  height: ${size}px;
}
.loader div {
  width: 100%;
  height: 100%;
  background: ${color};
  border-radius: 50%;
  animation: dots-grid ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: 0s; }
.loader div:nth-child(2) { animation-delay: 0.2s; }
.loader div:nth-child(3) { animation-delay: 0.4s; }
.loader div:nth-child(4) { animation-delay: 0.2s; }
.loader div:nth-child(5) { animation-delay: 0.4s; }
.loader div:nth-child(6) { animation-delay: 0.6s; }
.loader div:nth-child(7) { animation-delay: 0.4s; }
.loader div:nth-child(8) { animation-delay: 0.6s; }
.loader div:nth-child(9) { animation-delay: 0.8s; }
`;
        element = `<div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
        break;

      case "infinity":
        // This is tricky with pure CSS cleanly without SVG, but we can do a figure 8 with 2 circles
        kf = `@keyframes infinity { 
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); } 
}`;
        styles = `
.loader {
  position: relative;
  width: ${size * 1.5}px;
  height: ${size}px;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
  width: ${size}px;
  height: ${size}px;
  border: ${thickness}px solid ${color};
  border-radius: 50%;
  animation: infinity ${duration} linear infinite;
}
.loader:before { left: 0; border-right-color: transparent; }
.loader:after { left: ${
          size * 0.5
        }px; border-left-color: transparent; animation-direction: reverse; }
`;
        element = `<div class="loader"></div>`;
        break;

      case "pacman":
        kf = `@keyframes pacman-jaw { 
  0% { transform: rotate(0deg); } 
  50% { transform: rotate(45deg); } 
  100% { transform: rotate(0deg); }
}
@keyframes pacman-jaw-2 { 
  0% { transform: rotate(180deg); } 
  50% { transform: rotate(135deg); } 
  100% { transform: rotate(180deg); } 
}
@keyframes pacman-ball {
  0% { left: ${size}px; opacity: 1; }
  100% { left: 0; opacity: 0; }
}`;
        styles = `
.loader {
  position: relative;
  width: ${size}px;
  height: ${size}px;
}
.jaw {
  width: 0px; 
  height: 0px; 
  border-right: ${size / 2}px solid transparent; 
  border-top: ${size / 2}px solid ${color}; 
  border-left: ${size / 2}px solid ${color}; 
  border-bottom: ${size / 2}px solid ${color}; 
  border-radius: 50%;
  position: absolute;
}
.jaw1 { animation: pacman-jaw ${
          parseFloat(duration) / 2
        }s infinite linear; z-index: 1;}
.jaw2 { animation: pacman-jaw-2 ${
          parseFloat(duration) / 2
        }s infinite linear;  z-index: 1;}
.balls div {
  position: absolute;
  top: ${size / 2 - 5}px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${color};
  animation: pacman-ball ${duration} infinite linear;
}
.balls div:nth-child(1) { animation-delay: -0.66s; }
.balls div:nth-child(2) { animation-delay: -0.33s; }
`;
        element = `<div class="loader"><div class="jaw jaw1"></div><div class="jaw jaw2"></div><div class="balls"><div></div><div></div><div></div></div></div>`;
        break;

      case "orbit":
        kf = `@keyframes orbit-rotate { 100% { transform: rotate(360deg); } }`;
        styles = `
.loader {
  position: relative;
  width: ${size}px;
  height: ${size}px;
  animation: orbit-rotate ${duration} linear infinite;
}
.loader:before {
  content: '';
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;
  border-radius: 50%;
  border: ${thickness}px solid ${color}33;
}
.loader:after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: ${size / 4}px;
  height: ${size / 4}px;
  background: ${color};
  border-radius: 50%;
  margin-left: -${size / 8}px;
  margin-top: -${size / 8}px;
}`;
        element = `<div class="loader"></div>`;
        break;

      default:
        // Default spinner or others not fully implemented in this giant switch yet
        kf = `@keyframes spin { to { transform: rotate(360deg); } }`;
        styles = `.loader { width: ${size}px; height: ${size}px; border: ${thickness}px solid ${color}; border-top-color: transparent; border-radius: 50%; animation: spin ${duration} linear infinite; }`;
        element = `<div class="loader"></div>`;
        break;
    }

    return { css: `${kf}\n${styles}`, html: element, keyframes: kf, styles };
  }, [activeAnim, color, size, speed, thickness]);

  // --- Helpers ---

  const copy = (text: string, type: "css" | "html") => {
    navigator.clipboard.writeText(text);
    if (type === "css") {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } else {
      setCopiedHTML(true);
      setTimeout(() => setCopiedHTML(false), 2000);
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
              Loader Lab
            </h1>
            <Badge
              variant="secondary"
              className="text-[10px] uppercase font-mono tracking-widest hidden sm:flex"
            >
              v3.0
            </Badge>
          </div>
        </div>
        {/* Top preset shortcuts could go here */}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[320px] border-r bg-muted/10 flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="p-4 space-y-6">
            <div className="space-y-4">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
                Animation Style
              </Label>
              <Select
                value={activeAnim}
                onValueChange={(v: any) => setActiveAnim(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {ANIMATIONS.map((a) => (
                    <SelectItem key={a.value} value={a.value}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
                Appearance
              </Label>

              <div className="space-y-2">
                <Label className="text-xs">Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="w-10 h-10 p-1 border-0 rounded-md cursor-pointer"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <Input
                    className="flex-1 font-mono text-xs"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-xs">Size</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {size}px
                  </span>
                </div>
                <Slider
                  min={16}
                  max={200}
                  step={4}
                  value={[size]}
                  onValueChange={([v]) => setSize(v)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-xs">Thickness</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {thickness}px
                  </span>
                </div>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={[thickness]}
                  onValueChange={([v]) => setThickness(v)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-xs">Speed</Label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {speed}x
                  </span>
                </div>
                <Slider
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[speed]}
                  onValueChange={([v]) => setSpeed(v)}
                />
              </div>
            </div>

            <Separator />

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-3 bg-muted/30 border-b flex justify-between items-center">
                <span className="text-xs font-medium flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5" /> Code
                </span>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => copy(css, "css")}
                  >
                    {copiedCSS ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-muted/10">
                <ScrollArea className="h-[200px] w-full rounded-md border p-2 bg-background/50">
                  <pre className="text-[10px] font-mono leading-relaxed whitespace-pre-wrap break-all text-muted-foreground">
                    {css.trim()}
                  </pre>
                </ScrollArea>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Stage */}
        <main className="flex-1 flex flex-col items-center justify-center bg-dot-pattern relative p-10">
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => copy(html, "html")}
            >
              {copiedHTML ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <LayoutGrid className="w-4 h-4" />
              )}
              {copiedHTML ? "Copied" : "Copy HTML"}
            </Button>
          </div>

          <div
            className="flex items-center justify-center p-20 rounded-xl shadow-2xl bg-white dark:bg-zinc-900 border transition-all duration-300"
            style={{
              minWidth: Math.max(200, size * 2),
              minHeight: Math.max(200, size * 2),
            }}
          >
            <style>{keyframes}</style>
            <style>{styles.split(".loader").join(".preview-loader")}</style>
            {/* We inject specific class for preview to avoid global pollution if we had multiple */}
            <div
              dangerouslySetInnerHTML={{
                __html: html.replace(
                  'class="loader"',
                  'class="preview-loader"'
                ),
              }}
            />
          </div>

          <p className="mt-8 text-muted-foreground text-sm font-medium animate-pulse">
            Previewing: {ANIMATIONS.find((a) => a.value === activeAnim)?.label}
          </p>
        </main>
      </div>
    </div>
  );
}
