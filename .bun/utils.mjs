// @ts-check
import * as core from "./lib/actions+core.mjs";
import * as tc from "./lib/actions+tool-cache.mjs";
import * as Bun from "./lib/bun.mjs";
import { $ } from "./lib/execa.mjs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

export async function main(fileRelativePath, localBunVersion, stage) {
  const rootPath = fileURLToPath(import.meta.resolve("../"));
  const targetName = `${process.env.RUNNER_OS}-${process.env.RUNNER_ARCH}`;
  const exeExt = process.platform === "win32" ? ".exe" : "";

  const localBunInstallPath = fileURLToPath(
    import.meta.resolve(`./${targetName}/`),
  );
  await tc.cacheDir(localBunInstallPath, "bun", localBunVersion);
  const found = tc.find("bun", `^${localBunVersion}`);

  const bun = join(found, "bin", "bun" + exeExt);
  const filePath = join(rootPath, fileRelativePath);
  const { exitCode, signal } = await $({ stdio: "inherit", reject: false })`${bun} ${filePath}`;
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(exitCode)
  }
}
