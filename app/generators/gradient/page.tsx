"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconTrash,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

const gradientPresets = [
  {
    name: "Sunset",
    type: "linear" as const,
    angle: 135,
    shape: "ellipse" as const,
    stops: [
      { color: "#ff6b6b", position: 0 },
      { color: "#ff8c42", position: 33 },
      { color: "#ffa500", position: 66 },
      { color: "#ffd700", position: 100 },
    ],
  },
  {
    name: "Ocean",
    type: "linear" as const,
    angle: 180,
    shape: "ellipse" as const,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 40 },
      { color: "#8b7fb8", position: 70 },
      { color: "#9d8cc7", position: 100 },
    ],
  },
  {
    name: "Forest",
    type: "radial" as const,
    angle: 135,
    shape: "circle" as const,
    stops: [
      { color: "#134e5e", position: 0 },
      { color: "#56ab2f", position: 40 },
      { color: "#a8e063", position: 75 },
      { color: "#d4fc79", position: 100 },
    ],
  },
  {
    name: "Fire",
    type: "linear" as const,
    angle: 45,
    shape: "ellipse" as const,
    stops: [
      { color: "#f12711", position: 0 },
      { color: "#f55536", position: 30 },
      { color: "#f5af19", position: 65 },
      { color: "#ffd700", position: 100 },
    ],
  },
  {
    name: "Purple Dream",
    type: "linear" as const,
    angle: 120,
    shape: "ellipse" as const,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 35 },
      { color: "#a855f7", position: 70 },
      { color: "#c084fc", position: 100 },
    ],
  },
  {
    name: "Tropical",
    type: "linear" as const,
    angle: 90,
    shape: "ellipse" as const,
    stops: [
      { color: "#f093fb", position: 0 },
      { color: "#f5576c", position: 33 },
      { color: "#ff9a56", position: 66 },
      { color: "#ffad56", position: 100 },
    ],
  },
  {
    name: "Aurora",
    type: "linear" as const,
    angle: 60,
    shape: "ellipse" as const,
    stops: [
      { color: "#0f2027", position: 0 },
      { color: "#203a43", position: 30 },
      { color: "#2c5364", position: 60 },
      { color: "#00d4ff", position: 100 },
    ],
  },
  {
    name: "Peach",
    type: "radial" as const,
    angle: 135,
    shape: "ellipse" as const,
    stops: [
      { color: "#fad0c4", position: 0 },
      { color: "#ffd1ff", position: 40 },
      { color: "#ffecd2", position: 75 },
      { color: "#fcb69f", position: 100 },
    ],
  },
  {
    name: "Cosmic",
    type: "linear" as const,
    angle: 225,
    shape: "ellipse" as const,
    stops: [
      { color: "#0c0c0c", position: 0 },
      { color: "#2d1b4e", position: 35 },
      { color: "#6a1b9a", position: 65 },
      { color: "#ab47bc", position: 100 },
    ],
  },
];

export default function GradientGeneratorPage() {
  const [gradientType, setGradientType] = useState<"linear" | "radial">(
    "linear"
  );
  const [angle, setAngle] = useState(90);
  const [shape, setShape] = useState<"circle" | "ellipse">("ellipse");
  const [colorCountMode, setColorCountMode] = useState<
    "2" | "3" | "4" | "custom"
  >("4");
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#667eea", position: 0 },
    { id: "2", color: "#764ba2", position: 33 },
    { id: "3", color: "#a855f7", position: 66 },
    { id: "4", color: "#c084fc", position: 100 },
  ]);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const setColorCount = (count: "2" | "3" | "4" | "custom") => {
    setColorCountMode(count);

    if (count === "2") {
      setColorStops([
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 100 },
      ]);
    } else if (count === "3") {
      setColorStops([
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 50 },
        { id: "3", color: "#a855f7", position: 100 },
      ]);
    } else if (count === "4") {
      setColorStops([
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 33 },
        { id: "3", color: "#a855f7", position: 66 },
        { id: "4", color: "#c084fc", position: 100 },
      ]);
    }
    // If "custom", user can manually add/remove colors
  };

  const addColorStop = () => {
    setColorCountMode("custom");
    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: "#10b981",
      position: 50,
    };
    setColorStops(
      [...colorStops, newStop].sort((a, b) => a.position - b.position)
    );
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      const newStops = colorStops.filter((stop) => stop.id !== id);
      setColorStops(newStops);
      // Auto-detect color count mode
      if (newStops.length === 2) {
        setColorCountMode("2");
      } else if (newStops.length === 3) {
        setColorCountMode("3");
      } else if (newStops.length === 4) {
        setColorCountMode("4");
      } else {
        setColorCountMode("custom");
      }
    }
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    const newStops = colorStops
      .map((stop) => (stop.id === id ? { ...stop, ...updates } : stop))
      .sort((a, b) => a.position - b.position);
    setColorStops(newStops);
    // If user manually changes stops, switch to custom mode
    if (colorCountMode !== "custom") {
      const expectedCount =
        colorCountMode === "2" ? 2 : colorCountMode === "3" ? 3 : 4;
      if (newStops.length !== expectedCount) {
        setColorCountMode("custom");
      }
    }
  };

  const applyPreset = (preset: (typeof gradientPresets)[0]) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    if (preset.shape) {
      setShape(preset.shape);
    }
    const newStops = preset.stops.map((stop, index) => ({
      id: (index + 1).toString(),
      color: stop.color,
      position: stop.position,
    }));
    setColorStops(newStops);
    // Set color count mode based on preset stops length
    if (newStops.length === 2) {
      setColorCountMode("2");
    } else if (newStops.length === 3) {
      setColorCountMode("3");
    } else if (newStops.length === 4) {
      setColorCountMode("4");
    } else {
      setColorCountMode("custom");
    }
  };

  const generateGradientCSS = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `background: linear-gradient(${angle}deg, ${stopsString});`;
    } else {
      return `background: radial-gradient(${shape}, ${stopsString});`;
    }
  };

  const generateTailwindCSS = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      // Remove spaces for Tailwind arbitrary values
      const cleanStops = stopsString.replace(/\s+/g, "");
      return `bg-[linear-gradient(${angle}deg,${cleanStops})]`;
    } else {
      // Remove spaces for Tailwind arbitrary values
      const cleanStops = stopsString.replace(/\s+/g, "");
      return `bg-[radial-gradient(${shape},${cleanStops})]`;
    }
  };

  const gradientStyle = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return {
        background: `linear-gradient(${angle}deg, ${stopsString})`,
      };
    } else {
      return {
        background: `radial-gradient(${shape}, ${stopsString})`,
      };
    }
  };

  const cssCode = generateGradientCSS();
  const tailwindCode = generateTailwindCSS();
  const previewStyle = gradientStyle();

  const handleCopy = (code: string) => {
    copyToClipboard(code);
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
            Gradient Generator
          </h1>
          <Badge
            variant="secondary"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          >
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Create stunning CSS gradients with our visual generator. Design linear
          and radial gradients with unlimited color stops. Export CSS code
          instantly. Free online gradient tool.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controls */}
        <Card className="border-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gradient Type */}
            <div className="space-y-2">
              <Label htmlFor="gradientType">Gradient Type</Label>
              <Select
                value={gradientType}
                onValueChange={(value: "linear" | "radial") =>
                  setGradientType(value)
                }
              >
                <SelectTrigger id="gradientType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Angle (for linear) */}
            {gradientType === "linear" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="angle">Angle: {angle}°</Label>
                </div>
                <Slider
                  id="angle"
                  min={0}
                  max={360}
                  step={1}
                  value={[angle]}
                  onValueChange={(value) => setAngle(value[0])}
                  className="w-full"
                />
              </div>
            )}

            {/* Shape (for radial) */}
            {gradientType === "radial" && (
              <div className="space-y-2">
                <Label htmlFor="shape">Shape</Label>
                <Select
                  value={shape}
                  onValueChange={(value: "circle" | "ellipse") =>
                    setShape(value)
                  }
                >
                  <SelectTrigger id="shape">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="ellipse">Ellipse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Color Count Mode */}
            <div className="space-y-2">
              <Label htmlFor="colorCount">Color Count</Label>
              <Select
                value={colorCountMode}
                onValueChange={(value: "2" | "3" | "4" | "custom") =>
                  setColorCount(value)
                }
              >
                <SelectTrigger id="colorCount">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Colors</SelectItem>
                  <SelectItem value="3">3 Colors</SelectItem>
                  <SelectItem value="4">4 Colors</SelectItem>
                  <SelectItem value="custom">Custom (Multiple)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color Stops */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Colors</Label>
                <Button
                  onClick={addColorStop}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={colorCountMode !== "custom"}
                >
                  + Add
                </Button>
              </div>

              <div className="space-y-4">
                {colorStops.map((stop) => (
                  <div
                    key={stop.id}
                    className="space-y-3 rounded-lg border border-dotted p-3 bg-background/50"
                  >
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={stop.color}
                        onChange={(e) =>
                          updateColorStop(stop.id, { color: e.target.value })
                        }
                        className="h-10 w-16 cursor-pointer border-2 p-1"
                      />
                      <Input
                        type="text"
                        value={stop.color}
                        onChange={(e) =>
                          updateColorStop(stop.id, { color: e.target.value })
                        }
                        className="flex-1 font-mono text-sm"
                        placeholder="#000000"
                      />
                      {colorCountMode === "custom" && colorStops.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeColorStop(stop.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <IconTrash className="size-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">
                          Position: {stop.position}%
                        </Label>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[stop.position]}
                        onValueChange={(value) =>
                          updateColorStop(stop.id, { position: value[0] })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview and Code */}
        <Card className="border-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Preview & Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gradient Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div
                className="w-full h-64 rounded-lg border-2 border-dotted overflow-hidden"
                style={previewStyle}
              />
            </div>

            {/* Generated Code */}
            <div className="space-y-2">
              <Label>Generated Code</Label>
              <Tabs defaultValue="css" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
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
                  <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-foreground">{cssCode}</code>
                  </div>
                </TabsContent>
                <TabsContent value="tailwind" className="space-y-2 mt-4">
                  <div className="flex items-center justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(tailwindCode)}
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
                          Copy Tailwind
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-foreground">{tailwindCode}</code>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Gradient Presets */}
            <div className="space-y-2 pt-4 border-t">
              <div>
                <Label>Gradient Presets</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Quick start with beautiful gradients
                </p>
              </div>
              <div className="grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {gradientPresets.map((preset) => {
                  const presetStops = preset.stops
                    .map((s) => `${s.color} ${s.position}%`)
                    .join(", ");
                  const presetStyle =
                    preset.type === "linear"
                      ? {
                          background: `linear-gradient(${preset.angle}deg, ${presetStops})`,
                        }
                      : {
                          background: `radial-gradient(${
                            preset.shape || "ellipse"
                          }, ${presetStops})`,
                        };

                  return (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="group relative overflow-hidden rounded-lg border-2 border-dotted h-20 transition-all hover:border-emerald-500/50 hover:scale-105"
                      style={presetStyle}
                      title={preset.name}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs font-medium px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {preset.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How to Use */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Color Stops</h3>
              <p className="text-sm text-muted-foreground">
                Click the color picker to change colors, or type hex values. Use
                the slider to adjust positioning. Add multiple stops for complex
                gradients.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Linear Gradients</h3>
              <p className="text-sm text-muted-foreground">
                Adjust the angle (0° to 360°) to change direction. 0° points
                right, 90° points down, 180° points left, 270° points up.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Radial Gradients</h3>
              <p className="text-sm text-muted-foreground">
                Choose between circle or ellipse shapes. Radial gradients
                radiate from the center outward.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Browser Support</h3>
              <p className="text-sm text-muted-foreground">
                CSS gradients are supported by all modern browsers. Copy the
                generated CSS and paste it into your stylesheet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
