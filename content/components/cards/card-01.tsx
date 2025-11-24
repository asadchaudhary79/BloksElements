"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Card01() {
  return (
    <div className="flex items-center justify-center p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Get started with Blocks Elements</CardTitle>
          <CardDescription>
            Build beautiful, responsive interfaces with our collection of
            pre-built components and templates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Start building your next project faster with our comprehensive
            component library. All components are fully customizable and
            production-ready.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline">Learn more</Button>
          <Button>
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

