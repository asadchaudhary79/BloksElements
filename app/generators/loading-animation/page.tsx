"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type AnimationType =
  | "spinner"
  | "dots"
  | "bars"
  | "pulse"
  | "wave"
  | "ring"
  | "grid"
  | "orbit";

export default function LoadingAnimationGeneratorPage() {
  const [animationType, setAnimationType] = useState<AnimationType>("spinner");
  const [color, setColor] = useState("#10b981");
  const [size, setSize] = useState(40);
  const [speed, setSpeed] = useState(1);
  const [thickness, setThickness] = useState(4);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const generateCSS = () => {
    const animationName = `loading-${animationType}`;
    const duration = `${1 / speed}s`;

    let keyframes = "";
    let animationCSS = "";

    switch (animationType) {
      case "spinner":
        keyframes = `@keyframes ${animationName} {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
        animationCSS = `
.loader {
  width: ${size}px;
  height: ${size}px;
  border: ${thickness}px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${color};
  border-radius: 50%;
  animation: ${animationName} ${duration} linear infinite;
}`;
        break;

      case "dots":
        keyframes = `@keyframes ${animationName} {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}`;
        animationCSS = `
.loader {
  display: flex;
  gap: ${size / 6}px;
}
.loader div {
  width: ${size / 3}px;
  height: ${size / 3}px;
  background-color: ${color};
  border-radius: 50%;
  animation: ${animationName} ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: -0.32s; }
.loader div:nth-child(2) { animation-delay: -0.16s; }`;
        break;

      case "bars":
        keyframes = `@keyframes ${animationName} {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}`;
        animationCSS = `
.loader {
  display: flex;
  align-items: center;
  gap: ${size / 8}px;
  height: ${size}px;
}
.loader div {
  width: ${size / 6}px;
  background-color: ${color};
  animation: ${animationName} ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: -0.4s; }
.loader div:nth-child(2) { animation-delay: -0.3s; }
.loader div:nth-child(3) { animation-delay: -0.2s; }
.loader div:nth-child(4) { animation-delay: -0.1s; }`;
        break;

      case "pulse":
        keyframes = `@keyframes ${animationName} {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.8); opacity: 0.5; }
}`;
        animationCSS = `
.loader {
  width: ${size}px;
  height: ${size}px;
  background-color: ${color};
  border-radius: 50%;
  animation: ${animationName} ${duration} ease-in-out infinite;
}`;
        break;

      case "wave":
        keyframes = `@keyframes ${animationName} {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}`;
        animationCSS = `
.loader {
  display: flex;
  align-items: center;
  gap: ${size / 10}px;
  height: ${size}px;
}
.loader div {
  width: ${size / 8}px;
  background-color: ${color};
  border-radius: 2px;
  animation: ${animationName} ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: -0.4s; }
.loader div:nth-child(2) { animation-delay: -0.3s; }
.loader div:nth-child(3) { animation-delay: -0.2s; }
.loader div:nth-child(4) { animation-delay: -0.1s; }
.loader div:nth-child(5) { animation-delay: 0s; }`;
        break;

      case "ring":
        keyframes = `@keyframes ${animationName} {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
        animationCSS = `
.loader {
  width: ${size}px;
  height: ${size}px;
  position: relative;
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${size * 0.8}px;
  height: ${size * 0.8}px;
  margin: ${size * 0.1}px;
  border: ${thickness}px solid ${color};
  border-radius: 50%;
  animation: ${animationName} ${duration} cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${color} transparent transparent transparent;
}
.loader div:nth-child(1) { animation-delay: -0.45s; }
.loader div:nth-child(2) { animation-delay: -0.3s; }
.loader div:nth-child(3) { animation-delay: -0.15s; }`;
        break;

      case "grid":
        keyframes = `@keyframes ${animationName} {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}`;
        animationCSS = `
.loader {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${size / 12}px;
  width: ${size}px;
  height: ${size}px;
}
.loader div {
  background-color: ${color};
  animation: ${animationName} ${duration} infinite ease-in-out;
}
.loader div:nth-child(1) { animation-delay: 0s; }
.loader div:nth-child(2) { animation-delay: 0.1s; }
.loader div:nth-child(3) { animation-delay: 0.2s; }
.loader div:nth-child(4) { animation-delay: 0.3s; }
.loader div:nth-child(5) { animation-delay: 0.4s; }
.loader div:nth-child(6) { animation-delay: 0.5s; }
.loader div:nth-child(7) { animation-delay: 0.6s; }
.loader div:nth-child(8) { animation-delay: 0.7s; }
.loader div:nth-child(9) { animation-delay: 0.8s; }`;
        break;

      case "orbit":
        keyframes = `@keyframes ${animationName} {
  0% { transform: rotate(0deg) translateX(${size / 2}px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(${size / 2}px) rotate(-360deg); }
}`;
        animationCSS = `
.loader {
  width: ${size}px;
  height: ${size}px;
  position: relative;
  animation: ${animationName} ${duration} linear infinite;
}
.loader::before {
  content: '';
  position: absolute;
  width: ${size / 4}px;
  height: ${size / 4}px;
  background-color: ${color};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-left: ${-size / 8}px;
  margin-top: ${-size / 8}px;
}`;
        break;
    }

    return `${keyframes}\n${animationCSS}`.trim();
  };

  const generateHTML = () => {
    switch (animationType) {
      case "dots":
        return `<div class="loader">
  <div></div>
  <div></div>
  <div></div>
</div>`;

      case "bars":
        return `<div class="loader">
  <div style="height: ${size * 0.6}px;"></div>
  <div style="height: ${size}px;"></div>
  <div style="height: ${size * 0.8}px;"></div>
  <div style="height: ${size * 0.6}px;"></div>
</div>`;

      case "wave":
        return `<div class="loader">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`;

      case "ring":
        return `<div class="loader">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`;

      case "grid":
        return `<div class="loader">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`;

      default:
        return `<div class="loader"></div>`;
    }
  };

  const cssCode = generateCSS();
  const htmlCode = generateHTML();

  const handleCopy = (code: string) => {
    copyToClipboard(code);
  };

  const renderLoader = () => {
    const style: React.CSSProperties = {
      width: `${size}px`,
      height: `${size}px`,
      color: color,
    };

    switch (animationType) {
      case "spinner":
        return (
          <div
            className="loader"
            style={{
              ...style,
              border: `${thickness}px solid rgba(0, 0, 0, 0.1)`,
              borderTopColor: color,
              borderRadius: "50%",
              animation: `spin ${1 / speed}s linear infinite`,
            }}
          />
        );

      case "dots":
        return (
          <div className="loader flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: `${size / 3}px`,
                  height: `${size / 3}px`,
                  backgroundColor: color,
                  borderRadius: "50%",
                  animationName: "dots",
                  animationDuration: `${1 / speed}s`,
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${-0.32 + i * 0.16}s`,
                }}
              />
            ))}
          </div>
        );

      case "bars":
        return (
          <div className="loader flex items-end gap-1" style={{ height: `${size}px` }}>
            {[
              size * 0.6,
              size,
              size * 0.8,
              size * 0.6,
            ].map((h, i) => (
              <div
                key={i}
                style={{
                  width: `${size / 6}px`,
                  height: `${h}px`,
                  backgroundColor: color,
                  animationName: "bars",
                  animationDuration: `${1 / speed}s`,
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${-0.4 + i * 0.1}s`,
                }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div
            className="loader"
            style={{
              ...style,
              backgroundColor: color,
              borderRadius: "50%",
              animation: `pulse ${1 / speed}s ease-in-out infinite`,
            }}
          />
        );

      case "wave":
        return (
          <div className="loader flex items-end gap-1" style={{ height: `${size}px` }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: `${size / 8}px`,
                  backgroundColor: color,
                  borderRadius: "2px",
                  height: `${size * (0.4 + (i % 2) * 0.4)}px`,
                  animationName: "wave",
                  animationDuration: `${1 / speed}s`,
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${-0.4 + i * 0.1}s`,
                }}
              />
            ))}
          </div>
        );

      case "ring":
        return (
          <div className="loader relative" style={style}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  position: "absolute",
                  width: `${size * 0.8}px`,
                  height: `${size * 0.8}px`,
                  margin: `${size * 0.1}px`,
                  border: `${thickness}px solid ${color}`,
                  borderRadius: "50%",
                  animationName: "ring",
                  animationDuration: `${1 / speed}s`,
                  animationTimingFunction: "cubic-bezier(0.5, 0, 0.5, 1)",
                  animationIterationCount: "infinite",
                  borderColor: `${color} transparent transparent transparent`,
                  animationDelay: `${-0.45 + i * 0.15}s`,
                }}
              />
            ))}
          </div>
        );

      case "grid":
        return (
          <div
            className="loader grid grid-cols-3 gap-1"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  animationName: "grid",
                  animationDuration: `${1 / speed}s`,
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        );

      case "orbit":
        return (
          <div
            className="loader relative"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              animation: `orbit ${1 / speed}s linear infinite`,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: `${size / 4}px`,
                height: `${size / 4}px`,
                backgroundColor: color,
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                marginLeft: `${-size / 8}px`,
                marginTop: `${-size / 8}px`,
                transform: `translateX(${size / 2}px)`,
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const orbitKeyframes = `@keyframes orbit {
  0% { transform: rotate(0deg) translateX(${size / 2}px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(${size / 2}px) rotate(-360deg); }
}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dots {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes bars {
          0%, 40%, 100% { transform: scaleY(0.4); }
          20% { transform: scaleY(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.5; }
        }
        @keyframes wave {
          0%, 40%, 100% { transform: scaleY(0.4); }
          20% { transform: scaleY(1); }
        }
        @keyframes ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes grid {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        ${orbitKeyframes}
      `,
        }}
      />
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <Link
            href="/generators"
            className="text-sm text-muted-foreground flex gap-1 items-center hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="w-3 h-3" />
            <span>Back to generators</span>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Loading Animation Generator
            </h1>
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
            >
              Interactive
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Generate beautiful CSS loading animations. Choose from spinners,
            dots, bars, pulse, wave, ring, grid, and orbit animations.
            Customize colors, size, speed, and export CSS code.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Controls */}
          <Card className="border-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Animation Type */}
              <div className="space-y-2">
                <Label htmlFor="animationType">Animation Type</Label>
                <Select
                  value={animationType}
                  onValueChange={(value: AnimationType) =>
                    setAnimationType(value)
                  }
                >
                  <SelectTrigger id="animationType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spinner">Spinner</SelectItem>
                    <SelectItem value="dots">Dots</SelectItem>
                    <SelectItem value="bars">Bars</SelectItem>
                    <SelectItem value="pulse">Pulse</SelectItem>
                    <SelectItem value="wave">Wave</SelectItem>
                    <SelectItem value="ring">Ring</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="orbit">Orbit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <Label>Size: {size}px</Label>
                <Slider
                  min={20}
                  max={100}
                  step={5}
                  value={[size]}
                  onValueChange={(value) => setSize(value[0])}
                  className="w-full"
                />
              </div>

              {/* Speed */}
              <div className="space-y-2">
                <Label>Speed: {speed}x</Label>
                <Slider
                  min={0.25}
                  max={3}
                  step={0.25}
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  className="w-full"
                />
              </div>

              {/* Thickness (for spinner and ring) */}
              {(animationType === "spinner" || animationType === "ring") && (
                <div className="space-y-2">
                  <Label>Thickness: {thickness}px</Label>
                  <Slider
                    min={2}
                    max={20}
                    step={1}
                    value={[thickness]}
                    onValueChange={(value) => setThickness(value[0])}
                    className="w-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview and Code */}
          <Card className="border-2 lg:col-span-2">
            <CardHeader>
              <CardTitle>Preview & Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preview */}
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="w-full h-64 rounded-lg border-2 border-dotted overflow-hidden bg-muted/30 flex items-center justify-center">
                  {renderLoader()}
                </div>
              </div>

              {/* Generated Code */}
              <div className="space-y-2">
                <Label>Generated Code</Label>
                <Tabs defaultValue="css" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                  </TabsList>
                  <TabsContent value="css" className="space-y-2 mt-4">
                    <div className="flex items-center justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(cssCode)}
                        className="rounded-full"
                      >
                        {isCopied ? (
                          <>
                            <IconCheck className="mr-2 size-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <IconCopy className="mr-2 size-4" />
                            Copy CSS
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
                      <code className="text-foreground whitespace-pre">{cssCode}</code>
                    </div>
                  </TabsContent>
                  <TabsContent value="html" className="space-y-2 mt-4">
                    <div className="flex items-center justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(htmlCode)}
                        className="rounded-full"
                      >
                        {isCopied ? (
                          <>
                            <IconCheck className="mr-2 size-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <IconCopy className="mr-2 size-4" />
                            Copy HTML
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-foreground">{htmlCode}</code>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

