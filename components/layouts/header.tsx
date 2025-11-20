"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconPackages, IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { RegistrySetup } from "@/components/registry-setup";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/config";

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-border border-b border-dotted bg-background/80 dark:bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between border-border border-r border-l border-dotted px-4 sm:px-8">
        <Link className="flex items-center gap-2 py-5 group" href="/">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 opacity-20 blur-md group-hover:opacity-30 transition-opacity" />
            <div className="relative size-8 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <IconPackages className="size-4.5 text-white" />
            </div>
          </div>
          <h1 className="font-semibold text-xl bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Bloks Elements
          </h1>
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "rounded-full hidden sm:flex group gap-2"
            )}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-md bg-linear-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
              <div className="relative size-5 rounded-md bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all">
                <IconInfoCircle className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            About
          </Link>

          <RegistrySetup />

          <a
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full"
            )}
            data-umami-event="View GitHub Repository"
            href={siteConfig.links.github}
            rel="noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="size-3.5"
              fill="currentColor"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span className="hidden sm:inline">Contribute Here !</span>
          </a>

          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
