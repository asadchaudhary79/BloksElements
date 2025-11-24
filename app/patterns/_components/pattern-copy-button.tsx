import type { ComponentProps, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import type { Pattern } from "@/types/pattern";
import { getCssCode, getTailwindCode } from "./pattern-code";

interface PatternCopyButtonProps extends ComponentProps<typeof Button> {
  pattern: Pattern;
}

export function PatternCopyButton({
  pattern,
  className,
  onClick,
  ...props
}: PatternCopyButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = (variant: "tailwind" | "css") => {
    const code =
      variant === "tailwind" ? getTailwindCode(pattern) : getCssCode(pattern);
    copyToClipboard(code);
  };

  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          {...props}
          onClick={handleTriggerClick}
          onKeyDownCapture={(event) => {
            event.stopPropagation();
          }}
          className={cn("rounded-full border-dotted", className)}
        >
          {isCopied ? (
            <>
              <IconCheck className="mr-2 size-4" />
              Copied
            </>
          ) : (
            <>
              <IconCopy className="mr-2 size-4" />
              Copy Code
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            handleCopy("tailwind");
          }}
        >
          Tailwind CSS
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            handleCopy("css");
          }}
        >
          Plain CSS
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
