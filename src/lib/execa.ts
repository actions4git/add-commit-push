import { spawn } from "node:child_process";
import { once } from "node:events";

function streamToText(stream) {
  return new Promise((resolve, reject) => {
    let data = "";
    stream.on("data", (chunk) => {
      console.log("got data", chunk);
      data += chunk.toString();
    });
    stream.on("end", () => {
      console.log("done");
      resolve(data);
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
}

export function $(strings, ...values) {
  if (!Array.isArray(strings)) {
    return $.bind(Object.assign(this ?? {}, strings));
  }
  const keyFor = (index) => `__values[${index}]`;
  const keyRe = /__values\[(\d+)\]/g;
  const cmdWithKeys = strings
    .flatMap((s, i) => (i ? [keyFor(i - 1), s] : s))
    .join("");
  let argv = cmdWithKeys.split(/\s+/);
  argv = argv.map((arg) => arg.replace(keyRe, (m, i) => values[i]));
  const argv0 = argv.shift();
  const cp = spawn(argv0, argv, this ?? {});
  const stdoutP = cp.stdout && streamToText(cp.stdout);
  const stderrP = cp.stderr && streamToText(cp.stderr);
  const p = once(cp, "exit").then(async ([exitCode, signal]) => {
    const res = {
      stdout: (await stdoutP)?.trimEnd(),
      stderr: (await stderrP)?.trimEnd(),
      exitCode,
      signal,
    };
    if ((this?.reject ?? true) && exitCode) {
      throw res;
    } else {
      return res;
    }
  });
  cp.then = p.then.bind(p);
  return cp;
}
