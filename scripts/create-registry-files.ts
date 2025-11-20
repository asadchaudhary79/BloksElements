import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  registryBlocks,
  type RegistryBlockConfig,
} from "./registry-blocks.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const DEFAULT_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
const DEFAULT_AUTHOR = "Asad Chaudhary <https://github.com/asadchaudhary79>";
const DEFAULT_TYPE = "registry:block";
const DEFAULT_REGISTRY_DEPS = [
  "avatar",
  "badge",
  "button",
  "dropdown-menu",
  "input",
  "scroll-area",
  "textarea",
];
const DEFAULT_DEPENDENCIES = ["@tabler/icons-react"];
const DEFAULT_CATEGORIES = ["ai"];

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const outDirArg = args.find((arg) => arg.startsWith("--outDir="));
const outputDir = outDirArg
  ? path.resolve(rootDir, outDirArg.split("=")[1]!)
  : path.join(rootDir, "public", "r");

if (!registryBlocks.length) {
  console.log(
    "⚠️  No registry blocks configured. Update scripts/registry-blocks.config.ts and rerun."
  );
  process.exit(0);
}

if (!dryRun && !fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const ensureFileExists = (relativePath: string) => {
  const absolutePath = path.resolve(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${relativePath}`);
  }

  return {
    relativePath,
    absolutePath,
    content: fs.readFileSync(absolutePath, "utf8"),
  };
};

const buildFiles = (block: RegistryBlockConfig) => {
  const files =
    block.files && block.files.length > 0
      ? block.files
      : [
          {
            path: block.componentPath,
            target: block.target,
            type: "registry:component",
          },
        ];

  return files.map((file) => {
    const resolved = ensureFileExists(file.path);

    return {
      path: file.path,
      type: file.type ?? "registry:component",
      target: file.target ?? block.target ?? `components/${block.id}.tsx`,
      content: resolved.content,
    };
  });
};

const writeRegistryFile = (block: RegistryBlockConfig) => {
  if (!block.componentPath && !block.files?.length) {
    throw new Error(
      `Block "${block.id}" must define either componentPath or files.`
    );
  }

  const files = buildFiles(block);

  const registryItem = {
    $schema: DEFAULT_SCHEMA,
    name: block.id,
    type: block.type ?? DEFAULT_TYPE,
    title: block.title,
    description: block.description,
    author: block.author ?? DEFAULT_AUTHOR,
    registryDependencies: block.registryDependencies ?? DEFAULT_REGISTRY_DEPS,
    dependencies: block.dependencies ?? DEFAULT_DEPENDENCIES,
    files,
    categories: block.categories ?? DEFAULT_CATEGORIES,
  };

  const outputPath = path.join(outputDir, `${block.id}.json`);

  if (dryRun) {
    console.log(
      `ℹ️  [dry-run] Would write ${path.relative(rootDir, outputPath)}`
    );
    return;
  }

  fs.writeFileSync(outputPath, JSON.stringify(registryItem, null, 2));
  console.log(`✅ Wrote ${path.relative(rootDir, outputPath)}`);
};

try {
  registryBlocks.forEach((block) => {
    writeRegistryFile(block);
  });
} catch (error) {
  console.error("❌ Failed to create registry files.");
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  process.exit(1);
}
