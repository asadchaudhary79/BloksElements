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
  {
    id: "ai-07",
    title: "AI Chatbot Interface",
    description:
      "A clean and professional AI chatbot interface with message bubbles, typing indicators, and auto-scroll functionality.",
    componentPath: "content/components/ai/ai-07.tsx",
    categories: ["ai"],
    registryDependencies: ["avatar", "button", "scroll-area", "textarea"],
    dependencies: ["@tabler/icons-react"],
  },
  {
    id: "ai-08",
    title: "Floating Chatbot Widget",
    description:
      "A floating chatbot widget with a button in the bottom-right corner that opens a chat panel on click. Includes minimize and close functionality.",
    componentPath: "content/components/ai/ai-08.tsx",
    categories: ["ai"],
    registryDependencies: ["avatar", "button", "scroll-area", "textarea"],
    dependencies: ["@tabler/icons-react"],
  },
];
