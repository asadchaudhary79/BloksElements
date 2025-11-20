"use client";

import { siteConfig } from "@/config";
import Link from "next/link";

export function Footer() {
  return (
    <div className="border-border border-dotted border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 border-border border-dotted border-r border-l">
        <footer className="flex flex-col justify-center items-center gap-4 py-5">
          <div>
            <div className="text-balance text-sm leading-loose text-muted-foreground text-center">
              Built by{" "}
              <Link
                href="https://github.com/asadchaudhary79"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
                data-umami-event="View GitHub Profile"
              >
                asadchaudhary79
              </Link>
              . The source code is available on{" "}
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
                data-umami-event="View GitHub Repository"
              >
                GitHub
              </Link>
              .
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
