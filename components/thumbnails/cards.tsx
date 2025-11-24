import { JSX, SVGProps } from "react";

export const CardsThumbnail = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg width="296" height="141" viewBox="0 0 296 141" fill="none" {...props}>
    <rect
      x="20"
      y="20"
      width="120"
      height="100"
      rx="8"
      className="fill-card stroke-border"
    />
    <rect
      x="30"
      y="30"
      width="100"
      height="8"
      rx="4"
      className="fill-muted-foreground"
    />
    <rect x="30" y="45" width="80" height="6" rx="3" className="fill-muted" />
    <rect x="30" y="55" width="60" height="6" rx="3" className="fill-muted" />
    <rect x="30" y="75" width="70" height="4" rx="2" className="fill-primary" />
    <rect
      x="156"
      y="20"
      width="120"
      height="100"
      rx="8"
      className="fill-card stroke-border"
    />
    <rect
      x="166"
      y="30"
      width="100"
      height="8"
      rx="4"
      className="fill-muted-foreground"
    />
    <rect x="166" y="45" width="80" height="6" rx="3" className="fill-muted" />
    <rect x="166" y="55" width="60" height="6" rx="3" className="fill-muted" />
    <rect
      x="166"
      y="75"
      width="70"
      height="4"
      rx="2"
      className="fill-primary"
    />
    <circle cx="50" cy="95" r="8" className="fill-muted" />
    <rect x="65" y="92" width="50" height="6" rx="3" className="fill-muted" />
    <circle cx="186" cy="95" r="8" className="fill-muted" />
    <rect x="201" y="92" width="50" height="6" rx="3" className="fill-muted" />
  </svg>
);
