import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { blocksMetadata } from "@/content/blocks-metadata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconBrandGithub,
  IconCode,
  IconFileCode,
  IconFolder,
  IconHeart,
  IconRocket,
  IconSparkles,
  IconUsersGroup,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Blocks Elements - a free, open-source collection of 60+ beautiful shadcn/ui blocks and components for React developers.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us - Blocks Elements",
    description:
      "Learn about Blocks Elements - a free, open-source collection of 60+ beautiful shadcn/ui blocks and components.",
    url: `${siteConfig.url}/about`,
    siteName: "blockselements.co",
    type: "website",
  },
};

export default function AboutPage() {
  const totalBlocks = blocksMetadata.length;
  const totalCategories = blocksCategoriesMetadata.length;

  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-16 pt-10">
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">
          <IconUsersGroup className="size-3.5 mr-1" />
          Team Blocks Elements
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About Blocks Elements
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Building blocks for the web. Free, open-source, and accessible
          components for modern React applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconRocket className="size-5" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Blocks Elements was created to provide developers with a comprehensive
            library of beautiful, production-ready UI components. We believe that
            building great user interfaces shouldn't require starting from scratch
            every time.
          </p>
          <p className="text-muted-foreground">
            Our goal is to make it easy for developers to find, copy, and customize
            high-quality components that follow modern design principles and
            accessibility standards.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconFileCode className="size-5" />
              Total Blocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBlocks}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Ready-to-use components
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconFolder className="size-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCategories}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Organized by type
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconHeart className="size-5" />
              Open Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">100%</div>
            <p className="text-sm text-muted-foreground mt-1">Free forever</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconSparkles className="size-5" />
            What Makes Us Special
          </CardTitle>
          <CardDescription>
            Key features that set Blocks Elements apart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <IconSparkles className="size-4" />
                Beautiful & Accessible
              </h3>
              <p className="text-sm text-muted-foreground">
                All blocks are built with accessibility in mind, following WCAG
                guidelines and using Radix UI primitives for maximum compatibility.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <IconCode className="size-4" />
                Type-Safe
              </h3>
              <p className="text-sm text-muted-foreground">
                Full TypeScript support with proper types and IntelliSense
                autocomplete for the best developer experience.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <IconRocket className="size-4" />
                Framework Agnostic
              </h3>
              <p className="text-sm text-muted-foreground">
                Works with any React framework - Next.js, Remix, Vite, and more.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <IconFileCode className="size-4" />
                Copy & Own
              </h3>
              <p className="text-sm text-muted-foreground">
                No dependencies on external packages. Copy the code and own it
                completely. Customize to your heart's content.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Built With Modern Technology</CardTitle>
          <CardDescription>
            Powered by the best tools in the React ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "shadcn/ui",
              "Radix UI",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Join Our Community</CardTitle>
          <CardDescription>
            We're open source and welcome contributions!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Blocks Elements is an open-source project. We welcome contributions,
            suggestions, and feedback from the community. Together, we can build
            better tools for developers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <IconBrandGithub className="size-4" />
                View on GitHub
              </a>
            </Button>
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <IconFileCode className="size-4" />
                Browse Blocks
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Ready to Get Started?</CardTitle>
          <CardDescription>
            Start building with Blocks Elements today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Explore our collection of {totalBlocks} blocks across{" "}
            {totalCategories} categories. All components are free, open-source,
            and ready to use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/">Browse All Blocks</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

