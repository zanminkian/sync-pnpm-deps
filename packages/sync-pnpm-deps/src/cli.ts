import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import YAML from "yaml";
import type { LockFileV54 } from "./interfaces.js";
import { checkImporter } from "./utils.js";

export interface CheckOptions {
  /**
   * Check production dependencies only. If false, `devDependencies` and `dependencies` will be checked.
   * @default false
   */
  prod?: boolean;

  /**
   * Dir path to load `pnpm-lock.yaml`.
   * @default process.cwd()
   */
  dir?: string;
}

/**
 * Check whole lock file. Mainly check each importer in lock file.
 * @param options
 */
export async function check(options: CheckOptions = {}) {
  const dir = options.dir ?? process.cwd();
  const prod = options.prod ?? false;

  const lockFile = YAML.parse(
    await fs.readFile(path.resolve(process.cwd(), dir, "pnpm-lock.yaml"), "utf-8"),
  ) as LockFileV54;
  const importers = lockFile.importers ?? {};
  Object.keys(importers).forEach((key) => checkImporter(importers, new Map(), [key], { prod }));
}
