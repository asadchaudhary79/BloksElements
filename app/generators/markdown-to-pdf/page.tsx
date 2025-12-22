"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconDownload, IconEye } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fonts = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
];

const fontSizes = [
  { value: "12", label: "12pt" },
  { value: "14", label: "14pt" },
  { value: "16", label: "16pt" },
  { value: "18", label: "18pt" },
  { value: "20", label: "20pt" },
];

export default function MarkdownToPdfGeneratorPage() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown to PDF

This is a **Markdown to PDF Generator** that converts your markdown text into beautiful PDF documents.

## Features

- **Bold text** and *italic text*
- Headers and lists
- Code blocks
- Links and images

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

- Unordered item
- Another item

> This is a blockquote

[Visit our website](https://example.com)`);

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("14");
  const [margin, setMargin] = useState("20");
  const [title, setTitle] = useState("Document");

  // Improved markdown to HTML converter
  const markdownToHtml = (md: string): string => {
    let html = md;

    // Code blocks first (to avoid processing content inside)
    const codeBlocks: string[] = [];
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const id = `CODE_BLOCK_${codeBlocks.length}`;
      codeBlocks.push(
        `<pre class="code-block"><code class="language-${
          lang || "text"
        }">${escapeHtml(code.trim())}</code></pre>`
      );
      return id;
    });

    // Inline code (but not inside code blocks)
    html = html.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');

    // Restore code blocks
    codeBlocks.forEach((block, index) => {
      html = html.replace(`CODE_BLOCK_${index}`, block);
    });

    // Headers (in order from largest to smallest)
    html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold (strong)
    html = html.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__([^_]+?)__/g, "<strong>$1</strong>");

    // Italic (em)
    html = html.replace(/\*([^*]+?)\*/g, "<em>$1</em>");
    html = html.replace(/_([^_]+?)_/g, "<em>$1</em>");

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank">$1</a>'
    );

    // Blockquotes
    html = html.replace(/^> (.+)$/gim, "<blockquote>$1</blockquote>");

    // Merge consecutive blockquotes
    html = html.replace(/(<blockquote>.*<\/blockquote>\n?)+/g, (match) => {
      const quotes = match.match(/<blockquote>(.*?)<\/blockquote>/g) || [];
      const content = quotes
        .map((q) => q.replace(/<\/?blockquote>/g, ""))
        .join("<br>");
      return `<blockquote>${content}</blockquote>`;
    });

    // Horizontal rules
    html = html.replace(/^---$/gim, "<hr>");
    html = html.replace(/^\*\*\*$/gim, "<hr>");

    // Process lists - ordered
    html = html.replace(/^(\d+)\. (.+)$/gim, "<li>$2</li>");
    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      if (match.includes("<ol>") || match.includes("<ul>")) return match;
      return `<ol>${match}</ol>`;
    });

    // Process lists - unordered
    const lines = html.split("\n");
    const processedLines: string[] = [];
    let inUnorderedList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const unorderedMatch = line.match(/^[-*+] (.+)$/);

      if (unorderedMatch) {
        if (!inUnorderedList) {
          processedLines.push("<ul>");
          inUnorderedList = true;
        }
        processedLines.push(`<li>${unorderedMatch[1]}</li>`);
      } else {
        if (inUnorderedList) {
          processedLines.push("</ul>");
          inUnorderedList = false;
        }
        processedLines.push(line);
      }
    }
    if (inUnorderedList) processedLines.push("</ul>");
    html = processedLines.join("\n");

    // Paragraphs - wrap text that's not already in a tag
    html = html
      .split("\n\n")
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return "";
        if (trimmed.match(/^<(h[1-6]|ul|ol|pre|blockquote|hr|li)/)) {
          return trimmed;
        }
        return `<p>${trimmed.replace(/\n/g, " ")}</p>`;
      })
      .filter(Boolean)
      .join("\n\n");

    // Line breaks within paragraphs
    html = html.replace(/(<p>.*?)<br>(.*?<\/p>)/g, "$1<br>$2");

    return html;
  };

  const escapeHtml = (text: string): string => {
    if (typeof window === "undefined") {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  const htmlContent = markdownToHtml(markdown);

  const generatePDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const styles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          margin: ${margin}mm;
          size: A4;
        }
        
        body {
          font-family: ${fontFamily}, sans-serif;
          font-size: ${fontSize}pt;
          line-height: 1.8;
          color: #333;
          max-width: 100%;
          padding: 20px;
        }
        
        h1 {
          font-size: 2.5em;
          margin-top: 0.8em;
          margin-bottom: 0.5em;
          font-weight: bold;
          color: #000;
          border-bottom: 2px solid #eee;
          padding-bottom: 0.3em;
        }
        
        h2 {
          font-size: 2em;
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: bold;
          color: #222;
        }
        
        h3 {
          font-size: 1.5em;
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: bold;
          color: #333;
        }
        
        h4 {
          font-size: 1.25em;
          margin-top: 0.8em;
          margin-bottom: 0.4em;
          font-weight: bold;
          color: #444;
        }
        
        p {
          margin: 1em 0;
          text-align: justify;
        }
        
        ul, ol {
          margin: 1em 0;
          padding-left: 2.5em;
        }
        
        li {
          margin: 0.5em 0;
        }
        
        code {
          background: #f5f5f5;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', 'Monaco', monospace;
          font-size: 0.9em;
          color: #e83e8c;
        }
        
        pre.code-block {
          background: #f8f8f8;
          border: 1px solid #e1e4e8;
          border-radius: 6px;
          padding: 1em;
          margin: 1.5em 0;
          overflow-x: auto;
          font-family: 'Courier New', 'Monaco', monospace;
          font-size: 0.85em;
          line-height: 1.6;
        }
        
        pre.code-block code {
          background: none;
          padding: 0;
          color: #333;
          font-size: 1em;
        }
        
        blockquote {
          border-left: 4px solid #dfe2e5;
          margin: 1.5em 0;
          padding: 0.5em 1em;
          background: #f6f8fa;
          color: #6a737d;
          font-style: italic;
        }
        
        a {
          color: #0366d6;
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        hr {
          border: none;
          border-top: 2px solid #e1e4e8;
          margin: 2em 0;
        }
        
        strong {
          font-weight: 600;
          color: #24292e;
        }
        
        em {
          font-style: italic;
        }
        
        @media print {
          body {
            padding: 0;
          }
          
          a[href]:after {
            content: " (" attr(href) ")";
            font-size: 0.8em;
            color: #6a737d;
          }
        }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title || "Document"}</title>
          ${styles}
        </head>
        <body>
          <div class="markdown-content">
            ${htmlContent}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
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
            Markdown to PDF Generator
          </h1>
          <Badge
            variant="secondary"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          >
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Convert Markdown text to PDF documents with customizable styling,
          fonts, and layout options. Preview your document and download as PDF.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings */}
        <Card className="border-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Document Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document"
              />
            </div>

            {/* Font Family */}
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger id="fontFamily">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="fontSize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Margin */}
            <div className="space-y-2">
              <Label htmlFor="margin">Margin (mm): {margin}mm</Label>
              <input
                id="margin"
                type="range"
                min={10}
                max={50}
                step={5}
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Editor and Preview */}
        <Card className="border-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Markdown Editor & Preview</CardTitle>
            <Button
              onClick={generatePDF}
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="sm"
            >
              <IconDownload className="mr-2 size-4" />
              Download PDF
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <span>Editor</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex items-center gap-2"
                >
                  <IconEye className="size-4" />
                  <span>Preview</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="mt-4">
                <Textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="min-h-[500px] font-mono text-sm"
                  placeholder="Enter your Markdown text here..."
                />
              </TabsContent>
              <TabsContent value="preview" className="mt-4">
                <div className="min-h-[500px] rounded-lg border-2 border-dotted bg-background/50 p-6 overflow-auto">
                  <div
                    className="markdown-preview prose prose-sm dark:prose-invert max-w-none"
                    style={{
                      fontFamily: fontFamily,
                      fontSize: `${fontSize}pt`,
                    }}
                  >
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
                      .markdown-preview h1 {
                        font-size: 2em;
                        margin-top: 0.8em;
                        margin-bottom: 0.5em;
                        font-weight: bold;
                        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
                        padding-bottom: 0.3em;
                        color: #fff;
                      }
                      .markdown-preview h2 {
                        font-size: 1.75em;
                        margin-top: 1em;
                        margin-bottom: 0.5em;
                        font-weight: bold;
                        color: #fff;
                      }
                      .markdown-preview h3 {
                        font-size: 1.5em;
                        margin-top: 0.8em;
                        margin-bottom: 0.5em;
                        font-weight: bold;
                        color: #fff;
                      }
                      .markdown-preview h4 {
                        font-size: 1.25em;
                        margin-top: 0.8em;
                        margin-bottom: 0.4em;
                        font-weight: bold;
                        color: #fff;
                      }
                      .markdown-preview p {
                        margin: 1em 0;
                        line-height: 1.8;
                        color: rgba(255, 255, 255, 0.9);
                      }
                      .markdown-preview ul,
                      .markdown-preview ol {
                        margin: 1em 0;
                        padding-left: 2em;
                        color: rgba(255, 255, 255, 0.9);
                      }
                      .markdown-preview li {
                        margin: 0.5em 0;
                      }
                      .markdown-preview code.inline-code {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 2px 6px;
                        border-radius: 3px;
                        font-family: "Courier New", monospace;
                        font-size: 0.9em;
                        color: #10b981;
                      }
                      .markdown-preview pre.code-block {
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 6px;
                        padding: 1em;
                        margin: 1.5em 0;
                        overflow-x: auto;
                        font-family: "Courier New", monospace;
                        font-size: 0.85em;
                      }
                      .markdown-preview pre.code-block code {
                        background: none;
                        padding: 0;
                        color: rgba(255, 255, 255, 0.9);
                      }
                      .markdown-preview blockquote {
                        border-left: 4px solid rgba(16, 185, 129, 0.5);
                        margin: 1.5em 0;
                        padding: 0.5em 1em;
                        background: rgba(16, 185, 129, 0.05);
                        color: rgba(255, 255, 255, 0.8);
                        font-style: italic;
                      }
                      .markdown-preview a {
                        color: #10b981;
                        text-decoration: underline;
                      }
                      .markdown-preview a:hover {
                        color: #34d399;
                      }
                      .markdown-preview hr {
                        border: none;
                        border-top: 2px solid rgba(255, 255, 255, 0.1);
                        margin: 2em 0;
                      }
                      .markdown-preview strong {
                        font-weight: 600;
                        color: #fff;
                      }
                      .markdown-preview em {
                        font-style: italic;
                      }
                    `,
                      }}
                    />
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
