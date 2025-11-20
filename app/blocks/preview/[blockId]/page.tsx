import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { blocksComponents } from "@/content/blocks-components";
import { blocksMetadata } from "@/content/blocks-metadata";
import PreviewThemeSwitcher from "./theme-switcher";
import { ClientOnly } from "@/components/client-only";
import { Button } from "@/components/ui/button";

type Params = {
  params: Promise<{
    blockId: string;
  }>;
};

export function generateStaticParams() {
  const blockIds = Object.keys(blocksComponents);

  return blockIds.map((blockId) => ({
    blockId,
  }));
}

export default async function BlockPreviewPage({ params }: Params) {
  const { blockId } = await params;
  const BlocksComponent = blocksComponents[blockId];

  if (!BlocksComponent) {
    notFound();
  }

  const blockMeta = blocksMetadata.find((block) => block.id === blockId);
  const blockName = blockMeta?.name || blockId;

  return (
    <div className="relative min-h-screen w-full ">
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background backdrop-blur-md ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Link href="/demo">
                  <ArrowLeftIcon className="size-4" />
                  Back to Demo
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Preview</span>
                <span className="text-sm font-semibold">{blockName}</span>
              </div>
            </div>
            <PreviewThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-6 lg:p-8 shadow-lg">
            <ClientOnly>
              <BlocksComponent />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "blockselements.co — Preview",
};
