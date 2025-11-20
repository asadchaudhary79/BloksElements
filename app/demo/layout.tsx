import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo — blockselements.co",
  description:
    "Interactive demo showcasing the blockselements.co component library with code editor, block browser, and category explorer.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
