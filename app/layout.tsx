import "@/app/globals.css";
import { SeoJsonLd } from "@/components/seo-jsonld";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { DM_Sans, Geist_Mono } from "next/font/google";

const fontSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: "blockselements.co",
  title: {
    default: "Shadcn Blocks - 60+ Free shadcn/ui Components for React",
    template: "%s | blockselements.co - shadcn/ui blocks",
  },
  description: siteConfig.description,
  keywords: [
    "shadcn blocks",
    "shadcn ui blocks",
    "shadcn/ui blocks",
    "shadcn components",
    "shadcn ui components",
    "shadcn/ui components",
    "free shadcn blocks",
    "shadcn ui examples",
    "shadcn code snippets",
    "React UI blocks",
    "Tailwind CSS components",
    "Next.js components",
    "shadcn/ui",
    "copy paste components",
    "Open source UI blocks",
    "accessible components",
    "React components library",
    "UI blocks for developers",
    "shadcn previews",
    "shadcn templates",
  ],
  authors: [
    {
      name: "Asad Chaudhary",
      url: "https://github.com/asadchaudhary79",
    },
  ],
  creator: "Asad Chaudhary",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Shadcn Blocks - 60+ Free shadcn/ui Components for React",
    description: siteConfig.description,
    siteName: "blockselements.co",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "blockselements.co - Free shadcn/ui blocks and components",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  category: "Developer Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          "antialiased min-h-screen w-full relative bg-black"
        )}
        suppressHydrationWarning
      >
        {/* Emerald Depths Background with Top Glow */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
        >
          <div className="relative z-10">
            {children}

            <TailwindIndicator />
            <Toaster />
            <SeoJsonLd />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
