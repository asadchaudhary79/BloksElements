"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Maximize,
  Shuffle,
  RefreshCw,
  BoxSelect,
  Monitor,
  Image as ImageIcon,
  Layers,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function FancyBorderRadiusGeneratorPage() {
  // 8 values: 4 horizontal, 4 vertical
  // border-radius: tl tr br bl / tl tr br bl
  const [tlX, setTlX] = useState(50);
  const [trX, setTrX] = useState(50);
  const [brX, setBrX] = useState(50);
  const [blX, setBlX] = useState(50);

  const [tlY, setTlY] = useState(50);
  const [trY, setTrY] = useState(50);
  const [brY, setBrY] = useState(50);
  const [blY, setBlY] = useState(50);

  const [locked, setLocked] = useState(false); // If true, X and Y move together? No, simple blobs usually need independence.

  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(135deg, #34d399 0%, #059669 100%)"
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#10b981");
  const [showImage, setShowImage] = useState(false);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const borderRadius = `${tlX}% ${100 - tlX}% ${
    100 - brX
  }% ${brX}% / ${tlY}% ${trY}% ${100 - trY}% ${100 - blY}%`;

  const cssCode = `border-radius: ${borderRadius};`;

  const randomize = () => {
    setTlX(Math.floor(Math.random() * 100));
    setTrX(Math.floor(Math.random() * 100));
    setBrX(Math.floor(Math.random() * 100));
    setBlX(Math.floor(Math.random() * 100));
    setTlY(Math.floor(Math.random() * 100));
    setTrY(Math.floor(Math.random() * 100));
    setBrY(Math.floor(Math.random() * 100));
    setBlY(Math.floor(Math.random() * 100));

    // Random basic gradient
    const hue = Math.floor(Math.random() * 360);
    setBgGradient(
      `linear-gradient(135deg, hsl(${hue}, 70%, 80%) 0%, hsl(${
        (hue + 40) % 360
      }, 70%, 60%) 100%)`
    );
  };

  const reset = () => {
    setTlX(50);
    setTrX(50);
    setBrX(50);
    setBlX(50);
    setTlY(50);
    setTrY(50);
    setBrY(50);
    setBlY(50);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          setShowImage(true);
        }
      };
      reader.readAsDataURL(file);
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
              Fancy Border Radius
            </h1>
            <Badge variant="outline" className="hidden sm:flex">
              BLOB MAKER
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="blob-image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs font-semibold"
            asChild
          >
            <label htmlFor="blob-image-upload" className="cursor-pointer gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              Upload Image
            </label>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={randomize}
            className="gap-2 h-8 text-xs border-emerald-500/30 font-semibold"
          >
            <Shuffle className="w-3.5 h-3.5" /> Random
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[320px] border-r bg-muted/5 flex flex-col shrink-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
            {/* Horizontal Radii */}
            <div className="space-y-6">
              <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest flex items-center gap-2">
                <BoxSelect className="w-3 h-3 text-emerald-500" /> Horizontal
                Radii
              </Label>

              <div className="space-y-5">
                {[
                  { label: "Top-Left", val: tlX, setter: setTlX },
                  { label: "Top-Right", val: trX, setter: setTrX },
                  { label: "Bottom-Right", val: brX, setter: setBrX },
                  { label: "Bottom-Left", val: blX, setter: setBlX },
                ].map((s) => (
                  <div key={s.label} className="space-y-3">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[10px]">
                        {s.val}%
                      </span>
                    </div>
                    <Slider
                      value={[s.val]}
                      onValueChange={([v]) => s.setter(v)}
                      max={100}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Vertical Radii */}
            <div className="space-y-6">
              <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest flex items-center gap-2">
                <BoxSelect className="w-3 h-3 text-emerald-500 rotate-90" />{" "}
                Vertical Radii
              </Label>

              <div className="space-y-5">
                {[
                  { label: "Top-Left", val: tlY, setter: setTlY },
                  { label: "Top-Right", val: trY, setter: setTrY },
                  { label: "Bottom-Right", val: brY, setter: setBrY },
                  { label: "Bottom-Left", val: blY, setter: setBlY },
                ].map((s) => (
                  <div key={s.label} className="space-y-3">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[10px]">
                        {s.val}%
                      </span>
                    </div>
                    <Slider
                      value={[s.val]}
                      onValueChange={([v]) => s.setter(v)}
                      max={100}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Styling */}
            <div className="space-y-6">
              <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest flex items-center gap-2">
                <Palette className="w-3 h-3 text-emerald-500" /> Appearance
              </Label>

              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">Border Width</span>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[10px]">
                      {borderWidth}px
                    </span>
                  </div>
                  <Slider
                    value={[borderWidth]}
                    onValueChange={([v]) => setBorderWidth(v)}
                    max={20}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Label className="text-[11px] text-muted-foreground">
                    Preview Mode
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-7 px-2 text-[10px] transition-all",
                      showImage
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
                        : ""
                    )}
                    onClick={() => setShowImage(!showImage)}
                    disabled={!imageUrl}
                  >
                    {showImage ? "Show Image" : "Show Gradient"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto border-t p-4 bg-background">
            <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
              CSS Output
            </Label>
            <div className="bg-muted p-3 rounded-md relative group">
              <pre className="text-[10px] font-mono whitespace-pre-wrap break-all pr-8">
                {cssCode}
              </pre>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 absolute top-2 right-2 opacity-100"
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
        </aside>

        {/* Main Stage */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-dot-pattern relative">
          <div className="absolute top-4 right-4 text-xs text-muted-foreground font-mono">
            {tlX}% {100 - tlX}% {100 - brX}% {brX}% / {tlY}% {trY}% {100 - trY}%{" "}
            {100 - blY}%
          </div>

          {/* The Blob Interface */}
          {/* We will overlay sliders ON the box for intuitive control if possible, or just put them around. */}
          {/* Let's put visual sliders AROUND the box for the "Top/Bottom/Left/Right" logic. */}

          <div className="relative w-[400px] h-[400px] flex items-center justify-center">
            {/* Top Slider (Horizontal) */}
            <div className="absolute -top-8 left-0 right-0 px-8 flex items-center justify-center">
              <Slider
                value={[tlX]}
                onValueChange={([v]) => setTlX(v)}
                max={100}
                className="w-full"
              />
            </div>

            {/* Bottom Slider (Horizontal) */}
            <div className="absolute -bottom-8 left-0 right-0 px-8 flex items-center justify-center">
              <Slider
                value={[brX]}
                onValueChange={([v]) => setBrX(v)}
                max={100}
                className="w-full"
              />
              {/* Note: brX logic: if left is e.g. 30%, right is 70%. So slider value = left-ish percentage */}
            </div>

            {/* Left Slider (Vertical) */}
            <div className="absolute top-0 bottom-0 -left-8 py-8 flex items-center justify-center h-full">
              <Slider
                value={[tlY]}
                onValueChange={([v]) => setTlY(v)}
                max={100}
                orientation="vertical"
                className="h-full"
              />
            </div>

            {/* Right Slider (Vertical) */}
            <div className="absolute top-0 bottom-0 -right-8 py-8 flex items-center justify-center h-full">
              <Slider
                value={[trY]}
                onValueChange={([v]) => setTrY(v)}
                max={100}
                orientation="vertical"
                className="h-full"
              />
            </div>

            {/* The Blob */}
            <div
              className="w-full h-full shadow-2xl transition-all duration-300 ease-out flex items-center justify-center overflow-hidden"
              style={{
                borderRadius: borderRadius,
                background: showImage && imageUrl ? "none" : bgGradient,
                border: `${borderWidth}px solid ${borderColor}`,
              }}
            >
              {showImage && imageUrl && (
                <img
                  src={imageUrl}
                  alt="Blob content"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <p className="mt-16 text-muted-foreground text-sm">
            Drag the sliders around the box to shape the blob.
          </p>
        </main>
      </div>
    </div>
  );
}
