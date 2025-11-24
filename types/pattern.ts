import type { CSSProperties } from "react";

export interface Pattern {
  id: string;
  name: string;
  category: string;
  style: CSSProperties;
  tailwindCode: string;
  badge?: string;
  description?: string;
}
