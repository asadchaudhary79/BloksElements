import "@/app/globals.css";

import Script from "next/script";

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col relative z-10">
      <div className="flex flex-1 flex-col">{children}</div>

      {process.env.NODE_ENV === "production" && (
        <Script
          async
          data-website-id="1671be23-4bb0-43b1-9632-962a463265e8"
          src="https://analytics.duncan.land/script.js"
        />
      )}
    </div>
  );
}
