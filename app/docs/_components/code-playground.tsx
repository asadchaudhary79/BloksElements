"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCopyToClipboard } from "@/hooks/use-copy";
import {
  IconClipboard,
  IconCode,
  IconDeviceDesktopCode,
  IconRefresh,
} from "@tabler/icons-react";

const defaultSnippets = {
  html: `<section class="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_90px_rgba(16,185,129,0.25)] p-10 text-center">
  <p class="text-emerald-500/90 text-sm font-semibold tracking-[0.4em] uppercase">Emerald Flow</p>
  <h1 class="mt-4 text-4xl font-bold text-white tracking-tight">Build interfaces faster</h1>
  <p class="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
    Copy, edit, and launch production-grade sections powered by shadcn/ui + Tailwind.
  </p>

  <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
    <button class="rounded-full bg-white text-emerald-600 font-semibold px-6 py-3 shadow-lg shadow-emerald-500/40">
      Get Started
    </button>
    <button class="rounded-full border border-white/30 text-white px-6 py-3 hover:bg-white/10 transition">
      View Docs
    </button>
  </div>
</section>`,
  css: `:root {
  color-scheme: dark;
  font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, rgba(13, 148, 136, 0.25), transparent 55%), #020617;
  padding: 40px;
}`,
  js: `const primaryButton = document.querySelector("button");
primaryButton?.addEventListener("click", () => {
  primaryButton.classList.add("scale-95");
  setTimeout(() => primaryButton.classList.remove("scale-95"), 120);
});`,
};

type PlaygroundTab = "html" | "css" | "js";

export function CodePlayground() {
  const [html, setHtml] = useState(defaultSnippets.html);
  const [css, setCss] = useState(defaultSnippets.css);
  const [js, setJs] = useState(defaultSnippets.js);
  const [activeTab, setActiveTab] = useState<PlaygroundTab>("html");
  const [previewKey, setPreviewKey] = useState(0);

  const { copyToClipboard: copyHtml, isCopied: htmlCopied } =
    useCopyToClipboard();
  const { copyToClipboard: copyCss, isCopied: cssCopied } =
    useCopyToClipboard();
  const { copyToClipboard: copyJs, isCopied: jsCopied } = useCopyToClipboard();

  const srcDoc = useMemo(() => {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>
      try {
        ${js}
      } catch (error) {
        console.error(error);
      }
    </script>
  </body>
</html>`;
  }, [html, css, js]);

  const handleReset = () => {
    setHtml(defaultSnippets.html);
    setCss(defaultSnippets.css);
    setJs(defaultSnippets.js);
    setPreviewKey((prev) => prev + 1);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-3xl border border-white/10 bg-background/70 p-5 shadow-[0_25px_80px_rgba(16,185,129,0.12)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCode className="size-4 text-emerald-500" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Editor
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-dotted"
              onClick={handleReset}
            >
              <IconRefresh className="mr-2 size-4" />
              Reset
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as PlaygroundTab)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-muted/60">
            <TabsTrigger value="html" className="rounded-full">
              HTML
            </TabsTrigger>
            <TabsTrigger value="css" className="rounded-full">
              CSS
            </TabsTrigger>
            <TabsTrigger value="js" className="rounded-full">
              JS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>Markup</span>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs"
                onClick={() => copyHtml(html)}
              >
                <IconClipboard className="size-3.5" />
                {htmlCopied ? "Copied" : "Copy"}
              </Button>
            </div>
            <Textarea
              value={html}
              onChange={(event) => setHtml(event.target.value)}
              rows={16}
              className="font-mono text-sm"
            />
          </TabsContent>

          <TabsContent value="css" className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>Styles</span>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs"
                onClick={() => copyCss(css)}
              >
                <IconClipboard className="size-3.5" />
                {cssCopied ? "Copied" : "Copy"}
              </Button>
            </div>
            <Textarea
              value={css}
              onChange={(event) => setCss(event.target.value)}
              rows={16}
              className="font-mono text-sm"
            />
          </TabsContent>

          <TabsContent value="js" className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>Behavior</span>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs"
                onClick={() => copyJs(js)}
              >
                <IconClipboard className="size-3.5" />
                {jsCopied ? "Copied" : "Copy"}
              </Button>
            </div>
            <Textarea
              value={js}
              onChange={(event) => setJs(event.target.value)}
              rows={16}
              className="font-mono text-sm"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="rounded-3xl border border-white/10 bg-background/80 shadow-[0_25px_80px_rgba(2,6,23,0.6)]">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div className="flex items-center gap-3">
            <IconDeviceDesktopCode className="size-5 text-emerald-500" />
            <div>
              <p className="font-semibold text-sm">Live Preview</p>
              <p className="text-xs text-muted-foreground">
                HTML + CSS + JS rendered in real time
              </p>
            </div>
          </div>
          <Badge variant="outline" className="rounded-full border-dotted">
            Sandbox
          </Badge>
        </div>
        <div className="relative">
          <iframe
            key={previewKey}
            className="h-[520px] w-full rounded-b-3xl bg-[#020617]"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            title="Emerald Flow Playground Preview"
          />
        </div>
      </div>
    </div>
  );
}
