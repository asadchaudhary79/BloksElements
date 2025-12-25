"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Eye,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  Settings2,
  FileText,
  Printer,
  Type,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Palette,
  LayoutTemplate,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// --- Configuration ---

const FONTS = [
  { value: "Inter, sans-serif", label: "Inter (Modern)" },
  { value: "Times New Roman, serif", label: "Times New Roman" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Courier New, monospace", label: "Courier New" },
  { value: "Verdana, sans-serif", label: "Verdana" },
];

const THEMES = {
  modern: {
    label: "Modern",
    styles: {
      h1Color: "#0f172a",
      h1Border: "2px solid #e2e8f0",
      bodyColor: "#334155",
      linkColor: "#2563eb",
      quoteBorder: "4px solid #3b82f6",
      quoteBg: "#eff6ff",
      codeBg: "#f1f5f9",
      codeColor: "#0f172a",
    },
  },
  classic: {
    label: "Classic",
    styles: {
      h1Color: "#000000",
      h1Border: "1px solid #000000",
      bodyColor: "#000000",
      linkColor: "#000000",
      quoteBorder: "2px solid #000000",
      quoteBg: "transparent",
      codeBg: "#f5f5f5",
      codeColor: "#000000",
    },
  },
  warm: {
    label: "Warm",
    styles: {
      h1Color: "#78350f",
      h1Border: "2px solid #fcd34d",
      bodyColor: "#57534e",
      linkColor: "#d97706",
      quoteBorder: "4px solid #fcd34d",
      quoteBg: "#fffbeb",
      codeBg: "#fff7ed",
      codeColor: "#78350f",
    },
  },
};

const DEFAULT_MARKDOWN = `# Project Proposal

## Executive Summary
This document outlines the proposal for the new **Markdown-to-PDF** generator. Our goal is to provide a *seamless* and *efficient* way to convert documentation.

## Key Features

1. Real-time preview
2. Customizable themes
3. Professional PDF export

### Technical Specs

- React 19
- Tailwind CSS
- Lucide Icons

> "Design is not just what it looks like and feels like. Design is how it works."
> — Steve Jobs

## Implementation Plan

We will start by building the core parser, followed by the UI implementation.

\`\`\`javascript
const generatePDF = () => {
  console.log("Generating high-quality PDF...");
  return true;
};
\`\`\`

---

Prepared by: **Dev Team**
Date: 2025-10-24`;

// --- Syntax Highlighting (Lightweight) ---

const highlightCode = (code: string, lang: string = "") => {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const keywords =
    /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|interface|type|extends|implements|public|private|protected|static|readonly|async|await|try|catch|new|this|super|case|switch|break|continue|default)\b/g;
  const types =
    /\b(string|number|boolean|any|void|null|undefined|never|object|Array|Promise)\b/g;
  const strings = /(".*?"|'.*?'|`[\s\S]*?`)/g;
  const numbers = /\b\d+\b/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;

  const stringStore: string[] = [];
  html = html.replace(strings, (match) => {
    const id = `___STR${stringStore.length}___`;
    stringStore.push(`<span style="color: #059669;">${match}</span>`);
    return id;
  });

  const commentsStore: string[] = [];
  html = html.replace(comments, (match) => {
    const id = `___CMT${commentsStore.length}___`;
    commentsStore.push(
      `<span style="color: #6b7280; font-style: italic;">${match}</span>`
    );
    return id;
  });

  html = html.replace(
    keywords,
    '<span style="color: #db2777; font-weight: 600;">$1</span>'
  );
  html = html.replace(types, '<span style="color: #d97706;">$1</span>');
  html = html.replace(functions, '<span style="color: #2563eb;">$1</span>');
  html = html.replace(numbers, '<span style="color: #7c3aed;">$&</span>');

  commentsStore.forEach((sub, i) => {
    html = html.replace(`___CMT${i}___`, sub);
  });
  stringStore.forEach((sub, i) => {
    html = html.replace(`___STR${i}___`, sub);
  });

  return html;
};

// --- Parser Logic ---

const parseMarkdown = (text: string) => {
  let html = text;
  const codeBlocks: string[] = [];

  html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, content) => {
    const id = `__CODE_BLOCK_${codeBlocks.length}__`;
    const highlightedContent = highlightCode(content, lang);
    codeBlocks.push(
      `<pre class="code-block" data-lang="${
        lang || ""
      }"><code>${highlightedContent}</code></pre>`
    );
    return id;
  });

  const inlineCode: string[] = [];
  html = html.replace(/`([^`]+)`/g, (_, content) => {
    const id = `__INLINE_CODE_${inlineCode.length}__`;
    inlineCode.push(
      `<code class="inline-code">${content
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</code>`
    );
    return id;
  });

  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^#### (.*$)/gm, "<h4>$1</h4>");
  html = html.replace(/^---$/gm, "<hr />");
  html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");
  html = html.replace(/^\d+\. (.*$)/gm, "<li class='ordered'>$1</li>");
  html = html.replace(/^[\-\*] (.*$)/gm, "<li class='unordered'>$1</li>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        /^<(h\d|hr|blockquote|li|pre)/.test(trimmed) ||
        trimmed.startsWith("__CODE_BLOCK")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  const lines = html.split("\n");
  let inUl = false;
  let inOl = false;
  let newLines = [];

  for (let line of lines) {
    if (line.includes("<li class='unordered'>")) {
      if (!inUl) {
        if (inOl) {
          newLines.push("</ol>");
          inOl = false;
        }
        newLines.push("<ul>");
        inUl = true;
      }
      newLines.push(line.replace(" class='unordered'", ""));
    } else if (line.includes("<li class='ordered'>")) {
      if (!inOl) {
        if (inUl) {
          newLines.push("</ul>");
          inUl = false;
        }
        newLines.push("<ol>");
        inOl = true;
      }
      newLines.push(line.replace(" class='ordered'", ""));
    } else {
      if (inUl) {
        newLines.push("</ul>");
        inUl = false;
      }
      if (inOl) {
        newLines.push("</ol>");
        inOl = false;
      }
      newLines.push(line);
    }
  }
  if (inUl) newLines.push("</ul>");
  if (inOl) newLines.push("</ol>");
  html = newLines.join("\n");

  inlineCode.forEach((code, i) => {
    html = html.replace(`__INLINE_CODE_${i}__`, code);
  });
  codeBlocks.forEach((block, i) => {
    html = html.replace(`__CODE_BLOCK_${i}__`, block);
  });

  return html;
};

// --- Main Components ---

export default function MarkdownToPdfGeneratorPage() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [fontFamily, setFontFamily] = useState(FONTS[0].value);
  const [fontSize, setFontSize] = useState([11]); // pt
  const [margin, setMargin] = useState([15]); // mm (Reduced from 25)
  const [title, setTitle] = useState("Untitled Document");
  const [zoom, setZoom] = useState([0.75]); // Preview scale
  const [theme, setTheme] = useState<keyof typeof THEMES>("modern");
  const [paperFormat, setPaperFormat] = useState<"A4" | "Letter">("A4");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const selection = current.substring(start, end);
    const replacement = before + selection + after;

    setMarkdown(
      current.substring(0, start) + replacement + current.substring(end)
    );

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selection.length
      );
    }, 0);
  };

  const htmlContent = React.useMemo(() => parseMarkdown(markdown), [markdown]);

  const generatePDF = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      alert("Unable to generate PDF.");
      return;
    }

    const doc = iframe.contentWindow.document;
    const currentTheme = THEMES[theme].styles;

    const styles = `
      <style>
        @page {
          size: ${paperFormat};
          margin: ${margin[0]}mm;
        }
        body {
          font-family: ${fontFamily};
          font-size: ${fontSize[0]}pt;
          line-height: 1.6;
          color: ${currentTheme.bodyColor};
          margin: 0;
          padding: ${margin[0]}mm; /* Helper for matching print vs screen roughly if @page isn't supported in iframe preview */
          padding: 0; /* Should rely on @page margin, but sometimes browsers are tricky. */
          /* Actually, for print, body margin/padding interaction with @page margin is complex. 
             Best practice: @page handles margin. Body has 0 margin. */
          max-width: 100%;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        /* We need to ensure content fits within @page margin. */
        
        h1 { 
          font-size: 2.2em; 
          border-bottom: ${currentTheme.h1Border}; 
          color: ${currentTheme.h1Color}; 
          margin-bottom: 0.5em; 
          padding-bottom: 0.2em;
        }
        h2 { font-size: 1.8em; margin-top: 1.5em; margin-bottom: 0.5em; color: ${currentTheme.h1Color}; }
        h3 { font-size: 1.4em; margin-top: 1.3em; margin-bottom: 0.5em; color: ${currentTheme.h1Color}; }
        p { margin-bottom: 1em; text-align: justify; }
        a { color: ${currentTheme.linkColor}; text-decoration: none; }
        blockquote {
          border-left: ${currentTheme.quoteBorder};
          background-color: ${currentTheme.quoteBg};
          padding: 1em;
          margin: 1.5em 0;
          font-style: italic;
        }
        code.inline-code {
          background-color: ${currentTheme.codeBg};
          color: ${currentTheme.codeColor};
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        pre.code-block {
          background-color: ${currentTheme.codeBg};
          padding: 1em;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.5em 0;
          border: 1px solid #e5e5e5;
          page-break-inside: avoid;
        }
        pre.code-block code {
          color: ${currentTheme.codeColor};
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          white-space: pre;
        }
        ul, ol { margin-bottom: 1em; padding-left: 2em; }
        li { margin-bottom: 0.3em; }
        img { max-width: 100%; height: auto; }
        hr { border: 0; border-top: 1px solid #e5e5e5; margin: 2em 0; }
      </style>
    `;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          ${styles}
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
               setTimeout(() => {
                 window.print();
               }, 100);
            };
          </script>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      if (iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    }, 500);
  };

  const activeTheme = THEMES[theme].styles;
  const paperWidthMm = paperFormat === "A4" ? 210 : 215.9;
  const paperHeightMm = paperFormat === "A4" ? 297 : 279.4;
  const mmToPx = 3.78;
  const previewWidth = paperWidthMm * mmToPx;
  const previewHeight = paperHeightMm * mmToPx;

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      {/* Hidden Iframe for Printing */}
      <iframe ref={iframeRef} className="hidden" title="Print Frame" />

      {/* Premium Header */}
      <header className="flex items-center justify-between h-14 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/generators"
            className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Back to Generators"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-6 w-[1px] bg-border mx-2" />
            <h1 className="font-semibold text-sm tracking-tight hidden sm:block">
              Markdown to PDF
            </h1>
            <Badge
              variant="secondary"
              className="text-[10px] h-5 px-1.5 font-mono text-muted-foreground hidden sm:flex"
            >
              BETA
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-center max-w-md mx-auto">
          <div className="relative w-full max-w-[240px]">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 w-full bg-muted/40 border-transparent hover:bg-muted/70 focus:bg-background focus:border-input transition-all text-center font-medium text-sm"
              placeholder="Untitled Document"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={generatePDF}
                  className="h-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export PDF</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Generate and download PDF</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* Main Workspace - Edge to Edge */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* EDITOR PANE */}
          <ResizablePanel defaultSize={45} minSize={30} className="border-r">
            <div className="flex flex-col h-full bg-background">
              {/* Editor Toolbar */}
              <div className="flex items-center gap-1 p-2 border-b bg-muted/10 overflow-x-auto shrink-0 scrollbar-none">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("**", "**")}
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("*", "*")}
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <div className="w-[1px] h-4 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("# ")}
                  title="H1"
                >
                  <Heading1 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("## ")}
                  title="H2"
                >
                  <Heading2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("### ")}
                  title="H3"
                >
                  <Heading3 className="w-4 h-4" />
                </Button>
                <div className="w-[1px] h-4 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("- ")}
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("1. ")}
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <div className="w-[1px] h-4 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("> ")}
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("```\n", "\n```")}
                  title="Code Block"
                >
                  <Code className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertText("---\n")}
                  title="Divider"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>

              <Textarea
                ref={textareaRef}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="flex-1 resize-none border-0 p-8 font-mono text-sm leading-7 focus-visible:ring-0 rounded-none bg-transparent"
                placeholder="Start writing..."
                spellCheck={false}
              />
              <div className="border-t py-1.5 px-4 bg-muted/10 text-[10px] text-muted-foreground flex justify-between select-none">
                <span>Markdown</span>
                <span className="font-mono">{markdown.length} chars</span>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-[1px] bg-border hover:bg-primary/50 transition-colors" />

          {/* PREVIEW PANE */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <div className="flex flex-col h-full bg-slate-50/50 dark:bg-[#0c0c0c]">
              {/* Preview Controls */}
              <div className="flex items-center justify-between px-3 h-12 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="h-7 w-[130px] text-xs border-transparent bg-muted/40 hover:bg-muted/60 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONTS.map((f) => (
                          <SelectItem
                            key={f.value}
                            value={f.value}
                            className="text-xs"
                          >
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-4 w-[1px] bg-border" />

                  <div className="flex items-center gap-2">
                    <Select
                      value={theme}
                      onValueChange={(v: any) => setTheme(v)}
                    >
                      <SelectTrigger className="h-7 w-[90px] text-xs border-transparent bg-muted/40 hover:bg-muted/60 focus:ring-0">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(THEMES).map(([key, t]) => (
                          <SelectItem key={key} value={key} className="text-xs">
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-4 w-[1px] bg-border" />

                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2">
                            <Type className="w-3 h-3 text-muted-foreground" />
                            <Slider
                              value={fontSize}
                              onValueChange={setFontSize}
                              min={8}
                              max={32}
                              step={1}
                              className="w-16 cursor-pointer"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Font Size: {fontSize[0]}pt
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="h-4 w-[1px] bg-border" />

                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2">
                            <LayoutTemplate className="w-3 h-3 text-muted-foreground" />
                            <Slider
                              value={margin}
                              onValueChange={setMargin}
                              min={0}
                              max={50}
                              step={5}
                              className="w-16 cursor-pointer"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Margin: {margin[0]}mm</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-muted/30 p-0.5 rounded-lg flex items-center border border-transparent hover:border-border transition-colors">
                    <Button
                      variant={paperFormat === "A4" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setPaperFormat("A4")}
                      className={cn(
                        "h-6 w-8 text-[10px] font-medium rounded-md",
                        paperFormat === "A4" && "shadow-sm"
                      )}
                    >
                      A4
                    </Button>
                    <Button
                      variant={paperFormat === "Letter" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setPaperFormat("Letter")}
                      className={cn(
                        "h-6 w-10 text-[10px] font-medium rounded-md",
                        paperFormat === "Letter" && "shadow-sm"
                      )}
                    >
                      Letter
                    </Button>
                  </div>

                  <div className="h-4 w-[1px] bg-border" />

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setZoom([Math.max(0.3, zoom[0] - 0.1)])}
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </Button>
                    <span className="text-[10px] w-8 text-center font-mono text-muted-foreground">
                      {Math.round(zoom[0] * 100)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setZoom([Math.min(1.5, zoom[0] + 0.1)])}
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* PDF Canvas Area */}
              <div className="flex-1 overflow-auto p-8 flex justify-center bg-dot-pattern">
                <div
                  className="bg-white shadow-2xl transition-all origin-top ease-out duration-200"
                  style={{
                    width: previewWidth,
                    minHeight: previewHeight,
                    transform: `scale(${zoom[0]})`,
                    padding: `${margin[0]}mm`,
                    fontFamily: fontFamily.split(",")[0],
                    fontSize: `${fontSize[0]}pt`,
                    color: activeTheme.bodyColor,
                  }}
                >
                  <style>{`
                    .pdf-preview h1 { 
                      font-size: 2.2em; 
                      font-weight: bold; 
                      border-bottom: ${activeTheme.h1Border};
                      color: ${activeTheme.h1Color};
                      margin-bottom: 0.5em;
                      padding-bottom: 0.2em;
                      line-height: 1.2;
                    }
                    .pdf-preview h2 { 
                      font-size: 1.8em; 
                      font-weight: bold; 
                      margin-top: 1.5em; 
                      margin-bottom: 0.6em;
                      color: ${activeTheme.h1Color};
                      line-height: 1.3;
                    }
                    .pdf-preview h3 {
                      font-size: 1.4em;
                      font-weight: bold;
                      margin-top: 1.3em;
                      margin-bottom: 0.5em;
                      color: ${activeTheme.h1Color};
                    }
                    .pdf-preview p { margin-bottom: 1em; text-align: justify; line-height: 1.6; }
                    .pdf-preview blockquote {
                      border-left: ${activeTheme.quoteBorder};
                      background: ${activeTheme.quoteBg};
                      padding: 1em;
                      margin: 1.5em 0;
                      font-style: italic;
                    }
                    .pdf-preview ul, .pdf-preview ol { margin-bottom: 1em; padding-left: 2em; }
                    .pdf-preview li { margin-bottom: 0.3em; }
                    .pdf-preview code.inline-code {
                      background: ${activeTheme.codeBg};
                      color: ${activeTheme.codeColor};
                      padding: 0.2em 0.4em;
                      border-radius: 4px;
                      font-family: 'Courier New', monospace;
                      font-size: 0.9em;
                    }
                    .pdf-preview pre.code-block {
                      background: ${activeTheme.codeBg};
                      padding: 1em;
                      border-radius: 6px;
                      overflow-x: auto;
                      margin: 1.5em 0;
                      border: 1px solid #e5e5e5;
                    }
                    .pdf-preview pre.code-block code {
                      color: ${activeTheme.codeColor};
                      font-family: 'Courier New', monospace;
                      font-size: 0.9em;
                      white-space: pre;
                    }
                    .pdf-preview a { color: ${activeTheme.linkColor}; text-decoration: underline; }
                    .pdf-preview hr { border: 0; border-top: 1px solid #e5e5e5; margin: 2em 0; }
                   `}</style>
                  <div
                    className="pdf-preview"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
