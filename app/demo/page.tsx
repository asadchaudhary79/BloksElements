"use client";

import {
  CodeBlockEditor,
  type FileTreeItem,
} from "@/components/code-block-editor";
import { blocksMetadata } from "@/content/blocks-metadata";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCode,
  IconCopy,
  IconFileCode,
  IconFolder,
  IconRocket,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy";
import Link from "next/link";

const sampleFileTree: FileTreeItem[] = [
  {
    name: "app",
    path: "app",
    type: "folder",
    children: [
      {
        name: "login",
        path: "app/login",
        type: "folder",
        children: [
          {
            name: "page.tsx",
            path: "app/login/page.tsx",
            type: "file",
            content: `import { LoginForm } from "@/components/login-form"\n\nexport default function Page() {\n  return (\n    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">\n      <div className="w-full max-w-sm">\n        <LoginForm />\n      </div>\n    </div>\n  )\n}`,
          },
        ],
      },
    ],
  },
  {
    name: "components",
    path: "components",
    type: "folder",
    children: [
      {
        name: "login-form.tsx",
        path: "components/login-form.tsx",
        type: "file",
        content: `import { Button } from "@/components/ui/button"\nimport { Input } from "@/components/ui/input"\nimport { Label } from "@/components/ui/label"\n\nexport function LoginForm() {\n  return (\n    <div className="space-y-6">\n      <div className="space-y-2 text-center">\n        <h1 className="text-3xl font-bold">Login</h1>\n        <p className="text-gray-500 dark:text-gray-400">\n          Enter your credentials to sign in to your account\n        </p>\n      </div>\n      <div className="space-y-4">\n        <div className="space-y-2">\n          <Label htmlFor="email">Email</Label>\n          <Input id="email" placeholder="m@example.com" required type="email" />\n        </div>\n        <div className="space-y-2">\n          <Label htmlFor="password">Password</Label>\n          <Input id="password" required type="password" />\n        </div>\n        <Button className="w-full" type="submit">\n          Sign In\n        </Button>\n      </div>\n    </div>\n  )\n}`,
      },
    ],
  },
];

const installCommand = `npx shadcn@latest add @blockselements/login-01`;

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { isCopied: isRegistryCopied, copyToClipboard: copyRegistry } =
    useCopyToClipboard();
  const { isCopied: isCommandCopied, copyToClipboard: copyCommand } =
    useCopyToClipboard();

  const totalBlocks = blocksMetadata.length;
  const totalCategories = blocksCategoriesMetadata.length;
  const filteredBlocks = useMemo(() => {
    if (!searchValue.trim()) {
      return blocksMetadata;
    }
    const term = searchValue.toLowerCase();
    return blocksMetadata.filter(
      (block) =>
        block.name.toLowerCase().includes(term) ||
        block.id.toLowerCase().includes(term) ||
        block.category.toLowerCase().includes(term)
    );
  }, [searchValue]);

  const totalPages = Math.max(1, Math.ceil(filteredBlocks.length / pageSize));
  const paginatedBlocks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredBlocks.slice(start, start + pageSize);
  }, [filteredBlocks, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const menuItems = [
    { id: "overview", label: "Overview", icon: IconRocket },
    { id: "code-editor", label: "Code Editor", icon: IconCode },
    { id: "blocks", label: "All Blocks", icon: IconFileCode },
    { id: "categories", label: "Categories", icon: IconFolder },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Demo Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={activeTab === item.id}
                          onClick={() => setActiveTab(item.id)}
                        >
                          <Icon className="size-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/">
                        <IconSparkles className="size-4" />
                        <span>Browse Blocks</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 w-full overflow-auto">
          <div className="container mx-auto p-8 max-w-7xl">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">
                    blockselements.co Demo
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Explore the building blocks for the web. Copy and paste
                    beautiful, accessible components into your apps.
                  </p>
                </div>

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
                      <div className="text-3xl font-bold">
                        {totalCategories}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Organized by type
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconRocket className="size-5" />
                        Installation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded block">
                          npx shadcn@latest add @blockselements/block-name
                        </code>
                        <p className="text-sm text-muted-foreground">
                          One command to add any block
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription>
                      Get started with blocks in seconds
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        1. Configure Registry
                      </h3>
                      <div className="bg-muted p-4 rounded-lg relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            copyRegistry(`{
  "registries": {
    "@blockselements": "https://blockselements.co/r/{name}.json"
  }
}`)
                          }
                        >
                          {isRegistryCopied ? (
                            <IconCheck className="size-4" />
                          ) : (
                            <IconCopy className="size-4" />
                          )}
                        </Button>
                        <pre className="text-sm overflow-x-auto">
                          <code>{`{
  "registries": {
    "@blockselements": "https://blockselements.co/r/{name}.json"
  }
}`}</code>
                        </pre>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Add this to your <code>components.json</code> file
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">2. Install a Block</h3>
                      <div className="bg-muted p-4 rounded-lg relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyCommand(installCommand)}
                        >
                          {isCommandCopied ? (
                            <IconCheck className="size-4" />
                          ) : (
                            <IconCopy className="size-4" />
                          )}
                        </Button>
                        <pre className="text-sm overflow-x-auto">
                          <code>{installCommand}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">3. Use in Your App</h3>
                      <p className="text-sm text-muted-foreground">
                        Import and use the component in your React application.
                        All blocks are fully typed and customizable.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                    <CardDescription>
                      What makes blockselements.co special
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <IconSparkles className="size-4" />
                          Beautiful & Accessible
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          All blocks are built with accessibility in mind,
                          following WCAG guidelines and using Radix UI
                          primitives.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <IconCode className="size-4" />
                          Type-Safe
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Full TypeScript support with proper types and
                          IntelliSense autocomplete.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <IconCopy className="size-4" />
                          Copy & Paste
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          No dependencies on external packages. Copy the code
                          and own it completely.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <IconRocket className="size-4" />
                          Framework Agnostic
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Works with any React framework - Next.js, Remix, Vite,
                          and more.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "code-editor" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">
                    Code Block Editor
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Interactive code editor with file tree navigation. Perfect
                    for exploring multi-file components.
                  </p>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <CodeBlockEditor fileTree={sampleFileTree} />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "blocks" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">
                      All Blocks
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Browse all {totalBlocks} available blocks organized by
                      category, or search by name, id, or category.
                    </p>
                  </div>
                  <div className="relative max-w-xl">
                    <IconSearch className="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search blocks..."
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {searchValue && (
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredBlocks.length} of {totalBlocks} blocks
                      for "
                      <span className="font-medium text-foreground">
                        {searchValue}
                      </span>
                      "
                    </p>
                  )}
                </div>
                {filteredBlocks.length ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedBlocks.map((block) => (
                      <Card
                        key={block.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">
                              {block.name}
                            </CardTitle>
                            <Badge variant="secondary">{block.type}</Badge>
                          </div>
                          <CardDescription>{block.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button asChild variant="outline" className="w-full">
                            <Link href={`/${block.category}#${block.id}`}>
                              View Block
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                    <p className="text-lg font-semibold">
                      No blocks found for "{searchValue}".
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try searching for a different keyword or clearing the
                      filter.
                    </p>
                  </div>
                )}

                {filteredBlocks.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm">
                    <div className="text-muted-foreground">
                      Showing{" "}
                      <span className="font-semibold text-foreground">
                        {(page - 1) * pageSize + 1}-
                        {Math.min(page * pageSize, filteredBlocks.length)}
                      </span>{" "}
                      of {filteredBlocks.length} blocks
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                      >
                        <IconChevronLeft className="mr-1 size-4" />
                        Prev
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setPage((prev) => Math.min(totalPages, prev + 1))
                        }
                        disabled={page === totalPages}
                      >
                        Next
                        <IconChevronRight className="ml-1 size-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "categories" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">
                    Categories
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Explore blocks organized by category.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blocksCategoriesMetadata.map((category) => {
                    const categoryBlocks = blocksMetadata.filter(
                      (b) => b.category === category.id
                    );
                    return (
                      <Card
                        key={category.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <category.thumbnail className="size-8" />
                            {category.name}
                          </CardTitle>
                          <CardDescription>
                            {categoryBlocks.length} blocks available
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button asChild variant="outline" className="w-full">
                            <Link href={`/${category.id}`}>
                              Browse {category.name}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
