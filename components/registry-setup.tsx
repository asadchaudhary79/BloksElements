// https://github.com/shadcn-ui/alpine-registry/blob/main/components/registry-setup.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { IconCode, IconTerminal, IconServer } from "@tabler/icons-react";
import * as React from "react";

export function RegistrySetup({
  className,
}: React.ComponentProps<typeof Button>) {
  const { isCopied: isCopiedJson, copyToClipboard: copyJson } =
    useCopyToClipboard();
  const { isCopied: isCopiedAdd, copyToClipboard: copyAdd } =
    useCopyToClipboard();
  const { isCopied: isCopiedMcp, copyToClipboard: copyMcp } =
    useCopyToClipboard();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className={cn(className, "rounded-full group gap-2")}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-md bg-linear-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
            <div className="relative size-5 rounded-md bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all">
              <IconCode className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <span className="hidden sm:inline">Registry</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-4xl lg:max-w-5xl border-2 border-dotted border-emerald-500/30 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20">
              <IconCode className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-semibold tracking-tight">
                Setup Registry
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-base">
                Configure the @emeraldflow registry for your project
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: JSON Configuration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Copy and paste the code into{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    components.json
                  </code>
                </p>
              </div>
            </div>
            <div className="relative group">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute right-3 top-3 z-10 size-8 rounded-lg border-dotted transition-all",
                  "bg-background/80 backdrop-blur-sm hover:bg-background",
                  "hover:scale-105 active:scale-95",
                  isCopiedJson && "border-emerald-500/40 bg-emerald-500/10"
                )}
                onClick={() => copyJson(registrySetupCode)}
              >
                {isCopiedJson ? (
                  <CheckIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
              </Button>
              <div className="overflow-x-auto rounded-xl border border-dotted bg-linear-to-br from-muted/50 to-muted p-6 backdrop-blur-sm min-h-[120px]">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-foreground/90">
                    {registrySetupCode}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2: Add Components Command */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                2
              </div>
              <div className="flex items-center gap-2 flex-1">
                <IconTerminal className="size-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">
                  Then use the following command to add components:
                </p>
              </div>
            </div>
            <div className="relative group">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute right-3 top-3 z-10 size-8 rounded-lg border-dotted transition-all",
                  "bg-background/80 backdrop-blur-sm hover:bg-background",
                  "hover:scale-105 active:scale-95",
                  isCopiedAdd && "border-emerald-500/40 bg-emerald-500/10"
                )}
                onClick={() =>
                  copyAdd("npx shadcn@latest add @emeraldflow/[component-name]")
                }
              >
                {isCopiedAdd ? (
                  <CheckIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
              </Button>
              <div className="overflow-x-auto rounded-xl border border-dotted bg-linear-to-br from-muted/50 to-muted p-6 backdrop-blur-sm min-h-[60px]">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-foreground/90">
                    npx shadcn@latest add @emeraldflow/[component-name]
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3: MCP Server Setup */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                3
              </div>
              <div className="flex items-center gap-2 flex-1">
                <IconServer className="size-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">
                  To setup the MCP server, run the following command:
                </p>
              </div>
            </div>
            <div className="relative group">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute right-3 top-3 z-10 size-8 rounded-lg border-dotted transition-all",
                  "bg-background/80 backdrop-blur-sm hover:bg-background",
                  "hover:scale-105 active:scale-95",
                  isCopiedMcp && "border-emerald-500/40 bg-emerald-500/10"
                )}
                onClick={() => copyMcp("npx shadcn@latest mcp init")}
              >
                {isCopiedMcp ? (
                  <CheckIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
              </Button>
              <div className="overflow-x-auto rounded-xl border border-dotted bg-linear-to-br from-muted/50 to-muted p-6 backdrop-blur-sm min-h-[60px]">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-foreground/90">
                    npx shadcn@latest mcp init
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const registrySetupCode = `"registries": {
  "@emeraldflow": "https://bloks-elements.vercel.app/r/{name}.json"
}
`;
