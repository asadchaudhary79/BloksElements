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

export default function BoxShadowGeneratorPage() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.1);
  const [inset, setInset] = useState(false);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const rgbaColor = hexToRgba(color, opacity);
  const boxShadow = `${
    inset ? "inset " : ""
  }${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor}`;
  const cssCode = `box-shadow: ${boxShadow};`;

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const handleCopy = () => {
    copyToClipboard(cssCode);
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
            Box Shadow Generator
          </h1>
          <Badge
            variant="secondary"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          >
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Create custom box shadows with interactive controls. Adjust offset,
          blur, spread, color, and opacity to get the perfect shadow effect.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Offset X */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="offsetX">Offset X: {offsetX}px</Label>
              </div>
              <Slider
                id="offsetX"
                min={-50}
                max={50}
                step={1}
                value={[offsetX]}
                onValueChange={(value) => setOffsetX(value[0])}
                className="w-full"
              />
            </div>

            {/* Offset Y */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="offsetY">Offset Y: {offsetY}px</Label>
              </div>
              <Slider
                id="offsetY"
                min={-50}
                max={50}
                step={1}
                value={[offsetY]}
                onValueChange={(value) => setOffsetY(value[0])}
                className="w-full"
              />
            </div>

            {/* Blur */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="blur">Blur: {blur}px</Label>
              </div>
              <Slider
                id="blur"
                min={0}
                max={100}
                step={1}
                value={[blur]}
                onValueChange={(value) => setBlur(value[0])}
                className="w-full"
              />
            </div>

            {/* Spread */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="spread">Spread: {spread}px</Label>
              </div>
              <Slider
                id="spread"
                min={-50}
                max={50}
                step={1}
                value={[spread]}
                onValueChange={(value) => setSpread(value[0])}
                className="w-full"
              />
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-12 w-20 cursor-pointer border-2"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1"
                  placeholder="#000000"
                />
              </div>
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

            {/* Inset */}
            <div className="flex items-center gap-3">
              <input
                id="inset"
                type="checkbox"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
                className="h-4 w-4 rounded border-2 cursor-pointer"
              />
              <Label htmlFor="inset" className="cursor-pointer">
                Inset shadow
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center min-h-[300px] rounded-lg border-2 border-dotted bg-background/50">
              <div
                className="w-32 h-32 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm text-foreground font-medium"
                style={{ boxShadow }}
              >
                Preview Box
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
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                <code className="text-foreground">{cssCode}</code>
              </div>
            </div>

            {/* Box Shadow Value */}
            <div className="space-y-2">
              <Label>Box Shadow Value</Label>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                <code className="text-foreground">{boxShadow}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
