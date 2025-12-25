"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Shapes,
  Maximize,
  Move,
  Plus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const POLYGON_PRESETS = [
  { name: "Triangle", value: "polygon(50% 0%, 0% 100%, 100% 100%)" },
  { name: "Trapezoid", value: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" },
  {
    name: "Parallelogram",
    value: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
  },
  { name: "Rhombus", value: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
  {
    name: "Pentagon",
    value: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  },
  {
    name: "Hexagon",
    value: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  },
  {
    name: "Heptagon",
    value:
      "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
  },
  {
    name: "Octagon",
    value:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  },
  {
    name: "Star",
    value:
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  },
  {
    name: "Cross",
    value:
      "polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)",
  },
  {
    name: "Message",
    value:
      "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
  },
  {
    name: "Close",
    value:
      "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
  },
];

export default function ClipPathGeneratorPage() {
  const [activeTab, setActiveTab] = useState("polygon");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  );

  // Polygon State - represented as array of points {x, y}
  const [points, setPoints] = useState<{ x: number; y: number }[]>([
    { x: 50, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ]);

  // Circle State
  const [circleRadius, setCircleRadius] = useState(50);
  const [circleX, setCircleX] = useState(50);
  const [circleY, setCircleY] = useState(50);

  // Ellipse State
  const [ellipseRX, setEllipseRX] = useState(25);
  const [ellipseRY, setEllipseRY] = useState(40);
  const [ellipseX, setEllipseX] = useState(50);
  const [ellipseY, setEllipseY] = useState(50);

  // Inset State
  const [insetTop, setInsetTop] = useState(5);
  const [insetRight, setInsetRight] = useState(20);
  const [insetBottom, setInsetBottom] = useState(5);
  const [insetLeft, setInsetLeft] = useState(20);
  const [insetRound, setInsetRound] = useState(10);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const parsePolygonString = (str: string) => {
    const matches = str.match(/\d+(\.\d+)?%/g);
    if (!matches) return;
    const newPoints = [];
    for (let i = 0; i < matches.length; i += 2) {
      newPoints.push({
        x: parseFloat(matches[i]),
        y: parseFloat(matches[i + 1]),
      });
    }
    setPoints(newPoints);
  };

  const updatePoint = (index: number, x: number, y: number) => {
    const newPoints = [...points];
    newPoints[index] = {
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    };
    setPoints(newPoints);
  };

  const addPoint = () => {
    setPoints([...points, { x: 50, y: 50 }]);
  };

  const removePoint = (index: number) => {
    if (points.length <= 3) return;
    setPoints(points.filter((_, i) => i !== index));
  };

  const getClipPath = () => {
    switch (activeTab) {
      case "circle":
        return `circle(${circleRadius}% at ${circleX}% ${circleY}%)`;
      case "ellipse":
        return `ellipse(${ellipseRX}% ${ellipseRY}% at ${ellipseX}% ${ellipseY}%)`;
      case "inset":
        return `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}% round ${insetRound}px)`;
      case "polygon":
      default:
        return `polygon(${points
          .map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`)
          .join(", ")})`;
    }
  };

  const currentClipPath = getClipPath();
  const cssCode = `clip-path: ${currentClipPath};`;

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
              Clip-Path Generator
            </h1>
            <Badge variant="outline" className="hidden sm:flex">
              SHAPES
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
            <label htmlFor="image-upload" className="cursor-pointer gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              Upload
            </label>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(cssCode)}
            className="gap-2 h-8 text-xs border-emerald-500/30 font-semibold"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            Copy CSS
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[320px] border-r bg-muted/10 flex flex-col overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <div className="p-4 pb-0">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="polygon" className="text-xs">
                  Poly
                </TabsTrigger>
                <TabsTrigger value="circle" className="text-xs">
                  Circle
                </TabsTrigger>
                <TabsTrigger value="ellipse" className="text-xs">
                  Ellipse
                </TabsTrigger>
                <TabsTrigger value="inset" className="text-xs">
                  Inset
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4 flex-1 space-y-6">
              <TabsContent
                value="polygon"
                className="mt-0 space-y-4 animate-in slide-in-from-left-2 fade-in duration-300"
              >
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
                    Presets
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={addPoint}
                    title="Add point"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {POLYGON_PRESETS.map((poly) => (
                    <button
                      key={poly.name}
                      onClick={() => parsePolygonString(poly.value)}
                      className={cn(
                        "aspect-square rounded-md border bg-card hover:bg-muted/50 transition-all flex items-center justify-center relative overflow-hidden group"
                      )}
                      title={poly.name}
                    >
                      <div
                        className="w-8 h-8 bg-foreground/80 group-hover:bg-primary transition-colors"
                        style={{ clipPath: poly.value }}
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                    Edit Points
                  </Label>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {points.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 group">
                        <span className="text-[10px] text-muted-foreground w-4">
                          {i + 1}
                        </span>
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <div className="space-y-1">
                            <Slider
                              value={[p.x]}
                              onValueChange={([v]) => updatePoint(i, v, p.y)}
                              max={100}
                              step={0.1}
                            />
                          </div>
                          <div className="space-y-1">
                            <Slider
                              value={[p.y]}
                              onValueChange={([v]) => updatePoint(i, p.x, v)}
                              max={100}
                              step={0.1}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-destructive"
                          onClick={() => removePoint(i)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="circle"
                className="mt-0 space-y-6 animate-in slide-in-from-left-2 fade-in duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span>Radius</span>
                    <span>{circleRadius}%</span>
                  </div>
                  <Slider
                    value={[circleRadius]}
                    onValueChange={([v]) => setCircleRadius(v)}
                    max={100}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-xs flex items-center gap-2">
                    <Move className="w-3 h-3" /> Position
                  </Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>X-Axis</span>
                      <span>{circleX}%</span>
                    </div>
                    <Slider
                      value={[circleX]}
                      onValueChange={([v]) => setCircleX(v)}
                      max={100}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Y-Axis</span>
                      <span>{circleY}%</span>
                    </div>
                    <Slider
                      value={[circleY]}
                      onValueChange={([v]) => setCircleY(v)}
                      max={100}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="ellipse"
                className="mt-0 space-y-6 animate-in slide-in-from-left-2 fade-in duration-300"
              >
                <div className="space-y-4">
                  <Label className="text-xs flex items-center gap-2">
                    <Maximize className="w-3 h-3" /> Radius
                  </Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>X-Radius</span>
                      <span>{ellipseRX}%</span>
                    </div>
                    <Slider
                      value={[ellipseRX]}
                      onValueChange={([v]) => setEllipseRX(v)}
                      max={100}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Y-Radius</span>
                      <span>{ellipseRY}%</span>
                    </div>
                    <Slider
                      value={[ellipseRY]}
                      onValueChange={([v]) => setEllipseRY(v)}
                      max={100}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-xs flex items-center gap-2">
                    <Move className="w-3 h-3" /> Position
                  </Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>X-Axis</span>
                      <span>{ellipseX}%</span>
                    </div>
                    <Slider
                      value={[ellipseX]}
                      onValueChange={([v]) => setEllipseX(v)}
                      max={100}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Y-Axis</span>
                      <span>{ellipseY}%</span>
                    </div>
                    <Slider
                      value={[ellipseY]}
                      onValueChange={([v]) => setEllipseY(v)}
                      max={100}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="inset"
                className="mt-0 space-y-6 animate-in slide-in-from-left-2 fade-in duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span>Top</span>
                    <span>{insetTop}%</span>
                  </div>
                  <Slider
                    value={[insetTop]}
                    onValueChange={([v]) => setInsetTop(v)}
                    max={50}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span>Right</span>
                    <span>{insetRight}%</span>
                  </div>
                  <Slider
                    value={[insetRight]}
                    onValueChange={([v]) => setInsetRight(v)}
                    max={50}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span>Bottom</span>
                    <span>{insetBottom}%</span>
                  </div>
                  <Slider
                    value={[insetBottom]}
                    onValueChange={([v]) => setInsetBottom(v)}
                    max={50}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span>Left</span>
                    <span>{insetLeft}%</span>
                  </div>
                  <Slider
                    value={[insetLeft]}
                    onValueChange={([v]) => setInsetLeft(v)}
                    max={50}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span>Roundness (px)</span>
                    <span>{insetRound}px</span>
                  </div>
                  <Slider
                    value={[insetRound]}
                    onValueChange={([v]) => setInsetRound(v)}
                    max={100}
                  />
                </div>
              </TabsContent>
            </div>

            <div className="mt-auto border-t p-4 bg-background">
              <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                Generated Code
              </Label>
              <div className="bg-muted p-3 rounded-md relative font-mono text-[10px] text-muted-foreground break-all pr-8">
                {cssCode}
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
          </Tabs>
        </aside>

        {/* Main Stage */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-dot-pattern relative">
          <div className="w-[400px] h-[400px] relative border-4 border-muted/20 shadow-2xl">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                clipPath: currentClipPath,
                backgroundImage: `url('${imageUrl}')`,
              }}
            />

            {/* Interactive Points Grid */}
            {activeTab === "polygon" && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full overflow-visible">
                  <polyline
                    points={points
                      .map((p) => `${(p.x * 400) / 100},${(p.y * 400) / 100}`)
                      .join(" ")}
                    className="fill-primary/10 stroke-primary/30 stroke-1"
                  />
                </svg>
                {points.map((p, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 -ml-2 -mt-2 bg-primary rounded-full border-2 border-background shadow-lg pointer-events-auto cursor-move hover:scale-125 transition-transform"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                    }}
                    onMouseDown={(e) => {
                      const rect = (
                        e.currentTarget.parentElement as HTMLElement
                      ).getBoundingClientRect();
                      const moveHandler = (moveEvent: MouseEvent) => {
                        const nx =
                          ((moveEvent.clientX - rect.left) / rect.width) * 100;
                        const ny =
                          ((moveEvent.clientY - rect.top) / rect.height) * 100;
                        updatePoint(i, nx, ny);
                      };
                      const upHandler = () => {
                        window.removeEventListener("mousemove", moveHandler);
                        window.removeEventListener("mouseup", upHandler);
                      };
                      window.addEventListener("mousemove", moveHandler);
                      window.addEventListener("mouseup", upHandler);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <p className="mt-12 text-muted-foreground text-sm max-w-md text-center">
            Select a shape type from the sidebar or choose a polygon preset.
            <br />
            <span className="text-xs opacity-70">
              Custom polygon editing via dragging is coming soon!
            </span>
          </p>
        </main>
      </div>
    </div>
  );
}
