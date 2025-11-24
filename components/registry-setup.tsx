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
import { IconSettings, IconCode } from "@tabler/icons-react";
import * as React from "react";

export function RegistrySetup({
  className,
}: React.ComponentProps<typeof Button>) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

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
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Setup Registry</DialogTitle>
          <DialogDescription>
            Use the code below to configure the @emeraldflow registry for
            your project.
          </DialogDescription>
        </DialogHeader>
        <div className="font-medium">
          Copy and paste the code into{" "}
          <code className="font-mono text-foreground">components.json</code>
        </div>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute bg-background right-4 z-10 top-4 size-8 rounded-md"
            onClick={() => copyToClipboard(registrySetupCode)}
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </Button>
          <div className="overflow-x-auto bg-muted p-8 rounded-md min-h-[120px]">
            <pre className="text-sm font-mono">
              <code>{registrySetupCode}</code>
            </pre>
          </div>
        </div>
        <div className="font-medium">
          Then use the following command to add components:
        </div>
        <div className="overflow-x-auto bg-muted p-8 rounded-md min-h-[50px]">
          <pre className="text-sm font-mono">
            <code>npx shadcn@latest add @emeraldflow/[component-name]</code>
          </pre>
        </div>
        <div className="font-medium">
          To setup the MCP server, run the following command:
        </div>
        <div className="overflow-x-auto bg-muted p-8 rounded-md min-h-[50px]">
          <pre className="text-sm font-mono">
            <code>npx shadcn@latest mcp init</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const registrySetupCode = `"registries": {
  "@emeraldflow": "https://bloks-elements.vercel.app/r/{name}.json"
}
`;
