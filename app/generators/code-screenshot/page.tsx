"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Check, Copy, Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const themes = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "dracula", label: "Dracula" },
  { value: "monokai", label: "Monokai" },
  { value: "github", label: "GitHub Dark" },
  { value: "github-light", label: "GitHub Light" },
  { value: "vscode-dark", label: "VS Code Dark" },
  { value: "vscode-light", label: "VS Code Light" },
  { value: "atom-one-dark", label: "Atom One Dark" },
  { value: "atom-one-light", label: "Atom One Light" },
  { value: "nord", label: "Nord" },
  { value: "solarized-dark", label: "Solarized Dark" },
  { value: "solarized-light", label: "Solarized Light" },
  { value: "tokyo-night-dark", label: "Tokyo Night Dark" },
  { value: "tomorrow-night-blue", label: "Tomorrow Night Blue" },
];

const languages = [
  { value: "auto", label: "Auto Detect" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "shell", label: "Shell" },
  { value: "yaml", label: "YAML" },
  { value: "xml", label: "XML" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "docker", label: "Docker" },
  { value: "nginx", label: "Nginx" },
  { value: "apache", label: "Apache" },
  { value: "ini", label: "INI" },
  { value: "toml", label: "TOML" },
  { value: "scss", label: "SCSS" },
  { value: "sass", label: "Sass" },
  { value: "less", label: "Less" },
  { value: "stylus", label: "Stylus" },
  { value: "vue", label: "Vue" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "vue-html", label: "Vue HTML" },
  { value: "svelte", label: "Svelte" },
  { value: "elm", label: "Elm" },
  { value: "dart", label: "Dart" },
  { value: "scala", label: "Scala" },
  { value: "clojure", label: "Clojure" },
  { value: "haskell", label: "Haskell" },
  { value: "lua", label: "Lua" },
  { value: "perl", label: "Perl" },
  { value: "r", label: "R" },
  { value: "matlab", label: "MATLAB" },
  { value: "objective-c", label: "Objective-C" },
  { value: "vb", label: "VB.NET" },
  { value: "powershell", label: "PowerShell" },
  { value: "c", label: "C" },
  { value: "cuda", label: "CUDA" },
  { value: "zig", label: "Zig" },
  { value: "nim", label: "Nim" },
  { value: "crystal", label: "Crystal" },
  { value: "elixir", label: "Elixir" },
  { value: "erlang", label: "Erlang" },
  { value: "ocaml", label: "OCaml" },
  { value: "fsharp", label: "F#" },
  { value: "fortran", label: "Fortran" },
  { value: "cobol", label: "COBOL" },
  { value: "pascal", label: "Pascal" },
  { value: "ada", label: "Ada" },
  { value: "lisp", label: "Lisp" },
  { value: "scheme", label: "Scheme" },
  { value: "prolog", label: "Prolog" },
  { value: "latex", label: "LaTeX" },
  { value: "tex", label: "TeX" },
  { value: "graphql", label: "GraphQL" },
  { value: "prisma", label: "Prisma" },
  { value: "mongodb", label: "MongoDB" },
  { value: "redis", label: "Redis" },
  { value: "terraform", label: "Terraform" },
  { value: "hcl", label: "HCL" },
  { value: "ansible", label: "Ansible" },
  { value: "groovy", label: "Groovy" },
  { value: "julia", label: "Julia" },
  { value: "octave", label: "Octave" },
  { value: "makefile", label: "Makefile" },
  { value: "cmake", label: "CMake" },
  { value: "gradle", label: "Gradle" },
  { value: "maven", label: "Maven" },
  { value: "antlr", label: "ANTLR" },
  { value: "bnf", label: "BNF" },
  { value: "ebnf", label: "EBNF" },
];

const DEFAULT_SNIPPETS: Record<string, string> = {
  javascript: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
  typescript: `interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice",
};

console.log(user);`,
  python: `def greet(name):
  return f"Hello, {name}!"

print(greet("World"))`,
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
  cpp: `#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`,
  csharp: `using System;

class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}`,
  go: `package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
  println!("Hello, World!");
}`,
  html: `<!DOCTYPE html>
<html>
<head>
  <title>Hello</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`,
  css: `body {
  background-color: #f0f0f0;
  font-family: sans-serif;
}

h1 {
  color: #333;
}`,
  json: `{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`,
  sql: `SELECT * FROM users
WHERE age > 18
ORDER BY name;`,
  markdown: `# Hello, World!

This is a simple markdown file.

- Item 1
- Item 2`,
  php: `<?php
echo "Hello, World!";
?>`,
  ruby: `def greet(name)
  "Hello, #{name}!"
end

puts greet("World")`,
};

export default function CodeScreenshotGeneratorPage() {
  const [code, setCode] = useState(`function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [padding, setPadding] = useState(32);
  const [borderRadius, setBorderRadius] = useState(12);
  const [shadow, setShadow] = useState(20);
  const [title, setTitle] = useState("code.ts");
  const [windowControls, setWindowControls] = useState<
    "mac" | "windows" | "none"
  >("mac");
  const [bgEnabled, setBgEnabled] = useState(true);
  const [bgColor, setBgColor] = useState(
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
  );
  const [bgPadding, setBgPadding] = useState(64);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  // Theme color mapping
  const getThemeColors = (themeValue: string) => {
    const themeMap: Record<
      string,
      { bg: string; text: string; titleBar: string; lineNum: string }
    > = {
      dark: {
        bg: "#1e1e1e",
        text: "#d4d4d4",
        titleBar: "#252526",
        lineNum: "#858585",
      },
      light: {
        bg: "#ffffff",
        text: "#24292e",
        titleBar: "#f6f8fa",
        lineNum: "#6a737d",
      },
      dracula: {
        bg: "#282a36",
        text: "#f8f8f2",
        titleBar: "#21222c",
        lineNum: "#6272a4",
      },
      monokai: {
        bg: "#272822",
        text: "#f8f8f2",
        titleBar: "#1e1f1c",
        lineNum: "#75715e",
      },
      github: {
        bg: "#0d1117",
        text: "#c9d1d9",
        titleBar: "#161b22",
        lineNum: "#6e7681",
      },
      "github-light": {
        bg: "#ffffff",
        text: "#24292e",
        titleBar: "#f6f8fa",
        lineNum: "#6a737d",
      },
      "vscode-dark": {
        bg: "#1e1e1e",
        text: "#d4d4d4",
        titleBar: "#252526",
        lineNum: "#858585",
      },
      "vscode-light": {
        bg: "#ffffff",
        text: "#323130",
        titleBar: "#f3f2f1",
        lineNum: "#605e5c",
      },
      "atom-one-dark": {
        bg: "#282c34",
        text: "#abb2bf",
        titleBar: "#21252b",
        lineNum: "#5c6370",
      },
      "atom-one-light": {
        bg: "#fafafa",
        text: "#383a42",
        titleBar: "#f0f0f0",
        lineNum: "#a0a1a7",
      },
      nord: {
        bg: "#2e3440",
        text: "#d8dee9",
        titleBar: "#3b4252",
        lineNum: "#616e88",
      },
      "solarized-dark": {
        bg: "#002b36",
        text: "#839496",
        titleBar: "#073642",
        lineNum: "#586e75",
      },
      "solarized-light": {
        bg: "#fdf6e3",
        text: "#657b83",
        titleBar: "#eee8d5",
        lineNum: "#93a1a1",
      },
      "tokyo-night-dark": {
        bg: "#1a1b26",
        text: "#c0caf5",
        titleBar: "#24283b",
        lineNum: "#565f89",
      },
      "tomorrow-night-blue": {
        bg: "#002451",
        text: "#ffffff",
        titleBar: "#00346e",
        lineNum: "#7285b7",
      },
    };
    return themeMap[themeValue] || themeMap.dark;
  };

  const themeColors = getThemeColors(theme);

  const generateCanvas = async (
    scale = 2
  ): Promise<HTMLCanvasElement | null> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const codeLines = code.split("\n");
    const lineHeight = fontSize * 1.6;
    const titleBarHeight = title || windowControls !== "none" ? 44 : 0;
    const contentHeight = codeLines.length * lineHeight + padding * 2;
    const windowWidth = 800; // Fixed width for window
    const windowHeight = titleBarHeight + contentHeight;

    // Calculate total dimensions including background
    const finalBgPadding = bgEnabled ? bgPadding : 0;
    const totalWidth = windowWidth + finalBgPadding * 2;
    const totalHeight = windowHeight + finalBgPadding * 2;

    canvas.width = totalWidth * scale;
    canvas.height = totalHeight * scale;
    ctx.scale(scale, scale);

    // 1. Draw Background
    if (bgEnabled && bgColor) {
      // Simple distinct color/gradient parsing could go here,
      // but for canvas we'll just check if it's a gradient string or color
      if (bgColor.includes("gradient")) {
        const gradient = ctx.createLinearGradient(
          0,
          0,
          totalWidth,
          totalHeight
        );
        // Approximate the gradient for canvas (simplified)
        // In a real app we'd parse the CSS gradient string properly
        gradient.addColorStop(0, "#ff9a9e");
        gradient.addColorStop(1, "#fecfef");
        if (bgColor.includes("#f5f7fa")) {
          // Match the default one
          const g = ctx.createLinearGradient(0, 0, totalWidth, totalHeight);
          g.addColorStop(0, "#f5f7fa");
          g.addColorStop(1, "#c3cfe2");
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = bgColor; // Fallback if simple color
        }
      } else {
        ctx.fillStyle = bgColor;
      }
      ctx.fillRect(0, 0, totalWidth, totalHeight);
    } else {
      // Transparent
      ctx.clearRect(0, 0, totalWidth, totalHeight);
    }

    const startX = finalBgPadding;
    const startY = finalBgPadding;

    // 2. Draw Shadow
    if (shadow > 0) {
      ctx.shadowColor = `rgba(0, 0, 0, ${shadow / 100})`;
      ctx.shadowBlur = shadow * 1.5;
      ctx.shadowOffsetY = shadow * 0.5;
    }

    // 3. Draw Window Background (Main Container)
    ctx.fillStyle = themeColors.bg;

    // Rounded rect helper
    const drawRoundedRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    drawRoundedRect(startX, startY, windowWidth, windowHeight, borderRadius);
    ctx.fill();

    // Reset shadow for inner elements
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 4. Draw Title Bar
    if (titleBarHeight > 0) {
      // We clip the top rounded corners for the title bar
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX + borderRadius, startY);
      ctx.lineTo(startX + windowWidth - borderRadius, startY);
      ctx.quadraticCurveTo(
        startX + windowWidth,
        startY,
        startX + windowWidth,
        startY + borderRadius
      );
      ctx.lineTo(startX + windowWidth, startY + titleBarHeight);
      ctx.lineTo(startX, startY + titleBarHeight);
      ctx.lineTo(startX, startY + borderRadius);
      ctx.quadraticCurveTo(startX, startY, startX + borderRadius, startY);
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = themeColors.titleBar;
      ctx.fillRect(startX, startY, windowWidth, titleBarHeight);

      // Border line under title bar (optional/theme dependent)
      ctx.strokeStyle =
        theme === "dark" || theme.includes("dark")
          ? "rgba(255,255,255,0.05)"
          : "rgba(0,0,0,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, startY + titleBarHeight);
      ctx.lineTo(startX + windowWidth, startY + titleBarHeight);
      ctx.stroke();

      ctx.restore();

      // 5. Draw Window Controls
      if (windowControls === "mac") {
        const cx = startX + 24;
        const cy = startY + titleBarHeight / 2;
        ctx.fillStyle = "#FF5F56";
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFBD2E";
        ctx.beginPath();
        ctx.arc(cx + 20, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#27C93F";
        ctx.beginPath();
        ctx.arc(cx + 40, cy, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (windowControls === "windows") {
        const cx = startX + windowWidth - 16;
        const cy = startY + titleBarHeight / 2;
        ctx.strokeStyle = themeColors.text;
        ctx.lineWidth = 1;
        // X
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy - 5);
        ctx.lineTo(cx + 5, cy + 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 5, cy - 5);
        ctx.lineTo(cx - 5, cy + 5);
        ctx.stroke();
        // Square
        ctx.strokeRect(cx - 26, cy - 5, 10, 10);
        // Dash
        ctx.beginPath();
        ctx.moveTo(cx - 46, cy);
        ctx.lineTo(cx - 36, cy);
        ctx.stroke();
      }

      // 6. Draw Title
      if (title) {
        ctx.fillStyle = themeColors.text;
        ctx.font = `500 13px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          title,
          startX + windowWidth / 2,
          startY + titleBarHeight / 2
        );
      }
    }

    // 7. Draw Code
    ctx.font = `${fontSize}px 'Fira Code', 'Consolas', monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic"; // better for strict line heights

    const codeStartX = startX + padding;
    const codeStartY = startY + titleBarHeight + padding + fontSize; // +fontSize because alphabetic baseline

    codeLines.forEach((line, i) => {
      const y = codeStartY + i * lineHeight;

      if (lineNumbers) {
        ctx.fillStyle = themeColors.lineNum;
        const lineNum = String(i + 1).padStart(3, " ");
        ctx.fillText(lineNum, codeStartX, y);

        ctx.fillStyle = themeColors.text;
        ctx.fillText(line || "", codeStartX + 48, y);
      } else {
        ctx.fillStyle = themeColors.text;
        ctx.fillText(line || "", codeStartX, y);
      }
    });

    return canvas;
  };

  const handleCopyImage = async () => {
    const canvas = await generateCanvas(3); // Higher quality for clipboard
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      try {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        // You could add a toast here
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleDownloadImage = async () => {
    const canvas = await generateCanvas(3);
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${title.replace(/\.[^/.]+$/, "") || "snippet"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

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
            <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="font-semibold tracking-tight">
            Code Screenshot Generator
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyImage}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Image
          </Button>
          <Button
            size="sm"
            onClick={handleDownloadImage}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings Sidebar */}
        <div className="w-80 border-r bg-muted/5 flex flex-col overflow-hidden shrink-0">
          <Tabs defaultValue="design" className="flex-1 flex flex-col">
            <div className="px-4 pt-4 pb-0">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <TabsContent value="design" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                    Theme
                  </Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                    Window
                  </Label>
                  <div className="space-y-2">
                    <Label className="text-xs">Controls</Label>
                    <div className="flex gap-1 p-1 bg-muted rounded-md border">
                      {["mac", "windows", "none"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setWindowControls(c as any)}
                          className={cn(
                            "flex-1 text-xs py-1 rounded-sm capitalize transition-all",
                            windowControls === c
                              ? "bg-background shadow-sm text-foreground font-medium"
                              : "text-muted-foreground hover:bg-background/50"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-xs">
                      <span>Shadow</span>
                      <span className="text-muted-foreground">{shadow}px</span>
                    </div>
                    <Slider
                      value={[shadow]}
                      onValueChange={([v]) => setShadow(v)}
                      max={100}
                      step={5}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Padding</span>
                      <span className="text-muted-foreground">{padding}px</span>
                    </div>
                    <Slider
                      value={[padding]}
                      onValueChange={([v]) => setPadding(v)}
                      max={80}
                      step={4}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Roundness</span>
                      <span className="text-muted-foreground">
                        {borderRadius}px
                      </span>
                    </div>
                    <Slider
                      value={[borderRadius]}
                      onValueChange={([v]) => setBorderRadius(v)}
                      max={32}
                      step={1}
                    />
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                      Background
                    </Label>
                    <Switch
                      checked={bgEnabled}
                      onCheckedChange={setBgEnabled}
                    />
                  </div>
                  <div
                    className={cn(
                      "space-y-4 transition-all",
                      !bgEnabled && "opacity-50 pointer-events-none"
                    )}
                  >
                    <div className="space-y-2">
                      <Label className="text-xs">Background Padding</Label>
                      <Slider
                        value={[bgPadding]}
                        onValueChange={([v]) => setBgPadding(v)}
                        max={200}
                        step={8}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                    Language & File
                  </Label>
                  <div className="space-y-2">
                    <Label className="text-xs">Language</Label>
                    <Select
                      value={language}
                      onValueChange={(value) => {
                        setLanguage(value);
                        if (DEFAULT_SNIPPETS[value]) {
                          setCode(DEFAULT_SNIPPETS[value]);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Filename</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-4">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
                    Content
                  </Label>
                  <div className="space-y-2">
                    <Label className="text-xs">Code Snippet</Label>
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[200px] font-mono text-xs"
                      placeholder="Paste your code here..."
                    />
                    <p className="text-[10px] text-muted-foreground">
                      You can also click directly on the preview to edit.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="ln"
                      checked={lineNumbers}
                      onCheckedChange={(c) => setLineNumbers(c as boolean)}
                    />
                    <Label
                      htmlFor="ln"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Line Numbers
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Main Preview */}
        <div className="flex-1 bg-muted/20 flex flex-col min-w-0">
          <div className="flex-1 overflow-auto p-8 flex items-center justify-center relative">
            {/* Checkered background pattern for transparency indication */}
            <div
              className="absolute inset-0 z-0 opacity-[0.4]"
              style={{
                backgroundImage: `radial-gradient(#00000018 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* The "Review" area that mimics the canvas output */}
            <div
              className="relative z-10 transition-all duration-300 ease-in-out"
              style={{
                padding: bgEnabled ? bgPadding : 0,
                background: bgEnabled
                  ? bgColor.includes("gradient")
                    ? bgColor
                    : bgColor
                  : "transparent",
              }}
            >
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  background: themeColors.bg,
                  width: "800px", // fixed width preview
                  boxShadow:
                    shadow > 0
                      ? `0 ${shadow * 0.5}px ${shadow * 1.5}px rgba(0,0,0,${
                          shadow / 100
                        })`
                      : "none",
                  borderRadius: borderRadius,
                }}
              >
                {/* Title Bar */}
                {(title || windowControls !== "none") && (
                  <div
                    className="h-11 flex items-center px-4 justify-between border-b"
                    style={{
                      background: themeColors.titleBar,
                      borderColor:
                        themeColors.bg === themeColors.titleBar
                          ? "transparent"
                          : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-center w-14 gap-2">
                      {windowControls === "mac" && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </>
                      )}
                    </div>
                    <div
                      className="flex-1 text-center text-[13px] font-medium opacity-80 truncate px-4"
                      style={{ color: themeColors.text }}
                    >
                      {title}
                    </div>
                    <div className="w-14 flex items-center justify-end gap-3 text-muted-foreground">
                      {windowControls === "windows" && (
                        <div
                          className="flex gap-4"
                          style={{ color: themeColors.text }}
                        >
                          <span>-</span>
                          <span>□</span>
                          <span>×</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Code Editor Area */}
                <div className="relative group">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="absolute inset-0 w-full h-full resize-none bg-transparent border-0 text-transparent selection:bg-blue-500/30 p-0 font-mono focus-visible:ring-0 z-10"
                    style={{
                      fontSize,
                      lineHeight: "1.6",
                      padding: padding,
                      paddingLeft: lineNumbers ? padding + 48 : padding,
                      caretColor: themeColors.text,
                    }}
                    spellCheck={false}
                  />
                  <div
                    className="font-mono min-h-[100px]"
                    style={{
                      fontSize,
                      lineHeight: "1.6",
                      padding: padding,
                      color: themeColors.text,
                    }}
                  >
                    {code.split("\n").map((line, i) => (
                      <div
                        key={i}
                        className="flex relative pointer-events-none"
                      >
                        {lineNumbers && (
                          <div
                            className="absolute left-0 w-8 text-right select-none opacity-50"
                            style={{ color: themeColors.lineNum }}
                          >
                            {i + 1}
                          </div>
                        )}
                        <div
                          className={cn(
                            "whitespace-pre break-all",
                            lineNumbers && "pl-12"
                          )}
                        >
                          {line || " "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
