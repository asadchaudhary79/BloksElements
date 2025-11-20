/**
 * Add entries to {@link registryBlocks} and run
 * `bunx tsx scripts/create-registry-files.ts` to emit registry JSON files.
 */
export interface RegistryBlockConfig {
  id: string;
  title: string;
  description: string;
  componentPath: string;
  /**
   * Optional override for the generated target path inside the consumer project.
   * Defaults to `components/{id}.tsx`.
   */
  target?: string;
  /**
   * Optional override for the registry item author line.
   */
  author?: string;
  /**
   * Defaults to `"registry:block"`.
   */
  type?: string;
  /**
   * Defaults to `["ai"]`.
   */
  categories?: string[];
  /**
   * Defaults to a sensible set of shadcn/ui dependencies (avatar, button, etc.).
   */
  registryDependencies?: string[];
  /**
   * Defaults to `["@tabler/icons-react"]`.
   */
  dependencies?: string[];
  /**
   * Override file definitions when a registry item needs to emit more than one file.
   * If omitted, the script will automatically emit the `componentPath`.
   */
  files?: {
    path: string;
    target?: string;
    type?: string;
  }[];
}

export const registryBlocks: RegistryBlockConfig[] = [
  // Example:
  // {
  //   id: "ai-05",
  //   title: "AI Style Lab Chat Panel",
  //   description: "A chat panel for AI moodboard generation.",
  //   componentPath: "content/components/ai/ai-05.tsx",
  //   categories: ["ai"],
  //   registryDependencies: ["avatar", "badge", "button"],
  //   dependencies: ["@tabler/icons-react"],
  // },
];
