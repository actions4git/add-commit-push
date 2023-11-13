// @ts-check
import { existsSync, readdirSync } from "node:fs";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as Bun from "./bun.mjs";

export function findAllVersions(toolName) {
  const versions = [];
  const toolPath = join(process.env.RUNNER_TOOL_CACHE, toolName);
  if (existsSync(toolPath)) {
    for (const name of readdirSync(toolPath)) {
      if (/^\d+\.\d+\.\d+$/.test(name)) {
        const installPath = join(toolPath, name, process.arch);
        if (existsSync(installPath) && existsSync(`${installPath}.complete`)) {
          versions.push(name);
        }
      }
    }
  }
  return versions;
}

export async function cacheDir(sourceDir, tool, version) {
  const folderPath = join(
    process.env.RUNNER_TOOL_CACHE,
    tool,
    version,
    process.arch,
  );
  await rm(folderPath, { force: true, recursive: true });
  await rm(`${folderPath}.complete`, { force: true });
  await mkdir(folderPath, { recursive: true });
  await cp(sourceDir, folderPath, { recursive: true });
  await writeFile(`${folderPath}.complete`, "");
}

export function find(toolName, versionSpec) {
  let version;
  if (/^\d+\.\d+\.\d+$/.test(versionSpec)) {
    version = versionSpec;
  } else {
    let versions = findAllVersions(toolName);
    versions.sort(Bun.semver.order);
    versions = versions.filter((x) => Bun.semver.satisfies(x, versionSpec));
    version = versions.at(-1);
  }
  if (!version) {
    return "";
  }
  const toolPath = join(
    process.env.RUNNER_TOOL_CACHE,
    toolName,
    version,
    process.arch,
  );
  if (existsSync(toolPath) && existsSync(`${toolPath}.complete`)) {
    return toolPath;
  } else {
    return "";
  }
}
