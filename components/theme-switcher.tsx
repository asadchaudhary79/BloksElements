/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type ComponentProps, useDeferredValue } from "react";

const THEMES = [
  {
    type: "system",
    icon: Monitor,
    label: "system theme",
  },
  {
    type: "light",
    icon: Sun,
    label: "light theme",
  },
  {
    type: "dark",
    icon: Moon,
    label: "dark theme",
  },
] as const;

type Theme = (typeof THEMES)[number]["type"];

interface ThemeSwitcherProps
  extends Omit<ComponentProps<"div">, "onChange" | "value" | "defaultValue"> {
  value?: Theme;
  onChange?: (theme: Theme) => void;
  defaultValue?: Theme;
}

function ThemeSwitcher({
  value,
  onChange,
  defaultValue,
  className,
  ...props
}: ThemeSwitcherProps) {
  // Theme switcher is disabled - always dark mode
  return null;
}

export { ThemeSwitcher };
