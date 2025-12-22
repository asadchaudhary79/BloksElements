import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconShadow,
  IconScreenshot,
  IconSnowflake,
  IconRocket,
  IconFileTypePdf,
  IconColorSwatch,
  IconCut,
  IconLoader,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Generators | Emerald Flow",
  description:
    "Interactive CSS generators for Box Shadow, Code Screenshots, Glassmorphism effects, Gradients, Clip-Path, and Loading Animations.",
  openGraph: {
    title: "Generators | Emerald Flow",
    description:
      "Create beautiful CSS effects with our interactive generators for Box Shadow, Code Screenshots, Glassmorphism, Gradients, Clip-Path, and Loading Animations.",
  },
};

const generators = [
  {
    id: "box-shadow",
    name: "Box Shadow Generator",
    description:
      "Create custom box shadows with interactive controls. Adjust offset, blur, spread, color, and opacity.",
    icon: IconShadow,
    href: "/generators/box-shadow",
    features: ["Visual Preview", "Live Updates", "CSS Export"],
  },
  {
    id: "code-screenshot",
    name: "Code Screenshot Generator",
    description:
      "Generate beautiful code screenshots with customizable themes, syntax highlighting, and styling options.",
    icon: IconScreenshot,
    href: "/generators/code-screenshot",
    features: ["Multiple Themes", "Syntax Highlighting", "Export Options"],
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism Generator",
    description:
      "Create stunning glassmorphism effects with adjustable blur, transparency, borders, and gradients.",
    icon: IconSnowflake,
    href: "/generators/glassmorphism",
    features: ["Blur Control", "Transparency", "Gradient Support"],
  },
  {
    id: "markdown-to-pdf",
    name: "Markdown to PDF Generator",
    description:
      "Convert Markdown text to PDF documents with customizable styling, fonts, and layout options.",
    icon: IconFileTypePdf,
    href: "/generators/markdown-to-pdf",
    features: ["Live Preview", "Custom Styling", "PDF Download"],
  },
  {
    id: "gradient",
    name: "Gradient Generator",
    description:
      "Create stunning CSS gradients with visual controls. Design linear and radial gradients with unlimited color stops.",
    icon: IconColorSwatch,
    href: "/generators/gradient",
    features: ["Visual Editor", "Multiple Stops", "CSS Export"],
  },

  {
    id: "loading-animation",
    name: "Loading Animation Generator",
    description:
      "Generate beautiful CSS loading animations. Choose from spinners, dots, bars, and custom animated effects.",
    icon: IconLoader,
    href: "/generators/loading-animation",
    features: ["Multiple Types", "Customizable", "CSS Export"],
  },
];

export default function GeneratorsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="rounded-[32px] border border-dotted border-border/60 bg-linear-to-b from-background/80 to-background/30 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-dotted px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              CSS Generators
            </p>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Interactive CSS Generators
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                Create beautiful CSS effects with our interactive tools. Adjust
                settings in real-time, preview instantly, and copy the generated
                code directly into your projects.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="rounded-2xl border border-dotted px-4 py-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Total Generators
                </p>
                <p className="text-xl font-semibold text-foreground">
                  {generators.length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-dotted border-emerald-500/30 bg-linear-to-b from-emerald-500/10 via-emerald-500/5 to-transparent p-5 text-sm text-foreground shadow-[0_20px_80px_rgba(16,185,129,0.15)]">
            <p className="font-semibold">How to use</p>
            <ol className="mt-3 space-y-2 text-muted-foreground">
              <li>1. Choose a generator from below.</li>
              <li>2. Adjust the controls to customize.</li>
              <li>3. Copy the generated CSS code.</li>
            </ol>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {generators.map((generator) => {
          const Icon = generator.icon;
          return (
            <Link key={generator.id} href={generator.href}>
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 hover:-translate-y-1 border-2 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="size-12 rounded-lg bg-linear-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    >
                      Generator
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{generator.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {generator.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {generator.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-xs rounded-full border-dotted"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50"
                  >
                    <IconRocket className="mr-2 size-4" />
                    Open Generator
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
