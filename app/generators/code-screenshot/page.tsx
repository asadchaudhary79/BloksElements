"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconArrowLeft, IconDownload } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Badge } from "@/components/ui/badge";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [padding, setPadding] = useState(20);
  const [borderRadius, setBorderRadius] = useState(8);
  const [shadow, setShadow] = useState(0);
  const [title, setTitle] = useState("code.ts");

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

  const generateCSS = () => {
    return `.code-screenshot {
  background: ${themeColors.bg};
  color: ${themeColors.text};
  padding: ${padding}px;
  border-radius: ${borderRadius}px;
  box-shadow: ${
    shadow > 0
      ? `0 ${shadow / 10}px ${shadow / 2}px rgba(0, 0, 0, ${shadow / 100})`
      : "none"
  };
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: ${fontSize}px;
  line-height: 1.6;
}`;
  };

  const cssCode = generateCSS();

  const handleCopy = () => {
    copyToClipboard(cssCode);
  };

  const handleDownloadImage = () => {
    try {
      // Create canvas with high DPI for better quality
      const scale = 2;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate dimensions
      const codeLines = code.split("\n");
      const lineHeight = fontSize * 1.6;
      const titleBarHeight = title ? 40 : 0;
      const codeHeight = codeLines.length * lineHeight;
      const totalHeight = titleBarHeight + codeHeight + padding * 2;
      const totalWidth = 800; // Fixed width for consistent output

      canvas.width = totalWidth * scale;
      canvas.height = totalHeight * scale;
      ctx.scale(scale, scale);

      // Fill background
      ctx.fillStyle = themeColors.bg;
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      // Draw title bar
      if (title) {
        ctx.fillStyle = themeColors.titleBar;
        ctx.fillRect(0, 0, totalWidth, titleBarHeight);

        // Draw border
        ctx.strokeStyle =
          theme === "dark" || theme.includes("dark")
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, titleBarHeight);
        ctx.lineTo(totalWidth, titleBarHeight);
        ctx.stroke();

        // Window controls
        const controlSize = 12;
        const controlY = (titleBarHeight - controlSize) / 2;
        const controlSpacing = 16;
        const controlStartX = 16;

        // Red button
        ctx.fillStyle = "#ff5f57";
        ctx.beginPath();
        ctx.arc(
          controlStartX,
          controlY + controlSize / 2,
          controlSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Yellow button
        ctx.fillStyle = "#ffbd2e";
        ctx.beginPath();
        ctx.arc(
          controlStartX + controlSpacing,
          controlY + controlSize / 2,
          controlSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Green button
        ctx.fillStyle = "#28ca42";
        ctx.beginPath();
        ctx.arc(
          controlStartX + controlSpacing * 2,
          controlY + controlSize / 2,
          controlSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Title text
        ctx.fillStyle = themeColors.text;
        ctx.font = `500 12px 'Fira Code', 'Consolas', monospace`;
        ctx.textBaseline = "middle";
        ctx.fillText(
          title,
          controlStartX + controlSpacing * 3 + 8,
          titleBarHeight / 2
        );
      }

      // Draw code
      ctx.font = `${fontSize}px 'Fira Code', 'Consolas', monospace`;
      ctx.textBaseline = "top";
      const startY = titleBarHeight + padding;
      const startX = padding;
      const lineSpacing = lineHeight;

      codeLines.forEach((line, i) => {
        const y = startY + i * lineSpacing;

        if (lineNumbers) {
          ctx.fillStyle = themeColors.lineNum;
          const lineNum = String(i + 1).padStart(3, " ");
          ctx.fillText(lineNum, startX, y);

          ctx.fillStyle = themeColors.text;
          ctx.fillText(line || " ", startX + 40, y);
        } else {
          ctx.fillStyle = themeColors.text;
          ctx.fillText(line || " ", startX, y);
        }
      });

      // Download as PNG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${title.replace(/\.[^/.]+$/, "") || "code"}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        },
        "image/png",
        1.0
      );
    } catch (error) {
      console.error("Error downloading image:", error);
    }
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
            Code Screenshot Generator
          </h1>
          <Badge
            variant="secondary"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          >
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Generate beautiful code screenshots with customizable themes, syntax
          highlighting, and styling options.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Code Input */}
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder="Enter your code here..."
              />
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((themeOption) => (
                    <SelectItem
                      key={themeOption.value}
                      value={themeOption.value}
                    >
                      {themeOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
              <input
                id="fontSize"
                type="range"
                min={10}
                max={24}
                step={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Padding */}
            <div className="space-y-2">
              <Label htmlFor="padding">Padding: {padding}px</Label>
              <input
                id="padding"
                type="range"
                min={0}
                max={100}
                step={5}
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <Label htmlFor="borderRadius">
                Border Radius: {borderRadius}px
              </Label>
              <input
                id="borderRadius"
                type="range"
                min={0}
                max={32}
                step={1}
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Shadow */}
            <div className="space-y-2">
              <Label htmlFor="shadow">Shadow: {shadow}</Label>
              <input
                id="shadow"
                type="range"
                min={0}
                max={100}
                step={5}
                value={shadow}
                onChange={(e) => setShadow(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">File Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="code.ts"
              />
            </div>

            {/* Line Numbers */}
            <div className="flex items-center gap-3">
              <input
                id="lineNumbers"
                type="checkbox"
                checked={lineNumbers}
                onChange={(e) => setLineNumbers(e.target.checked)}
                className="h-4 w-4 rounded border-2 cursor-pointer"
              />
              <Label htmlFor="lineNumbers" className="cursor-pointer">
                Show line numbers
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Preview</CardTitle>
            <Button
              onClick={handleDownloadImage}
              variant="outline"
              size="sm"
              className="rounded-full border-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50"
            >
              <IconDownload className="mr-2 size-4" />
              Download Image
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Code Preview */}
            <div
              id="code-preview"
              className="rounded-lg border-2 border-dotted overflow-hidden"
              style={{
                background: themeColors.bg,
                color: themeColors.text,
                borderRadius: `${borderRadius}px`,
                boxShadow:
                  shadow > 0
                    ? `0 ${shadow / 10}px ${shadow / 2}px rgba(0, 0, 0, ${
                        shadow / 100
                      })`
                    : "none",
              }}
            >
              {title && (
                <div
                  className="px-4 py-2 border-b flex items-center gap-2 text-xs font-medium"
                  style={{
                    background: themeColors.titleBar,
                    borderColor:
                      theme === "dark" || theme.includes("dark")
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2" style={{ color: themeColors.text }}>
                    {title}
                  </span>
                </div>
              )}
              <div
                className="font-mono leading-relaxed overflow-x-auto"
                style={{
                  fontSize: `${fontSize}px`,
                  padding: `${padding}px`,
                  color: themeColors.text,
                }}
              >
                <pre
                  className="m-0 whitespace-pre"
                  style={{ background: "transparent", color: themeColors.text }}
                >
                  {lineNumbers
                    ? code.split("\n").map((line, i) => (
                        <div key={i} className="flex gap-4">
                          <span
                            className="select-none"
                            style={{ color: themeColors.lineNum }}
                          >
                            {String(i + 1).padStart(3, " ")}
                          </span>
                          <span style={{ color: themeColors.text }}>
                            {line || " "}
                          </span>
                        </div>
                      ))
                    : code.split("\n").map((line, i) => (
                        <div key={i} style={{ color: themeColors.text }}>
                          {line || " "}
                        </div>
                      ))}
                </pre>
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
                <code className="text-foreground whitespace-pre">
                  {cssCode}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
