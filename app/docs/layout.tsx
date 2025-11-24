import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs — Emerald Flow",
  description:
    "Interactive Docs showcasing the Emerald Flow component library with code editor, block browser, and category explorer.",
  robots: { index: false, follow: false },
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
