import { spawn } from "node:child_process";
import { once } from "node:events";

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
  const cp = spawn(argv0, argv, this);
  cp.then = once(cp, "exit").then(([exitCode]) => {
    delete cp.then
    if ((this?.reject ?? true) && exitCode) {
      throw cp;
    } else {
      return cp;
    }
  });
  return cp;
}
