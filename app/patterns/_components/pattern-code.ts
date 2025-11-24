import type { Pattern } from "@/types/pattern";

const baseWrapper = (
  content: string
) => `<div className="min-h-screen w-full relative">
  ${content}
     {/* Your Content/Components */}
</div>`;

export function getTailwindCode(pattern: Pattern) {
  return pattern.tailwindCode;
}

export function getCssCode(pattern: Pattern) {
  const className = `pattern-${pattern.id}`;
  const styleEntries = Object.entries(pattern.style || {});
  const cssLines = styleEntries
    .map(([key, value]) => {
      const kebab = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      const processedValue =
        typeof value === "string"
          ? value.replace(/\n/g, "\n  ")
          : String(value);
      return `  ${kebab}: ${processedValue};`;
    })
    .join("\n");

  const css = `.${className} {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.${className}__layer {
  position: absolute;
  inset: 0;
  z-index: 0;
${cssLines}
}`;

  return `<div class="${className}">
  <div class="${className}__layer"></div>
  <!-- Your Content/Components -->
</div>

<style>
${css}
</style>`;
}
