"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Layers,
  Plus,
  Trash2,
  Settings2,
  Box,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

interface ShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
  active: boolean;
}

const DEFAULT_SHADOW: ShadowLayer = {
  id: "1",
  offsetX: 0,
  offsetY: 4,
  blur: 16,
  spread: 0,
  color: "#000000",
  opacity: 0.1,
  inset: false,
  active: true,
};

export default function BoxShadowGeneratorPage() {
  const [shadows, setShadows] = useState<ShadowLayer[]>([
    { ...DEFAULT_SHADOW },
  ]);
  const [selectedLayerId, setSelectedLayerId] = useState<string>("1");
  const [boxColor, setBoxColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#f8fafc");
  const [borderRadius, setBorderRadius] = useState(12);
  const [boxSize, setBoxSize] = useState(160);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleAddLayer = () => {
    const newLayer = {
      ...DEFAULT_SHADOW,
      id: Math.random().toString(36).substr(2, 9),
      offsetX: 0,
      offsetY: 10,
      opacity: 0.1,
    };
    setShadows([...shadows, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  const handleRemoveLayer = (id: string) => {
    if (shadows.length === 1) return;
    const newShadows = shadows.filter((s) => s.id !== id);
    setShadows(newShadows);
    if (selectedLayerId === id) {
      setSelectedLayerId(newShadows[0].id);
    }
  };

  const updateLayer = (id: string, updates: Partial<ShadowLayer>) => {
    setShadows(shadows.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0,0,0,${alpha})`;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const generateShadowString = (layers: ShadowLayer[]) => {
    if (layers.length === 0) return "none";
    return layers
      .filter((s) => s.active)
      .map((s) => {
        const color = hexToRgba(s.color, s.opacity);
        return `${s.inset ? "inset " : ""}${s.offsetX}px ${s.offsetY}px ${
          s.blur
        }px ${s.spread}px ${color}`;
      })
      .join(", ");
  };

  const boxShadowString = generateShadowString(shadows);

  const selectedLayer =
    shadows.find((s) => s.id === selectedLayerId) || shadows[0];

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
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="font-semibold tracking-tight">Box Shadow Generator</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(`box-shadow: ${boxShadowString};`)}
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
          <Tabs defaultValue="layers" className="flex-1 flex flex-col">
            <div className="px-4 pt-4 pb-0">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="layers">Layers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <TabsContent value="layers" className="space-y-6 mt-0">
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                    Shadow Layers
                  </Label>
                  <div className="space-y-2">
                    {shadows.map((layer, index) => (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayerId(layer.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer transition-all hover:bg-muted/50",
                          selectedLayerId === layer.id
                            ? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                            : "bg-card"
                        )}
                      >
                        <div className="w-6 h-6 rounded flex items-center justify-center bg-muted font-mono text-[10px] text-muted-foreground shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {layer.inset ? "Inset " : ""}Shadow
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate">
                            {layer.offsetX}px {layer.offsetY}px {layer.blur}px
                          </div>
                        </div>
                        <Switch
                          checked={layer.active}
                          onCheckedChange={(c) =>
                            updateLayer(layer.id, { active: c })
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="scale-75"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveLayer(layer.id);
                          }}
                          disabled={shadows.length === 1}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-dashed"
                      onClick={handleAddLayer}
                    >
                      <Plus className="w-4 h-4" />
                      Add Layer
                    </Button>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {selectedLayer && (
                  <div className="space-y-4">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                      Layer Properties
                    </Label>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">X Offset</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[selectedLayer.offsetX]}
                            onValueChange={([v]) =>
                              updateLayer(selectedLayer.id, { offsetX: v })
                            }
                            min={-100}
                            max={100}
                            className="flex-1"
                          />
                          <span className="text-xs w-8 text-right font-mono">
                            {selectedLayer.offsetX}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Y Offset</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[selectedLayer.offsetY]}
                            onValueChange={([v]) =>
                              updateLayer(selectedLayer.id, { offsetY: v })
                            }
                            min={-100}
                            max={100}
                            className="flex-1"
                          />
                          <span className="text-xs w-8 text-right font-mono">
                            {selectedLayer.offsetY}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Blur Radius</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[selectedLayer.blur]}
                          onValueChange={([v]) =>
                            updateLayer(selectedLayer.id, { blur: v })
                          }
                          min={0}
                          max={100}
                          className="flex-1"
                        />
                        <span className="text-xs w-8 text-right font-mono">
                          {selectedLayer.blur}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Spread Radius</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[selectedLayer.spread]}
                          onValueChange={([v]) =>
                            updateLayer(selectedLayer.id, { spread: v })
                          }
                          min={-50}
                          max={50}
                          className="flex-1"
                        />
                        <span className="text-xs w-8 text-right font-mono">
                          {selectedLayer.spread}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Opacity</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[selectedLayer.opacity]}
                          onValueChange={([v]) =>
                            updateLayer(selectedLayer.id, { opacity: v })
                          }
                          min={0}
                          max={1}
                          step={0.01}
                          className="flex-1"
                        />
                        <span className="text-xs w-8 text-right font-mono">
                          {Math.round(selectedLayer.opacity * 100)}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Color</Label>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded border overflow-hidden shrink-0 relative">
                          <input
                            type="color"
                            value={selectedLayer.color}
                            onChange={(e) =>
                              updateLayer(selectedLayer.id, {
                                color: e.target.value,
                              })
                            }
                            className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                          />
                        </div>
                        <Input
                          value={selectedLayer.color}
                          onChange={(e) =>
                            updateLayer(selectedLayer.id, {
                              color: e.target.value,
                            })
                          }
                          className="h-8 font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Label className="text-xs">Inset Shadow</Label>
                      <Switch
                        checked={selectedLayer.inset}
                        onCheckedChange={(c) =>
                          updateLayer(selectedLayer.id, { inset: c })
                        }
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                    Preview Settings
                  </Label>

                  <div className="space-y-2">
                    <Label className="text-xs">Background Color</Label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded border overflow-hidden shrink-0 relative">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                        />
                      </div>
                      <Input
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-8 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Box Color</Label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded border overflow-hidden shrink-0 relative">
                        <input
                          type="color"
                          value={boxColor}
                          onChange={(e) => setBoxColor(e.target.value)}
                          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                        />
                      </div>
                      <Input
                        value={boxColor}
                        onChange={(e) => setBoxColor(e.target.value)}
                        className="h-8 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Border Radius</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[borderRadius]}
                        onValueChange={([v]) => setBorderRadius(v)}
                        min={0}
                        max={100}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right font-mono">
                        {borderRadius}px
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Box Size</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[boxSize]}
                        onValueChange={([v]) => setBoxSize(v)}
                        min={50}
                        max={400}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right font-mono">
                        {boxSize}px
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Main Preview */}
        <div className="flex-1 bg-muted/20 flex flex-col min-w-0">
          <div className="flex-1 overflow-auto p-8 flex items-center justify-center relative bg-muted/10">
            {/* Background Color Layer */}
            <div
              className="absolute inset-0 z-0 transition-colors duration-200"
              style={{ backgroundColor: bgColor }}
            />
            {/* Grid Pattern Layer */}
            <div
              className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#00000018 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            <div
              className="relative z-10 transition-all duration-200"
              style={{
                width: boxSize,
                height: boxSize,
                backgroundColor: boxColor,
                borderRadius: borderRadius,
                boxShadow: boxShadowString,
              }}
            ></div>
          </div>

          {/* Bottom Code Panel */}
          <div className="h-32 bg-background border-t p-4 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Generated Code
              </div>
            </div>
            <div className="bg-muted rounded-md p-3 font-mono text-xs text-muted-foreground overflow-x-auto whitespace-nowrap flex items-center justify-between group">
              <span>box-shadow: {boxShadowString};</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() =>
                  copyToClipboard(`box-shadow: ${boxShadowString};`)
                }
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
