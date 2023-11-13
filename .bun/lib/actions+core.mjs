// @ts-check
function escapeData(s) {
  return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escapeProperty(s) {
  return s
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .replace(/:/g, "%3A")
    .replace(/,/g, "%2C");
}

export function debug(message) {
  console.log("::debug::%s", escapeData(message));
}
export function warning(message) {
  console.log("::warning::%s", escapeData(message));
}
