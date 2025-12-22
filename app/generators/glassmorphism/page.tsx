"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export default function GlassmorphismGeneratorPage() {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.3);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [backgroundStart, setBackgroundStart] = useState("#ffffff");
  const [backgroundEnd, setBackgroundEnd] = useState("#ffffff");
  const [useGradient, setUseGradient] = useState(false);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const borderColorRgba = hexToRgba(borderColor, borderOpacity);
  const backgroundStartRgba = hexToRgba(backgroundStart, opacity);
  const backgroundEndRgba = hexToRgba(backgroundEnd, opacity);

  const backgroundStyle = useGradient
    ? `linear-gradient(135deg, ${backgroundStartRgba}, ${backgroundEndRgba})`
    : backgroundStartRgba;

  const cssCode = `.glassmorphism {
  background: ${backgroundStyle};
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: ${borderWidth}px solid ${borderColorRgba};
  border-radius: 16px;
}`;

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const handleCopy = () => {
    copyToClipboard(cssCode);
  };

  const previewStyle = {
    background: backgroundStyle,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `${borderWidth}px solid ${borderColorRgba}`,
    borderRadius: "16px",
  };

  return (
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
            Glassmorphism Generator
          </h1>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Create stunning glassmorphism effects with adjustable blur,
          transparency, borders, and gradients. Perfect for modern UI designs.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Blur */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="blur">Blur: {blur}px</Label>
              </div>
              <Slider
                id="blur"
                min={0}
                max={50}
                step={1}
                value={[blur]}
                onValueChange={(value) => setBlur(value[0])}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="opacity">Opacity: {opacity.toFixed(2)}</Label>
              </div>
              <Slider
                id="opacity"
                min={0}
                max={1}
                step={0.01}
                value={[opacity]}
                onValueChange={(value) => setOpacity(value[0])}
                className="w-full"
              />
            </div>

            {/* Border Width */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="borderWidth">
                  Border Width: {borderWidth}px
                </Label>
              </div>
              <Slider
                id="borderWidth"
                min={0}
                max={10}
                step={1}
                value={[borderWidth]}
                onValueChange={(value) => setBorderWidth(value[0])}
                className="w-full"
              />
            </div>

            {/* Border Color */}
            <div className="space-y-2">
              <Label htmlFor="borderColor">Border Color</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="borderColor"
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="h-12 w-20 cursor-pointer border-2"
                />
                <Input
                  type="text"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="flex-1"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* Border Opacity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="borderOpacity">
                  Border Opacity: {borderOpacity.toFixed(2)}
                </Label>
              </div>
              <Slider
                id="borderOpacity"
                min={0}
                max={1}
                step={0.01}
                value={[borderOpacity]}
                onValueChange={(value) => setBorderOpacity(value[0])}
                className="w-full"
              />
            </div>

            {/* Use Gradient */}
            <div className="flex items-center gap-3">
              <input
                id="useGradient"
                type="checkbox"
                checked={useGradient}
                onChange={(e) => setUseGradient(e.target.checked)}
                className="h-4 w-4 rounded border-2 cursor-pointer"
              />
              <Label htmlFor="useGradient" className="cursor-pointer">
                Use gradient background
              </Label>
            </div>

            {/* Background Start Color */}
            <div className="space-y-2">
              <Label htmlFor="backgroundStart">
                {useGradient ? "Background Start Color" : "Background Color"}
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="backgroundStart"
                  type="color"
                  value={backgroundStart}
                  onChange={(e) => setBackgroundStart(e.target.value)}
                  className="h-12 w-20 cursor-pointer border-2"
                />
                <Input
                  type="text"
                  value={backgroundStart}
                  onChange={(e) => setBackgroundStart(e.target.value)}
                  className="flex-1"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* Background End Color (only if gradient) */}
            {useGradient && (
              <div className="space-y-2">
                <Label htmlFor="backgroundEnd">Background End Color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="backgroundEnd"
                    type="color"
                    value={backgroundEnd}
                    onChange={(e) => setBackgroundEnd(e.target.value)}
                    className="h-12 w-20 cursor-pointer border-2"
                  />
                  <Input
                    type="text"
                    value={backgroundEnd}
                    onChange={(e) => setBackgroundEnd(e.target.value)}
                    className="flex-1"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Glassmorphism Preview */}
            <div className="relative min-h-[300px] rounded-lg border-2 border-dotted overflow-hidden">
              {/* Background pattern for visibility */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 via-purple-500/20 to-pink-500/20" />
              {/* Glassmorphism element */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div
                  style={previewStyle}
                  className="w-full max-w-sm p-8 text-center"
                >
                  <h3 className="text-2xl font-bold mb-2">Glassmorphism</h3>
                  <p className="text-muted-foreground">
                    Beautiful frosted glass effect
                  </p>
                </div>
              </div>
            </div>

            {/* Generated CSS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Generated CSS</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
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
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                <code className="text-foreground whitespace-pre">{cssCode}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

