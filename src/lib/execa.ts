import { spawn } from "node:child_process";
import { once } from "node:events";

if (!ReadableStream.from) {
  ReadableStream.from = function (anyIterable) {
    if (
      !anyIterable ||
      (typeof anyIterable !== "object" && typeof anyIterable !== "function")
    ) {
      throw new TypeError(
        "ReadableStream.from() requires an iterable or async iterable object"
      );
    }

    const iterator =
      anyIterable[Symbol.iterator] || anyIterable[Symbol.asyncIterator];

    if (!iterator) {
      throw new TypeError(
        "Passed parameter does not define @@iterator or @@asyncIterator method"
      );
    }

    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of anyIterable) {
            controller.enqueue(chunk);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });
  };
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
  const stdoutP =
    cp.stdout && new Response(ReadableStream.from(cp.stdout)).text();
  const stderrP =
    cp.stderr && new Response(ReadableStream.from(cp.stderr)).text();
  const p = once(cp, "exit").then(async ([exitCode, signal]) => {
    const res = {
      stdout: await stdoutP,
      stderr: await stderrP,
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
