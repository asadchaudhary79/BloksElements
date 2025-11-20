import { JSX, SVGProps } from "react";

export const AIThumbnail = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg width="296" height="141" viewBox="0 0 296 141" fill="none" {...props}>
    {/* Chat container */}
    <path
      d="M64 23C64 19.6863 66.6863 17 70 17H226C229.314 17 232 19.6863 232 23V118C232 121.314 229.314 124 226 124H70C66.6863 124 64 121.314 64 118V23Z"
      className="fill-card"
    />
    <path
      d="M64 23C64 19.6863 66.6863 17 70 17H226C229.314 17 232 19.6863 232 23V118C232 121.314 229.314 124 226 124H70C66.6863 124 64 121.314 64 118V23Z"
      className="stroke-border"
    />

    {/* Header */}
    <rect
      x="70"
      y="21"
      width="156"
      height="20"
      rx="2"
      className="fill-muted/30"
    />
    <circle cx="80" cy="31" r="4" className="fill-primary" />
    <rect
      x="88"
      y="28"
      width="40"
      height="3"
      rx="1.5"
      className="fill-muted-foreground"
    />
    <rect x="88" y="33" width="25" height="2" rx="1" className="fill-muted" />

    {/* AI message bubble */}
    <path
      d="M80 50C80 47.7909 81.7909 46 84 46H150C152.209 46 154 47.7909 154 50V65C154 67.2091 152.209 69 150 69H84C81.7909 69 80 67.2091 80 65V50Z"
      className="fill-muted"
    />
    <rect
      x="88"
      y="54"
      width="50"
      height="3"
      rx="1.5"
      className="fill-muted-foreground"
    />
    <rect
      x="88"
      y="59"
      width="35"
      height="2"
      rx="1"
      className="fill-muted-foreground/60"
    />

    {/* User message bubble */}
    <path
      d="M142 75C142 72.7909 143.791 71 146 71H212C214.209 71 216 72.7909 216 75V90C216 92.2091 214.209 94 212 94H146C143.791 94 142 92.2091 142 90V75Z"
      className="fill-primary"
    />
    <rect
      x="150"
      y="79"
      width="55"
      height="3"
      rx="1.5"
      className="fill-primary-foreground"
    />
    <rect
      x="150"
      y="84"
      width="40"
      height="2"
      rx="1"
      className="fill-primary-foreground/80"
    />

    {/* Input area */}
    <path
      d="M70 102C70 100.343 71.3431 99 73 99H223C224.657 99 226 100.343 226 102V120C226 121.657 224.657 123 223 123H73C71.3431 123 70 121.657 70 120V102Z"
      className="fill-background"
    />
    <path
      d="M70 102C70 100.343 71.3431 99 73 99H223C224.657 99 226 100.343 226 102V120C226 121.657 224.657 123 223 123H73C71.3431 123 70 121.657 70 120V102Z"
      className="stroke-border"
    />
    <rect
      x="78"
      y="108"
      width="100"
      height="3"
      rx="1.5"
      className="fill-muted"
    />
    <circle cx="190" cy="110" r="3" className="fill-primary" />
  </svg>
);
