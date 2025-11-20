"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { useEffect, useState } from "react";

export default function PreviewThemeSwitcher() {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsInIframe(window.self !== window.top);
    }
  }, []);

  if (isInIframe) {
    return null;
  }

  return <ThemeSwitcher />;
}
