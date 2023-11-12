import { spawn } from "node:child_process";
import { once } from "node:events";

if (!ReadableStream.from) {
  ReadableStream.from = function (anyIterable) {
    if (!anyIterable) {
      throw new TypeError(
        "ReadableStream.from() expects an iterable or async iterable object."
      );
    }

    const iterator =
      typeof anyIterable[Symbol.asyncIterator] === "function"
        ? anyIterable[Symbol.asyncIterator]()
        : typeof anyIterable[Symbol.iterator] === "function"
        ? anyIterable[Symbol.iterator]()
        : null;

    if (!iterator) {
      throw new TypeError(
        "ReadableStream.from() expects an iterable or async iterable object."
      );
    }

    return new ReadableStream({
      async pull(controller) {
        try {
          const { value, done } = await iterator.next();

          if (done) {
            controller.close();
          } else {
            controller.enqueue(value);
          }
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
  const p = once(cp, "spawn").then(async () => {
    const stdoutP =
      "fd" in cp.stdout
        ? null
        : new Response(ReadableStream.from(cp.stdout)).text();
    const stderrP =
      "fd" in cp.stderr
        ? null
        : new Response(ReadableStream.from(cp.stderr)).text();
    const [exitCode, signal] = await once(cp, "exit");
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
