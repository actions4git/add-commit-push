// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = (id) => {
  return import.meta.require(id);
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS((exports) => {
  var toCommandValue = function(input) {
    if (input === null || input === undefined) {
      return "";
    } else if (typeof input === "string" || input instanceof String) {
      return input;
    }
    return JSON.stringify(input);
  };
  var toCommandProperties = function(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
      return {};
    }
    return {
      title: annotationProperties.title,
      file: annotationProperties.file,
      line: annotationProperties.startLine,
      endLine: annotationProperties.endLine,
      col: annotationProperties.startColumn,
      endColumn: annotationProperties.endColumn
    };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.toCommandProperties = exports.toCommandValue = undefined;
  exports.toCommandValue = toCommandValue;
  exports.toCommandProperties = toCommandProperties;
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS((exports) => {
  var issueCommand = function(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
  };
  var issue = function(name, message = "") {
    issueCommand(name, {}, message);
  };
  var escapeData = function(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  };
  var escapeProperty = function(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
  };
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.issue = exports.issueCommand = undefined;
  var os = __importStar(import.meta.require("os"));
  var utils_1 = require_utils();
  exports.issueCommand = issueCommand;
  exports.issue = issue;
  var CMD_STRING = "::";

  class Command {
    constructor(command, properties, message) {
      if (!command) {
        command = "missing.command";
      }
      this.command = command;
      this.properties = properties;
      this.message = message;
    }
    toString() {
      let cmdStr = CMD_STRING + this.command;
      if (this.properties && Object.keys(this.properties).length > 0) {
        cmdStr += " ";
        let first = true;
        for (const key in this.properties) {
          if (this.properties.hasOwnProperty(key)) {
            const val = this.properties[key];
            if (val) {
              if (first) {
                first = false;
              } else {
                cmdStr += ",";
              }
              cmdStr += `${key}=${escapeProperty(val)}`;
            }
          }
        }
      }
      cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
      return cmdStr;
    }
  }
});

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var rng = function() {
    if (poolPtr > rnds8Pool.length - 16) {
      _crypto.default.randomFillSync(rnds8Pool);
      poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = rng;
  var _crypto = _interopRequireDefault(import.meta.require("crypto"));
  var rnds8Pool = new Uint8Array(256);
  var poolPtr = rnds8Pool.length;
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  exports.default = _default;
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var validate = function(uuid) {
    return typeof uuid === "string" && _regex.default.test(uuid);
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _regex = _interopRequireDefault(require_regex());
  var _default = validate;
  exports.default = _default;
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var stringify = function(arr, offset = 0) {
    const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!(0, _validate.default)(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _validate = _interopRequireDefault(require_validate());
  var byteToHex = [];
  for (let i = 0;i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).substr(1));
  }
  var _default = stringify;
  exports.default = _default;
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var v1 = function(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf || new Array(16);
    options = options || {};
    let node = options.node || _nodeId;
    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
    if (node == null || clockseq == null) {
      const seedBytes = options.random || (options.rng || _rng.default)();
      if (node == null) {
        node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
      }
      if (clockseq == null) {
        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
      }
    }
    let msecs = options.msecs !== undefined ? options.msecs : Date.now();
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
    if (dt < 0 && options.clockseq === undefined) {
      clockseq = clockseq + 1 & 16383;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
      nsecs = 0;
    }
    if (nsecs >= 1e4) {
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 12219292800000;
    const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
    b[i++] = tl >>> 24 & 255;
    b[i++] = tl >>> 16 & 255;
    b[i++] = tl >>> 8 & 255;
    b[i++] = tl & 255;
    const tmh = msecs / 4294967296 * 1e4 & 268435455;
    b[i++] = tmh >>> 8 & 255;
    b[i++] = tmh & 255;
    b[i++] = tmh >>> 24 & 15 | 16;
    b[i++] = tmh >>> 16 & 255;
    b[i++] = clockseq >>> 8 | 128;
    b[i++] = clockseq & 255;
    for (let n = 0;n < 6; ++n) {
      b[i + n] = node[n];
    }
    return buf || (0, _stringify.default)(b);
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _rng = _interopRequireDefault(require_rng());
  var _stringify = _interopRequireDefault(require_stringify());
  var _nodeId;
  var _clockseq;
  var _lastMSecs = 0;
  var _lastNSecs = 0;
  var _default = v1;
  exports.default = _default;
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var parse = function(uuid) {
    if (!(0, _validate.default)(uuid)) {
      throw TypeError("Invalid UUID");
    }
    let v;
    const arr = new Uint8Array(16);
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 255;
    arr[2] = v >>> 8 & 255;
    arr[3] = v & 255;
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 255;
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 255;
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 255;
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
    arr[11] = v / 4294967296 & 255;
    arr[12] = v >>> 24 & 255;
    arr[13] = v >>> 16 & 255;
    arr[14] = v >>> 8 & 255;
    arr[15] = v & 255;
    return arr;
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _validate = _interopRequireDefault(require_validate());
  var _default = parse;
  exports.default = _default;
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var stringToBytes = function(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = [];
    for (let i = 0;i < str.length; ++i) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  };
  var _default = function(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
      if (typeof value === "string") {
        value = stringToBytes(value);
      }
      if (typeof namespace === "string") {
        namespace = (0, _parse.default)(namespace);
      }
      if (namespace.length !== 16) {
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      }
      let bytes = new Uint8Array(16 + value.length);
      bytes.set(namespace);
      bytes.set(value, namespace.length);
      bytes = hashfunc(bytes);
      bytes[6] = bytes[6] & 15 | version;
      bytes[8] = bytes[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0;i < 16; ++i) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return (0, _stringify.default)(bytes);
    }
    try {
      generateUUID.name = name;
    } catch (err) {
    }
    generateUUID.DNS = DNS;
    generateUUID.URL = URL2;
    return generateUUID;
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _default;
  exports.URL = exports.DNS = undefined;
  var _stringify = _interopRequireDefault(require_stringify());
  var _parse = _interopRequireDefault(require_parse());
  var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  exports.DNS = DNS;
  var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  exports.URL = URL2;
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var md5 = function(bytes) {
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === "string") {
      bytes = Buffer.from(bytes, "utf8");
    }
    return _crypto.default.createHash("md5").update(bytes).digest();
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _crypto = _interopRequireDefault(import.meta.require("crypto"));
  var _default = md5;
  exports.default = _default;
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _v = _interopRequireDefault(require_v35());
  var _md = _interopRequireDefault(require_md5());
  var v3 = (0, _v.default)("v3", 48, _md.default);
  var _default = v3;
  exports.default = _default;
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var v4 = function(options, buf, offset) {
    options = options || {};
    const rnds = options.random || (options.rng || _rng.default)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0;i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return (0, _stringify.default)(rnds);
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _rng = _interopRequireDefault(require_rng());
  var _stringify = _interopRequireDefault(require_stringify());
  var _default = v4;
  exports.default = _default;
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var sha1 = function(bytes) {
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === "string") {
      bytes = Buffer.from(bytes, "utf8");
    }
    return _crypto.default.createHash("sha1").update(bytes).digest();
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _crypto = _interopRequireDefault(import.meta.require("crypto"));
  var _default = sha1;
  exports.default = _default;
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _v = _interopRequireDefault(require_v35());
  var _sha = _interopRequireDefault(require_sha1());
  var v5 = (0, _v.default)("v5", 80, _sha.default);
  var _default = v5;
  exports.default = _default;
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _default = "00000000-0000-0000-0000-000000000000";
  exports.default = _default;
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  var version = function(uuid) {
    if (!(0, _validate.default)(uuid)) {
      throw TypeError("Invalid UUID");
    }
    return parseInt(uuid.substr(14, 1), 16);
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _validate = _interopRequireDefault(require_validate());
  var _default = version;
  exports.default = _default;
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS((exports) => {
  var _interopRequireDefault = function(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function() {
      return _v.default;
    }
  });
  Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function() {
      return _v2.default;
    }
  });
  Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function() {
      return _v3.default;
    }
  });
  Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function() {
      return _v4.default;
    }
  });
  Object.defineProperty(exports, "NIL", {
    enumerable: true,
    get: function() {
      return _nil.default;
    }
  });
  Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function() {
      return _version.default;
    }
  });
  Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function() {
      return _validate.default;
    }
  });
  Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
      return _stringify.default;
    }
  });
  Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function() {
      return _parse.default;
    }
  });
  var _v = _interopRequireDefault(require_v1());
  var _v2 = _interopRequireDefault(require_v3());
  var _v3 = _interopRequireDefault(require_v4());
  var _v4 = _interopRequireDefault(require_v5());
  var _nil = _interopRequireDefault(require_nil());
  var _version = _interopRequireDefault(require_version());
  var _validate = _interopRequireDefault(require_validate());
  var _stringify = _interopRequireDefault(require_stringify());
  var _parse = _interopRequireDefault(require_parse());
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS((exports) => {
  var issueFileCommand = function(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
      throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
      encoding: "utf8"
    });
  };
  var prepareKeyValueMessage = function(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    if (key.includes(delimiter)) {
      throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
      throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
  };
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.prepareKeyValueMessage = exports.issueFileCommand = undefined;
  var fs = __importStar(import.meta.require("fs"));
  var os = __importStar(import.meta.require("os"));
  var uuid_1 = require_dist();
  var utils_1 = require_utils();
  exports.issueFileCommand = issueFileCommand;
  exports.prepareKeyValueMessage = prepareKeyValueMessage;
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS((exports) => {
  var getProxyUrl = function(reqUrl) {
    const usingSsl = reqUrl.protocol === "https:";
    if (checkBypass(reqUrl)) {
      return;
    }
    const proxyVar = (() => {
      if (usingSsl) {
        return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
      } else {
        return process.env["http_proxy"] || process.env["HTTP_PROXY"];
      }
    })();
    if (proxyVar) {
      try {
        return new URL(proxyVar);
      } catch (_a) {
        if (!proxyVar.startsWith("http://") && !proxyVar.startsWith("https://"))
          return new URL(`http://${proxyVar}`);
      }
    } else {
      return;
    }
  };
  var checkBypass = function(reqUrl) {
    if (!reqUrl.hostname) {
      return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
      return true;
    }
    const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
    if (!noProxy) {
      return false;
    }
    let reqPort;
    if (reqUrl.port) {
      reqPort = Number(reqUrl.port);
    } else if (reqUrl.protocol === "http:") {
      reqPort = 80;
    } else if (reqUrl.protocol === "https:") {
      reqPort = 443;
    }
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === "number") {
      upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
      if (upperNoProxyItem === "*" || upperReqHosts.some((x) => x === upperNoProxyItem || x.endsWith(`.${upperNoProxyItem}`) || upperNoProxyItem.startsWith(".") && x.endsWith(`${upperNoProxyItem}`))) {
        return true;
      }
    }
    return false;
  };
  var isLoopbackAddress = function(host) {
    const hostLower = host.toLowerCase();
    return hostLower === "localhost" || hostLower.startsWith("127.") || hostLower.startsWith("[::1]") || hostLower.startsWith("[0:0:0:0:0:0:0:1]");
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.checkBypass = exports.getProxyUrl = undefined;
  exports.getProxyUrl = getProxyUrl;
  exports.checkBypass = checkBypass;
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS((exports) => {
  var httpOverHttp = function(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    return agent;
  };
  var httpsOverHttp = function(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  };
  var httpOverHttps = function(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    return agent;
  };
  var httpsOverHttps = function(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  };
  var TunnelingAgent = function(options) {
    var self = this;
    self.options = options || {};
    self.proxyOptions = self.options.proxy || {};
    self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
    self.requests = [];
    self.sockets = [];
    self.on("free", function onFree(socket, host, port, localAddress) {
      var options2 = toOptions(host, port, localAddress);
      for (var i = 0, len = self.requests.length;i < len; ++i) {
        var pending = self.requests[i];
        if (pending.host === options2.host && pending.port === options2.port) {
          self.requests.splice(i, 1);
          pending.request.onSocket(socket);
          return;
        }
      }
      socket.destroy();
      self.removeSocket(socket);
    });
  };
  var createSecureSocket = function(options, cb) {
    var self = this;
    TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
      var hostHeader = options.request.getHeader("host");
      var tlsOptions = mergeOptions({}, self.options, {
        socket,
        servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
      });
      var secureSocket = tls.connect(0, tlsOptions);
      self.sockets[self.sockets.indexOf(socket)] = secureSocket;
      cb(secureSocket);
    });
  };
  var toOptions = function(host, port, localAddress) {
    if (typeof host === "string") {
      return {
        host,
        port,
        localAddress
      };
    }
    return host;
  };
  var mergeOptions = function(target) {
    for (var i = 1, len = arguments.length;i < len; ++i) {
      var overrides = arguments[i];
      if (typeof overrides === "object") {
        var keys = Object.keys(overrides);
        for (var j = 0, keyLen = keys.length;j < keyLen; ++j) {
          var k = keys[j];
          if (overrides[k] !== undefined) {
            target[k] = overrides[k];
          }
        }
      }
    }
    return target;
  };
  var net = import.meta.require("net");
  var tls = import.meta.require("tls");
  var http = import.meta.require("http");
  var https = import.meta.require("https");
  var events = import.meta.require("events");
  var assert = import.meta.require("assert");
  var util = import.meta.require("util");
  exports.httpOverHttp = httpOverHttp;
  exports.httpsOverHttp = httpsOverHttp;
  exports.httpOverHttps = httpOverHttps;
  exports.httpsOverHttps = httpsOverHttps;
  util.inherits(TunnelingAgent, events.EventEmitter);
  TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self = this;
    var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
    if (self.sockets.length >= this.maxSockets) {
      self.requests.push(options);
      return;
    }
    self.createSocket(options, function(socket) {
      socket.on("free", onFree);
      socket.on("close", onCloseOrRemove);
      socket.on("agentRemove", onCloseOrRemove);
      req.onSocket(socket);
      function onFree() {
        self.emit("free", socket, options);
      }
      function onCloseOrRemove(err) {
        self.removeSocket(socket);
        socket.removeListener("free", onFree);
        socket.removeListener("close", onCloseOrRemove);
        socket.removeListener("agentRemove", onCloseOrRemove);
      }
    });
  };
  TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self = this;
    var placeholder = {};
    self.sockets.push(placeholder);
    var connectOptions = mergeOptions({}, self.proxyOptions, {
      method: "CONNECT",
      path: options.host + ":" + options.port,
      agent: false,
      headers: {
        host: options.host + ":" + options.port
      }
    });
    if (options.localAddress) {
      connectOptions.localAddress = options.localAddress;
    }
    if (connectOptions.proxyAuth) {
      connectOptions.headers = connectOptions.headers || {};
      connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
    }
    debug("making CONNECT request");
    var connectReq = self.request(connectOptions);
    connectReq.useChunkedEncodingByDefault = false;
    connectReq.once("response", onResponse);
    connectReq.once("upgrade", onUpgrade);
    connectReq.once("connect", onConnect);
    connectReq.once("error", onError);
    connectReq.end();
    function onResponse(res) {
      res.upgrade = true;
    }
    function onUpgrade(res, socket, head) {
      process.nextTick(function() {
        onConnect(res, socket, head);
      });
    }
    function onConnect(res, socket, head) {
      connectReq.removeAllListeners();
      socket.removeAllListeners();
      if (res.statusCode !== 200) {
        debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
        socket.destroy();
        var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
        return;
      }
      if (head.length > 0) {
        debug("got illegal response body from proxy");
        socket.destroy();
        var error = new Error("got illegal response body from proxy");
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
        return;
      }
      debug("tunneling connection has established");
      self.sockets[self.sockets.indexOf(placeholder)] = socket;
      return cb(socket);
    }
    function onError(cause) {
      connectReq.removeAllListeners();
      debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
      var error = new Error("tunneling socket could not be established, cause=" + cause.message);
      error.code = "ECONNRESET";
      options.request.emit("error", error);
      self.removeSocket(placeholder);
    }
  };
  TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
    var pos = this.sockets.indexOf(socket);
    if (pos === -1) {
      return;
    }
    this.sockets.splice(pos, 1);
    var pending = this.requests.shift();
    if (pending) {
      this.createSocket(pending, function(socket2) {
        pending.request.onSocket(socket2);
      });
    }
  };
  var debug;
  if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
    debug = function() {
      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === "string") {
        args[0] = "TUNNEL: " + args[0];
      } else {
        args.unshift("TUNNEL:");
      }
      console.error.apply(console, args);
    };
  } else {
    debug = function() {
    };
  }
  exports.debug = debug;
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS((exports) => {
  var getProxyUrl = function(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : "";
  };
  var isHttps = function(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === "https:";
  };
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = undefined;
  var http = __importStar(import.meta.require("http"));
  var https = __importStar(import.meta.require("https"));
  var pm = __importStar(require_proxy());
  var tunnel = __importStar(require_tunnel());
  var undici_1 = import.meta.require("undici");
  var HttpCodes;
  (function(HttpCodes2) {
    HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
    HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
    HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
    HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
    HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
    HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
    HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
    HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
    HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
    HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
    HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
  })(HttpCodes || (exports.HttpCodes = HttpCodes = {}));
  var Headers;
  (function(Headers2) {
    Headers2["Accept"] = "accept";
    Headers2["ContentType"] = "content-type";
  })(Headers || (exports.Headers = Headers = {}));
  var MediaTypes;
  (function(MediaTypes2) {
    MediaTypes2["ApplicationJson"] = "application/json";
  })(MediaTypes || (exports.MediaTypes = MediaTypes = {}));
  exports.getProxyUrl = getProxyUrl;
  var HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
  ];
  var HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
  ];
  var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
  var ExponentialBackoffCeiling = 10;
  var ExponentialBackoffTimeSlice = 5;

  class HttpClientError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = "HttpClientError";
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, HttpClientError.prototype);
    }
  }
  exports.HttpClientError = HttpClientError;

  class HttpClientResponse {
    constructor(message) {
      this.message = message;
    }
    readBody() {
      return __awaiter(this, undefined, undefined, function* () {
        return new Promise((resolve) => __awaiter(this, undefined, undefined, function* () {
          let output = Buffer.alloc(0);
          this.message.on("data", (chunk) => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on("end", () => {
            resolve(output.toString());
          });
        }));
      });
    }
    readBodyBuffer() {
      return __awaiter(this, undefined, undefined, function* () {
        return new Promise((resolve) => __awaiter(this, undefined, undefined, function* () {
          const chunks = [];
          this.message.on("data", (chunk) => {
            chunks.push(chunk);
          });
          this.message.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
        }));
      });
    }
  }
  exports.HttpClientResponse = HttpClientResponse;
  exports.isHttps = isHttps;

  class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
      this._ignoreSslError = false;
      this._allowRedirects = true;
      this._allowRedirectDowngrade = false;
      this._maxRedirects = 50;
      this._allowRetries = false;
      this._maxRetries = 1;
      this._keepAlive = false;
      this._disposed = false;
      this.userAgent = userAgent;
      this.handlers = handlers || [];
      this.requestOptions = requestOptions;
      if (requestOptions) {
        if (requestOptions.ignoreSslError != null) {
          this._ignoreSslError = requestOptions.ignoreSslError;
        }
        this._socketTimeout = requestOptions.socketTimeout;
        if (requestOptions.allowRedirects != null) {
          this._allowRedirects = requestOptions.allowRedirects;
        }
        if (requestOptions.allowRedirectDowngrade != null) {
          this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
        }
        if (requestOptions.maxRedirects != null) {
          this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
        }
        if (requestOptions.keepAlive != null) {
          this._keepAlive = requestOptions.keepAlive;
        }
        if (requestOptions.allowRetries != null) {
          this._allowRetries = requestOptions.allowRetries;
        }
        if (requestOptions.maxRetries != null) {
          this._maxRetries = requestOptions.maxRetries;
        }
      }
    }
    options(requestUrl, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
      });
    }
    get(requestUrl, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request("GET", requestUrl, null, additionalHeaders || {});
      });
    }
    del(requestUrl, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request("DELETE", requestUrl, null, additionalHeaders || {});
      });
    }
    post(requestUrl, data, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request("POST", requestUrl, data, additionalHeaders || {});
      });
    }
    patch(requestUrl, data, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request("PATCH", requestUrl, data, additionalHeaders || {});
      });
    }
    put(requestUrl, data, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request("PUT", requestUrl, data, additionalHeaders || {});
      });
    }
    head(requestUrl, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request("HEAD", requestUrl, null, additionalHeaders || {});
      });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
      return __awaiter(this, undefined, undefined, function* () {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      });
    }
    getJson(requestUrl, additionalHeaders = {}) {
      return __awaiter(this, undefined, undefined, function* () {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        const res = yield this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
      return __awaiter(this, undefined, undefined, function* () {
        const data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        const res = yield this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
      return __awaiter(this, undefined, undefined, function* () {
        const data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        const res = yield this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
      return __awaiter(this, undefined, undefined, function* () {
        const data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        const res = yield this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    request(verb, requestUrl, data, headers) {
      return __awaiter(this, undefined, undefined, function* () {
        if (this._disposed) {
          throw new Error("Client has already been disposed.");
        }
        const parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        do {
          response = yield this.requestRaw(info, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (const handler of this.handlers) {
              if (handler.canHandleAuthentication(response)) {
                authenticationHandler = handler;
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers["location"];
            if (!redirectUrl) {
              break;
            }
            const parsedRedirectUrl = new URL(redirectUrl);
            if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            }
            yield response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (const header in headers) {
                if (header.toLowerCase() === "authorization") {
                  delete headers[header];
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = yield this.requestRaw(info, data);
            redirectsRemaining--;
          }
          if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            yield response.readBody();
            yield this._performExponentialBackoff(numTries);
          }
        } while (numTries < maxTries);
        return response;
      });
    }
    dispose() {
      if (this._agent) {
        this._agent.destroy();
      }
      this._disposed = true;
    }
    requestRaw(info, data) {
      return __awaiter(this, undefined, undefined, function* () {
        return new Promise((resolve, reject) => {
          function callbackForResult(err, res) {
            if (err) {
              reject(err);
            } else if (!res) {
              reject(new Error("Unknown error"));
            } else {
              resolve(res);
            }
          }
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      });
    }
    requestRawWithCallback(info, data, onResult) {
      if (typeof data === "string") {
        if (!info.options.headers) {
          info.options.headers = {};
        }
        info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
      }
      let callbackCalled = false;
      function handleResult(err, res) {
        if (!callbackCalled) {
          callbackCalled = true;
          onResult(err, res);
        }
      }
      const req = info.httpModule.request(info.options, (msg) => {
        const res = new HttpClientResponse(msg);
        handleResult(undefined, res);
      });
      let socket;
      req.on("socket", (sock) => {
        socket = sock;
      });
      req.setTimeout(this._socketTimeout || 3 * 60000, () => {
        if (socket) {
          socket.end();
        }
        handleResult(new Error(`Request timeout: ${info.options.path}`));
      });
      req.on("error", function(err) {
        handleResult(err);
      });
      if (data && typeof data === "string") {
        req.write(data, "utf8");
      }
      if (data && typeof data !== "string") {
        data.on("close", function() {
          req.end();
        });
        data.pipe(req);
      } else {
        req.end();
      }
    }
    getAgent(serverUrl) {
      const parsedUrl = new URL(serverUrl);
      return this._getAgent(parsedUrl);
    }
    getAgentDispatcher(serverUrl) {
      const parsedUrl = new URL(serverUrl);
      const proxyUrl = pm.getProxyUrl(parsedUrl);
      const useProxy = proxyUrl && proxyUrl.hostname;
      if (!useProxy) {
        return;
      }
      return this._getProxyAgentDispatcher(parsedUrl, proxyUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
      const info = {};
      info.parsedUrl = requestUrl;
      const usingSsl = info.parsedUrl.protocol === "https:";
      info.httpModule = usingSsl ? https : http;
      const defaultPort = usingSsl ? 443 : 80;
      info.options = {};
      info.options.host = info.parsedUrl.hostname;
      info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
      info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
      info.options.method = method;
      info.options.headers = this._mergeHeaders(headers);
      if (this.userAgent != null) {
        info.options.headers["user-agent"] = this.userAgent;
      }
      info.options.agent = this._getAgent(info.parsedUrl);
      if (this.handlers) {
        for (const handler of this.handlers) {
          handler.prepareRequest(info.options);
        }
      }
      return info;
    }
    _mergeHeaders(headers) {
      if (this.requestOptions && this.requestOptions.headers) {
        return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
      }
      return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
      let clientHeader;
      if (this.requestOptions && this.requestOptions.headers) {
        clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
      }
      return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
      let agent;
      const proxyUrl = pm.getProxyUrl(parsedUrl);
      const useProxy = proxyUrl && proxyUrl.hostname;
      if (this._keepAlive && useProxy) {
        agent = this._proxyAgent;
      }
      if (this._keepAlive && !useProxy) {
        agent = this._agent;
      }
      if (agent) {
        return agent;
      }
      const usingSsl = parsedUrl.protocol === "https:";
      let maxSockets = 100;
      if (this.requestOptions) {
        maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
      }
      if (proxyUrl && proxyUrl.hostname) {
        const agentOptions = {
          maxSockets,
          keepAlive: this._keepAlive,
          proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
            proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
          }), { host: proxyUrl.hostname, port: proxyUrl.port })
        };
        let tunnelAgent;
        const overHttps = proxyUrl.protocol === "https:";
        if (usingSsl) {
          tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
        } else {
          tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
        }
        agent = tunnelAgent(agentOptions);
        this._proxyAgent = agent;
      }
      if (this._keepAlive && !agent) {
        const options = { keepAlive: this._keepAlive, maxSockets };
        agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
        this._agent = agent;
      }
      if (!agent) {
        agent = usingSsl ? https.globalAgent : http.globalAgent;
      }
      if (usingSsl && this._ignoreSslError) {
        agent.options = Object.assign(agent.options || {}, {
          rejectUnauthorized: false
        });
      }
      return agent;
    }
    _getProxyAgentDispatcher(parsedUrl, proxyUrl) {
      let proxyAgent;
      if (this._keepAlive) {
        proxyAgent = this._proxyAgentDispatcher;
      }
      if (proxyAgent) {
        return proxyAgent;
      }
      const usingSsl = parsedUrl.protocol === "https:";
      proxyAgent = new undici_1.ProxyAgent(Object.assign({ uri: proxyUrl.href, pipelining: !this._keepAlive ? 0 : 1 }, (proxyUrl.username || proxyUrl.password) && {
        token: `${proxyUrl.username}:${proxyUrl.password}`
      }));
      this._proxyAgentDispatcher = proxyAgent;
      if (usingSsl && this._ignoreSslError) {
        proxyAgent.options = Object.assign(proxyAgent.options.requestTls || {}, {
          rejectUnauthorized: false
        });
      }
      return proxyAgent;
    }
    _performExponentialBackoff(retryNumber) {
      return __awaiter(this, undefined, undefined, function* () {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      });
    }
    _processResponse(res, options) {
      return __awaiter(this, undefined, undefined, function* () {
        return new Promise((resolve, reject) => __awaiter(this, undefined, undefined, function* () {
          const statusCode = res.message.statusCode || 0;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode === HttpCodes.NotFound) {
            resolve(response);
          }
          function dateTimeDeserializer(key, value) {
            if (typeof value === "string") {
              const a = new Date(value);
              if (!isNaN(a.valueOf())) {
                return a;
              }
            }
            return value;
          }
          let obj;
          let contents;
          try {
            contents = yield res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {
          }
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = `Failed request: (${statusCode})`;
            }
            const err = new HttpClientError(msg, statusCode);
            err.result = response.result;
            reject(err);
          } else {
            resolve(response);
          }
        }));
      });
    }
  }
  exports.HttpClient = HttpClient;
  var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS((exports) => {
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = undefined;

  class BasicCredentialHandler {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
    prepareRequest(options) {
      if (!options.headers) {
        throw Error("The request has no headers");
      }
      options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
    }
    canHandleAuthentication() {
      return false;
    }
    handleAuthentication() {
      return __awaiter(this, undefined, undefined, function* () {
        throw new Error("not implemented");
      });
    }
  }
  exports.BasicCredentialHandler = BasicCredentialHandler;

  class BearerCredentialHandler {
    constructor(token) {
      this.token = token;
    }
    prepareRequest(options) {
      if (!options.headers) {
        throw Error("The request has no headers");
      }
      options.headers["Authorization"] = `Bearer ${this.token}`;
    }
    canHandleAuthentication() {
      return false;
    }
    handleAuthentication() {
      return __awaiter(this, undefined, undefined, function* () {
        throw new Error("not implemented");
      });
    }
  }
  exports.BearerCredentialHandler = BearerCredentialHandler;

  class PersonalAccessTokenCredentialHandler {
    constructor(token) {
      this.token = token;
    }
    prepareRequest(options) {
      if (!options.headers) {
        throw Error("The request has no headers");
      }
      options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
    }
    canHandleAuthentication() {
      return false;
    }
    handleAuthentication() {
      return __awaiter(this, undefined, undefined, function* () {
        throw new Error("not implemented");
      });
    }
  }
  exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS((exports) => {
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.OidcClient = undefined;
  var http_client_1 = require_lib();
  var auth_1 = require_auth();
  var core_1 = require_core();

  class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
      const requestOptions = {
        allowRetries: allowRetry,
        maxRetries: maxRetry
      };
      return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
      const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
      if (!token) {
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
      }
      return token;
    }
    static getIDTokenUrl() {
      const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
      if (!runtimeUrl) {
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
      }
      return runtimeUrl;
    }
    static getCall(id_token_url) {
      var _a;
      return __awaiter(this, undefined, undefined, function* () {
        const httpclient = OidcClient.createHttpClient();
        const res = yield httpclient.getJson(id_token_url).catch((error) => {
          throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
        });
        const id_token = (_a = res.result) === null || _a === undefined ? undefined : _a.value;
        if (!id_token) {
          throw new Error("Response json body do not have ID Token field");
        }
        return id_token;
      });
    }
    static getIDToken(audience) {
      return __awaiter(this, undefined, undefined, function* () {
        try {
          let id_token_url = OidcClient.getIDTokenUrl();
          if (audience) {
            const encodedAudience = encodeURIComponent(audience);
            id_token_url = `${id_token_url}&audience=${encodedAudience}`;
          }
          core_1.debug(`ID token url is ${id_token_url}`);
          const id_token = yield OidcClient.getCall(id_token_url);
          core_1.setSecret(id_token);
          return id_token;
        } catch (error) {
          throw new Error(`Error message: ${error.message}`);
        }
      });
    }
  }
  exports.OidcClient = OidcClient;
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS((exports) => {
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = undefined;
  var os_1 = import.meta.require("os");
  var fs_1 = import.meta.require("fs");
  var { access, appendFile, writeFile } = fs_1.promises;
  exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
  exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";

  class Summary {
    constructor() {
      this._buffer = "";
    }
    filePath() {
      return __awaiter(this, undefined, undefined, function* () {
        if (this._filePath) {
          return this._filePath;
        }
        const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
        if (!pathFromEnv) {
          throw new Error(`Unable to find environment variable for \$${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
        }
        try {
          yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
        } catch (_a) {
          throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
        }
        this._filePath = pathFromEnv;
        return this._filePath;
      });
    }
    wrap(tag, content, attrs = {}) {
      const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
      if (!content) {
        return `<${tag}${htmlAttrs}>`;
      }
      return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    write(options) {
      return __awaiter(this, undefined, undefined, function* () {
        const overwrite = !!(options === null || options === undefined ? undefined : options.overwrite);
        const filePath = yield this.filePath();
        const writeFunc = overwrite ? writeFile : appendFile;
        yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
        return this.emptyBuffer();
      });
    }
    clear() {
      return __awaiter(this, undefined, undefined, function* () {
        return this.emptyBuffer().write({ overwrite: true });
      });
    }
    stringify() {
      return this._buffer;
    }
    isEmptyBuffer() {
      return this._buffer.length === 0;
    }
    emptyBuffer() {
      this._buffer = "";
      return this;
    }
    addRaw(text, addEOL = false) {
      this._buffer += text;
      return addEOL ? this.addEOL() : this;
    }
    addEOL() {
      return this.addRaw(os_1.EOL);
    }
    addCodeBlock(code, lang) {
      const attrs = Object.assign({}, lang && { lang });
      const element = this.wrap("pre", this.wrap("code", code), attrs);
      return this.addRaw(element).addEOL();
    }
    addList(items, ordered = false) {
      const tag = ordered ? "ol" : "ul";
      const listItems = items.map((item) => this.wrap("li", item)).join("");
      const element = this.wrap(tag, listItems);
      return this.addRaw(element).addEOL();
    }
    addTable(rows) {
      const tableBody = rows.map((row) => {
        const cells = row.map((cell) => {
          if (typeof cell === "string") {
            return this.wrap("td", cell);
          }
          const { header, data, colspan, rowspan } = cell;
          const tag = header ? "th" : "td";
          const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
          return this.wrap(tag, data, attrs);
        }).join("");
        return this.wrap("tr", cells);
      }).join("");
      const element = this.wrap("table", tableBody);
      return this.addRaw(element).addEOL();
    }
    addDetails(label, content) {
      const element = this.wrap("details", this.wrap("summary", label) + content);
      return this.addRaw(element).addEOL();
    }
    addImage(src, alt, options) {
      const { width, height } = options || {};
      const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
      const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
      return this.addRaw(element).addEOL();
    }
    addHeading(text, level) {
      const tag = `h${level}`;
      const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
      const element = this.wrap(allowedTag, text);
      return this.addRaw(element).addEOL();
    }
    addSeparator() {
      const element = this.wrap("hr", null);
      return this.addRaw(element).addEOL();
    }
    addBreak() {
      const element = this.wrap("br", null);
      return this.addRaw(element).addEOL();
    }
    addQuote(text, cite) {
      const attrs = Object.assign({}, cite && { cite });
      const element = this.wrap("blockquote", text, attrs);
      return this.addRaw(element).addEOL();
    }
    addLink(text, href) {
      const element = this.wrap("a", text, { href });
      return this.addRaw(element).addEOL();
    }
  }
  var _summary = new Summary;
  exports.markdownSummary = _summary;
  exports.summary = _summary;
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS((exports) => {
  var toPosixPath = function(pth) {
    return pth.replace(/[\\]/g, "/");
  };
  var toWin32Path = function(pth) {
    return pth.replace(/[/]/g, "\\");
  };
  var toPlatformPath = function(pth) {
    return pth.replace(/[/\\]/g, path.sep);
  };
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = undefined;
  var path = __importStar(import.meta.require("path"));
  exports.toPosixPath = toPosixPath;
  exports.toWin32Path = toWin32Path;
  exports.toPlatformPath = toPlatformPath;
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS((exports) => {
  var exportVariable = function(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = "/home/runner/work/_temp/_runner_file_commands/set_env_a47a757d-ace9-4880-a3af-8ef84a3bf02f";
    if (filePath) {
      return file_command_1.issueFileCommand("ENV", file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand("set-env", { name }, convertedVal);
  };
  var setSecret = function(secret) {
    command_1.issueCommand("add-mask", {}, secret);
  };
  var addPath = function(inputPath) {
    const filePath = "/home/runner/work/_temp/_runner_file_commands/add_path_a47a757d-ace9-4880-a3af-8ef84a3bf02f";
    if (filePath) {
      file_command_1.issueFileCommand("PATH", inputPath);
    } else {
      command_1.issueCommand("add-path", {}, inputPath);
    }
    process.env["PATH"] = `${inputPath}${path.delimiter}${"/home/runner/work/add-commit-push/add-commit-push/node_modules/.bin:/home/runner/work/add-commit-push/add-commit-push/node_modules/.bin:/home/runner/.bun/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/snap/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"}`;
  };
  var getInput = function(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) {
      throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
      return val;
    }
    return val.trim();
  };
  var getMultilineInput = function(name, options) {
    const inputs = getInput(name, options).split("\n").filter((x) => x !== "");
    if (options && options.trimWhitespace === false) {
      return inputs;
    }
    return inputs.map((input) => input.trim());
  };
  var getBooleanInput = function(name, options) {
    const trueValue = ["true", "True", "TRUE"];
    const falseValue = ["false", "False", "FALSE"];
    const val = getInput(name, options);
    if (trueValue.includes(val))
      return true;
    if (falseValue.includes(val))
      return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
  };
  var setOutput = function(name, value) {
    const filePath = "/home/runner/work/_temp/_runner_file_commands/set_output_a47a757d-ace9-4880-a3af-8ef84a3bf02f";
    if (filePath) {
      return file_command_1.issueFileCommand("OUTPUT", file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand("set-output", { name }, utils_1.toCommandValue(value));
  };
  var setCommandEcho = function(enabled) {
    command_1.issue("echo", enabled ? "on" : "off");
  };
  var setFailed = function(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
  };
  var isDebug = function() {
    return process.env["RUNNER_DEBUG"] === "1";
  };
  var debug = function(message) {
    command_1.issueCommand("debug", {}, message);
  };
  var error = function(message, properties = {}) {
    command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
  };
  var warning = function(message, properties = {}) {
    command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
  };
  var notice = function(message, properties = {}) {
    command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
  };
  var info = function(message) {
    process.stdout.write(message + os.EOL);
  };
  var startGroup = function(name) {
    command_1.issue("group", name);
  };
  var endGroup = function() {
    command_1.issue("endgroup");
  };
  var group = function(name, fn) {
    return __awaiter(this, undefined, undefined, function* () {
      startGroup(name);
      let result;
      try {
        result = yield fn();
      } finally {
        endGroup();
      }
      return result;
    });
  };
  var saveState = function(name, value) {
    const filePath = "/home/runner/work/_temp/_runner_file_commands/save_state_a47a757d-ace9-4880-a3af-8ef84a3bf02f";
    if (filePath) {
      return file_command_1.issueFileCommand("STATE", file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand("save-state", { name }, utils_1.toCommandValue(value));
  };
  var getState = function(name) {
    return process.env[`STATE_${name}`] || "";
  };
  var getIDToken = function(aud) {
    return __awaiter(this, undefined, undefined, function* () {
      return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
  };
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = undefined;
  var command_1 = require_command();
  var file_command_1 = require_file_command();
  var utils_1 = require_utils();
  var os = __importStar(import.meta.require("os"));
  var path = __importStar(import.meta.require("path"));
  var oidc_utils_1 = require_oidc_utils();
  var ExitCode;
  (function(ExitCode2) {
    ExitCode2[ExitCode2["Success"] = 0] = "Success";
    ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
  })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
  exports.exportVariable = exportVariable;
  exports.setSecret = setSecret;
  exports.addPath = addPath;
  exports.getInput = getInput;
  exports.getMultilineInput = getMultilineInput;
  exports.getBooleanInput = getBooleanInput;
  exports.setOutput = setOutput;
  exports.setCommandEcho = setCommandEcho;
  exports.setFailed = setFailed;
  exports.isDebug = isDebug;
  exports.debug = debug;
  exports.error = error;
  exports.warning = warning;
  exports.notice = notice;
  exports.info = info;
  exports.startGroup = startGroup;
  exports.endGroup = endGroup;
  exports.group = group;
  exports.saveState = saveState;
  exports.getState = getState;
  exports.getIDToken = getIDToken;
  var summary_1 = require_summary();
  Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
    return summary_1.summary;
  } });
  var summary_2 = require_summary();
  Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
    return summary_2.markdownSummary;
  } });
  var path_utils_1 = require_path_utils();
  Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
    return path_utils_1.toPosixPath;
  } });
  Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
    return path_utils_1.toWin32Path;
  } });
  Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
    return path_utils_1.toPlatformPath;
  } });
});

// src/main.ts
var core = __toESM(require_core(), 1);

// src/lib/execa.ts
import {spawn} from "child_process";
import {once} from "events";
function $(strings, ...values) {
  if (!Array.isArray(strings)) {
    return $.bind(Object.assign(this ?? {}, strings));
  }
  const keyFor = (index) => `__values[${index}]`;
  const keyRe = /__values\[(\d+)\]/g;
  const cmdWithKeys = strings.flatMap((s, i) => i ? [keyFor(i - 1), s] : s).join("");
  let argv = cmdWithKeys.split(/\s+/);
  argv = argv.map((arg) => arg.replace(keyRe, (m, i) => values[i]));
  const argv0 = argv.shift();
  const cp = spawn(argv0, argv, this ?? {});
  const stdoutP = cp.stdout?.[Symbol.asyncIterator] ? new Response(ReadableStream.from(cp.stdout)).text() : null;
  const stderrP = cp.stderr?.[Symbol.asyncIterator] ? new Response(ReadableStream.from(cp.stderr)).text() : null;
  const p = once(cp, "exit").then(async ([exitCode, signal]) => {
    const res = {
      stdout: (await stdoutP)?.trimEnd(),
      stderr: (await stderrP)?.trimEnd(),
      exitCode,
      signal
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
if (!ReadableStream.from) {
  ReadableStream.from = function(anyIterable) {
    if (!anyIterable) {
      throw new TypeError("ReadableStream.from() expects an iterable or async iterable object.");
    }
    const iterator = typeof anyIterable[Symbol.asyncIterator] === "function" ? anyIterable[Symbol.asyncIterator]() : typeof anyIterable[Symbol.iterator] === "function" ? anyIterable[Symbol.iterator]() : null;
    if (!iterator) {
      throw new TypeError("ReadableStream.from() expects an iterable or async iterable object.");
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
      }
    });
  };
}

// src/main.ts
import assert from "assert/strict";
import {resolve} from "path";
var rootPath = resolve(core.getInput("path"));
var addPathspec;
if (core.getInput("add-pathspec")) {
  addPathspec = core.getMultilineInput("add-pathspec");
}
var addForce = core.getBooleanInput("add-force");
var GIT_AUTHOR_NAME;
var GIT_AUTHOR_EMAIL;
if (core.getInput("commit-author")) {
  assert.equal(core.getInput("commit-author-name"), "");
  assert.equal(core.getInput("commit-author-email"), "");
  [GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL] = core.getInput("commit-author").match(/^\s+(.+)\s+<(.+)>\s+$/).slice(1);
} else {
  GIT_AUTHOR_NAME = core.getInput("commit-author-name", { required: true });
  GIT_AUTHOR_EMAIL = core.getInput("commit-author-email", { required: true });
}
var GIT_COMMITTER_NAME;
var GIT_COMMITTER_EMAIL;
if (core.getInput("commit-committer")) {
  assert.equal(core.getInput("commit-committer-name"), "");
  assert.equal(core.getInput("commit-committer-email"), "");
  [GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL] = core.getInput("commit-committer").match(/^\s+(.+)\s+<(.+)>\s+$/).slice(1);
} else {
  GIT_COMMITTER_NAME = core.getInput("commit-committer-name", {
    required: true
  });
  GIT_COMMITTER_EMAIL = core.getInput("commit-committer-email", {
    required: true
  });
}
var commitMessage = core.getInput("commit-message");
var pushRepository = core.getInput("push-repository");
if (addPathspec) {
  await $({
    stdio: "inherit",
    cwd: rootPath
  })`git add ${addForce ? "--force" : []} -- ${addPathspec}`;
} else {
  await $({
    stdio: "inherit",
    cwd: rootPath
  })`git add ${addForce ? "--force" : []} --all`;
}
var { exitCode } = await $({
  cwd: rootPath,
  reject: false
})`git diff --cached`;
if (exitCode) {
  core.info(`No changes to commit`);
} else {
  let pushRefspec = core.getInput("push-refspec");
  let pushForce = core.getInput("push-force") ? core.getBooleanInput("push-force") : null;
  if (!pushRefspec) {
    const { exitCode: exitCode2, stdout: stdout2 } = await $({
      cwd: rootPath,
      reject: false
    })`git symbolic-ref HEAD`;
    if (exitCode2) {
      const { stdout: stdout3 } = await $({ cwd: rootPath })`git tag --points-at HEAD`;
      console.assert(stdout3, "no stdout from listing tags");
      const tags = stdout3.split(/\r?\n/g);
      console.assert(tags.length >= 1, `tags=${tags} longer than 1`);
      pushRefspec = tags[0];
    } else {
      pushRefspec = stdout2;
    }
  }
  if (pushForce == null) {
    const { exitCode: exitCode2 } = await $({
      cwd: rootPath,
      reject: false
    })`git symbolic-ref HEAD`;
    if (exitCode2) {
      pushForce = true;
    } else {
      pushForce = false;
    }
  }
  await $({
    stdio: "inherit",
    cwd: rootPath,
    env: {
      GIT_AUTHOR_NAME,
      GIT_AUTHOR_EMAIL,
      GIT_COMMITTER_NAME,
      GIT_COMMITTER_EMAIL
    }
  })`git commit --message ${commitMessage}`;
  const { stdout } = await $({
    cwd: rootPath
  })`git rev-parse HEAD`;
  await $({
    stdio: "inherit",
    cwd: rootPath
  })`git push ${pushForce ? "--force" : []} ${pushRepository} ${stdout}:${pushRefspec}`;
}

//# debugId=7E3BEB8174AB978D64756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL3V0aWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9jb3JlL2xpYi9jb21tYW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3Qvcm5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvcmVnZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC92YWxpZGF0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3N0cmluZ2lmeS5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3YxLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvcGFyc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC92MzUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9tZDUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC92My5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3Y0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3Qvc2hhMS5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3Y1LmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvbmlsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvdmVyc2lvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9jb3JlL2xpYi9maWxlLWNvbW1hbmQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2h0dHAtY2xpZW50L2xpYi9wcm94eS5qcyIsICIuLi9ub2RlX21vZHVsZXMvdHVubmVsL2xpYi90dW5uZWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2h0dHAtY2xpZW50L2xpYi9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQGFjdGlvbnMvaHR0cC1jbGllbnQvbGliL2F1dGguanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL29pZGMtdXRpbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL3N1bW1hcnkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL3BhdGgtdXRpbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCAiLi4vc3JjL21haW4udHMiLCAiLi4vc3JjL2xpYi9leGVjYS50cyIsICIuLi9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJcInVzZSBzdHJpY3RcIjtcbi8vIFdlIHVzZSBhbnkgYXMgYSB2YWxpZCBpbnB1dCB0eXBlXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRvQ29tbWFuZFByb3BlcnRpZXMgPSBleHBvcnRzLnRvQ29tbWFuZFZhbHVlID0gdm9pZCAwO1xuLyoqXG4gKiBTYW5pdGl6ZXMgYW4gaW5wdXQgaW50byBhIHN0cmluZyBzbyBpdCBjYW4gYmUgcGFzc2VkIGludG8gaXNzdWVDb21tYW5kIHNhZmVseVxuICogQHBhcmFtIGlucHV0IGlucHV0IHRvIHNhbml0aXplIGludG8gYSBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gdG9Db21tYW5kVmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgPT09IG51bGwgfHwgaW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgaW5wdXQgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoaW5wdXQpO1xufVxuZXhwb3J0cy50b0NvbW1hbmRWYWx1ZSA9IHRvQ29tbWFuZFZhbHVlO1xuLyoqXG4gKlxuICogQHBhcmFtIGFubm90YXRpb25Qcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyBUaGUgY29tbWFuZCBwcm9wZXJ0aWVzIHRvIHNlbmQgd2l0aCB0aGUgYWN0dWFsIGFubm90YXRpb24gY29tbWFuZFxuICogU2VlIElzc3VlQ29tbWFuZFByb3BlcnRpZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9hY3Rpb25zL3J1bm5lci9ibG9iL21haW4vc3JjL1J1bm5lci5Xb3JrZXIvQWN0aW9uQ29tbWFuZE1hbmFnZXIuY3MjTDY0NlxuICovXG5mdW5jdGlvbiB0b0NvbW1hbmRQcm9wZXJ0aWVzKGFubm90YXRpb25Qcm9wZXJ0aWVzKSB7XG4gICAgaWYgKCFPYmplY3Qua2V5cyhhbm5vdGF0aW9uUHJvcGVydGllcykubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IGFubm90YXRpb25Qcm9wZXJ0aWVzLnRpdGxlLFxuICAgICAgICBmaWxlOiBhbm5vdGF0aW9uUHJvcGVydGllcy5maWxlLFxuICAgICAgICBsaW5lOiBhbm5vdGF0aW9uUHJvcGVydGllcy5zdGFydExpbmUsXG4gICAgICAgIGVuZExpbmU6IGFubm90YXRpb25Qcm9wZXJ0aWVzLmVuZExpbmUsXG4gICAgICAgIGNvbDogYW5ub3RhdGlvblByb3BlcnRpZXMuc3RhcnRDb2x1bW4sXG4gICAgICAgIGVuZENvbHVtbjogYW5ub3RhdGlvblByb3BlcnRpZXMuZW5kQ29sdW1uXG4gICAgfTtcbn1cbmV4cG9ydHMudG9Db21tYW5kUHJvcGVydGllcyA9IHRvQ29tbWFuZFByb3BlcnRpZXM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiLAogICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzc3VlID0gZXhwb3J0cy5pc3N1ZUNvbW1hbmQgPSB2b2lkIDA7XG5jb25zdCBvcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwib3NcIikpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBDb21tYW5kc1xuICpcbiAqIENvbW1hbmQgRm9ybWF0OlxuICogICA6Om5hbWUga2V5PXZhbHVlLGtleT12YWx1ZTo6bWVzc2FnZVxuICpcbiAqIEV4YW1wbGVzOlxuICogICA6Ondhcm5pbmc6OlRoaXMgaXMgdGhlIG1lc3NhZ2VcbiAqICAgOjpzZXQtZW52IG5hbWU9TVlfVkFSOjpzb21lIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGlzc3VlQ29tbWFuZChjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgY21kID0gbmV3IENvbW1hbmQoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSk7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY21kLnRvU3RyaW5nKCkgKyBvcy5FT0wpO1xufVxuZXhwb3J0cy5pc3N1ZUNvbW1hbmQgPSBpc3N1ZUNvbW1hbmQ7XG5mdW5jdGlvbiBpc3N1ZShuYW1lLCBtZXNzYWdlID0gJycpIHtcbiAgICBpc3N1ZUNvbW1hbmQobmFtZSwge30sIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5pc3N1ZSA9IGlzc3VlO1xuY29uc3QgQ01EX1NUUklORyA9ICc6Oic7XG5jbGFzcyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZCA9ICdtaXNzaW5nLmNvbW1hbmQnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmQ7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBsZXQgY21kU3RyID0gQ01EX1NUUklORyArIHRoaXMuY29tbWFuZDtcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcyAmJiBPYmplY3Qua2V5cyh0aGlzLnByb3BlcnRpZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNtZFN0ciArPSAnICc7XG4gICAgICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY21kU3RyICs9ICcsJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNtZFN0ciArPSBgJHtrZXl9PSR7ZXNjYXBlUHJvcGVydHkodmFsKX1gO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNtZFN0ciArPSBgJHtDTURfU1RSSU5HfSR7ZXNjYXBlRGF0YSh0aGlzLm1lc3NhZ2UpfWA7XG4gICAgICAgIHJldHVybiBjbWRTdHI7XG4gICAgfVxufVxuZnVuY3Rpb24gZXNjYXBlRGF0YShzKSB7XG4gICAgcmV0dXJuIHV0aWxzXzEudG9Db21tYW5kVmFsdWUocylcbiAgICAgICAgLnJlcGxhY2UoLyUvZywgJyUyNScpXG4gICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJyUwRCcpXG4gICAgICAgIC5yZXBsYWNlKC9cXG4vZywgJyUwQScpO1xufVxuZnVuY3Rpb24gZXNjYXBlUHJvcGVydHkocykge1xuICAgIHJldHVybiB1dGlsc18xLnRvQ29tbWFuZFZhbHVlKHMpXG4gICAgICAgIC5yZXBsYWNlKC8lL2csICclMjUnKVxuICAgICAgICAucmVwbGFjZSgvXFxyL2csICclMEQnKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csICclMEEnKVxuICAgICAgICAucmVwbGFjZSgvOi9nLCAnJTNBJylcbiAgICAgICAgLnJlcGxhY2UoLywvZywgJyUyQycpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbWFuZC5qcy5tYXAiLAogICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJuZztcblxudmFyIF9jcnlwdG8gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJjcnlwdG9cIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCBybmRzOFBvb2wgPSBuZXcgVWludDhBcnJheSgyNTYpOyAvLyAjIG9mIHJhbmRvbSB2YWx1ZXMgdG8gcHJlLWFsbG9jYXRlXG5cbmxldCBwb29sUHRyID0gcm5kczhQb29sLmxlbmd0aDtcblxuZnVuY3Rpb24gcm5nKCkge1xuICBpZiAocG9vbFB0ciA+IHJuZHM4UG9vbC5sZW5ndGggLSAxNikge1xuICAgIF9jcnlwdG8uZGVmYXVsdC5yYW5kb21GaWxsU3luYyhybmRzOFBvb2wpO1xuXG4gICAgcG9vbFB0ciA9IDA7XG4gIH1cblxuICByZXR1cm4gcm5kczhQb29sLnNsaWNlKHBvb2xQdHIsIHBvb2xQdHIgKz0gMTYpO1xufSIsCiAgIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9kZWZhdWx0ID0gL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfcmVnZXggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JlZ2V4LmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIF9yZWdleC5kZWZhdWx0LnRlc3QodXVpZCk7XG59XG5cbnZhciBfZGVmYXVsdCA9IHZhbGlkYXRlO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgY29uc3QgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxudmFyIF9kZWZhdWx0ID0gc3RyaW5naWZ5O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfcm5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9ybmcuanNcIikpO1xuXG52YXIgX3N0cmluZ2lmeSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxubGV0IF9ub2RlSWQ7XG5cbmxldCBfY2xvY2tzZXE7IC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuXG5cbmxldCBfbGFzdE1TZWNzID0gMDtcbmxldCBfbGFzdE5TZWNzID0gMDsgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcblxuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgbGV0IGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIGNvbnN0IGIgPSBidWYgfHwgbmV3IEFycmF5KDE2KTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxldCBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGxldCBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7IC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuXG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlZWRCeXRlcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nLmRlZmF1bHQpKCk7XG5cbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW3NlZWRCeXRlc1swXSB8IDB4MDEsIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXTtcbiAgICB9XG5cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH0gLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG5cblxuICBsZXQgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogRGF0ZS5ub3coKTsgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuXG4gIGxldCBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTsgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuXG4gIGNvbnN0IGR0ID0gbXNlY3MgLSBfbGFzdE1TZWNzICsgKG5zZWNzIC0gX2xhc3ROU2VjcykgLyAxMDAwMDsgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH0gLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuXG5cbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH0gLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuXG5cbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXVpZC52MSgpOiBDYW4ndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWNcIik7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7IC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwOyAvLyBgdGltZV9sb3dgXG5cbiAgY29uc3QgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmOyAvLyBgdGltZV9taWRgXG5cbiAgY29uc3QgdG1oID0gbXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmOyAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjsgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG5cbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwOyAvLyBgY2xvY2tfc2VxX2xvd2BcblxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7IC8vIGBub2RlYFxuXG4gIGZvciAobGV0IG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS5kZWZhdWx0KShiKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdjE7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLAogICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBwYXJzZSh1dWlkKSB7XG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBVVUlEJyk7XG4gIH1cblxuICBsZXQgdjtcbiAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBQYXJzZSAjIyMjIyMjIy0uLi4uLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbMF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMCwgOCksIDE2KSkgPj4+IDI0O1xuICBhcnJbMV0gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsyXSA9IHYgPj4+IDggJiAweGZmO1xuICBhcnJbM10gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tIyMjIy0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzRdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDksIDEzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzVdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tIyMjIy0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls2XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxNCwgMTgpLCAxNikpID4+PiA4O1xuICBhcnJbN10gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLSMjIyMtLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzhdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE5LCAyMyksIDE2KSkgPj4+IDg7XG4gIGFycls5XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tLi4uLi0jIyMjIyMjIyMjIyNcbiAgLy8gKFVzZSBcIi9cIiB0byBhdm9pZCAzMi1iaXQgdHJ1bmNhdGlvbiB3aGVuIGJpdC1zaGlmdGluZyBoaWdoLW9yZGVyIGJ5dGVzKVxuXG4gIGFyclsxMF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMjQsIDM2KSwgMTYpKSAvIDB4MTAwMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTFdID0gdiAvIDB4MTAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzEyXSA9IHYgPj4+IDI0ICYgMHhmZjtcbiAgYXJyWzEzXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzE0XSA9IHYgPj4+IDggJiAweGZmO1xuICBhcnJbMTVdID0gdiAmIDB4ZmY7XG4gIHJldHVybiBhcnI7XG59XG5cbnZhciBfZGVmYXVsdCA9IHBhcnNlO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbmV4cG9ydHMuVVJMID0gZXhwb3J0cy5ETlMgPSB2b2lkIDA7XG5cbnZhciBfc3RyaW5naWZ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIikpO1xuXG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHN0cmluZ1RvQnl0ZXMoc3RyKSB7XG4gIHN0ciA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKTsgLy8gVVRGOCBlc2NhcGVcblxuICBjb25zdCBieXRlcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSk7XG4gIH1cblxuICByZXR1cm4gYnl0ZXM7XG59XG5cbmNvbnN0IEROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0cy5ETlMgPSBETlM7XG5jb25zdCBVUkwgPSAnNmJhN2I4MTEtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydHMuVVJMID0gVVJMO1xuXG5mdW5jdGlvbiBfZGVmYXVsdChuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBzdHJpbmdUb0J5dGVzKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWVzcGFjZSA9ICgwLCBfcGFyc2UuZGVmYXVsdCkobmFtZXNwYWNlKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZXNwYWNlLmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LmRlZmF1bHQpKGJ5dGVzKTtcbiAgfSAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcblxuXG4gIHRyeSB7XG4gICAgZ2VuZXJhdGVVVUlELm5hbWUgPSBuYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgfSBjYXRjaCAoZXJyKSB7fSAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuXG5cbiAgZ2VuZXJhdGVVVUlELkROUyA9IEROUztcbiAgZ2VuZXJhdGVVVUlELlVSTCA9IFVSTDtcbiAgcmV0dXJuIGdlbmVyYXRlVVVJRDtcbn0iLAogICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jcnlwdG8gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJjcnlwdG9cIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgYnl0ZXMgPSBCdWZmZXIuZnJvbShieXRlcyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGJ5dGVzID0gQnVmZmVyLmZyb20oYnl0ZXMsICd1dGY4Jyk7XG4gIH1cblxuICByZXR1cm4gX2NyeXB0by5kZWZhdWx0LmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZShieXRlcykuZGlnZXN0KCk7XG59XG5cbnZhciBfZGVmYXVsdCA9IG1kNTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsCiAgIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzNS5qc1wiKSk7XG5cbnZhciBfbWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL21kNS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmNvbnN0IHYzID0gKDAsIF92LmRlZmF1bHQpKCd2MycsIDB4MzAsIF9tZC5kZWZhdWx0KTtcbnZhciBfZGVmYXVsdCA9IHYzO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfcm5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9ybmcuanNcIikpO1xuXG52YXIgX3N0cmluZ2lmeSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nLmRlZmF1bHQpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LmRlZmF1bHQpKHJuZHMpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2NDtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsCiAgIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NyeXB0byA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImNyeXB0b1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHNoYTEoYnl0ZXMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgYnl0ZXMgPSBCdWZmZXIuZnJvbShieXRlcyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGJ5dGVzID0gQnVmZmVyLmZyb20oYnl0ZXMsICd1dGY4Jyk7XG4gIH1cblxuICByZXR1cm4gX2NyeXB0by5kZWZhdWx0LmNyZWF0ZUhhc2goJ3NoYTEnKS51cGRhdGUoYnl0ZXMpLmRpZ2VzdCgpO1xufVxuXG52YXIgX2RlZmF1bHQgPSBzaGExO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjM1LmpzXCIpKTtcblxudmFyIF9zaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NoYTEuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCB2NSA9ICgwLCBfdi5kZWZhdWx0KSgndjUnLCAweDUwLCBfc2hhLmRlZmF1bHQpO1xudmFyIF9kZWZhdWx0ID0gdjU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLAogICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBVVUlEJyk7XG4gIH1cblxuICByZXR1cm4gcGFyc2VJbnQodXVpZC5zdWJzdHIoMTQsIDEpLCAxNik7XG59XG5cbnZhciBfZGVmYXVsdCA9IHZlcnNpb247XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLAogICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInYxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF92LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTklMXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9uaWwuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2ZXJzaW9uXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF92ZXJzaW9uLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmFsaWRhdGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3ZhbGlkYXRlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfcGFyc2UuZGVmYXVsdDtcbiAgfVxufSk7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjEuanNcIikpO1xuXG52YXIgX3YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92My5qc1wiKSk7XG5cbnZhciBfdjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3Y0LmpzXCIpKTtcblxudmFyIF92NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjUuanNcIikpO1xuXG52YXIgX25pbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbmlsLmpzXCIpKTtcblxudmFyIF92ZXJzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92ZXJzaW9uLmpzXCIpKTtcblxudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuXG52YXIgX3N0cmluZ2lmeSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpKTtcblxudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfSIsCiAgIlwidXNlIHN0cmljdFwiO1xuLy8gRm9yIGludGVybmFsIHVzZSwgc3ViamVjdCB0byBjaGFuZ2UuXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wcmVwYXJlS2V5VmFsdWVNZXNzYWdlID0gZXhwb3J0cy5pc3N1ZUZpbGVDb21tYW5kID0gdm9pZCAwO1xuLy8gV2UgdXNlIGFueSBhcyBhIHZhbGlkIGlucHV0IHR5cGVcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmNvbnN0IGZzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJmc1wiKSk7XG5jb25zdCBvcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwib3NcIikpO1xuY29uc3QgdXVpZF8xID0gcmVxdWlyZShcInV1aWRcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5mdW5jdGlvbiBpc3N1ZUZpbGVDb21tYW5kKGNvbW1hbmQsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHByb2Nlc3MuZW52W2BHSVRIVUJfJHtjb21tYW5kfWBdO1xuICAgIGlmICghZmlsZVBhdGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZmluZCBlbnZpcm9ubWVudCB2YXJpYWJsZSBmb3IgZmlsZSBjb21tYW5kICR7Y29tbWFuZH1gKTtcbiAgICB9XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgZmlsZSBhdCBwYXRoOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBmcy5hcHBlbmRGaWxlU3luYyhmaWxlUGF0aCwgYCR7dXRpbHNfMS50b0NvbW1hbmRWYWx1ZShtZXNzYWdlKX0ke29zLkVPTH1gLCB7XG4gICAgICAgIGVuY29kaW5nOiAndXRmOCdcbiAgICB9KTtcbn1cbmV4cG9ydHMuaXNzdWVGaWxlQ29tbWFuZCA9IGlzc3VlRmlsZUNvbW1hbmQ7XG5mdW5jdGlvbiBwcmVwYXJlS2V5VmFsdWVNZXNzYWdlKGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSBgZ2hhZGVsaW1pdGVyXyR7dXVpZF8xLnY0KCl9YDtcbiAgICBjb25zdCBjb252ZXJ0ZWRWYWx1ZSA9IHV0aWxzXzEudG9Db21tYW5kVmFsdWUodmFsdWUpO1xuICAgIC8vIFRoZXNlIHNob3VsZCByZWFsaXN0aWNhbGx5IG5ldmVyIGhhcHBlbiwgYnV0IGp1c3QgaW4gY2FzZSBzb21lb25lIGZpbmRzIGFcbiAgICAvLyB3YXkgdG8gZXhwbG9pdCB1dWlkIGdlbmVyYXRpb24gbGV0J3Mgbm90IGFsbG93IGtleXMgb3IgdmFsdWVzIHRoYXQgY29udGFpblxuICAgIC8vIHRoZSBkZWxpbWl0ZXIuXG4gICAgaWYgKGtleS5pbmNsdWRlcyhkZWxpbWl0ZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dDogbmFtZSBzaG91bGQgbm90IGNvbnRhaW4gdGhlIGRlbGltaXRlciBcIiR7ZGVsaW1pdGVyfVwiYCk7XG4gICAgfVxuICAgIGlmIChjb252ZXJ0ZWRWYWx1ZS5pbmNsdWRlcyhkZWxpbWl0ZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dDogdmFsdWUgc2hvdWxkIG5vdCBjb250YWluIHRoZSBkZWxpbWl0ZXIgXCIke2RlbGltaXRlcn1cImApO1xuICAgIH1cbiAgICByZXR1cm4gYCR7a2V5fTw8JHtkZWxpbWl0ZXJ9JHtvcy5FT0x9JHtjb252ZXJ0ZWRWYWx1ZX0ke29zLkVPTH0ke2RlbGltaXRlcn1gO1xufVxuZXhwb3J0cy5wcmVwYXJlS2V5VmFsdWVNZXNzYWdlID0gcHJlcGFyZUtleVZhbHVlTWVzc2FnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbGUtY29tbWFuZC5qcy5tYXAiLAogICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2hlY2tCeXBhc3MgPSBleHBvcnRzLmdldFByb3h5VXJsID0gdm9pZCAwO1xuZnVuY3Rpb24gZ2V0UHJveHlVcmwocmVxVXJsKSB7XG4gICAgY29uc3QgdXNpbmdTc2wgPSByZXFVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgIGlmIChjaGVja0J5cGFzcyhyZXFVcmwpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHByb3h5VmFyID0gKCgpID0+IHtcbiAgICAgICAgaWYgKHVzaW5nU3NsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnZbJ2h0dHBzX3Byb3h5J10gfHwgcHJvY2Vzcy5lbnZbJ0hUVFBTX1BST1hZJ107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnZbJ2h0dHBfcHJveHknXSB8fCBwcm9jZXNzLmVudlsnSFRUUF9QUk9YWSddO1xuICAgICAgICB9XG4gICAgfSkoKTtcbiAgICBpZiAocHJveHlWYXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVVJMKHByb3h5VmFyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgIGlmICghcHJveHlWYXIuc3RhcnRzV2l0aCgnaHR0cDovLycpICYmICFwcm94eVZhci5zdGFydHNXaXRoKCdodHRwczovLycpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVVJMKGBodHRwOi8vJHtwcm94eVZhcn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldFByb3h5VXJsID0gZ2V0UHJveHlVcmw7XG5mdW5jdGlvbiBjaGVja0J5cGFzcyhyZXFVcmwpIHtcbiAgICBpZiAoIXJlcVVybC5ob3N0bmFtZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHJlcUhvc3QgPSByZXFVcmwuaG9zdG5hbWU7XG4gICAgaWYgKGlzTG9vcGJhY2tBZGRyZXNzKHJlcUhvc3QpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBub1Byb3h5ID0gcHJvY2Vzcy5lbnZbJ25vX3Byb3h5J10gfHwgcHJvY2Vzcy5lbnZbJ05PX1BST1hZJ10gfHwgJyc7XG4gICAgaWYgKCFub1Byb3h5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSByZXF1ZXN0IHBvcnRcbiAgICBsZXQgcmVxUG9ydDtcbiAgICBpZiAocmVxVXJsLnBvcnQpIHtcbiAgICAgICAgcmVxUG9ydCA9IE51bWJlcihyZXFVcmwucG9ydCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcVVybC5wcm90b2NvbCA9PT0gJ2h0dHA6Jykge1xuICAgICAgICByZXFQb3J0ID0gODA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcVVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcbiAgICAgICAgcmVxUG9ydCA9IDQ0MztcbiAgICB9XG4gICAgLy8gRm9ybWF0IHRoZSByZXF1ZXN0IGhvc3RuYW1lIGFuZCBob3N0bmFtZSB3aXRoIHBvcnRcbiAgICBjb25zdCB1cHBlclJlcUhvc3RzID0gW3JlcVVybC5ob3N0bmFtZS50b1VwcGVyQ2FzZSgpXTtcbiAgICBpZiAodHlwZW9mIHJlcVBvcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHVwcGVyUmVxSG9zdHMucHVzaChgJHt1cHBlclJlcUhvc3RzWzBdfToke3JlcVBvcnR9YCk7XG4gICAgfVxuICAgIC8vIENvbXBhcmUgcmVxdWVzdCBob3N0IGFnYWluc3Qgbm9wcm94eVxuICAgIGZvciAoY29uc3QgdXBwZXJOb1Byb3h5SXRlbSBvZiBub1Byb3h5XG4gICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoeCA9PiB4LnRyaW0oKS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAuZmlsdGVyKHggPT4geCkpIHtcbiAgICAgICAgaWYgKHVwcGVyTm9Qcm94eUl0ZW0gPT09ICcqJyB8fFxuICAgICAgICAgICAgdXBwZXJSZXFIb3N0cy5zb21lKHggPT4geCA9PT0gdXBwZXJOb1Byb3h5SXRlbSB8fFxuICAgICAgICAgICAgICAgIHguZW5kc1dpdGgoYC4ke3VwcGVyTm9Qcm94eUl0ZW19YCkgfHxcbiAgICAgICAgICAgICAgICAodXBwZXJOb1Byb3h5SXRlbS5zdGFydHNXaXRoKCcuJykgJiZcbiAgICAgICAgICAgICAgICAgICAgeC5lbmRzV2l0aChgJHt1cHBlck5vUHJveHlJdGVtfWApKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuY2hlY2tCeXBhc3MgPSBjaGVja0J5cGFzcztcbmZ1bmN0aW9uIGlzTG9vcGJhY2tBZGRyZXNzKGhvc3QpIHtcbiAgICBjb25zdCBob3N0TG93ZXIgPSBob3N0LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIChob3N0TG93ZXIgPT09ICdsb2NhbGhvc3QnIHx8XG4gICAgICAgIGhvc3RMb3dlci5zdGFydHNXaXRoKCcxMjcuJykgfHxcbiAgICAgICAgaG9zdExvd2VyLnN0YXJ0c1dpdGgoJ1s6OjFdJykgfHxcbiAgICAgICAgaG9zdExvd2VyLnN0YXJ0c1dpdGgoJ1swOjA6MDowOjA6MDowOjFdJykpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJveHkuanMubWFwIiwKICAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbmV0ID0gcmVxdWlyZSgnbmV0Jyk7XG52YXIgdGxzID0gcmVxdWlyZSgndGxzJyk7XG52YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbnZhciBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuXG5leHBvcnRzLmh0dHBPdmVySHR0cCA9IGh0dHBPdmVySHR0cDtcbmV4cG9ydHMuaHR0cHNPdmVySHR0cCA9IGh0dHBzT3Zlckh0dHA7XG5leHBvcnRzLmh0dHBPdmVySHR0cHMgPSBodHRwT3Zlckh0dHBzO1xuZXhwb3J0cy5odHRwc092ZXJIdHRwcyA9IGh0dHBzT3Zlckh0dHBzO1xuXG5cbmZ1bmN0aW9uIGh0dHBPdmVySHR0cChvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHAucmVxdWVzdDtcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5mdW5jdGlvbiBodHRwc092ZXJIdHRwKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cC5yZXF1ZXN0O1xuICBhZ2VudC5jcmVhdGVTb2NrZXQgPSBjcmVhdGVTZWN1cmVTb2NrZXQ7XG4gIGFnZW50LmRlZmF1bHRQb3J0ID0gNDQzO1xuICByZXR1cm4gYWdlbnQ7XG59XG5cbmZ1bmN0aW9uIGh0dHBPdmVySHR0cHMob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0O1xuICByZXR1cm4gYWdlbnQ7XG59XG5cbmZ1bmN0aW9uIGh0dHBzT3Zlckh0dHBzKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cHMucmVxdWVzdDtcbiAgYWdlbnQuY3JlYXRlU29ja2V0ID0gY3JlYXRlU2VjdXJlU29ja2V0O1xuICBhZ2VudC5kZWZhdWx0UG9ydCA9IDQ0MztcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5cbmZ1bmN0aW9uIFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBzZWxmLnByb3h5T3B0aW9ucyA9IHNlbGYub3B0aW9ucy5wcm94eSB8fCB7fTtcbiAgc2VsZi5tYXhTb2NrZXRzID0gc2VsZi5vcHRpb25zLm1heFNvY2tldHMgfHwgaHR0cC5BZ2VudC5kZWZhdWx0TWF4U29ja2V0cztcbiAgc2VsZi5yZXF1ZXN0cyA9IFtdO1xuICBzZWxmLnNvY2tldHMgPSBbXTtcblxuICBzZWxmLm9uKCdmcmVlJywgZnVuY3Rpb24gb25GcmVlKHNvY2tldCwgaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0b09wdGlvbnMoaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VsZi5yZXF1ZXN0cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgdmFyIHBlbmRpbmcgPSBzZWxmLnJlcXVlc3RzW2ldO1xuICAgICAgaWYgKHBlbmRpbmcuaG9zdCA9PT0gb3B0aW9ucy5ob3N0ICYmIHBlbmRpbmcucG9ydCA9PT0gb3B0aW9ucy5wb3J0KSB7XG4gICAgICAgIC8vIERldGVjdCB0aGUgcmVxdWVzdCB0byBjb25uZWN0IHNhbWUgb3JpZ2luIHNlcnZlcixcbiAgICAgICAgLy8gcmV1c2UgdGhlIGNvbm5lY3Rpb24uXG4gICAgICAgIHNlbGYucmVxdWVzdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICBwZW5kaW5nLnJlcXVlc3Qub25Tb2NrZXQoc29ja2V0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgIHNlbGYucmVtb3ZlU29ja2V0KHNvY2tldCk7XG4gIH0pO1xufVxudXRpbC5pbmhlcml0cyhUdW5uZWxpbmdBZ2VudCwgZXZlbnRzLkV2ZW50RW1pdHRlcik7XG5cblR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5hZGRSZXF1ZXN0ID0gZnVuY3Rpb24gYWRkUmVxdWVzdChyZXEsIGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBvcHRpb25zID0gbWVyZ2VPcHRpb25zKHtyZXF1ZXN0OiByZXF9LCBzZWxmLm9wdGlvbnMsIHRvT3B0aW9ucyhob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpKTtcblxuICBpZiAoc2VsZi5zb2NrZXRzLmxlbmd0aCA+PSB0aGlzLm1heFNvY2tldHMpIHtcbiAgICAvLyBXZSBhcmUgb3ZlciBsaW1pdCBzbyB3ZSdsbCBhZGQgaXQgdG8gdGhlIHF1ZXVlLlxuICAgIHNlbGYucmVxdWVzdHMucHVzaChvcHRpb25zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJZiB3ZSBhcmUgdW5kZXIgbWF4U29ja2V0cyBjcmVhdGUgYSBuZXcgb25lLlxuICBzZWxmLmNyZWF0ZVNvY2tldChvcHRpb25zLCBmdW5jdGlvbihzb2NrZXQpIHtcbiAgICBzb2NrZXQub24oJ2ZyZWUnLCBvbkZyZWUpO1xuICAgIHNvY2tldC5vbignY2xvc2UnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgIHNvY2tldC5vbignYWdlbnRSZW1vdmUnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgIHJlcS5vblNvY2tldChzb2NrZXQpO1xuXG4gICAgZnVuY3Rpb24gb25GcmVlKCkge1xuICAgICAgc2VsZi5lbWl0KCdmcmVlJywgc29ja2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlT3JSZW1vdmUoZXJyKSB7XG4gICAgICBzZWxmLnJlbW92ZVNvY2tldChzb2NrZXQpO1xuICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdmcmVlJywgb25GcmVlKTtcbiAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdhZ2VudFJlbW92ZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgfVxuICB9KTtcbn07XG5cblR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5jcmVhdGVTb2NrZXQgPSBmdW5jdGlvbiBjcmVhdGVTb2NrZXQob3B0aW9ucywgY2IpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcGxhY2Vob2xkZXIgPSB7fTtcbiAgc2VsZi5zb2NrZXRzLnB1c2gocGxhY2Vob2xkZXIpO1xuXG4gIHZhciBjb25uZWN0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7fSwgc2VsZi5wcm94eU9wdGlvbnMsIHtcbiAgICBtZXRob2Q6ICdDT05ORUNUJyxcbiAgICBwYXRoOiBvcHRpb25zLmhvc3QgKyAnOicgKyBvcHRpb25zLnBvcnQsXG4gICAgYWdlbnQ6IGZhbHNlLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIGhvc3Q6IG9wdGlvbnMuaG9zdCArICc6JyArIG9wdGlvbnMucG9ydFxuICAgIH1cbiAgfSk7XG4gIGlmIChvcHRpb25zLmxvY2FsQWRkcmVzcykge1xuICAgIGNvbm5lY3RPcHRpb25zLmxvY2FsQWRkcmVzcyA9IG9wdGlvbnMubG9jYWxBZGRyZXNzO1xuICB9XG4gIGlmIChjb25uZWN0T3B0aW9ucy5wcm94eUF1dGgpIHtcbiAgICBjb25uZWN0T3B0aW9ucy5oZWFkZXJzID0gY29ubmVjdE9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICBjb25uZWN0T3B0aW9ucy5oZWFkZXJzWydQcm94eS1BdXRob3JpemF0aW9uJ10gPSAnQmFzaWMgJyArXG4gICAgICAgIG5ldyBCdWZmZXIoY29ubmVjdE9wdGlvbnMucHJveHlBdXRoKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIH1cblxuICBkZWJ1ZygnbWFraW5nIENPTk5FQ1QgcmVxdWVzdCcpO1xuICB2YXIgY29ubmVjdFJlcSA9IHNlbGYucmVxdWVzdChjb25uZWN0T3B0aW9ucyk7XG4gIGNvbm5lY3RSZXEudXNlQ2h1bmtlZEVuY29kaW5nQnlEZWZhdWx0ID0gZmFsc2U7IC8vIGZvciB2MC42XG4gIGNvbm5lY3RSZXEub25jZSgncmVzcG9uc2UnLCBvblJlc3BvbnNlKTsgLy8gZm9yIHYwLjZcbiAgY29ubmVjdFJlcS5vbmNlKCd1cGdyYWRlJywgb25VcGdyYWRlKTsgICAvLyBmb3IgdjAuNlxuICBjb25uZWN0UmVxLm9uY2UoJ2Nvbm5lY3QnLCBvbkNvbm5lY3QpOyAgIC8vIGZvciB2MC43IG9yIGxhdGVyXG4gIGNvbm5lY3RSZXEub25jZSgnZXJyb3InLCBvbkVycm9yKTtcbiAgY29ubmVjdFJlcS5lbmQoKTtcblxuICBmdW5jdGlvbiBvblJlc3BvbnNlKHJlcykge1xuICAgIC8vIFZlcnkgaGFja3kuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGF2b2lkIGh0dHAtcGFyc2VyIGxlYWtzLlxuICAgIHJlcy51cGdyYWRlID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVXBncmFkZShyZXMsIHNvY2tldCwgaGVhZCkge1xuICAgIC8vIEhhY2t5LlxuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICBvbkNvbm5lY3QocmVzLCBzb2NrZXQsIGhlYWQpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Db25uZWN0KHJlcywgc29ja2V0LCBoZWFkKSB7XG4gICAgY29ubmVjdFJlcS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICBzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cbiAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgZGVidWcoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCBzdGF0dXNDb2RlPSVkJyxcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUpO1xuICAgICAgc29ja2V0LmRlc3Ryb3koKTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsICcgK1xuICAgICAgICAnc3RhdHVzQ29kZT0nICsgcmVzLnN0YXR1c0NvZGUpO1xuICAgICAgZXJyb3IuY29kZSA9ICdFQ09OTlJFU0VUJztcbiAgICAgIG9wdGlvbnMucmVxdWVzdC5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgIHNlbGYucmVtb3ZlU29ja2V0KHBsYWNlaG9sZGVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGhlYWQubGVuZ3RoID4gMCkge1xuICAgICAgZGVidWcoJ2dvdCBpbGxlZ2FsIHJlc3BvbnNlIGJvZHkgZnJvbSBwcm94eScpO1xuICAgICAgc29ja2V0LmRlc3Ryb3koKTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcignZ290IGlsbGVnYWwgcmVzcG9uc2UgYm9keSBmcm9tIHByb3h5Jyk7XG4gICAgICBlcnJvci5jb2RlID0gJ0VDT05OUkVTRVQnO1xuICAgICAgb3B0aW9ucy5yZXF1ZXN0LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgc2VsZi5yZW1vdmVTb2NrZXQocGxhY2Vob2xkZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZWJ1ZygndHVubmVsaW5nIGNvbm5lY3Rpb24gaGFzIGVzdGFibGlzaGVkJyk7XG4gICAgc2VsZi5zb2NrZXRzW3NlbGYuc29ja2V0cy5pbmRleE9mKHBsYWNlaG9sZGVyKV0gPSBzb2NrZXQ7XG4gICAgcmV0dXJuIGNiKHNvY2tldCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkVycm9yKGNhdXNlKSB7XG4gICAgY29ubmVjdFJlcS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIGRlYnVnKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgY2F1c2U9JXNcXG4nLFxuICAgICAgICAgIGNhdXNlLm1lc3NhZ2UsIGNhdXNlLnN0YWNrKTtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhdXNlPScgKyBjYXVzZS5tZXNzYWdlKTtcbiAgICBlcnJvci5jb2RlID0gJ0VDT05OUkVTRVQnO1xuICAgIG9wdGlvbnMucmVxdWVzdC5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICBzZWxmLnJlbW92ZVNvY2tldChwbGFjZWhvbGRlcik7XG4gIH1cbn07XG5cblR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5yZW1vdmVTb2NrZXQgPSBmdW5jdGlvbiByZW1vdmVTb2NrZXQoc29ja2V0KSB7XG4gIHZhciBwb3MgPSB0aGlzLnNvY2tldHMuaW5kZXhPZihzb2NrZXQpXG4gIGlmIChwb3MgPT09IC0xKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuc29ja2V0cy5zcGxpY2UocG9zLCAxKTtcblxuICB2YXIgcGVuZGluZyA9IHRoaXMucmVxdWVzdHMuc2hpZnQoKTtcbiAgaWYgKHBlbmRpbmcpIHtcbiAgICAvLyBJZiB3ZSBoYXZlIHBlbmRpbmcgcmVxdWVzdHMgYW5kIGEgc29ja2V0IGdldHMgY2xvc2VkIGEgbmV3IG9uZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNyZWF0ZWQgdG8gdGFrZSBvdmVyIGluIHRoZSBwb29sIGZvciB0aGUgb25lIHRoYXQgY2xvc2VkLlxuICAgIHRoaXMuY3JlYXRlU29ja2V0KHBlbmRpbmcsIGZ1bmN0aW9uKHNvY2tldCkge1xuICAgICAgcGVuZGluZy5yZXF1ZXN0Lm9uU29ja2V0KHNvY2tldCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlY3VyZVNvY2tldChvcHRpb25zLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIFR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5jcmVhdGVTb2NrZXQuY2FsbChzZWxmLCBvcHRpb25zLCBmdW5jdGlvbihzb2NrZXQpIHtcbiAgICB2YXIgaG9zdEhlYWRlciA9IG9wdGlvbnMucmVxdWVzdC5nZXRIZWFkZXIoJ2hvc3QnKTtcbiAgICB2YXIgdGxzT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7fSwgc2VsZi5vcHRpb25zLCB7XG4gICAgICBzb2NrZXQ6IHNvY2tldCxcbiAgICAgIHNlcnZlcm5hbWU6IGhvc3RIZWFkZXIgPyBob3N0SGVhZGVyLnJlcGxhY2UoLzouKiQvLCAnJykgOiBvcHRpb25zLmhvc3RcbiAgICB9KTtcblxuICAgIC8vIDAgaXMgZHVtbXkgcG9ydCBmb3IgdjAuNlxuICAgIHZhciBzZWN1cmVTb2NrZXQgPSB0bHMuY29ubmVjdCgwLCB0bHNPcHRpb25zKTtcbiAgICBzZWxmLnNvY2tldHNbc2VsZi5zb2NrZXRzLmluZGV4T2Yoc29ja2V0KV0gPSBzZWN1cmVTb2NrZXQ7XG4gICAgY2Ioc2VjdXJlU29ja2V0KTtcbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gdG9PcHRpb25zKGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykge1xuICBpZiAodHlwZW9mIGhvc3QgPT09ICdzdHJpbmcnKSB7IC8vIHNpbmNlIHYwLjEwXG4gICAgcmV0dXJuIHtcbiAgICAgIGhvc3Q6IGhvc3QsXG4gICAgICBwb3J0OiBwb3J0LFxuICAgICAgbG9jYWxBZGRyZXNzOiBsb2NhbEFkZHJlc3NcbiAgICB9O1xuICB9XG4gIHJldHVybiBob3N0OyAvLyBmb3IgdjAuMTEgb3IgbGF0ZXJcbn1cblxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIG92ZXJyaWRlcyA9IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAodHlwZW9mIG92ZXJyaWRlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob3ZlcnJpZGVzKTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBrZXlMZW4gPSBrZXlzLmxlbmd0aDsgaiA8IGtleUxlbjsgKytqKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1tqXTtcbiAgICAgICAgaWYgKG92ZXJyaWRlc1trXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGFyZ2V0W2tdID0gb3ZlcnJpZGVzW2tdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxudmFyIGRlYnVnO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiYgL1xcYnR1bm5lbFxcYi8udGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSkge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcmdzWzBdID0gJ1RVTk5FTDogJyArIGFyZ3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZ3MudW5zaGlmdCgnVFVOTkVMOicpO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICB9XG59IGVsc2Uge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG59XG5leHBvcnRzLmRlYnVnID0gZGVidWc7IC8vIGZvciB0ZXN0XG4iLAogICJcInVzZSBzdHJpY3RcIjtcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkh0dHBDbGllbnQgPSBleHBvcnRzLmlzSHR0cHMgPSBleHBvcnRzLkh0dHBDbGllbnRSZXNwb25zZSA9IGV4cG9ydHMuSHR0cENsaWVudEVycm9yID0gZXhwb3J0cy5nZXRQcm94eVVybCA9IGV4cG9ydHMuTWVkaWFUeXBlcyA9IGV4cG9ydHMuSGVhZGVycyA9IGV4cG9ydHMuSHR0cENvZGVzID0gdm9pZCAwO1xuY29uc3QgaHR0cCA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiaHR0cFwiKSk7XG5jb25zdCBodHRwcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiaHR0cHNcIikpO1xuY29uc3QgcG0gPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vcHJveHlcIikpO1xuY29uc3QgdHVubmVsID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJ0dW5uZWxcIikpO1xuY29uc3QgdW5kaWNpXzEgPSByZXF1aXJlKFwidW5kaWNpXCIpO1xudmFyIEh0dHBDb2RlcztcbihmdW5jdGlvbiAoSHR0cENvZGVzKSB7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk9LXCJdID0gMjAwXSA9IFwiT0tcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTXVsdGlwbGVDaG9pY2VzXCJdID0gMzAwXSA9IFwiTXVsdGlwbGVDaG9pY2VzXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk1vdmVkUGVybWFuZW50bHlcIl0gPSAzMDFdID0gXCJNb3ZlZFBlcm1hbmVudGx5XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlJlc291cmNlTW92ZWRcIl0gPSAzMDJdID0gXCJSZXNvdXJjZU1vdmVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlNlZU90aGVyXCJdID0gMzAzXSA9IFwiU2VlT3RoZXJcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTm90TW9kaWZpZWRcIl0gPSAzMDRdID0gXCJOb3RNb2RpZmllZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJVc2VQcm94eVwiXSA9IDMwNV0gPSBcIlVzZVByb3h5XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlN3aXRjaFByb3h5XCJdID0gMzA2XSA9IFwiU3dpdGNoUHJveHlcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiVGVtcG9yYXJ5UmVkaXJlY3RcIl0gPSAzMDddID0gXCJUZW1wb3JhcnlSZWRpcmVjdFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQZXJtYW5lbnRSZWRpcmVjdFwiXSA9IDMwOF0gPSBcIlBlcm1hbmVudFJlZGlyZWN0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkJhZFJlcXVlc3RcIl0gPSA0MDBdID0gXCJCYWRSZXF1ZXN0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlVuYXV0aG9yaXplZFwiXSA9IDQwMV0gPSBcIlVuYXV0aG9yaXplZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQYXltZW50UmVxdWlyZWRcIl0gPSA0MDJdID0gXCJQYXltZW50UmVxdWlyZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiRm9yYmlkZGVuXCJdID0gNDAzXSA9IFwiRm9yYmlkZGVuXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdEZvdW5kXCJdID0gNDA0XSA9IFwiTm90Rm91bmRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTWV0aG9kTm90QWxsb3dlZFwiXSA9IDQwNV0gPSBcIk1ldGhvZE5vdEFsbG93ZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTm90QWNjZXB0YWJsZVwiXSA9IDQwNl0gPSBcIk5vdEFjY2VwdGFibGVcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkXCJdID0gNDA3XSA9IFwiUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlJlcXVlc3RUaW1lb3V0XCJdID0gNDA4XSA9IFwiUmVxdWVzdFRpbWVvdXRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiQ29uZmxpY3RcIl0gPSA0MDldID0gXCJDb25mbGljdFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJHb25lXCJdID0gNDEwXSA9IFwiR29uZVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJUb29NYW55UmVxdWVzdHNcIl0gPSA0MjldID0gXCJUb29NYW55UmVxdWVzdHNcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiSW50ZXJuYWxTZXJ2ZXJFcnJvclwiXSA9IDUwMF0gPSBcIkludGVybmFsU2VydmVyRXJyb3JcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTm90SW1wbGVtZW50ZWRcIl0gPSA1MDFdID0gXCJOb3RJbXBsZW1lbnRlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJCYWRHYXRld2F5XCJdID0gNTAyXSA9IFwiQmFkR2F0ZXdheVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJTZXJ2aWNlVW5hdmFpbGFibGVcIl0gPSA1MDNdID0gXCJTZXJ2aWNlVW5hdmFpbGFibGVcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiR2F0ZXdheVRpbWVvdXRcIl0gPSA1MDRdID0gXCJHYXRld2F5VGltZW91dFwiO1xufSkoSHR0cENvZGVzIHx8IChleHBvcnRzLkh0dHBDb2RlcyA9IEh0dHBDb2RlcyA9IHt9KSk7XG52YXIgSGVhZGVycztcbihmdW5jdGlvbiAoSGVhZGVycykge1xuICAgIEhlYWRlcnNbXCJBY2NlcHRcIl0gPSBcImFjY2VwdFwiO1xuICAgIEhlYWRlcnNbXCJDb250ZW50VHlwZVwiXSA9IFwiY29udGVudC10eXBlXCI7XG59KShIZWFkZXJzIHx8IChleHBvcnRzLkhlYWRlcnMgPSBIZWFkZXJzID0ge30pKTtcbnZhciBNZWRpYVR5cGVzO1xuKGZ1bmN0aW9uIChNZWRpYVR5cGVzKSB7XG4gICAgTWVkaWFUeXBlc1tcIkFwcGxpY2F0aW9uSnNvblwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xufSkoTWVkaWFUeXBlcyB8fCAoZXhwb3J0cy5NZWRpYVR5cGVzID0gTWVkaWFUeXBlcyA9IHt9KSk7XG4vKipcbiAqIFJldHVybnMgdGhlIHByb3h5IFVSTCwgZGVwZW5kaW5nIHVwb24gdGhlIHN1cHBsaWVkIHVybCBhbmQgcHJveHkgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICogQHBhcmFtIHNlcnZlclVybCAgVGhlIHNlcnZlciBVUkwgd2hlcmUgdGhlIHJlcXVlc3Qgd2lsbCBiZSBzZW50LiBGb3IgZXhhbXBsZSwgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbVxuICovXG5mdW5jdGlvbiBnZXRQcm94eVVybChzZXJ2ZXJVcmwpIHtcbiAgICBjb25zdCBwcm94eVVybCA9IHBtLmdldFByb3h5VXJsKG5ldyBVUkwoc2VydmVyVXJsKSk7XG4gICAgcmV0dXJuIHByb3h5VXJsID8gcHJveHlVcmwuaHJlZiA6ICcnO1xufVxuZXhwb3J0cy5nZXRQcm94eVVybCA9IGdldFByb3h5VXJsO1xuY29uc3QgSHR0cFJlZGlyZWN0Q29kZXMgPSBbXG4gICAgSHR0cENvZGVzLk1vdmVkUGVybWFuZW50bHksXG4gICAgSHR0cENvZGVzLlJlc291cmNlTW92ZWQsXG4gICAgSHR0cENvZGVzLlNlZU90aGVyLFxuICAgIEh0dHBDb2Rlcy5UZW1wb3JhcnlSZWRpcmVjdCxcbiAgICBIdHRwQ29kZXMuUGVybWFuZW50UmVkaXJlY3Rcbl07XG5jb25zdCBIdHRwUmVzcG9uc2VSZXRyeUNvZGVzID0gW1xuICAgIEh0dHBDb2Rlcy5CYWRHYXRld2F5LFxuICAgIEh0dHBDb2Rlcy5TZXJ2aWNlVW5hdmFpbGFibGUsXG4gICAgSHR0cENvZGVzLkdhdGV3YXlUaW1lb3V0XG5dO1xuY29uc3QgUmV0cnlhYmxlSHR0cFZlcmJzID0gWydPUFRJT05TJywgJ0dFVCcsICdERUxFVEUnLCAnSEVBRCddO1xuY29uc3QgRXhwb25lbnRpYWxCYWNrb2ZmQ2VpbGluZyA9IDEwO1xuY29uc3QgRXhwb25lbnRpYWxCYWNrb2ZmVGltZVNsaWNlID0gNTtcbmNsYXNzIEh0dHBDbGllbnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXNDb2RlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnSHR0cENsaWVudEVycm9yJztcbiAgICAgICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEh0dHBDbGllbnRFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuSHR0cENsaWVudEVycm9yID0gSHR0cENsaWVudEVycm9yO1xuY2xhc3MgSHR0cENsaWVudFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgIHJlYWRCb2R5KCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dCA9IEJ1ZmZlci5hbGxvYygwKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2Uub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gQnVmZmVyLmNvbmNhdChbb3V0cHV0LCBjaHVua10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG91dHB1dC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlYWRCb2R5QnVmZmVyKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2h1bmtzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkh0dHBDbGllbnRSZXNwb25zZSA9IEh0dHBDbGllbnRSZXNwb25zZTtcbmZ1bmN0aW9uIGlzSHR0cHMocmVxdWVzdFVybCkge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocmVxdWVzdFVybCk7XG4gICAgcmV0dXJuIHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG59XG5leHBvcnRzLmlzSHR0cHMgPSBpc0h0dHBzO1xuY2xhc3MgSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IodXNlckFnZW50LCBoYW5kbGVycywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5faWdub3JlU3NsRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdHMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0RG93bmdyYWRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX21heFJlZGlyZWN0cyA9IDUwO1xuICAgICAgICB0aGlzLl9hbGxvd1JldHJpZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbWF4UmV0cmllcyA9IDE7XG4gICAgICAgIHRoaXMuX2tlZXBBbGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVzZXJBZ2VudCA9IHVzZXJBZ2VudDtcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IGhhbmRsZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLnJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmlnbm9yZVNzbEVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZ25vcmVTc2xFcnJvciA9IHJlcXVlc3RPcHRpb25zLmlnbm9yZVNzbEVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc29ja2V0VGltZW91dCA9IHJlcXVlc3RPcHRpb25zLnNvY2tldFRpbWVvdXQ7XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuYWxsb3dSZWRpcmVjdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3RzID0gcmVxdWVzdE9wdGlvbnMuYWxsb3dSZWRpcmVjdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuYWxsb3dSZWRpcmVjdERvd25ncmFkZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdERvd25ncmFkZSA9IHJlcXVlc3RPcHRpb25zLmFsbG93UmVkaXJlY3REb3duZ3JhZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMubWF4UmVkaXJlY3RzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBNYXRoLm1heChyZXF1ZXN0T3B0aW9ucy5tYXhSZWRpcmVjdHMsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmtlZXBBbGl2ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fa2VlcEFsaXZlID0gcmVxdWVzdE9wdGlvbnMua2VlcEFsaXZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmFsbG93UmV0cmllcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dSZXRyaWVzID0gcmVxdWVzdE9wdGlvbnMuYWxsb3dSZXRyaWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLm1heFJldHJpZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heFJldHJpZXMgPSByZXF1ZXN0T3B0aW9ucy5tYXhSZXRyaWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9wdGlvbnMocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ09QVElPTlMnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIHJlcXVlc3RVcmwsIG51bGwsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlbChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcG9zdChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBhdGNoKHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQQVRDSCcsIHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1dChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGVhZChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnSEVBRCcsIHJlcXVlc3RVcmwsIG51bGwsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRTdHJlYW0odmVyYiwgcmVxdWVzdFVybCwgc3RyZWFtLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh2ZXJiLCByZXF1ZXN0VXJsLCBzdHJlYW0sIGFkZGl0aW9uYWxIZWFkZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYSB0eXBlZCBvYmplY3QgZnJvbSBhbiBlbmRwb2ludFxuICAgICAqIEJlIGF3YXJlIHRoYXQgbm90IGZvdW5kIHJldHVybnMgYSBudWxsLiAgT3RoZXIgZXJyb3JzICg0eHgsIDV4eCkgcmVqZWN0IHRoZSBwcm9taXNlXG4gICAgICovXG4gICAgZ2V0SnNvbihyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsSGVhZGVyc1tIZWFkZXJzLkFjY2VwdF0gPSB0aGlzLl9nZXRFeGlzdGluZ09yRGVmYXVsdEhlYWRlcihhZGRpdGlvbmFsSGVhZGVycywgSGVhZGVycy5BY2NlcHQsIE1lZGlhVHlwZXMuQXBwbGljYXRpb25Kc29uKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIHRoaXMuZ2V0KHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzUmVzcG9uc2UocmVzLCB0aGlzLnJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBvc3RKc29uKHJlcXVlc3RVcmwsIG9iaiwgYWRkaXRpb25hbEhlYWRlcnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMik7XG4gICAgICAgICAgICBhZGRpdGlvbmFsSGVhZGVyc1tIZWFkZXJzLkFjY2VwdF0gPSB0aGlzLl9nZXRFeGlzdGluZ09yRGVmYXVsdEhlYWRlcihhZGRpdGlvbmFsSGVhZGVycywgSGVhZGVycy5BY2NlcHQsIE1lZGlhVHlwZXMuQXBwbGljYXRpb25Kc29uKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxIZWFkZXJzW0hlYWRlcnMuQ29udGVudFR5cGVdID0gdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRIZWFkZXIoYWRkaXRpb25hbEhlYWRlcnMsIEhlYWRlcnMuQ29udGVudFR5cGUsIE1lZGlhVHlwZXMuQXBwbGljYXRpb25Kc29uKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIHRoaXMucG9zdChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1Jlc3BvbnNlKHJlcywgdGhpcy5yZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdXRKc29uKHJlcXVlc3RVcmwsIG9iaiwgYWRkaXRpb25hbEhlYWRlcnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMik7XG4gICAgICAgICAgICBhZGRpdGlvbmFsSGVhZGVyc1tIZWFkZXJzLkFjY2VwdF0gPSB0aGlzLl9nZXRFeGlzdGluZ09yRGVmYXVsdEhlYWRlcihhZGRpdGlvbmFsSGVhZGVycywgSGVhZGVycy5BY2NlcHQsIE1lZGlhVHlwZXMuQXBwbGljYXRpb25Kc29uKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxIZWFkZXJzW0hlYWRlcnMuQ29udGVudFR5cGVdID0gdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRIZWFkZXIoYWRkaXRpb25hbEhlYWRlcnMsIEhlYWRlcnMuQ29udGVudFR5cGUsIE1lZGlhVHlwZXMuQXBwbGljYXRpb25Kc29uKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIHRoaXMucHV0KHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzUmVzcG9uc2UocmVzLCB0aGlzLnJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBhdGNoSnNvbihyZXF1ZXN0VXJsLCBvYmosIGFkZGl0aW9uYWxIZWFkZXJzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDIpO1xuICAgICAgICAgICAgYWRkaXRpb25hbEhlYWRlcnNbSGVhZGVycy5BY2NlcHRdID0gdGhpcy5fZ2V0RXhpc3RpbmdPckRlZmF1bHRIZWFkZXIoYWRkaXRpb25hbEhlYWRlcnMsIEhlYWRlcnMuQWNjZXB0LCBNZWRpYVR5cGVzLkFwcGxpY2F0aW9uSnNvbik7XG4gICAgICAgICAgICBhZGRpdGlvbmFsSGVhZGVyc1tIZWFkZXJzLkNvbnRlbnRUeXBlXSA9IHRoaXMuX2dldEV4aXN0aW5nT3JEZWZhdWx0SGVhZGVyKGFkZGl0aW9uYWxIZWFkZXJzLCBIZWFkZXJzLkNvbnRlbnRUeXBlLCBNZWRpYVR5cGVzLkFwcGxpY2F0aW9uSnNvbik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCB0aGlzLnBhdGNoKHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzUmVzcG9uc2UocmVzLCB0aGlzLnJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgcmF3IGh0dHAgcmVxdWVzdC5cbiAgICAgKiBBbGwgb3RoZXIgbWV0aG9kcyBzdWNoIGFzIGdldCwgcG9zdCwgcGF0Y2gsIGFuZCByZXF1ZXN0IHVsdGltYXRlbHkgY2FsbCB0aGlzLlxuICAgICAqIFByZWZlciBnZXQsIGRlbCwgcG9zdCBhbmQgcGF0Y2hcbiAgICAgKi9cbiAgICByZXF1ZXN0KHZlcmIsIHJlcXVlc3RVcmwsIGRhdGEsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IGhhcyBhbHJlYWR5IGJlZW4gZGlzcG9zZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHJlcXVlc3RVcmwpO1xuICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLl9wcmVwYXJlUmVxdWVzdCh2ZXJiLCBwYXJzZWRVcmwsIGhlYWRlcnMpO1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIHJldHJpZXMgb24gcmVhZHMgc2luY2Ugd3JpdGVzIG1heSBub3QgYmUgaWRlbXBvdGVudC5cbiAgICAgICAgICAgIGNvbnN0IG1heFRyaWVzID0gdGhpcy5fYWxsb3dSZXRyaWVzICYmIFJldHJ5YWJsZUh0dHBWZXJicy5pbmNsdWRlcyh2ZXJiKVxuICAgICAgICAgICAgICAgID8gdGhpcy5fbWF4UmV0cmllcyArIDFcbiAgICAgICAgICAgICAgICA6IDE7XG4gICAgICAgICAgICBsZXQgbnVtVHJpZXMgPSAwO1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0geWllbGQgdGhpcy5yZXF1ZXN0UmF3KGluZm8sIGRhdGEpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGl0J3MgYW4gYXV0aGVudGljYXRpb24gY2hhbGxlbmdlXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlID09PSBIdHRwQ29kZXMuVW5hdXRob3JpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdXRoZW50aWNhdGlvbkhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLmhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlci5jYW5IYW5kbGVBdXRoZW50aWNhdGlvbihyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbkhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdXRoZW50aWNhdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoZW50aWNhdGlvbkhhbmRsZXIuaGFuZGxlQXV0aGVudGljYXRpb24odGhpcywgaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHJlY2VpdmVkIGFuIHVuYXV0aG9yaXplZCByZXNwb25zZSBidXQgaGF2ZSBubyBoYW5kbGVycyB0byBoYW5kbGUgaXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQgdGhlIHJlc3BvbnNlIHJldHVybiB0byB0aGUgY2FsbGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZWRpcmVjdHNSZW1haW5pbmcgPSB0aGlzLl9tYXhSZWRpcmVjdHM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSAmJlxuICAgICAgICAgICAgICAgICAgICBIdHRwUmVkaXJlY3RDb2Rlcy5pbmNsdWRlcyhyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUpICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3RzICYmXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0c1JlbWFpbmluZyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RVcmwgPSByZXNwb25zZS5tZXNzYWdlLmhlYWRlcnNbJ2xvY2F0aW9uJ107XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVkaXJlY3RVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gbG9jYXRpb24gdG8gcmVkaXJlY3QgdG8sIHdlIHdvbid0XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRSZWRpcmVjdFVybCA9IG5ldyBVUkwocmVkaXJlY3RVcmwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkVXJsLnByb3RvY29sICE9PSBwYXJzZWRSZWRpcmVjdFVybC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuX2FsbG93UmVkaXJlY3REb3duZ3JhZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVkaXJlY3QgZnJvbSBIVFRQUyB0byBIVFRQIHByb3RvY29sLiBUaGlzIGRvd25ncmFkZSBpcyBub3QgYWxsb3dlZCBmb3Igc2VjdXJpdHkgcmVhc29ucy4gSWYgeW91IHdhbnQgdG8gYWxsb3cgdGhpcyBiZWhhdmlvciwgc2V0IHRoZSBhbGxvd1JlZGlyZWN0RG93bmdyYWRlIG9wdGlvbiB0byB0cnVlLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gZmluaXNoIHJlYWRpbmcgdGhlIHJlc3BvbnNlIGJlZm9yZSByZWFzc2lnbmluZyByZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCB3aWxsIGxlYWsgdGhlIG9wZW4gc29ja2V0LlxuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXNwb25zZS5yZWFkQm9keSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBzdHJpcCBhdXRob3JpemF0aW9uIGhlYWRlciBpZiByZWRpcmVjdGVkIHRvIGEgZGlmZmVyZW50IGhvc3RuYW1lXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZWRSZWRpcmVjdFVybC5ob3N0bmFtZSAhPT0gcGFyc2VkVXJsLmhvc3RuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGVhZGVyIG5hbWVzIGFyZSBjYXNlIGluc2Vuc2l0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWRlci50b0xvd2VyQ2FzZSgpID09PSAnYXV0aG9yaXphdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGhlYWRlcnNbaGVhZGVyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgbWFrZSB0aGUgcmVxdWVzdCB3aXRoIHRoZSBuZXcgcmVkaXJlY3RVcmxcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuX3ByZXBhcmVSZXF1ZXN0KHZlcmIsIHBhcnNlZFJlZGlyZWN0VXJsLCBoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB5aWVsZCB0aGlzLnJlcXVlc3RSYXcoaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0c1JlbWFpbmluZy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSB8fFxuICAgICAgICAgICAgICAgICAgICAhSHR0cFJlc3BvbnNlUmV0cnlDb2Rlcy5pbmNsdWRlcyhyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCBhIHJldHJ5IGNvZGUsIHJldHVybiBpbW1lZGlhdGVseSBpbnN0ZWFkIG9mIHJldHJ5aW5nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbnVtVHJpZXMgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAobnVtVHJpZXMgPCBtYXhUcmllcykge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXNwb25zZS5yZWFkQm9keSgpO1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9wZXJmb3JtRXhwb25lbnRpYWxCYWNrb2ZmKG51bVRyaWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChudW1UcmllcyA8IG1heFRyaWVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5lZWRzIHRvIGJlIGNhbGxlZCBpZiBrZWVwQWxpdmUgaXMgc2V0IHRvIHRydWUgaW4gcmVxdWVzdCBvcHRpb25zLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hZ2VudCkge1xuICAgICAgICAgICAgdGhpcy5fYWdlbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmF3IHJlcXVlc3QuXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHJlcXVlc3RSYXcoaW5mbywgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjYWxsYmFja0ZvclJlc3VsdChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBgZXJyYCBpcyBub3QgcGFzc2VkLCB0aGVuIGByZXNgIG11c3QgYmUgcGFzc2VkLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVW5rbm93biBlcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RSYXdXaXRoQ2FsbGJhY2soaW5mbywgZGF0YSwgY2FsbGJhY2tGb3JSZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSYXcgcmVxdWVzdCB3aXRoIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gb25SZXN1bHRcbiAgICAgKi9cbiAgICByZXF1ZXN0UmF3V2l0aENhbGxiYWNrKGluZm8sIGRhdGEsIG9uUmVzdWx0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghaW5mby5vcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpbmZvLm9wdGlvbnMuaGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhLCAndXRmOCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjYWxsYmFja0NhbGxlZCA9IGZhbHNlO1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZXN1bHQoZXJyLCByZXMpIHtcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2tDYWxsZWQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja0NhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgb25SZXN1bHQoZXJyLCByZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcSA9IGluZm8uaHR0cE1vZHVsZS5yZXF1ZXN0KGluZm8ub3B0aW9ucywgKG1zZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gbmV3IEh0dHBDbGllbnRSZXNwb25zZShtc2cpO1xuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KHVuZGVmaW5lZCwgcmVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzb2NrZXQ7XG4gICAgICAgIHJlcS5vbignc29ja2V0Jywgc29jayA9PiB7XG4gICAgICAgICAgICBzb2NrZXQgPSBzb2NrO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgd2UgZXZlciBnZXQgZGlzY29ubmVjdGVkLCB3ZSB3YW50IHRoZSBzb2NrZXQgdG8gdGltZW91dCBldmVudHVhbGx5XG4gICAgICAgIHJlcS5zZXRUaW1lb3V0KHRoaXMuX3NvY2tldFRpbWVvdXQgfHwgMyAqIDYwMDAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgc29ja2V0LmVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KG5ldyBFcnJvcihgUmVxdWVzdCB0aW1lb3V0OiAke2luZm8ub3B0aW9ucy5wYXRofWApKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAvLyBlcnIgaGFzIHN0YXR1c0NvZGUgcHJvcGVydHlcbiAgICAgICAgICAgIC8vIHJlcyBzaG91bGQgaGF2ZSBoZWFkZXJzXG4gICAgICAgICAgICBoYW5kbGVSZXN1bHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVxLndyaXRlKGRhdGEsICd1dGY4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXEuZW5kKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRhdGEucGlwZShyZXEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVxLmVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gaHR0cCBhZ2VudC4gVGhpcyBmdW5jdGlvbiBpcyB1c2VmdWwgd2hlbiB5b3UgbmVlZCBhbiBodHRwIGFnZW50IHRoYXQgaGFuZGxlc1xuICAgICAqIHJvdXRpbmcgdGhyb3VnaCBhIHByb3h5IHNlcnZlciAtIGRlcGVuZGluZyB1cG9uIHRoZSB1cmwgYW5kIHByb3h5IGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAgICAgKiBAcGFyYW0gc2VydmVyVXJsICBUaGUgc2VydmVyIFVSTCB3aGVyZSB0aGUgcmVxdWVzdCB3aWxsIGJlIHNlbnQuIEZvciBleGFtcGxlLCBodHRwczovL2FwaS5naXRodWIuY29tXG4gICAgICovXG4gICAgZ2V0QWdlbnQoc2VydmVyVXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwoc2VydmVyVXJsKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFnZW50KHBhcnNlZFVybCk7XG4gICAgfVxuICAgIGdldEFnZW50RGlzcGF0Y2hlcihzZXJ2ZXJVcmwpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTChzZXJ2ZXJVcmwpO1xuICAgICAgICBjb25zdCBwcm94eVVybCA9IHBtLmdldFByb3h5VXJsKHBhcnNlZFVybCk7XG4gICAgICAgIGNvbnN0IHVzZVByb3h5ID0gcHJveHlVcmwgJiYgcHJveHlVcmwuaG9zdG5hbWU7XG4gICAgICAgIGlmICghdXNlUHJveHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJveHlBZ2VudERpc3BhdGNoZXIocGFyc2VkVXJsLCBwcm94eVVybCk7XG4gICAgfVxuICAgIF9wcmVwYXJlUmVxdWVzdChtZXRob2QsIHJlcXVlc3RVcmwsIGhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHt9O1xuICAgICAgICBpbmZvLnBhcnNlZFVybCA9IHJlcXVlc3RVcmw7XG4gICAgICAgIGNvbnN0IHVzaW5nU3NsID0gaW5mby5wYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgICAgICBpbmZvLmh0dHBNb2R1bGUgPSB1c2luZ1NzbCA/IGh0dHBzIDogaHR0cDtcbiAgICAgICAgY29uc3QgZGVmYXVsdFBvcnQgPSB1c2luZ1NzbCA/IDQ0MyA6IDgwO1xuICAgICAgICBpbmZvLm9wdGlvbnMgPSB7fTtcbiAgICAgICAgaW5mby5vcHRpb25zLmhvc3QgPSBpbmZvLnBhcnNlZFVybC5ob3N0bmFtZTtcbiAgICAgICAgaW5mby5vcHRpb25zLnBvcnQgPSBpbmZvLnBhcnNlZFVybC5wb3J0XG4gICAgICAgICAgICA/IHBhcnNlSW50KGluZm8ucGFyc2VkVXJsLnBvcnQpXG4gICAgICAgICAgICA6IGRlZmF1bHRQb3J0O1xuICAgICAgICBpbmZvLm9wdGlvbnMucGF0aCA9XG4gICAgICAgICAgICAoaW5mby5wYXJzZWRVcmwucGF0aG5hbWUgfHwgJycpICsgKGluZm8ucGFyc2VkVXJsLnNlYXJjaCB8fCAnJyk7XG4gICAgICAgIGluZm8ub3B0aW9ucy5tZXRob2QgPSBtZXRob2Q7XG4gICAgICAgIGluZm8ub3B0aW9ucy5oZWFkZXJzID0gdGhpcy5fbWVyZ2VIZWFkZXJzKGhlYWRlcnMpO1xuICAgICAgICBpZiAodGhpcy51c2VyQWdlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnNbJ3VzZXItYWdlbnQnXSA9IHRoaXMudXNlckFnZW50O1xuICAgICAgICB9XG4gICAgICAgIGluZm8ub3B0aW9ucy5hZ2VudCA9IHRoaXMuX2dldEFnZW50KGluZm8ucGFyc2VkVXJsKTtcbiAgICAgICAgLy8gZ2l2ZXMgaGFuZGxlcnMgYW4gb3Bwb3J0dW5pdHkgdG8gcGFydGljaXBhdGVcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLmhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5wcmVwYXJlUmVxdWVzdChpbmZvLm9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICBfbWVyZ2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdE9wdGlvbnMgJiYgdGhpcy5yZXF1ZXN0T3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbG93ZXJjYXNlS2V5cyh0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpLCBsb3dlcmNhc2VLZXlzKGhlYWRlcnMgfHwge30pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG93ZXJjYXNlS2V5cyhoZWFkZXJzIHx8IHt9KTtcbiAgICB9XG4gICAgX2dldEV4aXN0aW5nT3JEZWZhdWx0SGVhZGVyKGFkZGl0aW9uYWxIZWFkZXJzLCBoZWFkZXIsIF9kZWZhdWx0KSB7XG4gICAgICAgIGxldCBjbGllbnRIZWFkZXI7XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zICYmIHRoaXMucmVxdWVzdE9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgICAgY2xpZW50SGVhZGVyID0gbG93ZXJjYXNlS2V5cyh0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpW2hlYWRlcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxIZWFkZXJzW2hlYWRlcl0gfHwgY2xpZW50SGVhZGVyIHx8IF9kZWZhdWx0O1xuICAgIH1cbiAgICBfZ2V0QWdlbnQocGFyc2VkVXJsKSB7XG4gICAgICAgIGxldCBhZ2VudDtcbiAgICAgICAgY29uc3QgcHJveHlVcmwgPSBwbS5nZXRQcm94eVVybChwYXJzZWRVcmwpO1xuICAgICAgICBjb25zdCB1c2VQcm94eSA9IHByb3h5VXJsICYmIHByb3h5VXJsLmhvc3RuYW1lO1xuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmIHVzZVByb3h5KSB7XG4gICAgICAgICAgICBhZ2VudCA9IHRoaXMuX3Byb3h5QWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2tlZXBBbGl2ZSAmJiAhdXNlUHJveHkpIHtcbiAgICAgICAgICAgIGFnZW50ID0gdGhpcy5fYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgYWdlbnQgaXMgYWxyZWFkeSBhc3NpZ25lZCB1c2UgdGhhdCBhZ2VudC5cbiAgICAgICAgaWYgKGFnZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNpbmdTc2wgPSBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgICAgICBsZXQgbWF4U29ja2V0cyA9IDEwMDtcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIG1heFNvY2tldHMgPSB0aGlzLnJlcXVlc3RPcHRpb25zLm1heFNvY2tldHMgfHwgaHR0cC5nbG9iYWxBZ2VudC5tYXhTb2NrZXRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgYHVzZVByb3h5YCBhZ2FpbiwgYnV0IHdlIG5lZWQgdG8gY2hlY2sgYHByb3h5VVJsYCBkaXJlY3RseSBmb3IgVHlwZVNjcmlwdHMncyBmbG93IGFuYWx5c2lzLlxuICAgICAgICBpZiAocHJveHlVcmwgJiYgcHJveHlVcmwuaG9zdG5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGFnZW50T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBtYXhTb2NrZXRzLFxuICAgICAgICAgICAgICAgIGtlZXBBbGl2ZTogdGhpcy5fa2VlcEFsaXZlLFxuICAgICAgICAgICAgICAgIHByb3h5OiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sICgocHJveHlVcmwudXNlcm5hbWUgfHwgcHJveHlVcmwucGFzc3dvcmQpICYmIHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHlBdXRoOiBgJHtwcm94eVVybC51c2VybmFtZX06JHtwcm94eVVybC5wYXNzd29yZH1gXG4gICAgICAgICAgICAgICAgfSkpLCB7IGhvc3Q6IHByb3h5VXJsLmhvc3RuYW1lLCBwb3J0OiBwcm94eVVybC5wb3J0IH0pXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHR1bm5lbEFnZW50O1xuICAgICAgICAgICAgY29uc3Qgb3Zlckh0dHBzID0gcHJveHlVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgICAgICAgICAgaWYgKHVzaW5nU3NsKSB7XG4gICAgICAgICAgICAgICAgdHVubmVsQWdlbnQgPSBvdmVySHR0cHMgPyB0dW5uZWwuaHR0cHNPdmVySHR0cHMgOiB0dW5uZWwuaHR0cHNPdmVySHR0cDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHR1bm5lbEFnZW50ID0gb3Zlckh0dHBzID8gdHVubmVsLmh0dHBPdmVySHR0cHMgOiB0dW5uZWwuaHR0cE92ZXJIdHRwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWdlbnQgPSB0dW5uZWxBZ2VudChhZ2VudE9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fcHJveHlBZ2VudCA9IGFnZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHJldXNpbmcgYWdlbnQgYWNyb3NzIHJlcXVlc3QgYW5kIHR1bm5lbGluZyBhZ2VudCBpc24ndCBhc3NpZ25lZCBjcmVhdGUgYSBuZXcgYWdlbnRcbiAgICAgICAgaWYgKHRoaXMuX2tlZXBBbGl2ZSAmJiAhYWdlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGtlZXBBbGl2ZTogdGhpcy5fa2VlcEFsaXZlLCBtYXhTb2NrZXRzIH07XG4gICAgICAgICAgICBhZ2VudCA9IHVzaW5nU3NsID8gbmV3IGh0dHBzLkFnZW50KG9wdGlvbnMpIDogbmV3IGh0dHAuQWdlbnQob3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9hZ2VudCA9IGFnZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIG5vdCB1c2luZyBwcml2YXRlIGFnZW50IGFuZCB0dW5uZWwgYWdlbnQgaXNuJ3Qgc2V0dXAgdGhlbiB1c2UgZ2xvYmFsIGFnZW50XG4gICAgICAgIGlmICghYWdlbnQpIHtcbiAgICAgICAgICAgIGFnZW50ID0gdXNpbmdTc2wgPyBodHRwcy5nbG9iYWxBZ2VudCA6IGh0dHAuZ2xvYmFsQWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzaW5nU3NsICYmIHRoaXMuX2lnbm9yZVNzbEVycm9yKSB7XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIHNldCBOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEPTAgc2luY2UgdGhhdCB3aWxsIGFmZmVjdCByZXF1ZXN0IGZvciBlbnRpcmUgcHJvY2Vzc1xuICAgICAgICAgICAgLy8gaHR0cC5SZXF1ZXN0T3B0aW9ucyBkb2Vzbid0IGV4cG9zZSBhIHdheSB0byBtb2RpZnkgUmVxdWVzdE9wdGlvbnMuYWdlbnQub3B0aW9uc1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBjYXN0IGl0IHRvIGFueSBhbmQgY2hhbmdlIGl0IGRpcmVjdGx5XG4gICAgICAgICAgICBhZ2VudC5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihhZ2VudC5vcHRpb25zIHx8IHt9LCB7XG4gICAgICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFnZW50O1xuICAgIH1cbiAgICBfZ2V0UHJveHlBZ2VudERpc3BhdGNoZXIocGFyc2VkVXJsLCBwcm94eVVybCkge1xuICAgICAgICBsZXQgcHJveHlBZ2VudDtcbiAgICAgICAgaWYgKHRoaXMuX2tlZXBBbGl2ZSkge1xuICAgICAgICAgICAgcHJveHlBZ2VudCA9IHRoaXMuX3Byb3h5QWdlbnREaXNwYXRjaGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGFnZW50IGlzIGFscmVhZHkgYXNzaWduZWQgdXNlIHRoYXQgYWdlbnQuXG4gICAgICAgIGlmIChwcm94eUFnZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJveHlBZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2luZ1NzbCA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgIHByb3h5QWdlbnQgPSBuZXcgdW5kaWNpXzEuUHJveHlBZ2VudChPYmplY3QuYXNzaWduKHsgdXJpOiBwcm94eVVybC5ocmVmLCBwaXBlbGluaW5nOiAhdGhpcy5fa2VlcEFsaXZlID8gMCA6IDEgfSwgKChwcm94eVVybC51c2VybmFtZSB8fCBwcm94eVVybC5wYXNzd29yZCkgJiYge1xuICAgICAgICAgICAgdG9rZW46IGAke3Byb3h5VXJsLnVzZXJuYW1lfToke3Byb3h5VXJsLnBhc3N3b3JkfWBcbiAgICAgICAgfSkpKTtcbiAgICAgICAgdGhpcy5fcHJveHlBZ2VudERpc3BhdGNoZXIgPSBwcm94eUFnZW50O1xuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5faWdub3JlU3NsRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gc2V0IE5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQ9MCBzaW5jZSB0aGF0IHdpbGwgYWZmZWN0IHJlcXVlc3QgZm9yIGVudGlyZSBwcm9jZXNzXG4gICAgICAgICAgICAvLyBodHRwLlJlcXVlc3RPcHRpb25zIGRvZXNuJ3QgZXhwb3NlIGEgd2F5IHRvIG1vZGlmeSBSZXF1ZXN0T3B0aW9ucy5hZ2VudC5vcHRpb25zXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGNhc3QgaXQgdG8gYW55IGFuZCBjaGFuZ2UgaXQgZGlyZWN0bHlcbiAgICAgICAgICAgIHByb3h5QWdlbnQub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ocHJveHlBZ2VudC5vcHRpb25zLnJlcXVlc3RUbHMgfHwge30sIHtcbiAgICAgICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJveHlBZ2VudDtcbiAgICB9XG4gICAgX3BlcmZvcm1FeHBvbmVudGlhbEJhY2tvZmYocmV0cnlOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHJ5TnVtYmVyID0gTWF0aC5taW4oRXhwb25lbnRpYWxCYWNrb2ZmQ2VpbGluZywgcmV0cnlOdW1iZXIpO1xuICAgICAgICAgICAgY29uc3QgbXMgPSBFeHBvbmVudGlhbEJhY2tvZmZUaW1lU2xpY2UgKiBNYXRoLnBvdygyLCByZXRyeU51bWJlcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgbXMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9wcm9jZXNzUmVzcG9uc2UocmVzLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXMubWVzc2FnZS5zdGF0dXNDb2RlIHx8IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge31cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIG5vdCBmb3VuZCBsZWFkcyB0byBudWxsIG9iaiByZXR1cm5lZFxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXNDb2RlID09PSBIdHRwQ29kZXMuTm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcmVzdWx0IGZyb20gdGhlIGJvZHlcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkYXRlVGltZURlc2VyaWFsaXplcihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihhLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBvYmo7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRzO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzID0geWllbGQgcmVzLnJlYWRCb2R5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50cyAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRlc2VyaWFsaXplRGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKGNvbnRlbnRzLCBkYXRlVGltZURlc2VyaWFsaXplcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKGNvbnRlbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdCA9IG9iajtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzID0gcmVzLm1lc3NhZ2UuaGVhZGVycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIHJlc291cmNlIChjb250ZW50cyBub3QganNvbik7ICBsZWF2aW5nIHJlc3VsdCBvYmogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBub3RlIHRoYXQgM3h4IHJlZGlyZWN0cyBhcmUgaGFuZGxlZCBieSB0aGUgaHR0cCBsYXllci5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSA+IDI5OSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBleGNlcHRpb24vZXJyb3IgaW4gYm9keSwgYXR0ZW1wdCB0byBnZXQgYmV0dGVyIGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogJiYgb2JqLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IG9iai5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRlbnRzICYmIGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0IG1heSBiZSB0aGUgY2FzZSB0aGF0IHRoZSBleGNlcHRpb24gaXMgaW4gdGhlIGJvZHkgbWVzc2FnZSBhcyBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IGNvbnRlbnRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXNnID0gYEZhaWxlZCByZXF1ZXN0OiAoJHtzdGF0dXNDb2RlfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBIdHRwQ2xpZW50RXJyb3IobXNnLCBzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZXJyLnJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuSHR0cENsaWVudCA9IEh0dHBDbGllbnQ7XG5jb25zdCBsb3dlcmNhc2VLZXlzID0gKG9iaikgPT4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKGMsIGspID0+ICgoY1trLnRvTG93ZXJDYXNlKCldID0gb2JqW2tdKSwgYyksIHt9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsCiAgIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBlcnNvbmFsQWNjZXNzVG9rZW5DcmVkZW50aWFsSGFuZGxlciA9IGV4cG9ydHMuQmVhcmVyQ3JlZGVudGlhbEhhbmRsZXIgPSBleHBvcnRzLkJhc2ljQ3JlZGVudGlhbEhhbmRsZXIgPSB2b2lkIDA7XG5jbGFzcyBCYXNpY0NyZWRlbnRpYWxIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgfVxuICAgIHByZXBhcmVSZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUaGUgcmVxdWVzdCBoYXMgbm8gaGVhZGVycycpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJhc2ljICR7QnVmZmVyLmZyb20oYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLnBhc3N3b3JkfWApLnRvU3RyaW5nKCdiYXNlNjQnKX1gO1xuICAgIH1cbiAgICAvLyBUaGlzIGhhbmRsZXIgY2Fubm90IGhhbmRsZSA0MDFcbiAgICBjYW5IYW5kbGVBdXRoZW50aWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYW5kbGVBdXRoZW50aWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuQmFzaWNDcmVkZW50aWFsSGFuZGxlciA9IEJhc2ljQ3JlZGVudGlhbEhhbmRsZXI7XG5jbGFzcyBCZWFyZXJDcmVkZW50aWFsSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IodG9rZW4pIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIH1cbiAgICAvLyBjdXJyZW50bHkgaW1wbGVtZW50cyBwcmUtYXV0aG9yaXphdGlvblxuICAgIC8vIFRPRE86IHN1cHBvcnQgcHJlQXV0aCA9IGZhbHNlIHdoZXJlIGl0IGhvb2tzIG9uIDQwMVxuICAgIHByZXBhcmVSZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUaGUgcmVxdWVzdCBoYXMgbm8gaGVhZGVycycpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3RoaXMudG9rZW59YDtcbiAgICB9XG4gICAgLy8gVGhpcyBoYW5kbGVyIGNhbm5vdCBoYW5kbGUgNDAxXG4gICAgY2FuSGFuZGxlQXV0aGVudGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFuZGxlQXV0aGVudGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkJlYXJlckNyZWRlbnRpYWxIYW5kbGVyID0gQmVhcmVyQ3JlZGVudGlhbEhhbmRsZXI7XG5jbGFzcyBQZXJzb25hbEFjY2Vzc1Rva2VuQ3JlZGVudGlhbEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKHRva2VuKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB9XG4gICAgLy8gY3VycmVudGx5IGltcGxlbWVudHMgcHJlLWF1dGhvcml6YXRpb25cbiAgICAvLyBUT0RPOiBzdXBwb3J0IHByZUF1dGggPSBmYWxzZSB3aGVyZSBpdCBob29rcyBvbiA0MDFcbiAgICBwcmVwYXJlUmVxdWVzdChvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGhlIHJlcXVlc3QgaGFzIG5vIGhlYWRlcnMnKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCYXNpYyAke0J1ZmZlci5mcm9tKGBQQVQ6JHt0aGlzLnRva2VufWApLnRvU3RyaW5nKCdiYXNlNjQnKX1gO1xuICAgIH1cbiAgICAvLyBUaGlzIGhhbmRsZXIgY2Fubm90IGhhbmRsZSA0MDFcbiAgICBjYW5IYW5kbGVBdXRoZW50aWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYW5kbGVBdXRoZW50aWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuUGVyc29uYWxBY2Nlc3NUb2tlbkNyZWRlbnRpYWxIYW5kbGVyID0gUGVyc29uYWxBY2Nlc3NUb2tlbkNyZWRlbnRpYWxIYW5kbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5qcy5tYXAiLAogICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PaWRjQ2xpZW50ID0gdm9pZCAwO1xuY29uc3QgaHR0cF9jbGllbnRfMSA9IHJlcXVpcmUoXCJAYWN0aW9ucy9odHRwLWNsaWVudFwiKTtcbmNvbnN0IGF1dGhfMSA9IHJlcXVpcmUoXCJAYWN0aW9ucy9odHRwLWNsaWVudC9saWIvYXV0aFwiKTtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCIuL2NvcmVcIik7XG5jbGFzcyBPaWRjQ2xpZW50IHtcbiAgICBzdGF0aWMgY3JlYXRlSHR0cENsaWVudChhbGxvd1JldHJ5ID0gdHJ1ZSwgbWF4UmV0cnkgPSAxMCkge1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFsbG93UmV0cmllczogYWxsb3dSZXRyeSxcbiAgICAgICAgICAgIG1heFJldHJpZXM6IG1heFJldHJ5XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgaHR0cF9jbGllbnRfMS5IdHRwQ2xpZW50KCdhY3Rpb25zL29pZGMtY2xpZW50JywgW25ldyBhdXRoXzEuQmVhcmVyQ3JlZGVudGlhbEhhbmRsZXIoT2lkY0NsaWVudC5nZXRSZXF1ZXN0VG9rZW4oKSldLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRSZXF1ZXN0VG9rZW4oKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gcHJvY2Vzcy5lbnZbJ0FDVElPTlNfSURfVE9LRU5fUkVRVUVTVF9UT0tFTiddO1xuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgQUNUSU9OU19JRF9UT0tFTl9SRVFVRVNUX1RPS0VOIGVudiB2YXJpYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gICAgc3RhdGljIGdldElEVG9rZW5VcmwoKSB7XG4gICAgICAgIGNvbnN0IHJ1bnRpbWVVcmwgPSBwcm9jZXNzLmVudlsnQUNUSU9OU19JRF9UT0tFTl9SRVFVRVNUX1VSTCddO1xuICAgICAgICBpZiAoIXJ1bnRpbWVVcmwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGdldCBBQ1RJT05TX0lEX1RPS0VOX1JFUVVFU1RfVVJMIGVudiB2YXJpYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydW50aW1lVXJsO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0Q2FsbChpZF90b2tlbl91cmwpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgaHR0cGNsaWVudCA9IE9pZGNDbGllbnQuY3JlYXRlSHR0cENsaWVudCgpO1xuICAgICAgICAgICAgY29uc3QgcmVzID0geWllbGQgaHR0cGNsaWVudFxuICAgICAgICAgICAgICAgIC5nZXRKc29uKGlkX3Rva2VuX3VybClcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGdldCBJRCBUb2tlbi4gXFxuIFxuICAgICAgICBFcnJvciBDb2RlIDogJHtlcnJvci5zdGF0dXNDb2RlfVxcbiBcbiAgICAgICAgRXJyb3IgTWVzc2FnZTogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBpZF90b2tlbiA9IChfYSA9IHJlcy5yZXN1bHQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52YWx1ZTtcbiAgICAgICAgICAgIGlmICghaWRfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc3BvbnNlIGpzb24gYm9keSBkbyBub3QgaGF2ZSBJRCBUb2tlbiBmaWVsZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlkX3Rva2VuO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGdldElEVG9rZW4oYXVkaWVuY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gTmV3IElEIFRva2VuIGlzIHJlcXVlc3RlZCBmcm9tIGFjdGlvbiBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgbGV0IGlkX3Rva2VuX3VybCA9IE9pZGNDbGllbnQuZ2V0SURUb2tlblVybCgpO1xuICAgICAgICAgICAgICAgIGlmIChhdWRpZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmNvZGVkQXVkaWVuY2UgPSBlbmNvZGVVUklDb21wb25lbnQoYXVkaWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZF90b2tlbl91cmwgPSBgJHtpZF90b2tlbl91cmx9JmF1ZGllbmNlPSR7ZW5jb2RlZEF1ZGllbmNlfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvcmVfMS5kZWJ1ZyhgSUQgdG9rZW4gdXJsIGlzICR7aWRfdG9rZW5fdXJsfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkX3Rva2VuID0geWllbGQgT2lkY0NsaWVudC5nZXRDYWxsKGlkX3Rva2VuX3VybCk7XG4gICAgICAgICAgICAgICAgY29yZV8xLnNldFNlY3JldChpZF90b2tlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkX3Rva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBtZXNzYWdlOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuT2lkY0NsaWVudCA9IE9pZGNDbGllbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vaWRjLXV0aWxzLmpzLm1hcCIsCiAgIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN1bW1hcnkgPSBleHBvcnRzLm1hcmtkb3duU3VtbWFyeSA9IGV4cG9ydHMuU1VNTUFSWV9ET0NTX1VSTCA9IGV4cG9ydHMuU1VNTUFSWV9FTlZfVkFSID0gdm9pZCAwO1xuY29uc3Qgb3NfMSA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCB7IGFjY2VzcywgYXBwZW5kRmlsZSwgd3JpdGVGaWxlIH0gPSBmc18xLnByb21pc2VzO1xuZXhwb3J0cy5TVU1NQVJZX0VOVl9WQVIgPSAnR0lUSFVCX1NURVBfU1VNTUFSWSc7XG5leHBvcnRzLlNVTU1BUllfRE9DU19VUkwgPSAnaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vYWN0aW9ucy91c2luZy13b3JrZmxvd3Mvd29ya2Zsb3ctY29tbWFuZHMtZm9yLWdpdGh1Yi1hY3Rpb25zI2FkZGluZy1hLWpvYi1zdW1tYXJ5JztcbmNsYXNzIFN1bW1hcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9idWZmZXIgPSAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIHN1bW1hcnkgZmlsZSBwYXRoIGZyb20gdGhlIGVudmlyb25tZW50LCByZWplY3RzIGlmIGVudiB2YXIgaXMgbm90IGZvdW5kIG9yIGZpbGUgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBBbHNvIGNoZWNrcyByL3cgcGVybWlzc2lvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBzdGVwIHN1bW1hcnkgZmlsZSBwYXRoXG4gICAgICovXG4gICAgZmlsZVBhdGgoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZmlsZVBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlsZVBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXRoRnJvbUVudiA9IHByb2Nlc3MuZW52W2V4cG9ydHMuU1VNTUFSWV9FTlZfVkFSXTtcbiAgICAgICAgICAgIGlmICghcGF0aEZyb21FbnYpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmaW5kIGVudmlyb25tZW50IHZhcmlhYmxlIGZvciAkJHtleHBvcnRzLlNVTU1BUllfRU5WX1ZBUn0uIENoZWNrIGlmIHlvdXIgcnVudGltZSBlbnZpcm9ubWVudCBzdXBwb3J0cyBqb2Igc3VtbWFyaWVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCBhY2Nlc3MocGF0aEZyb21FbnYsIGZzXzEuY29uc3RhbnRzLlJfT0sgfCBmc18xLmNvbnN0YW50cy5XX09LKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGFjY2VzcyBzdW1tYXJ5IGZpbGU6ICcke3BhdGhGcm9tRW52fScuIENoZWNrIGlmIHRoZSBmaWxlIGhhcyBjb3JyZWN0IHJlYWQvd3JpdGUgcGVybWlzc2lvbnMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9maWxlUGF0aCA9IHBhdGhGcm9tRW52O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVQYXRoO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JhcHMgY29udGVudCBpbiBhbiBIVE1MIHRhZywgYWRkaW5nIGFueSBIVE1MIGF0dHJpYnV0ZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgSFRNTCB0YWcgdG8gd3JhcFxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gY29udGVudCBjb250ZW50IHdpdGhpbiB0aGUgdGFnXG4gICAgICogQHBhcmFtIHtbYXR0cmlidXRlOiBzdHJpbmddOiBzdHJpbmd9IGF0dHJzIGtleS12YWx1ZSBsaXN0IG9mIEhUTUwgYXR0cmlidXRlcyB0byBhZGRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgd3JhcHBlZCBpbiBIVE1MIGVsZW1lbnRcbiAgICAgKi9cbiAgICB3cmFwKHRhZywgY29udGVudCwgYXR0cnMgPSB7fSkge1xuICAgICAgICBjb25zdCBodG1sQXR0cnMgPSBPYmplY3QuZW50cmllcyhhdHRycylcbiAgICAgICAgICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gYCAke2tleX09XCIke3ZhbHVlfVwiYClcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYDwke3RhZ30ke2h0bWxBdHRyc30+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYDwke3RhZ30ke2h0bWxBdHRyc30+JHtjb250ZW50fTwvJHt0YWd9PmA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyB0ZXh0IGluIHRoZSBidWZmZXIgdG8gdGhlIHN1bW1hcnkgYnVmZmVyIGZpbGUgYW5kIGVtcHRpZXMgYnVmZmVyLiBXaWxsIGFwcGVuZCBieSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdW1tYXJ5V3JpdGVPcHRpb25zfSBbb3B0aW9uc10gKG9wdGlvbmFsKSBvcHRpb25zIGZvciB3cml0ZSBvcGVyYXRpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFN1bW1hcnk+fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgd3JpdGUob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3Qgb3ZlcndyaXRlID0gISEob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm92ZXJ3cml0ZSk7XG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHlpZWxkIHRoaXMuZmlsZVBhdGgoKTtcbiAgICAgICAgICAgIGNvbnN0IHdyaXRlRnVuYyA9IG92ZXJ3cml0ZSA/IHdyaXRlRmlsZSA6IGFwcGVuZEZpbGU7XG4gICAgICAgICAgICB5aWVsZCB3cml0ZUZ1bmMoZmlsZVBhdGgsIHRoaXMuX2J1ZmZlciwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlCdWZmZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgc3VtbWFyeSBidWZmZXIgYW5kIHdpcGVzIHRoZSBzdW1tYXJ5IGZpbGVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbXB0eUJ1ZmZlcigpLndyaXRlKHsgb3ZlcndyaXRlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzdW1tYXJ5IGJ1ZmZlciBhcyBhIHN0cmluZ1xuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gc3RyaW5nIG9mIHN1bW1hcnkgYnVmZmVyXG4gICAgICovXG4gICAgc3RyaW5naWZ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgc3VtbWFyeSBidWZmZXIgaXMgZW1wdHlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZW59IHRydWUgaWYgdGhlIGJ1ZmZlciBpcyBlbXB0eVxuICAgICAqL1xuICAgIGlzRW1wdHlCdWZmZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXIubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIHN1bW1hcnkgYnVmZmVyIHdpdGhvdXQgd3JpdGluZyB0byBzdW1tYXJ5IGZpbGVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgZW1wdHlCdWZmZXIoKSB7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9ICcnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyByYXcgdGV4dCB0byB0aGUgc3VtbWFyeSBidWZmZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IGNvbnRlbnQgdG8gYWRkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbYWRkRU9MPWZhbHNlXSAob3B0aW9uYWwpIGFwcGVuZCBhbiBFT0wgdG8gdGhlIHJhdyB0ZXh0IChkZWZhdWx0OiBmYWxzZSlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkUmF3KHRleHQsIGFkZEVPTCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2J1ZmZlciArPSB0ZXh0O1xuICAgICAgICByZXR1cm4gYWRkRU9MID8gdGhpcy5hZGRFT0woKSA6IHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIG9wZXJhdGluZyBzeXN0ZW0tc3BlY2lmaWMgZW5kLW9mLWxpbmUgbWFya2VyIHRvIHRoZSBidWZmZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkRU9MKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRSYXcob3NfMS5FT0wpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIEhUTUwgY29kZWJsb2NrIHRvIHRoZSBzdW1tYXJ5IGJ1ZmZlclxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgY29udGVudCB0byByZW5kZXIgd2l0aGluIGZlbmNlZCBjb2RlIGJsb2NrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgKG9wdGlvbmFsKSBsYW5ndWFnZSB0byBzeW50YXggaGlnaGxpZ2h0IGNvZGVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkQ29kZUJsb2NrKGNvZGUsIGxhbmcpIHtcbiAgICAgICAgY29uc3QgYXR0cnMgPSBPYmplY3QuYXNzaWduKHt9LCAobGFuZyAmJiB7IGxhbmcgfSkpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy53cmFwKCdwcmUnLCB0aGlzLndyYXAoJ2NvZGUnLCBjb2RlKSwgYXR0cnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRSYXcoZWxlbWVudCkuYWRkRU9MKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gSFRNTCBsaXN0IHRvIHRoZSBzdW1tYXJ5IGJ1ZmZlclxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gaXRlbXMgbGlzdCBvZiBpdGVtcyB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcmRlcmVkPWZhbHNlXSAob3B0aW9uYWwpIGlmIHRoZSByZW5kZXJlZCBsaXN0IHNob3VsZCBiZSBvcmRlcmVkIG9yIG5vdCAoZGVmYXVsdDogZmFsc2UpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3VtbWFyeX0gc3VtbWFyeSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZExpc3QoaXRlbXMsIG9yZGVyZWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB0YWcgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCc7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IGl0ZW1zLm1hcChpdGVtID0+IHRoaXMud3JhcCgnbGknLCBpdGVtKSkuam9pbignJyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLndyYXAodGFnLCBsaXN0SXRlbXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRSYXcoZWxlbWVudCkuYWRkRU9MKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gSFRNTCB0YWJsZSB0byB0aGUgc3VtbWFyeSBidWZmZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3VtbWFyeVRhYmxlQ2VsbFtdfSByb3dzIHRhYmxlIHJvd3NcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkVGFibGUocm93cykge1xuICAgICAgICBjb25zdCB0YWJsZUJvZHkgPSByb3dzXG4gICAgICAgICAgICAubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IHJvd1xuICAgICAgICAgICAgICAgIC5tYXAoY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjZWxsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53cmFwKCd0ZCcsIGNlbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IGhlYWRlciwgZGF0YSwgY29sc3Bhbiwgcm93c3BhbiB9ID0gY2VsbDtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSBoZWFkZXIgPyAndGgnIDogJ3RkJztcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgKGNvbHNwYW4gJiYgeyBjb2xzcGFuIH0pKSwgKHJvd3NwYW4gJiYgeyByb3dzcGFuIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53cmFwKHRhZywgZGF0YSwgYXR0cnMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53cmFwKCd0cicsIGNlbGxzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMud3JhcCgndGFibGUnLCB0YWJsZUJvZHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRSYXcoZWxlbWVudCkuYWRkRU9MKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBjb2xsYXBzYWJsZSBIVE1MIGRldGFpbHMgZWxlbWVudCB0byB0aGUgc3VtbWFyeSBidWZmZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCB0ZXh0IGZvciB0aGUgY2xvc2VkIHN0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgY29sbGFwc2FibGUgY29udGVudFxuICAgICAqXG4gICAgICogQHJldHVybnMge1N1bW1hcnl9IHN1bW1hcnkgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGREZXRhaWxzKGxhYmVsLCBjb250ZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLndyYXAoJ2RldGFpbHMnLCB0aGlzLndyYXAoJ3N1bW1hcnknLCBsYWJlbCkgKyBjb250ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkUmF3KGVsZW1lbnQpLmFkZEVPTCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIEhUTUwgaW1hZ2UgdGFnIHRvIHRoZSBzdW1tYXJ5IGJ1ZmZlclxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNyYyBwYXRoIHRvIHRoZSBpbWFnZSB5b3UgdG8gZW1iZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWx0IHRleHQgZGVzY3JpcHRpb24gb2YgdGhlIGltYWdlXG4gICAgICogQHBhcmFtIHtTdW1tYXJ5SW1hZ2VPcHRpb25zfSBvcHRpb25zIChvcHRpb25hbCkgYWRkaXRpb24gaW1hZ2UgYXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHJldHVybnMge1N1bW1hcnl9IHN1bW1hcnkgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRJbWFnZShzcmMsIGFsdCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGNvbnN0IGF0dHJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCAod2lkdGggJiYgeyB3aWR0aCB9KSksIChoZWlnaHQgJiYgeyBoZWlnaHQgfSkpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy53cmFwKCdpbWcnLCBudWxsLCBPYmplY3QuYXNzaWduKHsgc3JjLCBhbHQgfSwgYXR0cnMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkUmF3KGVsZW1lbnQpLmFkZEVPTCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIEhUTUwgc2VjdGlvbiBoZWFkaW5nIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IGhlYWRpbmcgdGV4dFxuICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSBbbGV2ZWw9MV0gKG9wdGlvbmFsKSB0aGUgaGVhZGluZyBsZXZlbCwgZGVmYXVsdDogMVxuICAgICAqXG4gICAgICogQHJldHVybnMge1N1bW1hcnl9IHN1bW1hcnkgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRIZWFkaW5nKHRleHQsIGxldmVsKSB7XG4gICAgICAgIGNvbnN0IHRhZyA9IGBoJHtsZXZlbH1gO1xuICAgICAgICBjb25zdCBhbGxvd2VkVGFnID0gWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNiddLmluY2x1ZGVzKHRhZylcbiAgICAgICAgICAgID8gdGFnXG4gICAgICAgICAgICA6ICdoMSc7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLndyYXAoYWxsb3dlZFRhZywgdGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFJhdyhlbGVtZW50KS5hZGRFT0woKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBIVE1MIHRoZW1hdGljIGJyZWFrICg8aHI+KSB0byB0aGUgc3VtbWFyeSBidWZmZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkU2VwYXJhdG9yKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy53cmFwKCdocicsIG51bGwpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRSYXcoZWxlbWVudCkuYWRkRU9MKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gSFRNTCBsaW5lIGJyZWFrICg8YnI+KSB0byB0aGUgc3VtbWFyeSBidWZmZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkQnJlYWsoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLndyYXAoJ2JyJywgbnVsbCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFJhdyhlbGVtZW50KS5hZGRFT0woKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBIVE1MIGJsb2NrcXVvdGUgdG8gdGhlIHN1bW1hcnkgYnVmZmVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBxdW90ZSB0ZXh0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNpdGUgKG9wdGlvbmFsKSBjaXRhdGlvbiB1cmxcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdW1tYXJ5fSBzdW1tYXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkUXVvdGUodGV4dCwgY2l0ZSkge1xuICAgICAgICBjb25zdCBhdHRycyA9IE9iamVjdC5hc3NpZ24oe30sIChjaXRlICYmIHsgY2l0ZSB9KSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLndyYXAoJ2Jsb2NrcXVvdGUnLCB0ZXh0LCBhdHRycyk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFJhdyhlbGVtZW50KS5hZGRFT0woKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBIVE1MIGFuY2hvciB0YWcgdG8gdGhlIHN1bW1hcnkgYnVmZmVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBsaW5rIHRleHQvY29udGVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIGh5cGVybGlua1xuICAgICAqXG4gICAgICogQHJldHVybnMge1N1bW1hcnl9IHN1bW1hcnkgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRMaW5rKHRleHQsIGhyZWYpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMud3JhcCgnYScsIHRleHQsIHsgaHJlZiB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkUmF3KGVsZW1lbnQpLmFkZEVPTCgpO1xuICAgIH1cbn1cbmNvbnN0IF9zdW1tYXJ5ID0gbmV3IFN1bW1hcnkoKTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIGBjb3JlLnN1bW1hcnlgXG4gKi9cbmV4cG9ydHMubWFya2Rvd25TdW1tYXJ5ID0gX3N1bW1hcnk7XG5leHBvcnRzLnN1bW1hcnkgPSBfc3VtbWFyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1bW1hcnkuanMubWFwIiwKICAiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50b1BsYXRmb3JtUGF0aCA9IGV4cG9ydHMudG9XaW4zMlBhdGggPSBleHBvcnRzLnRvUG9zaXhQYXRoID0gdm9pZCAwO1xuY29uc3QgcGF0aCA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicGF0aFwiKSk7XG4vKipcbiAqIHRvUG9zaXhQYXRoIGNvbnZlcnRzIHRoZSBnaXZlbiBwYXRoIHRvIHRoZSBwb3NpeCBmb3JtLiBPbiBXaW5kb3dzLCBcXFxcIHdpbGwgYmVcbiAqIHJlcGxhY2VkIHdpdGggLy5cbiAqXG4gKiBAcGFyYW0gcHRoLiBQYXRoIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4gc3RyaW5nIFBvc2l4IHBhdGguXG4gKi9cbmZ1bmN0aW9uIHRvUG9zaXhQYXRoKHB0aCkge1xuICAgIHJldHVybiBwdGgucmVwbGFjZSgvW1xcXFxdL2csICcvJyk7XG59XG5leHBvcnRzLnRvUG9zaXhQYXRoID0gdG9Qb3NpeFBhdGg7XG4vKipcbiAqIHRvV2luMzJQYXRoIGNvbnZlcnRzIHRoZSBnaXZlbiBwYXRoIHRvIHRoZSB3aW4zMiBmb3JtLiBPbiBMaW51eCwgLyB3aWxsIGJlXG4gKiByZXBsYWNlZCB3aXRoIFxcXFwuXG4gKlxuICogQHBhcmFtIHB0aC4gUGF0aCB0byB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHN0cmluZyBXaW4zMiBwYXRoLlxuICovXG5mdW5jdGlvbiB0b1dpbjMyUGF0aChwdGgpIHtcbiAgICByZXR1cm4gcHRoLnJlcGxhY2UoL1svXS9nLCAnXFxcXCcpO1xufVxuZXhwb3J0cy50b1dpbjMyUGF0aCA9IHRvV2luMzJQYXRoO1xuLyoqXG4gKiB0b1BsYXRmb3JtUGF0aCBjb252ZXJ0cyB0aGUgZ2l2ZW4gcGF0aCB0byBhIHBsYXRmb3JtLXNwZWNpZmljIHBhdGguIEl0IGRvZXNcbiAqIHRoaXMgYnkgcmVwbGFjaW5nIGluc3RhbmNlcyBvZiAvIGFuZCBcXCB3aXRoIHRoZSBwbGF0Zm9ybS1zcGVjaWZpYyBwYXRoXG4gKiBzZXBhcmF0b3IuXG4gKlxuICogQHBhcmFtIHB0aCBUaGUgcGF0aCB0byBwbGF0Zm9ybWl6ZS5cbiAqIEByZXR1cm4gc3RyaW5nIFRoZSBwbGF0Zm9ybS1zcGVjaWZpYyBwYXRoLlxuICovXG5mdW5jdGlvbiB0b1BsYXRmb3JtUGF0aChwdGgpIHtcbiAgICByZXR1cm4gcHRoLnJlcGxhY2UoL1svXFxcXF0vZywgcGF0aC5zZXApO1xufVxuZXhwb3J0cy50b1BsYXRmb3JtUGF0aCA9IHRvUGxhdGZvcm1QYXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0aC11dGlscy5qcy5tYXAiLAogICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SURUb2tlbiA9IGV4cG9ydHMuZ2V0U3RhdGUgPSBleHBvcnRzLnNhdmVTdGF0ZSA9IGV4cG9ydHMuZ3JvdXAgPSBleHBvcnRzLmVuZEdyb3VwID0gZXhwb3J0cy5zdGFydEdyb3VwID0gZXhwb3J0cy5pbmZvID0gZXhwb3J0cy5ub3RpY2UgPSBleHBvcnRzLndhcm5pbmcgPSBleHBvcnRzLmVycm9yID0gZXhwb3J0cy5kZWJ1ZyA9IGV4cG9ydHMuaXNEZWJ1ZyA9IGV4cG9ydHMuc2V0RmFpbGVkID0gZXhwb3J0cy5zZXRDb21tYW5kRWNobyA9IGV4cG9ydHMuc2V0T3V0cHV0ID0gZXhwb3J0cy5nZXRCb29sZWFuSW5wdXQgPSBleHBvcnRzLmdldE11bHRpbGluZUlucHV0ID0gZXhwb3J0cy5nZXRJbnB1dCA9IGV4cG9ydHMuYWRkUGF0aCA9IGV4cG9ydHMuc2V0U2VjcmV0ID0gZXhwb3J0cy5leHBvcnRWYXJpYWJsZSA9IGV4cG9ydHMuRXhpdENvZGUgPSB2b2lkIDA7XG5jb25zdCBjb21tYW5kXzEgPSByZXF1aXJlKFwiLi9jb21tYW5kXCIpO1xuY29uc3QgZmlsZV9jb21tYW5kXzEgPSByZXF1aXJlKFwiLi9maWxlLWNvbW1hbmRcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5jb25zdCBvcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwib3NcIikpO1xuY29uc3QgcGF0aCA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicGF0aFwiKSk7XG5jb25zdCBvaWRjX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9vaWRjLXV0aWxzXCIpO1xuLyoqXG4gKiBUaGUgY29kZSB0byBleGl0IGFuIGFjdGlvblxuICovXG52YXIgRXhpdENvZGU7XG4oZnVuY3Rpb24gKEV4aXRDb2RlKSB7XG4gICAgLyoqXG4gICAgICogQSBjb2RlIGluZGljYXRpbmcgdGhhdCB0aGUgYWN0aW9uIHdhcyBzdWNjZXNzZnVsXG4gICAgICovXG4gICAgRXhpdENvZGVbRXhpdENvZGVbXCJTdWNjZXNzXCJdID0gMF0gPSBcIlN1Y2Nlc3NcIjtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUgaW5kaWNhdGluZyB0aGF0IHRoZSBhY3Rpb24gd2FzIGEgZmFpbHVyZVxuICAgICAqL1xuICAgIEV4aXRDb2RlW0V4aXRDb2RlW1wiRmFpbHVyZVwiXSA9IDFdID0gXCJGYWlsdXJlXCI7XG59KShFeGl0Q29kZSA9IGV4cG9ydHMuRXhpdENvZGUgfHwgKGV4cG9ydHMuRXhpdENvZGUgPSB7fSkpO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVmFyaWFibGVzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgZW52IHZhcmlhYmxlIGZvciB0aGlzIGFjdGlvbiBhbmQgZnV0dXJlIGFjdGlvbnMgaW4gdGhlIGpvYlxuICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHNldFxuICogQHBhcmFtIHZhbCB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlLiBOb24tc3RyaW5nIHZhbHVlcyB3aWxsIGJlIGNvbnZlcnRlZCB0byBhIHN0cmluZyB2aWEgSlNPTi5zdHJpbmdpZnlcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIGV4cG9ydFZhcmlhYmxlKG5hbWUsIHZhbCkge1xuICAgIGNvbnN0IGNvbnZlcnRlZFZhbCA9IHV0aWxzXzEudG9Db21tYW5kVmFsdWUodmFsKTtcbiAgICBwcm9jZXNzLmVudltuYW1lXSA9IGNvbnZlcnRlZFZhbDtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHByb2Nlc3MuZW52WydHSVRIVUJfRU5WJ10gfHwgJyc7XG4gICAgaWYgKGZpbGVQYXRoKSB7XG4gICAgICAgIHJldHVybiBmaWxlX2NvbW1hbmRfMS5pc3N1ZUZpbGVDb21tYW5kKCdFTlYnLCBmaWxlX2NvbW1hbmRfMS5wcmVwYXJlS2V5VmFsdWVNZXNzYWdlKG5hbWUsIHZhbCkpO1xuICAgIH1cbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzZXQtZW52JywgeyBuYW1lIH0sIGNvbnZlcnRlZFZhbCk7XG59XG5leHBvcnRzLmV4cG9ydFZhcmlhYmxlID0gZXhwb3J0VmFyaWFibGU7XG4vKipcbiAqIFJlZ2lzdGVycyBhIHNlY3JldCB3aGljaCB3aWxsIGdldCBtYXNrZWQgZnJvbSBsb2dzXG4gKiBAcGFyYW0gc2VjcmV0IHZhbHVlIG9mIHRoZSBzZWNyZXRcbiAqL1xuZnVuY3Rpb24gc2V0U2VjcmV0KHNlY3JldCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2FkZC1tYXNrJywge30sIHNlY3JldCk7XG59XG5leHBvcnRzLnNldFNlY3JldCA9IHNldFNlY3JldDtcbi8qKlxuICogUHJlcGVuZHMgaW5wdXRQYXRoIHRvIHRoZSBQQVRIIChmb3IgdGhpcyBhY3Rpb24gYW5kIGZ1dHVyZSBhY3Rpb25zKVxuICogQHBhcmFtIGlucHV0UGF0aFxuICovXG5mdW5jdGlvbiBhZGRQYXRoKGlucHV0UGF0aCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcHJvY2Vzcy5lbnZbJ0dJVEhVQl9QQVRIJ10gfHwgJyc7XG4gICAgaWYgKGZpbGVQYXRoKSB7XG4gICAgICAgIGZpbGVfY29tbWFuZF8xLmlzc3VlRmlsZUNvbW1hbmQoJ1BBVEgnLCBpbnB1dFBhdGgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnYWRkLXBhdGgnLCB7fSwgaW5wdXRQYXRoKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5lbnZbJ1BBVEgnXSA9IGAke2lucHV0UGF0aH0ke3BhdGguZGVsaW1pdGVyfSR7cHJvY2Vzcy5lbnZbJ1BBVEgnXX1gO1xufVxuZXhwb3J0cy5hZGRQYXRoID0gYWRkUGF0aDtcbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgYW4gaW5wdXQuXG4gKiBVbmxlc3MgdHJpbVdoaXRlc3BhY2UgaXMgc2V0IHRvIGZhbHNlIGluIElucHV0T3B0aW9ucywgdGhlIHZhbHVlIGlzIGFsc28gdHJpbW1lZC5cbiAqIFJldHVybnMgYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSB2YWx1ZSBpcyBub3QgZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIGlucHV0IHRvIGdldFxuICogQHBhcmFtICAgICBvcHRpb25zICBvcHRpb25hbC4gU2VlIElucHV0T3B0aW9ucy5cbiAqIEByZXR1cm5zICAgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGdldElucHV0KG5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB2YWwgPSBwcm9jZXNzLmVudltgSU5QVVRfJHtuYW1lLnJlcGxhY2UoLyAvZywgJ18nKS50b1VwcGVyQ2FzZSgpfWBdIHx8ICcnO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVxdWlyZWQgJiYgIXZhbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYElucHV0IHJlcXVpcmVkIGFuZCBub3Qgc3VwcGxpZWQ6ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy50cmltV2hpdGVzcGFjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbC50cmltKCk7XG59XG5leHBvcnRzLmdldElucHV0ID0gZ2V0SW5wdXQ7XG4vKipcbiAqIEdldHMgdGhlIHZhbHVlcyBvZiBhbiBtdWx0aWxpbmUgaW5wdXQuICBFYWNoIHZhbHVlIGlzIGFsc28gdHJpbW1lZC5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIGlucHV0IHRvIGdldFxuICogQHBhcmFtICAgICBvcHRpb25zICBvcHRpb25hbC4gU2VlIElucHV0T3B0aW9ucy5cbiAqIEByZXR1cm5zICAgc3RyaW5nW11cbiAqXG4gKi9cbmZ1bmN0aW9uIGdldE11bHRpbGluZUlucHV0KG5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBpbnB1dHMgPSBnZXRJbnB1dChuYW1lLCBvcHRpb25zKVxuICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSAnJyk7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy50cmltV2hpdGVzcGFjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0cztcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0cy5tYXAoaW5wdXQgPT4gaW5wdXQudHJpbSgpKTtcbn1cbmV4cG9ydHMuZ2V0TXVsdGlsaW5lSW5wdXQgPSBnZXRNdWx0aWxpbmVJbnB1dDtcbi8qKlxuICogR2V0cyB0aGUgaW5wdXQgdmFsdWUgb2YgdGhlIGJvb2xlYW4gdHlwZSBpbiB0aGUgWUFNTCAxLjIgXCJjb3JlIHNjaGVtYVwiIHNwZWNpZmljYXRpb24uXG4gKiBTdXBwb3J0IGJvb2xlYW4gaW5wdXQgbGlzdDogYHRydWUgfCBUcnVlIHwgVFJVRSB8IGZhbHNlIHwgRmFsc2UgfCBGQUxTRWAgLlxuICogVGhlIHJldHVybiB2YWx1ZSBpcyBhbHNvIGluIGJvb2xlYW4gdHlwZS5cbiAqIHJlZjogaHR0cHM6Ly95YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjaWQyODA0OTIzXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBpbnB1dCB0byBnZXRcbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3B0aW9uYWwuIFNlZSBJbnB1dE9wdGlvbnMuXG4gKiBAcmV0dXJucyAgIGJvb2xlYW5cbiAqL1xuZnVuY3Rpb24gZ2V0Qm9vbGVhbklucHV0KG5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB0cnVlVmFsdWUgPSBbJ3RydWUnLCAnVHJ1ZScsICdUUlVFJ107XG4gICAgY29uc3QgZmFsc2VWYWx1ZSA9IFsnZmFsc2UnLCAnRmFsc2UnLCAnRkFMU0UnXTtcbiAgICBjb25zdCB2YWwgPSBnZXRJbnB1dChuYW1lLCBvcHRpb25zKTtcbiAgICBpZiAodHJ1ZVZhbHVlLmluY2x1ZGVzKHZhbCkpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChmYWxzZVZhbHVlLmluY2x1ZGVzKHZhbCkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnB1dCBkb2VzIG5vdCBtZWV0IFlBTUwgMS4yIFwiQ29yZSBTY2hlbWFcIiBzcGVjaWZpY2F0aW9uOiAke25hbWV9XFxuYCArXG4gICAgICAgIGBTdXBwb3J0IGJvb2xlYW4gaW5wdXQgbGlzdDogXFxgdHJ1ZSB8IFRydWUgfCBUUlVFIHwgZmFsc2UgfCBGYWxzZSB8IEZBTFNFXFxgYCk7XG59XG5leHBvcnRzLmdldEJvb2xlYW5JbnB1dCA9IGdldEJvb2xlYW5JbnB1dDtcbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgYW4gb3V0cHV0LlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgb3V0cHV0IHRvIHNldFxuICogQHBhcmFtICAgICB2YWx1ZSAgICB2YWx1ZSB0byBzdG9yZS4gTm9uLXN0cmluZyB2YWx1ZXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgdmlhIEpTT04uc3RyaW5naWZ5XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBzZXRPdXRwdXQobmFtZSwgdmFsdWUpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHByb2Nlc3MuZW52WydHSVRIVUJfT1VUUFVUJ10gfHwgJyc7XG4gICAgaWYgKGZpbGVQYXRoKSB7XG4gICAgICAgIHJldHVybiBmaWxlX2NvbW1hbmRfMS5pc3N1ZUZpbGVDb21tYW5kKCdPVVRQVVQnLCBmaWxlX2NvbW1hbmRfMS5wcmVwYXJlS2V5VmFsdWVNZXNzYWdlKG5hbWUsIHZhbHVlKSk7XG4gICAgfVxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG9zLkVPTCk7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2V0LW91dHB1dCcsIHsgbmFtZSB9LCB1dGlsc18xLnRvQ29tbWFuZFZhbHVlKHZhbHVlKSk7XG59XG5leHBvcnRzLnNldE91dHB1dCA9IHNldE91dHB1dDtcbi8qKlxuICogRW5hYmxlcyBvciBkaXNhYmxlcyB0aGUgZWNob2luZyBvZiBjb21tYW5kcyBpbnRvIHN0ZG91dCBmb3IgdGhlIHJlc3Qgb2YgdGhlIHN0ZXAuXG4gKiBFY2hvaW5nIGlzIGRpc2FibGVkIGJ5IGRlZmF1bHQgaWYgQUNUSU9OU19TVEVQX0RFQlVHIGlzIG5vdCBzZXQuXG4gKlxuICovXG5mdW5jdGlvbiBzZXRDb21tYW5kRWNobyhlbmFibGVkKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdlY2hvJywgZW5hYmxlZCA/ICdvbicgOiAnb2ZmJyk7XG59XG5leHBvcnRzLnNldENvbW1hbmRFY2hvID0gc2V0Q29tbWFuZEVjaG87XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSZXN1bHRzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgdGhlIGFjdGlvbiBzdGF0dXMgdG8gZmFpbGVkLlxuICogV2hlbiB0aGUgYWN0aW9uIGV4aXRzIGl0IHdpbGwgYmUgd2l0aCBhbiBleGl0IGNvZGUgb2YgMVxuICogQHBhcmFtIG1lc3NhZ2UgYWRkIGVycm9yIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2V0RmFpbGVkKG1lc3NhZ2UpIHtcbiAgICBwcm9jZXNzLmV4aXRDb2RlID0gRXhpdENvZGUuRmFpbHVyZTtcbiAgICBlcnJvcihtZXNzYWdlKTtcbn1cbmV4cG9ydHMuc2V0RmFpbGVkID0gc2V0RmFpbGVkO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTG9nZ2luZyBDb21tYW5kc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBHZXRzIHdoZXRoZXIgQWN0aW9ucyBTdGVwIERlYnVnIGlzIG9uIG9yIG5vdFxuICovXG5mdW5jdGlvbiBpc0RlYnVnKCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudlsnUlVOTkVSX0RFQlVHJ10gPT09ICcxJztcbn1cbmV4cG9ydHMuaXNEZWJ1ZyA9IGlzRGVidWc7XG4vKipcbiAqIFdyaXRlcyBkZWJ1ZyBtZXNzYWdlIHRvIHVzZXIgbG9nXG4gKiBAcGFyYW0gbWVzc2FnZSBkZWJ1ZyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2UpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdkZWJ1ZycsIHt9LCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuZGVidWcgPSBkZWJ1Zztcbi8qKlxuICogQWRkcyBhbiBlcnJvciBpc3N1ZVxuICogQHBhcmFtIG1lc3NhZ2UgZXJyb3IgaXNzdWUgbWVzc2FnZS4gRXJyb3JzIHdpbGwgYmUgY29udmVydGVkIHRvIHN0cmluZyB2aWEgdG9TdHJpbmcoKVxuICogQHBhcmFtIHByb3BlcnRpZXMgb3B0aW9uYWwgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIGFubm90YXRpb24uXG4gKi9cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMgPSB7fSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2Vycm9yJywgdXRpbHNfMS50b0NvbW1hbmRQcm9wZXJ0aWVzKHByb3BlcnRpZXMpLCBtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IgPyBtZXNzYWdlLnRvU3RyaW5nKCkgOiBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuZXJyb3IgPSBlcnJvcjtcbi8qKlxuICogQWRkcyBhIHdhcm5pbmcgaXNzdWVcbiAqIEBwYXJhbSBtZXNzYWdlIHdhcm5pbmcgaXNzdWUgbWVzc2FnZS4gRXJyb3JzIHdpbGwgYmUgY29udmVydGVkIHRvIHN0cmluZyB2aWEgdG9TdHJpbmcoKVxuICogQHBhcmFtIHByb3BlcnRpZXMgb3B0aW9uYWwgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIGFubm90YXRpb24uXG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgcHJvcGVydGllcyA9IHt9KSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnd2FybmluZycsIHV0aWxzXzEudG9Db21tYW5kUHJvcGVydGllcyhwcm9wZXJ0aWVzKSwgbWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yID8gbWVzc2FnZS50b1N0cmluZygpIDogbWVzc2FnZSk7XG59XG5leHBvcnRzLndhcm5pbmcgPSB3YXJuaW5nO1xuLyoqXG4gKiBBZGRzIGEgbm90aWNlIGlzc3VlXG4gKiBAcGFyYW0gbWVzc2FnZSBub3RpY2UgaXNzdWUgbWVzc2FnZS4gRXJyb3JzIHdpbGwgYmUgY29udmVydGVkIHRvIHN0cmluZyB2aWEgdG9TdHJpbmcoKVxuICogQHBhcmFtIHByb3BlcnRpZXMgb3B0aW9uYWwgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIGFubm90YXRpb24uXG4gKi9cbmZ1bmN0aW9uIG5vdGljZShtZXNzYWdlLCBwcm9wZXJ0aWVzID0ge30pIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdub3RpY2UnLCB1dGlsc18xLnRvQ29tbWFuZFByb3BlcnRpZXMocHJvcGVydGllcyksIG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvciA/IG1lc3NhZ2UudG9TdHJpbmcoKSA6IG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5ub3RpY2UgPSBub3RpY2U7XG4vKipcbiAqIFdyaXRlcyBpbmZvIHRvIGxvZyB3aXRoIGNvbnNvbGUubG9nLlxuICogQHBhcmFtIG1lc3NhZ2UgaW5mbyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGluZm8obWVzc2FnZSkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG1lc3NhZ2UgKyBvcy5FT0wpO1xufVxuZXhwb3J0cy5pbmZvID0gaW5mbztcbi8qKlxuICogQmVnaW4gYW4gb3V0cHV0IGdyb3VwLlxuICpcbiAqIE91dHB1dCB1bnRpbCB0aGUgbmV4dCBgZ3JvdXBFbmRgIHdpbGwgYmUgZm9sZGFibGUgaW4gdGhpcyBncm91cFxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBvdXRwdXQgZ3JvdXBcbiAqL1xuZnVuY3Rpb24gc3RhcnRHcm91cChuYW1lKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdncm91cCcsIG5hbWUpO1xufVxuZXhwb3J0cy5zdGFydEdyb3VwID0gc3RhcnRHcm91cDtcbi8qKlxuICogRW5kIGFuIG91dHB1dCBncm91cC5cbiAqL1xuZnVuY3Rpb24gZW5kR3JvdXAoKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdlbmRncm91cCcpO1xufVxuZXhwb3J0cy5lbmRHcm91cCA9IGVuZEdyb3VwO1xuLyoqXG4gKiBXcmFwIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBjYWxsIGluIGEgZ3JvdXAuXG4gKlxuICogUmV0dXJucyB0aGUgc2FtZSB0eXBlIGFzIHRoZSBmdW5jdGlvbiBpdHNlbGYuXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGdyb3VwXG4gKiBAcGFyYW0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAgaW4gdGhlIGdyb3VwXG4gKi9cbmZ1bmN0aW9uIGdyb3VwKG5hbWUsIGZuKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgc3RhcnRHcm91cChuYW1lKTtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIGZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBlbmRHcm91cCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmdyb3VwID0gZ3JvdXA7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBXcmFwcGVyIGFjdGlvbiBzdGF0ZVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBTYXZlcyBzdGF0ZSBmb3IgY3VycmVudCBhY3Rpb24sIHRoZSBzdGF0ZSBjYW4gb25seSBiZSByZXRyaWV2ZWQgYnkgdGhpcyBhY3Rpb24ncyBwb3N0IGpvYiBleGVjdXRpb24uXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBzdGF0ZSB0byBzdG9yZVxuICogQHBhcmFtICAgICB2YWx1ZSAgICB2YWx1ZSB0byBzdG9yZS4gTm9uLXN0cmluZyB2YWx1ZXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgdmlhIEpTT04uc3RyaW5naWZ5XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBzYXZlU3RhdGUobmFtZSwgdmFsdWUpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHByb2Nlc3MuZW52WydHSVRIVUJfU1RBVEUnXSB8fCAnJztcbiAgICBpZiAoZmlsZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVfY29tbWFuZF8xLmlzc3VlRmlsZUNvbW1hbmQoJ1NUQVRFJywgZmlsZV9jb21tYW5kXzEucHJlcGFyZUtleVZhbHVlTWVzc2FnZShuYW1lLCB2YWx1ZSkpO1xuICAgIH1cbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzYXZlLXN0YXRlJywgeyBuYW1lIH0sIHV0aWxzXzEudG9Db21tYW5kVmFsdWUodmFsdWUpKTtcbn1cbmV4cG9ydHMuc2F2ZVN0YXRlID0gc2F2ZVN0YXRlO1xuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBzdGF0ZSBzZXQgYnkgdGhpcyBhY3Rpb24ncyBtYWluIGV4ZWN1dGlvbi5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIHN0YXRlIHRvIGdldFxuICogQHJldHVybnMgICBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0U3RhdGUobmFtZSkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudltgU1RBVEVfJHtuYW1lfWBdIHx8ICcnO1xufVxuZXhwb3J0cy5nZXRTdGF0ZSA9IGdldFN0YXRlO1xuZnVuY3Rpb24gZ2V0SURUb2tlbihhdWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4geWllbGQgb2lkY191dGlsc18xLk9pZGNDbGllbnQuZ2V0SURUb2tlbihhdWQpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRJRFRva2VuID0gZ2V0SURUb2tlbjtcbi8qKlxuICogU3VtbWFyeSBleHBvcnRzXG4gKi9cbnZhciBzdW1tYXJ5XzEgPSByZXF1aXJlKFwiLi9zdW1tYXJ5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3VtbWFyeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3VtbWFyeV8xLnN1bW1hcnk7IH0gfSk7XG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBjb3JlLnN1bW1hcnlcbiAqL1xudmFyIHN1bW1hcnlfMiA9IHJlcXVpcmUoXCIuL3N1bW1hcnlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYXJrZG93blN1bW1hcnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1bW1hcnlfMi5tYXJrZG93blN1bW1hcnk7IH0gfSk7XG4vKipcbiAqIFBhdGggZXhwb3J0c1xuICovXG52YXIgcGF0aF91dGlsc18xID0gcmVxdWlyZShcIi4vcGF0aC11dGlsc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRvUG9zaXhQYXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwYXRoX3V0aWxzXzEudG9Qb3NpeFBhdGg7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0b1dpbjMyUGF0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGF0aF91dGlsc18xLnRvV2luMzJQYXRoOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidG9QbGF0Zm9ybVBhdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBhdGhfdXRpbHNfMS50b1BsYXRmb3JtUGF0aDsgfSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuanMubWFwIiwKICAiaW1wb3J0ICogYXMgY29yZSBmcm9tIFwiQGFjdGlvbnMvY29yZVwiO1xuaW1wb3J0ICogYXMgZ2l0aHViIGZyb20gXCJAYWN0aW9ucy9naXRodWJcIjtcbmltcG9ydCB7ICQgfSBmcm9tIFwiLi9saWIvZXhlY2EudHNcIjtcbmltcG9ydCBhc3NlcnQgZnJvbSBcIm5vZGU6YXNzZXJ0L3N0cmljdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZSwgam9pbiB9IGZyb20gXCJub2RlOnBhdGhcIjtcblxuY29uc3Qgcm9vdFBhdGggPSByZXNvbHZlKGNvcmUuZ2V0SW5wdXQoXCJwYXRoXCIpKTtcblxubGV0IGFkZFBhdGhzcGVjOiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbmlmIChjb3JlLmdldElucHV0KFwiYWRkLXBhdGhzcGVjXCIpKSB7XG4gIGFkZFBhdGhzcGVjID0gY29yZS5nZXRNdWx0aWxpbmVJbnB1dChcImFkZC1wYXRoc3BlY1wiKTtcbn1cbmNvbnN0IGFkZEZvcmNlID0gY29yZS5nZXRCb29sZWFuSW5wdXQoXCJhZGQtZm9yY2VcIik7XG5cbmxldCBHSVRfQVVUSE9SX05BTUU6IHN0cmluZztcbmxldCBHSVRfQVVUSE9SX0VNQUlMOiBzdHJpbmc7XG5pZiAoY29yZS5nZXRJbnB1dChcImNvbW1pdC1hdXRob3JcIikpIHtcbiAgYXNzZXJ0LmVxdWFsKGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtYXV0aG9yLW5hbWVcIiksIFwiXCIpO1xuICBhc3NlcnQuZXF1YWwoY29yZS5nZXRJbnB1dChcImNvbW1pdC1hdXRob3ItZW1haWxcIiksIFwiXCIpO1xuICBbR0lUX0FVVEhPUl9OQU1FLCBHSVRfQVVUSE9SX0VNQUlMXSA9IGNvcmVcbiAgICAuZ2V0SW5wdXQoXCJjb21taXQtYXV0aG9yXCIpXG4gICAgLm1hdGNoKC9eXFxzKyguKylcXHMrPCguKyk+XFxzKyQvKVxuICAgIC5zbGljZSgxKTtcbn0gZWxzZSB7XG4gIEdJVF9BVVRIT1JfTkFNRSA9IGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtYXV0aG9yLW5hbWVcIiwgeyByZXF1aXJlZDogdHJ1ZSB9KTtcbiAgR0lUX0FVVEhPUl9FTUFJTCA9IGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtYXV0aG9yLWVtYWlsXCIsIHsgcmVxdWlyZWQ6IHRydWUgfSk7XG59XG5cbmxldCBHSVRfQ09NTUlUVEVSX05BTUU6IHN0cmluZztcbmxldCBHSVRfQ09NTUlUVEVSX0VNQUlMOiBzdHJpbmc7XG5pZiAoY29yZS5nZXRJbnB1dChcImNvbW1pdC1jb21taXR0ZXJcIikpIHtcbiAgYXNzZXJ0LmVxdWFsKGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtY29tbWl0dGVyLW5hbWVcIiksIFwiXCIpO1xuICBhc3NlcnQuZXF1YWwoY29yZS5nZXRJbnB1dChcImNvbW1pdC1jb21taXR0ZXItZW1haWxcIiksIFwiXCIpO1xuICBbR0lUX0NPTU1JVFRFUl9OQU1FLCBHSVRfQ09NTUlUVEVSX0VNQUlMXSA9IGNvcmVcbiAgICAuZ2V0SW5wdXQoXCJjb21taXQtY29tbWl0dGVyXCIpXG4gICAgLm1hdGNoKC9eXFxzKyguKylcXHMrPCguKyk+XFxzKyQvKVxuICAgIC5zbGljZSgxKTtcbn0gZWxzZSB7XG4gIEdJVF9DT01NSVRURVJfTkFNRSA9IGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtY29tbWl0dGVyLW5hbWVcIiwge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICB9KTtcbiAgR0lUX0NPTU1JVFRFUl9FTUFJTCA9IGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtY29tbWl0dGVyLWVtYWlsXCIsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgfSk7XG59XG5cbmNvbnN0IGNvbW1pdE1lc3NhZ2UgPSBjb3JlLmdldElucHV0KFwiY29tbWl0LW1lc3NhZ2VcIik7XG5cbmNvbnN0IHB1c2hSZXBvc2l0b3J5ID0gY29yZS5nZXRJbnB1dChcInB1c2gtcmVwb3NpdG9yeVwiKTtcblxuaWYgKGFkZFBhdGhzcGVjKSB7XG4gIGF3YWl0ICQoe1xuICAgIHN0ZGlvOiBcImluaGVyaXRcIixcbiAgICBjd2Q6IHJvb3RQYXRoLFxuICB9KWBnaXQgYWRkICR7YWRkRm9yY2UgPyBcIi0tZm9yY2VcIiA6IFtdfSAtLSAke2FkZFBhdGhzcGVjfWA7XG59IGVsc2Uge1xuICBhd2FpdCAkKHtcbiAgICBzdGRpbzogXCJpbmhlcml0XCIsXG4gICAgY3dkOiByb290UGF0aCxcbiAgfSlgZ2l0IGFkZCAke2FkZEZvcmNlID8gXCItLWZvcmNlXCIgOiBbXX0gLS1hbGxgO1xufVxuXG5jb25zdCB7IGV4aXRDb2RlIH0gPSBhd2FpdCAkKHtcbiAgY3dkOiByb290UGF0aCxcbiAgcmVqZWN0OiBmYWxzZSxcbn0pYGdpdCBkaWZmIC0tY2FjaGVkYDtcbmlmIChleGl0Q29kZSkge1xuICBjb3JlLmluZm8oYE5vIGNoYW5nZXMgdG8gY29tbWl0YCk7XG59IGVsc2Uge1xuICBsZXQgcHVzaFJlZnNwZWMgPSBjb3JlLmdldElucHV0KFwicHVzaC1yZWZzcGVjXCIpO1xuICBsZXQgcHVzaEZvcmNlID0gY29yZS5nZXRJbnB1dChcInB1c2gtZm9yY2VcIilcbiAgICA/IGNvcmUuZ2V0Qm9vbGVhbklucHV0KFwicHVzaC1mb3JjZVwiKVxuICAgIDogbnVsbDtcbiAgaWYgKCFwdXNoUmVmc3BlYykge1xuICAgIGNvbnN0IHsgZXhpdENvZGUsIHN0ZG91dCB9ID0gYXdhaXQgJCh7XG4gICAgICBjd2Q6IHJvb3RQYXRoLFxuICAgICAgcmVqZWN0OiBmYWxzZSxcbiAgICB9KWBnaXQgc3ltYm9saWMtcmVmIEhFQURgO1xuICAgIGlmIChleGl0Q29kZSkge1xuICAgICAgY29uc3QgeyBzdGRvdXQgfSA9IGF3YWl0ICQoeyBjd2Q6IHJvb3RQYXRoIH0pYGdpdCB0YWcgLS1wb2ludHMtYXQgSEVBRGA7XG4gICAgICBjb25zb2xlLmFzc2VydChzdGRvdXQsIFwibm8gc3Rkb3V0IGZyb20gbGlzdGluZyB0YWdzXCIpO1xuICAgICAgY29uc3QgdGFncyA9IHN0ZG91dC5zcGxpdCgvXFxyP1xcbi9nKTtcbiAgICAgIGNvbnNvbGUuYXNzZXJ0KHRhZ3MubGVuZ3RoID49IDEsIGB0YWdzPSR7dGFnc30gbG9uZ2VyIHRoYW4gMWApO1xuICAgICAgcHVzaFJlZnNwZWMgPSB0YWdzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoUmVmc3BlYyA9IHN0ZG91dDtcbiAgICB9XG4gIH1cbiAgaWYgKHB1c2hGb3JjZSA9PSBudWxsKSB7XG4gICAgY29uc3QgeyBleGl0Q29kZSB9ID0gYXdhaXQgJCh7XG4gICAgICBjd2Q6IHJvb3RQYXRoLFxuICAgICAgcmVqZWN0OiBmYWxzZSxcbiAgICB9KWBnaXQgc3ltYm9saWMtcmVmIEhFQURgO1xuICAgIGlmIChleGl0Q29kZSkge1xuICAgICAgcHVzaEZvcmNlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETzogQW55IG90aGVyIGZvcmNlLXB1c2ggc2l0dWF0aW9ucz9cbiAgICAgIHB1c2hGb3JjZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGF3YWl0ICQoe1xuICAgIHN0ZGlvOiBcImluaGVyaXRcIixcbiAgICBjd2Q6IHJvb3RQYXRoLFxuICAgIGVudjoge1xuICAgICAgR0lUX0FVVEhPUl9OQU1FLFxuICAgICAgR0lUX0FVVEhPUl9FTUFJTCxcbiAgICAgIEdJVF9DT01NSVRURVJfTkFNRSxcbiAgICAgIEdJVF9DT01NSVRURVJfRU1BSUwsXG4gICAgfSxcbiAgfSlgZ2l0IGNvbW1pdCAtLW1lc3NhZ2UgJHtjb21taXRNZXNzYWdlfWA7XG4gIGNvbnN0IHsgc3Rkb3V0IH0gPSBhd2FpdCAkKHtcbiAgICBjd2Q6IHJvb3RQYXRoLFxuICB9KWBnaXQgcmV2LXBhcnNlIEhFQURgO1xuXG4gIGF3YWl0ICQoe1xuICAgIHN0ZGlvOiBcImluaGVyaXRcIixcbiAgICBjd2Q6IHJvb3RQYXRoLFxuICB9KWBnaXQgcHVzaCAke1xuICAgIHB1c2hGb3JjZSA/IFwiLS1mb3JjZVwiIDogW11cbiAgfSAke3B1c2hSZXBvc2l0b3J5fSAke3N0ZG91dH06JHtwdXNoUmVmc3BlY31gO1xufVxuIiwKICAiaW1wb3J0IHsgc3Bhd24gfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCB7IG9uY2UgfSBmcm9tIFwibm9kZTpldmVudHNcIjtcclxuXHJcbmlmICghUmVhZGFibGVTdHJlYW0uZnJvbSkge1xyXG4gIFJlYWRhYmxlU3RyZWFtLmZyb20gPSBmdW5jdGlvbiAoYW55SXRlcmFibGUpIHtcclxuICAgIGlmICghYW55SXRlcmFibGUpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICBcIlJlYWRhYmxlU3RyZWFtLmZyb20oKSBleHBlY3RzIGFuIGl0ZXJhYmxlIG9yIGFzeW5jIGl0ZXJhYmxlIG9iamVjdC5cIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZXJhdG9yID1cclxuICAgICAgdHlwZW9mIGFueUl0ZXJhYmxlW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgPyBhbnlJdGVyYWJsZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKVxyXG4gICAgICAgIDogdHlwZW9mIGFueUl0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0gPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgID8gYW55SXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSgpXHJcbiAgICAgICAgOiBudWxsO1xyXG5cclxuICAgIGlmICghaXRlcmF0b3IpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICBcIlJlYWRhYmxlU3RyZWFtLmZyb20oKSBleHBlY3RzIGFuIGl0ZXJhYmxlIG9yIGFzeW5jIGl0ZXJhYmxlIG9iamVjdC5cIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xyXG4gICAgICBhc3luYyBwdWxsKGNvbnRyb2xsZXIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xyXG5cclxuICAgICAgICAgIGlmIChkb25lKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiAkKHN0cmluZ3MsIC4uLnZhbHVlcykge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShzdHJpbmdzKSkge1xyXG4gICAgcmV0dXJuICQuYmluZChPYmplY3QuYXNzaWduKHRoaXMgPz8ge30sIHN0cmluZ3MpKTtcclxuICB9XHJcbiAgY29uc3Qga2V5Rm9yID0gKGluZGV4KSA9PiBgX192YWx1ZXNbJHtpbmRleH1dYDtcclxuICBjb25zdCBrZXlSZSA9IC9fX3ZhbHVlc1xcWyhcXGQrKVxcXS9nO1xyXG4gIGNvbnN0IGNtZFdpdGhLZXlzID0gc3RyaW5nc1xyXG4gICAgLmZsYXRNYXAoKHMsIGkpID0+IChpID8gW2tleUZvcihpIC0gMSksIHNdIDogcykpXHJcbiAgICAuam9pbihcIlwiKTtcclxuICBsZXQgYXJndiA9IGNtZFdpdGhLZXlzLnNwbGl0KC9cXHMrLyk7XHJcbiAgYXJndiA9IGFyZ3YubWFwKChhcmcpID0+IGFyZy5yZXBsYWNlKGtleVJlLCAobSwgaSkgPT4gdmFsdWVzW2ldKSk7XHJcbiAgY29uc3QgYXJndjAgPSBhcmd2LnNoaWZ0KCk7XHJcbiAgY29uc3QgY3AgPSBzcGF3bihhcmd2MCwgYXJndiwgdGhpcyA/PyB7fSk7XHJcbiAgY29uc3Qgc3Rkb3V0UCA9IGNwLnN0ZG91dD8uW1N5bWJvbC5hc3luY0l0ZXJhdG9yXVxyXG4gICAgPyBuZXcgUmVzcG9uc2UoUmVhZGFibGVTdHJlYW0uZnJvbShjcC5zdGRvdXQpKS50ZXh0KClcclxuICAgIDogbnVsbDtcclxuICBjb25zdCBzdGRlcnJQID0gY3Auc3RkZXJyPy5bU3ltYm9sLmFzeW5jSXRlcmF0b3JdXHJcbiAgICA/IG5ldyBSZXNwb25zZShSZWFkYWJsZVN0cmVhbS5mcm9tKGNwLnN0ZGVycikpLnRleHQoKVxyXG4gICAgOiBudWxsO1xyXG4gIGNvbnN0IHAgPSBvbmNlKGNwLCBcImV4aXRcIikudGhlbihhc3luYyAoW2V4aXRDb2RlLCBzaWduYWxdKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSB7XHJcbiAgICAgIHN0ZG91dDogKGF3YWl0IHN0ZG91dFApPy50cmltRW5kKCksXHJcbiAgICAgIHN0ZGVycjogKGF3YWl0IHN0ZGVyclApPy50cmltRW5kKCksXHJcbiAgICAgIGV4aXRDb2RlLFxyXG4gICAgICBzaWduYWwsXHJcbiAgICB9O1xyXG4gICAgaWYgKCh0aGlzPy5yZWplY3QgPz8gdHJ1ZSkgJiYgZXhpdENvZGUpIHtcclxuICAgICAgdGhyb3cgcmVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICB9KTtcclxuICBjcC50aGVuID0gcC50aGVuLmJpbmQocCk7XHJcbiAgcmV0dXJuIGNwO1xyXG59XHJcbiIsCiAgImltcG9ydCAqIGFzIGNvcmUgZnJvbSBcIkBhY3Rpb25zL2NvcmVcIjtcbmltcG9ydCAqIGFzIGdpdGh1YiBmcm9tIFwiQGFjdGlvbnMvZ2l0aHViXCI7XG5pbXBvcnQgeyAkIH0gZnJvbSBcIi4vbGliL2V4ZWNhLnRzXCI7XG5pbXBvcnQgYXNzZXJ0IGZyb20gXCJub2RlOmFzc2VydC9zdHJpY3RcIjtcbmltcG9ydCB7IHJlc29sdmUsIGpvaW4gfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmNvbnN0IHJvb3RQYXRoID0gcmVzb2x2ZShjb3JlLmdldElucHV0KFwicGF0aFwiKSk7XG5cbmxldCBhZGRQYXRoc3BlYzogc3RyaW5nW10gfCB1bmRlZmluZWQ7XG5pZiAoY29yZS5nZXRJbnB1dChcImFkZC1wYXRoc3BlY1wiKSkge1xuICBhZGRQYXRoc3BlYyA9IGNvcmUuZ2V0TXVsdGlsaW5lSW5wdXQoXCJhZGQtcGF0aHNwZWNcIik7XG59XG5jb25zdCBhZGRGb3JjZSA9IGNvcmUuZ2V0Qm9vbGVhbklucHV0KFwiYWRkLWZvcmNlXCIpO1xuXG5sZXQgR0lUX0FVVEhPUl9OQU1FOiBzdHJpbmc7XG5sZXQgR0lUX0FVVEhPUl9FTUFJTDogc3RyaW5nO1xuaWYgKGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtYXV0aG9yXCIpKSB7XG4gIGFzc2VydC5lcXVhbChjb3JlLmdldElucHV0KFwiY29tbWl0LWF1dGhvci1uYW1lXCIpLCBcIlwiKTtcbiAgYXNzZXJ0LmVxdWFsKGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtYXV0aG9yLWVtYWlsXCIpLCBcIlwiKTtcbiAgW0dJVF9BVVRIT1JfTkFNRSwgR0lUX0FVVEhPUl9FTUFJTF0gPSBjb3JlXG4gICAgLmdldElucHV0KFwiY29tbWl0LWF1dGhvclwiKVxuICAgIC5tYXRjaCgvXlxccysoLispXFxzKzwoLispPlxccyskLylcbiAgICAuc2xpY2UoMSk7XG59IGVsc2Uge1xuICBHSVRfQVVUSE9SX05BTUUgPSBjb3JlLmdldElucHV0KFwiY29tbWl0LWF1dGhvci1uYW1lXCIsIHsgcmVxdWlyZWQ6IHRydWUgfSk7XG4gIEdJVF9BVVRIT1JfRU1BSUwgPSBjb3JlLmdldElucHV0KFwiY29tbWl0LWF1dGhvci1lbWFpbFwiLCB7IHJlcXVpcmVkOiB0cnVlIH0pO1xufVxuXG5sZXQgR0lUX0NPTU1JVFRFUl9OQU1FOiBzdHJpbmc7XG5sZXQgR0lUX0NPTU1JVFRFUl9FTUFJTDogc3RyaW5nO1xuaWYgKGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtY29tbWl0dGVyXCIpKSB7XG4gIGFzc2VydC5lcXVhbChjb3JlLmdldElucHV0KFwiY29tbWl0LWNvbW1pdHRlci1uYW1lXCIpLCBcIlwiKTtcbiAgYXNzZXJ0LmVxdWFsKGNvcmUuZ2V0SW5wdXQoXCJjb21taXQtY29tbWl0dGVyLWVtYWlsXCIpLCBcIlwiKTtcbiAgW0dJVF9DT01NSVRURVJfTkFNRSwgR0lUX0NPTU1JVFRFUl9FTUFJTF0gPSBjb3JlXG4gICAgLmdldElucHV0KFwiY29tbWl0LWNvbW1pdHRlclwiKVxuICAgIC5tYXRjaCgvXlxccysoLispXFxzKzwoLispPlxccyskLylcbiAgICAuc2xpY2UoMSk7XG59IGVsc2Uge1xuICBHSVRfQ09NTUlUVEVSX05BTUUgPSBjb3JlLmdldElucHV0KFwiY29tbWl0LWNvbW1pdHRlci1uYW1lXCIsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgfSk7XG4gIEdJVF9DT01NSVRURVJfRU1BSUwgPSBjb3JlLmdldElucHV0KFwiY29tbWl0LWNvbW1pdHRlci1lbWFpbFwiLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gIH0pO1xufVxuXG5jb25zdCBjb21taXRNZXNzYWdlID0gY29yZS5nZXRJbnB1dChcImNvbW1pdC1tZXNzYWdlXCIpO1xuXG5jb25zdCBwdXNoUmVwb3NpdG9yeSA9IGNvcmUuZ2V0SW5wdXQoXCJwdXNoLXJlcG9zaXRvcnlcIik7XG5cbmlmIChhZGRQYXRoc3BlYykge1xuICBhd2FpdCAkKHtcbiAgICBzdGRpbzogXCJpbmhlcml0XCIsXG4gICAgY3dkOiByb290UGF0aCxcbiAgfSlgZ2l0IGFkZCAke2FkZEZvcmNlID8gXCItLWZvcmNlXCIgOiBbXX0gLS0gJHthZGRQYXRoc3BlY31gO1xufSBlbHNlIHtcbiAgYXdhaXQgJCh7XG4gICAgc3RkaW86IFwiaW5oZXJpdFwiLFxuICAgIGN3ZDogcm9vdFBhdGgsXG4gIH0pYGdpdCBhZGQgJHthZGRGb3JjZSA/IFwiLS1mb3JjZVwiIDogW119IC0tYWxsYDtcbn1cblxuY29uc3QgeyBleGl0Q29kZSB9ID0gYXdhaXQgJCh7XG4gIGN3ZDogcm9vdFBhdGgsXG4gIHJlamVjdDogZmFsc2UsXG59KWBnaXQgZGlmZiAtLWNhY2hlZGA7XG5pZiAoZXhpdENvZGUpIHtcbiAgY29yZS5pbmZvKGBObyBjaGFuZ2VzIHRvIGNvbW1pdGApO1xufSBlbHNlIHtcbiAgbGV0IHB1c2hSZWZzcGVjID0gY29yZS5nZXRJbnB1dChcInB1c2gtcmVmc3BlY1wiKTtcbiAgbGV0IHB1c2hGb3JjZSA9IGNvcmUuZ2V0SW5wdXQoXCJwdXNoLWZvcmNlXCIpXG4gICAgPyBjb3JlLmdldEJvb2xlYW5JbnB1dChcInB1c2gtZm9yY2VcIilcbiAgICA6IG51bGw7XG4gIGlmICghcHVzaFJlZnNwZWMpIHtcbiAgICBjb25zdCB7IGV4aXRDb2RlLCBzdGRvdXQgfSA9IGF3YWl0ICQoe1xuICAgICAgY3dkOiByb290UGF0aCxcbiAgICAgIHJlamVjdDogZmFsc2UsXG4gICAgfSlgZ2l0IHN5bWJvbGljLXJlZiBIRUFEYDtcbiAgICBpZiAoZXhpdENvZGUpIHtcbiAgICAgIGNvbnN0IHsgc3Rkb3V0IH0gPSBhd2FpdCAkKHsgY3dkOiByb290UGF0aCB9KWBnaXQgdGFnIC0tcG9pbnRzLWF0IEhFQURgO1xuICAgICAgY29uc29sZS5hc3NlcnQoc3Rkb3V0LCBcIm5vIHN0ZG91dCBmcm9tIGxpc3RpbmcgdGFnc1wiKTtcbiAgICAgIGNvbnN0IHRhZ3MgPSBzdGRvdXQuc3BsaXQoL1xccj9cXG4vZyk7XG4gICAgICBjb25zb2xlLmFzc2VydCh0YWdzLmxlbmd0aCA+PSAxLCBgdGFncz0ke3RhZ3N9IGxvbmdlciB0aGFuIDFgKTtcbiAgICAgIHB1c2hSZWZzcGVjID0gdGFnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaFJlZnNwZWMgPSBzdGRvdXQ7XG4gICAgfVxuICB9XG4gIGlmIChwdXNoRm9yY2UgPT0gbnVsbCkge1xuICAgIGNvbnN0IHsgZXhpdENvZGUgfSA9IGF3YWl0ICQoe1xuICAgICAgY3dkOiByb290UGF0aCxcbiAgICAgIHJlamVjdDogZmFsc2UsXG4gICAgfSlgZ2l0IHN5bWJvbGljLXJlZiBIRUFEYDtcbiAgICBpZiAoZXhpdENvZGUpIHtcbiAgICAgIHB1c2hGb3JjZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE86IEFueSBvdGhlciBmb3JjZS1wdXNoIHNpdHVhdGlvbnM/XG4gICAgICBwdXNoRm9yY2UgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhd2FpdCAkKHtcbiAgICBzdGRpbzogXCJpbmhlcml0XCIsXG4gICAgY3dkOiByb290UGF0aCxcbiAgICBlbnY6IHtcbiAgICAgIEdJVF9BVVRIT1JfTkFNRSxcbiAgICAgIEdJVF9BVVRIT1JfRU1BSUwsXG4gICAgICBHSVRfQ09NTUlUVEVSX05BTUUsXG4gICAgICBHSVRfQ09NTUlUVEVSX0VNQUlMLFxuICAgIH0sXG4gIH0pYGdpdCBjb21taXQgLS1tZXNzYWdlICR7Y29tbWl0TWVzc2FnZX1gO1xuICBjb25zdCB7IHN0ZG91dCB9ID0gYXdhaXQgJCh7XG4gICAgY3dkOiByb290UGF0aCxcbiAgfSlgZ2l0IHJldi1wYXJzZSBIRUFEYDtcblxuICBhd2FpdCAkKHtcbiAgICBzdGRpbzogXCJpbmhlcml0XCIsXG4gICAgY3dkOiByb290UGF0aCxcbiAgfSlgZ2l0IHB1c2ggJHtcbiAgICBwdXNoRm9yY2UgPyBcIi0tZm9yY2VcIiA6IFtdXG4gIH0gJHtwdXNoUmVwb3NpdG9yeX0gJHtzdGRvdXR9OiR7cHVzaFJlZnNwZWN9YDtcbn1cbiIKICBdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBLy8vLy8vREFTQSxNQUFTLHlCQUFjLENBQUMsT0FBTztBQUMzQixRQUFJLFVBQVUsUUFBUSxVQUFVLFdBQVc7QUFDdkMsYUFBTztBQUFBLElBQ1gsa0JBQ2dCLFVBQVUsWUFBWSxpQkFBaUIsUUFBUTtBQUMzRCxhQUFPO0FBQUEsSUFDWDtBQUNBLFdBQU8sS0FBSyxVQUFVLEtBQUs7QUFBQTtBQVMvQixNQUFTLDhCQUFtQixDQUFDLHNCQUFzQjtBQUMvQyxTQUFLLE9BQU8sS0FBSyxvQkFBb0IsRUFBRSxRQUFRO0FBQzNDLGFBQU8sQ0FBQztBQUFBLElBQ1o7QUFDQSxXQUFPO0FBQUEsTUFDSCxPQUFPLHFCQUFxQjtBQUFBLE1BQzVCLE1BQU0scUJBQXFCO0FBQUEsTUFDM0IsTUFBTSxxQkFBcUI7QUFBQSxNQUMzQixTQUFTLHFCQUFxQjtBQUFBLE1BQzlCLEtBQUsscUJBQXFCO0FBQUEsTUFDMUIsV0FBVyxxQkFBcUI7QUFBQSxJQUNwQztBQUFBO0FBakNKLFNBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxFQUFRLDhCQUE4Qix5QkFBc0I7QUFjNUQsRUFBUSx5QkFBaUI7QUFvQnpCLEVBQVEsOEJBQXNCO0FBQUE7OztBQ0I5QmtDQSxNQUFTLHVCQUFZLENBQUMsU0FBUyxZQUFZLFNBQVM7QUFDaEQsVUFBTSxNQUFNLElBQUksUUFBUSxTQUFTLFlBQVksT0FBTztBQUNwRCxZQUFRLE9BQU8sTUFBTSxJQUFJLFNBQVMsSUFBSSxHQUFHLEdBQUc7QUFBQTtBQUdoRCxNQUFTLGdCQUFLLENBQUMsTUFBTSxVQUFVLElBQUk7QUFDL0IsaUJBQWEsTUFBTSxDQUFDLEdBQUcsT0FBTztBQUFBO0FBcUNsQyxNQUFTLHFCQUFVLENBQUMsR0FBRztBQUNuQixXQUFPLFFBQVEsZUFBZSxDQUFDLEVBQzFCLFFBQVEsTUFBTSxLQUFLLEVBQ25CLFFBQVEsT0FBTyxLQUFLLEVBQ3BCLFFBQVEsT0FBTyxLQUFLO0FBQUE7QUFFN0IsTUFBUyx5QkFBYyxDQUFDLEdBQUc7QUFDdkIsV0FBTyxRQUFRLGVBQWUsQ0FBQyxFQUMxQixRQUFRLE1BQU0sS0FBSyxFQUNuQixRQUFRLE9BQU8sS0FBSyxFQUNwQixRQUFRLE9BQU8sS0FBSyxFQUNwQixRQUFRLE1BQU0sS0FBSyxFQUNuQixRQUFRLE1BQU0sS0FBSztBQUFBO0FBeEY1QixNQUFJLGtCQUFtQixXQUFRLFFBQUssb0JBQXFCLE9BQU8saUJBQWtCLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSTtBQUM1RixRQUFJLE9BQU87QUFBVyxXQUFLO0FBQzNCLFdBQU8sZUFBZSxHQUFHLElBQUksRUFBRSxZQUFZLE1BQU0sYUFBYSxHQUFHO0FBQUUsYUFBTyxFQUFFO0FBQUEsTUFBTSxDQUFDO0FBQUEsY0FDekUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQ3hCLFFBQUksT0FBTztBQUFXLFdBQUs7QUFDM0IsTUFBRSxNQUFNLEVBQUU7QUFBQTtBQUVkLE1BQUkscUJBQXNCLFdBQVEsUUFBSyx1QkFBd0IsT0FBTyxpQkFBa0IsQ0FBQyxHQUFHLEdBQUc7QUFDM0YsV0FBTyxlQUFlLEdBQUcsV0FBVyxFQUFFLFlBQVksTUFBTSxPQUFPLEVBQUUsQ0FBQztBQUFBLGNBQ3pELENBQUMsR0FBRyxHQUFHO0FBQ2hCLE1BQUUsYUFBYTtBQUFBO0FBRW5CLE1BQUksZUFBZ0IsV0FBUSxRQUFLLHdCQUEwQixDQUFDLEtBQUs7QUFDN0QsUUFBSSxPQUFPLElBQUk7QUFBWSxhQUFPO0FBQ2xDLFFBQUksU0FBUyxDQUFDO0FBQ2QsUUFBSSxPQUFPO0FBQU0sZUFBUyxLQUFLO0FBQUssWUFBSSxNQUFNLGFBQWEsT0FBTyxlQUFlLEtBQUssS0FBSyxDQUFDO0FBQUcsMEJBQWdCLFFBQVEsS0FBSyxDQUFDO0FBQUE7QUFDN0gsdUJBQW1CLFFBQVEsR0FBRztBQUM5QixXQUFPO0FBQUE7QUFFWCxTQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBUSxRQUFRLFFBQVEsZUFBb0I7QUFDNUMsTUFBTSxLQUFLLHNDQUEwQjtBQUNyQyxNQUFNO0FBZU4sVUFBUSxlQUFlO0FBSXZCLFVBQVEsUUFBUTtBQUNoQixNQUFNLGFBQWE7QUFDbkI7QUFBQSxRQUFNLFFBQVE7QUFBQSxJQUNWLFdBQVcsQ0FBQyxTQUFTLFlBQVksU0FBUztBQUN0QyxXQUFLLFNBQVM7QUFDVixrQkFBVTtBQUFBLE1BQ2Q7QUFDQSxXQUFLLFVBQVU7QUFDZixXQUFLLGFBQWE7QUFDbEIsV0FBSyxVQUFVO0FBQUE7QUFBQSxJQUVuQixRQUFRLEdBQUc7QUFDUCxVQUFJLFNBQVMsYUFBYSxLQUFLO0FBQy9CLFVBQUksS0FBSyxjQUFjLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRSxTQUFTLEdBQUc7QUFDNUQsa0JBQVU7QUFDVixZQUFJLFFBQVE7QUFDWixtQkFBVyxPQUFPLEtBQUssWUFBWTtBQUMvQixjQUFJLEtBQUssV0FBVyxlQUFlLEdBQUcsR0FBRztBQUNyQyxrQkFBTSxNQUFNLEtBQUssV0FBVztBQUM1QixnQkFBSSxLQUFLO0FBQ0wsa0JBQUksT0FBTztBQUNQLHdCQUFRO0FBQUEsY0FDWixPQUNLO0FBQ0QsMEJBQVU7QUFBQTtBQUVkLHdCQUFVLEdBQUcsT0FBTyxlQUFlLEdBQUc7QUFBQSxZQUMxQztBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUNBLGdCQUFVLEdBQUcsYUFBYSxXQUFXLEtBQUssT0FBTztBQUNqRCxhQUFPO0FBQUE7QUFBQSxFQUVmO0FBQUE7OztBQ0JBU0EsTUFBUyxpQ0FBc0IsQ0FBQyxLQUFLO0FBQUUsV0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUyxJQUFJO0FBQUE7QUFNM0YsTUFBUyxjQUFHLEdBQUc7QUFDYixRQUFJLFVBQVUsVUFBVSxTQUFTLElBQUk7QUFDbkMsY0FBUSxRQUFRLGVBQWUsU0FBUztBQUV4QyxnQkFBVTtBQUFBLElBQ1o7QUFFQSxXQUFPLFVBQVUsTUFBTSxTQUFTLFdBQVcsRUFBRTtBQUFBO0FBcEIvQyxTQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsSUFDM0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELEVBQVEsa0JBQVU7QUFFbEIsTUFBSSxVQUFVLG9EQUF3QztBQUl0RCxNQUFNLFlBQVksSUFBSSxXQUFXLEdBQUc7QUFFcEMsTUFBSSxVQUFVLFVBQVU7QUFBQTs7O0FDQnhCRUEsU0FBTyxlQUFlLFNBQVMsY0FBYztBQUFBLElBQzNDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDRCxFQUFRLGtCQUFlO0FBQ3ZCLE1BQUksV0FBVztBQUNmLEVBQVEsa0JBQVU7QUFBQTs7O0FDQmxCU0EsTUFBUyxpQ0FBc0IsQ0FBQyxLQUFLO0FBQUUsV0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUyxJQUFJO0FBQUE7QUFFM0YsTUFBUyxtQkFBUSxDQUFDLE1BQU07QUFDdEIsa0JBQWMsU0FBUyxZQUFZLE9BQU8sUUFBUSxLQUFLLElBQUk7QUFBQTtBQVY3RCxTQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsSUFDM0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELEVBQVEsa0JBQWU7QUFFdkIsTUFBSSxTQUFTLHNDQUE0QztBQVF6RCxNQUFJLFdBQVc7QUFDZixFQUFRLGtCQUFVO0FBQUE7OztBQ0JsQlNBLE1BQVMsaUNBQXNCLENBQUMsS0FBSztBQUFFLFdBQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVMsSUFBSTtBQUFBO0FBWTNGLE1BQVMsb0JBQVMsQ0FBQyxLQUFLLFNBQVMsR0FBRztBQUdsQyxVQUFNLFFBQVEsVUFBVSxJQUFJLFNBQVMsTUFBTSxVQUFVLElBQUksU0FBUyxNQUFNLFVBQVUsSUFBSSxTQUFTLE1BQU0sVUFBVSxJQUFJLFNBQVMsTUFBTSxNQUFNLFVBQVUsSUFBSSxTQUFTLE1BQU0sVUFBVSxJQUFJLFNBQVMsTUFBTSxNQUFNLFVBQVUsSUFBSSxTQUFTLE1BQU0sVUFBVSxJQUFJLFNBQVMsTUFBTSxNQUFNLFVBQVUsSUFBSSxTQUFTLE1BQU0sVUFBVSxJQUFJLFNBQVMsTUFBTSxNQUFNLFVBQVUsSUFBSSxTQUFTLE9BQU8sVUFBVSxJQUFJLFNBQVMsT0FBTyxVQUFVLElBQUksU0FBUyxPQUFPLFVBQVUsSUFBSSxTQUFTLE9BQU8sVUFBVSxJQUFJLFNBQVMsT0FBTyxVQUFVLElBQUksU0FBUyxNQUFNLFlBQVk7QUFNdmdCLFVBQU0sR0FBRyxVQUFVLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFlBQU0sVUFBVSw2QkFBNkI7QUFBQSxJQUMvQztBQUVBLFdBQU87QUFBQTtBQWhDVCxTQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsSUFDM0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELEVBQVEsa0JBQWU7QUFFdkIsTUFBSSxZQUFZLHlDQUErQztBQVEvRCxNQUFNLFlBQVksQ0FBQztBQUVuQixXQUFTLElBQUksRUFBRyxJQUFJLE9BQU8sR0FBRztBQUM1QixjQUFVLE1BQU0sSUFBSSxLQUFPLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQUEsRUFDbkQ7QUFrQkEsTUFBSSxXQUFXO0FBQ2YsRUFBUSxrQkFBVTtBQUFBOzs7QUNCbEJXQSxNQUFTLGlDQUFzQixDQUFDLEtBQUs7QUFBRSxXQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxTQUFTLElBQUk7QUFBQTtBQWMzRixNQUFTLGFBQUUsQ0FBQyxTQUFTLEtBQUssUUFBUTtBQUNoQyxRQUFJLElBQUksT0FBTyxVQUFVO0FBQ3pCLFVBQU0sSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO0FBQzdCLGNBQVUsV0FBVyxDQUFDO0FBQ3RCLFFBQUksT0FBTyxRQUFRLFFBQVE7QUFDM0IsUUFBSSxXQUFXLFFBQVEsYUFBYSxZQUFZLFFBQVEsV0FBVztBQUluRSxRQUFJLFFBQVEsUUFBUSxZQUFZLE1BQU07QUFDcEMsWUFBTSxZQUFZLFFBQVEsV0FBVyxRQUFRLE9BQU8sS0FBSyxTQUFTO0FBRWxFLFVBQUksUUFBUSxNQUFNO0FBRWhCLGVBQU8sVUFBVSxDQUFDLFVBQVUsS0FBSyxHQUFNLFVBQVUsSUFBSSxVQUFVLElBQUksVUFBVSxJQUFJLFVBQVUsSUFBSSxVQUFVLEVBQUU7QUFBQSxNQUM3RztBQUVBLFVBQUksWUFBWSxNQUFNO0FBRXBCLG1CQUFXLGFBQWEsVUFBVSxNQUFNLElBQUksVUFBVSxNQUFNO0FBQUEsTUFDOUQ7QUFBQSxJQUNGO0FBTUEsUUFBSSxRQUFRLFFBQVEsVUFBVSxZQUFZLFFBQVEsUUFBUSxLQUFLLElBQUk7QUFHbkUsUUFBSSxRQUFRLFFBQVEsVUFBVSxZQUFZLFFBQVEsUUFBUSxhQUFhO0FBRXZFLFVBQU0sS0FBSyxRQUFRLGNBQWMsUUFBUSxjQUFjO0FBRXZELFFBQUksS0FBSyxLQUFLLFFBQVEsYUFBYSxXQUFXO0FBQzVDLGlCQUFXLFdBQVcsSUFBSTtBQUFBLElBQzVCO0FBSUEsU0FBSyxLQUFLLEtBQUssUUFBUSxlQUFlLFFBQVEsVUFBVSxXQUFXO0FBQ2pFLGNBQVE7QUFBQSxJQUNWO0FBR0EsUUFBSSxTQUFTLEtBQU87QUFDbEIsWUFBTSxJQUFJLE1BQU0saURBQWlEO0FBQUEsSUFDbkU7QUFFQSxpQkFBYTtBQUNiLGlCQUFhO0FBQ2IsZ0JBQVk7QUFFWixhQUFTO0FBRVQsVUFBTSxPQUFPLFFBQVEsYUFBYSxNQUFRLFNBQVM7QUFDbkQsTUFBRSxPQUFPLE9BQU8sS0FBSztBQUNyQixNQUFFLE9BQU8sT0FBTyxLQUFLO0FBQ3JCLE1BQUUsT0FBTyxPQUFPLElBQUk7QUFDcEIsTUFBRSxPQUFPLEtBQUs7QUFFZCxVQUFNLE1BQU0sUUFBUSxhQUFjLE1BQVE7QUFDMUMsTUFBRSxPQUFPLFFBQVEsSUFBSTtBQUNyQixNQUFFLE9BQU8sTUFBTTtBQUVmLE1BQUUsT0FBTyxRQUFRLEtBQUssS0FBTTtBQUU1QixNQUFFLE9BQU8sUUFBUSxLQUFLO0FBRXRCLE1BQUUsT0FBTyxhQUFhLElBQUk7QUFFMUIsTUFBRSxPQUFPLFdBQVc7QUFFcEIsYUFBUyxJQUFJLEVBQUcsSUFBSSxLQUFLLEdBQUc7QUFDMUIsUUFBRSxJQUFJLEtBQUssS0FBSztBQUFBLElBQ2xCO0FBRUEsV0FBTyxRQUFRLEdBQUcsV0FBVyxTQUFTLENBQUM7QUFBQTtBQXBHekMsU0FBTyxlQUFlLFNBQVMsY0FBYztBQUFBLElBQzNDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDRCxFQUFRLGtCQUFlO0FBRXZCLE1BQUksT0FBTyxvQ0FBMEM7QUFFckQsTUFBSSxhQUFhLDBDQUFnRDtBQVFqRSxNQUFJO0FBRUosTUFBSTtBQUdKLE1BQUksYUFBYTtBQUNqQixNQUFJLGFBQWE7QUFrRmpCLE1BQUksV0FBVztBQUNmLEVBQVEsa0JBQVU7QUFBQTs7O0FDQmxCU0EsTUFBUyxpQ0FBc0IsQ0FBQyxLQUFLO0FBQUUsV0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUyxJQUFJO0FBQUE7QUFFM0YsTUFBUyxnQkFBSyxDQUFDLE1BQU07QUFDbkIsVUFBTSxHQUFHLFVBQVUsU0FBUyxJQUFJLEdBQUc7QUFDakMsWUFBTSxVQUFVLGNBQWM7QUFBQSxJQUNoQztBQUVBLFFBQUk7QUFDSixVQUFNLE1BQU0sSUFBSSxXQUFXLEVBQUU7QUFFN0IsUUFBSSxNQUFNLElBQUksU0FBUyxLQUFLLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPO0FBQ2xELFFBQUksS0FBSyxNQUFNLEtBQUs7QUFDcEIsUUFBSSxLQUFLLE1BQU0sSUFBSTtBQUNuQixRQUFJLEtBQUssSUFBSTtBQUViLFFBQUksTUFBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTztBQUNuRCxRQUFJLEtBQUssSUFBSTtBQUViLFFBQUksTUFBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTztBQUNwRCxRQUFJLEtBQUssSUFBSTtBQUViLFFBQUksTUFBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTztBQUNwRCxRQUFJLEtBQUssSUFBSTtBQUdiLFFBQUksT0FBTyxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxnQkFBZ0I7QUFDbkUsUUFBSSxNQUFNLElBQUksYUFBYztBQUM1QixRQUFJLE1BQU0sTUFBTSxLQUFLO0FBQ3JCLFFBQUksTUFBTSxNQUFNLEtBQUs7QUFDckIsUUFBSSxNQUFNLE1BQU0sSUFBSTtBQUNwQixRQUFJLE1BQU0sSUFBSTtBQUNkLFdBQU87QUFBQTtBQXRDVCxTQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsSUFDM0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELEVBQVEsa0JBQWU7QUFFdkIsTUFBSSxZQUFZLHlDQUErQztBQW9DL0QsTUFBSSxXQUFXO0FBQ2YsRUFBUSxrQkFBVTtBQUFBOzs7QUNCbEJZQSxNQUFTLGlDQUFzQixDQUFDLEtBQUs7QUFBRSxXQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxTQUFTLElBQUk7QUFBQTtBQUUzRixNQUFTLHdCQUFhLENBQUMsS0FBSztBQUMxQixVQUFNLFNBQVMsbUJBQW1CLEdBQUcsQ0FBQztBQUV0QyxVQUFNLFFBQVEsQ0FBQztBQUVmLGFBQVMsSUFBSSxFQUFHLElBQUksSUFBSSxVQUFVLEdBQUc7QUFDbkMsWUFBTSxLQUFLLElBQUksV0FBVyxDQUFDLENBQUM7QUFBQSxJQUM5QjtBQUVBLFdBQU87QUFBQTtBQVFULE1BQVMsbUJBQVEsQ0FBQyxNQUFNLFNBQVMsVUFBVTtBQUN6QyxhQUFTLFlBQVksQ0FBQyxPQUFPLFdBQVcsS0FBSyxRQUFRO0FBQ25ELGlCQUFXLFVBQVUsVUFBVTtBQUM3QixnQkFBUSxjQUFjLEtBQUs7QUFBQSxNQUM3QjtBQUVBLGlCQUFXLGNBQWMsVUFBVTtBQUNqQyxxQkFBYSxHQUFHLE9BQU8sU0FBUyxTQUFTO0FBQUEsTUFDM0M7QUFFQSxVQUFJLFVBQVUsV0FBVyxJQUFJO0FBQzNCLGNBQU0sVUFBVSxrRUFBa0U7QUFBQSxNQUNwRjtBQUtBLFVBQUksUUFBUSxJQUFJLFdBQVcsS0FBSyxNQUFNLE1BQU07QUFDNUMsWUFBTSxJQUFJLFNBQVM7QUFDbkIsWUFBTSxJQUFJLE9BQU8sVUFBVSxNQUFNO0FBQ2pDLGNBQVEsU0FBUyxLQUFLO0FBQ3RCLFlBQU0sS0FBSyxNQUFNLEtBQUssS0FBTztBQUM3QixZQUFNLEtBQUssTUFBTSxLQUFLLEtBQU87QUFFN0IsVUFBSSxLQUFLO0FBQ1AsaUJBQVMsVUFBVTtBQUVuQixpQkFBUyxJQUFJLEVBQUcsSUFBSSxNQUFNLEdBQUc7QUFDM0IsY0FBSSxTQUFTLEtBQUssTUFBTTtBQUFBLFFBQzFCO0FBRUEsZUFBTztBQUFBLE1BQ1Q7QUFFQSxjQUFRLEdBQUcsV0FBVyxTQUFTLEtBQUs7QUFBQTtBQUl0QyxRQUFJO0FBQ0YsbUJBQWEsT0FBTztBQUFBLGFBQ2IsS0FBUDtBQUFBO0FBR0YsaUJBQWEsTUFBTTtBQUNuQixpQkFBYSxNQUFNO0FBQ25CLFdBQU87QUFBQTtBQTFFVCxTQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsSUFDM0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELEVBQVEsa0JBQVU7QUFDbEIsRUFBUSxjQUFjLGNBQVc7QUFFakMsTUFBSSxhQUFhLDBDQUFnRDtBQUVqRSxNQUFJLFNBQVMsc0NBQTRDO0FBZ0J6RCxNQUFNLE1BQU07QUFDWixFQUFRLGNBQU07QUFDZCxNQUFNLE9BQU07QUFDWixFQUFRLGNBQU07QUFBQTs7O0FDQmRTQSxNQUFTLGlDQUFzQixDQUFDLEtBQUs7QUFBRSxXQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxTQUFTLElBQUk7QUFBQTtBQUUzRixNQUFTLGNBQUcsQ0FBQyxPQUFPO0FBQ2xCLFFBQUksTUFBTSxRQUFRLEtBQUssR0FBRztBQUN4QixjQUFRLE9BQU8sS0FBSyxLQUFLO0FBQUEsSUFDM0Isa0JBQWtCLFVBQVUsVUFBVTtBQUNwQyxjQUFRLE9BQU8sS0FBSyxPQUFPLE1BQU07QUFBQSxJQUNuQztBQUVBLFdBQU8sUUFBUSxRQUFRLFdBQVcsS0FBSyxFQUFFLE9BQU8sS0FBSyxFQUFFLE9BQU87QUFBQTtBQWhCaEUsU0FBTyxlQUFlLFNBQVMsY0FBYztBQUFBLElBQzNDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDRCxFQUFRLGtCQUFlO0FBRXZCLE1BQUksVUFBVSxvREFBd0M7QUFjdEQsTUFBSSxXQUFXO0FBQ2YsRUFBUSxrQkFBVTtBQUFBOzs7QUNCbEJXQSxNQUFTLGlDQUFzQixDQUFDLEtBQUs7QUFBRSxXQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxTQUFTLElBQUk7QUFBQTtBQVQzRixTQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsSUFDM0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELEVBQVEsa0JBQWU7QUFFdkIsTUFBSSxLQUFLLG9DQUEwQztBQUVuRCxNQUFJLE1BQU0sb0NBQTBDO0FBSXBELE1BQU0sTUFBTSxHQUFHLEdBQUcsU0FBUyxNQUFNLElBQU0sSUFBSSxPQUFPO0FBQ2xELE1BQUksV0FBVztBQUNmLEVBQVEsa0JBQVU7QUFBQTs7O0FDQmxCV0EsTUFBUyxpQ0FBc0IsQ0FBQyxLQUFLO0FBQUUsV0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUyxJQUFJO0FBQUE7QUFFM0YsTUFBUyxhQUFFLENBQUMsU0FBUyxLQUFLLFFBQVE7QUFDaEMsY0FBVSxXQUFXLENBQUM7QUFFdEIsVUFBTSxPQUFPLFFBQVEsV0FBVyxRQUFRLE9BQU8sS0FBSyxTQUFTO0FBRzdELFNBQUssS0FBSyxLQUFLLEtBQUssS0FBTztBQUMzQixTQUFLLEtBQUssS0FBSyxLQUFLLEtBQU87QUFFM0IsUUFBSSxLQUFLO0FBQ1AsZUFBUyxVQUFVO0FBRW5CLGVBQVMsSUFBSSxFQUFHLElBQUksTUFBTSxHQUFHO0FBQzNCLFlBQUksU0FBUyxLQUFLLEtBQUs7QUFBQSxNQUN6QjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBRUEsWUFBUSxHQUFHLFdBQVcsU0FBUyxJQUFJO0FBQUE7QUE5QnJDLFNBQU8sZUFBZSxTQUFTLGNBQWM7QUFBQSxJQUMzQyxPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0QsRUFBUSxrQkFBZTtBQUV2QixNQUFJLE9BQU8sb0NBQTBDO0FBRXJELE1BQUksYUFBYSwwQ0FBZ0Q7QUEwQmpFLE1BQUksV0FBVztBQUNmLEVBQVEsa0JBQVU7QUFBQTs7O0FDQmxCU0EsTUFBUyxpQ0FBc0IsQ0FBQyxLQUFLO0FBQUUsV0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUyxJQUFJO0FBQUE7QUFFM0YsTUFBUyxlQUFJLENBQUMsT0FBTztBQUNuQixRQUFJLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDeEIsY0FBUSxPQUFPLEtBQUssS0FBSztBQUFBLElBQzNCLGtCQUFrQixVQUFVLFVBQVU7QUFDcEMsY0FBUSxPQUFPLEtBQUssT0FBTyxNQUFNO0FBQUEsSUFDbkM7QUFFQSxXQUFPLFFBQVEsUUFBUSxXQUFXLE1BQU0sRUFBRSxPQUFPLEtBQUssRUFBRSxPQUFPO0FBQUE7QUFoQmpFLFNBQU8sZUFBZSxTQUFTLGNBQWM7QUFBQSxJQUMzQyxPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0QsRUFBUSxrQkFBZTtBQUV2QixNQUFJLFVBQVUsb0RBQXdDO0FBY3RELE1BQUksV0FBVztBQUNmLEVBQVEsa0JBQVU7QUFBQTs7O0FDQmxCV0EsTUFBUyxpQ0FBc0IsQ0FBQyxLQUFLO0FBQUUsV0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUyxJQUFJO0FBQUE7QUFUM0YsU0FBTyxlQUFlLFNBQVMsY0FBYztBQUFBLElBQzNDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDRCxFQUFRLGtCQUFlO0FBRXZCLE1BQUksS0FBSyxvQ0FBMEM7QUFFbkQsTUFBSSxPQUFPLHFDQUEyQztBQUl0RCxNQUFNLE1BQU0sR0FBRyxHQUFHLFNBQVMsTUFBTSxJQUFNLEtBQUssT0FBTztBQUNuRCxNQUFJLFdBQVc7QUFDZixFQUFRLGtCQUFVO0FBQUE7OztBQ0JsQkVBLFNBQU8sZUFBZSxTQUFTLGNBQWM7QUFBQSxJQUMzQyxPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0QsRUFBUSxrQkFBZTtBQUN2QixNQUFJLFdBQVc7QUFDZixFQUFRLGtCQUFVO0FBQUE7OztBQ0JsQlNBLE1BQVMsaUNBQXNCLENBQUMsS0FBSztBQUFFLFdBQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVMsSUFBSTtBQUFBO0FBRTNGLE1BQVMsa0JBQU8sQ0FBQyxNQUFNO0FBQ3JCLFVBQU0sR0FBRyxVQUFVLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFlBQU0sVUFBVSxjQUFjO0FBQUEsSUFDaEM7QUFFQSxXQUFPLFNBQVMsS0FBSyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFBQTtBQWR4QyxTQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsSUFDM0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELEVBQVEsa0JBQWU7QUFFdkIsTUFBSSxZQUFZLHlDQUErQztBQVkvRCxNQUFJLFdBQVc7QUFDZixFQUFRLGtCQUFVO0FBQUE7OztBQ0JsQjhFQSxNQUFTLGlDQUFzQixDQUFDLEtBQUs7QUFBRSxXQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxTQUFTLElBQUk7QUFBQTtBQTVFM0YsU0FBTyxlQUFlLFNBQVMsY0FBYztBQUFBLElBQzNDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDRCxTQUFPLGVBQWUsU0FBUyxNQUFNO0FBQUEsSUFDbkMsWUFBWTtBQUFBLElBQ1osYUFBYyxHQUFHO0FBQ2YsYUFBTyxHQUFHO0FBQUE7QUFBQSxFQUVkLENBQUM7QUFDRCxTQUFPLGVBQWUsU0FBUyxNQUFNO0FBQUEsSUFDbkMsWUFBWTtBQUFBLElBQ1osYUFBYyxHQUFHO0FBQ2YsYUFBTyxJQUFJO0FBQUE7QUFBQSxFQUVmLENBQUM7QUFDRCxTQUFPLGVBQWUsU0FBUyxNQUFNO0FBQUEsSUFDbkMsWUFBWTtBQUFBLElBQ1osYUFBYyxHQUFHO0FBQ2YsYUFBTyxJQUFJO0FBQUE7QUFBQSxFQUVmLENBQUM7QUFDRCxTQUFPLGVBQWUsU0FBUyxNQUFNO0FBQUEsSUFDbkMsWUFBWTtBQUFBLElBQ1osYUFBYyxHQUFHO0FBQ2YsYUFBTyxJQUFJO0FBQUE7QUFBQSxFQUVmLENBQUM7QUFDRCxTQUFPLGVBQWUsU0FBUyxPQUFPO0FBQUEsSUFDcEMsWUFBWTtBQUFBLElBQ1osYUFBYyxHQUFHO0FBQ2YsYUFBTyxLQUFLO0FBQUE7QUFBQSxFQUVoQixDQUFDO0FBQ0QsU0FBTyxlQUFlLFNBQVMsV0FBVztBQUFBLElBQ3hDLFlBQVk7QUFBQSxJQUNaLGFBQWMsR0FBRztBQUNmLGFBQU8sU0FBUztBQUFBO0FBQUEsRUFFcEIsQ0FBQztBQUNELFNBQU8sZUFBZSxTQUFTLFlBQVk7QUFBQSxJQUN6QyxZQUFZO0FBQUEsSUFDWixhQUFjLEdBQUc7QUFDZixhQUFPLFVBQVU7QUFBQTtBQUFBLEVBRXJCLENBQUM7QUFDRCxTQUFPLGVBQWUsU0FBUyxhQUFhO0FBQUEsSUFDMUMsWUFBWTtBQUFBLElBQ1osYUFBYyxHQUFHO0FBQ2YsYUFBTyxXQUFXO0FBQUE7QUFBQSxFQUV0QixDQUFDO0FBQ0QsU0FBTyxlQUFlLFNBQVMsU0FBUztBQUFBLElBQ3RDLFlBQVk7QUFBQSxJQUNaLGFBQWMsR0FBRztBQUNmLGFBQU8sT0FBTztBQUFBO0FBQUEsRUFFbEIsQ0FBQztBQUVELE1BQUksS0FBSyxtQ0FBeUM7QUFFbEQsTUFBSSxNQUFNLG1DQUF5QztBQUVuRCxNQUFJLE1BQU0sbUNBQXlDO0FBRW5ELE1BQUksTUFBTSxtQ0FBeUM7QUFFbkQsTUFBSSxPQUFPLG9DQUEwQztBQUVyRCxNQUFJLFdBQVcsd0NBQThDO0FBRTdELE1BQUksWUFBWSx5Q0FBK0M7QUFFL0QsTUFBSSxhQUFhLDBDQUFnRDtBQUVqRSxNQUFJLFNBQVMsc0NBQTRDO0FBQUE7OztBQ0J6RDZCQSxNQUFTLDJCQUFnQixDQUFDLFNBQVMsU0FBUztBQUN4QyxVQUFNLFdBQVcsUUFBUSxJQUFJLFVBQVU7QUFDdkMsU0FBSyxVQUFVO0FBQ1gsWUFBTSxJQUFJLE1BQU0sd0RBQXdELFNBQVM7QUFBQSxJQUNyRjtBQUNBLFNBQUssR0FBRyxXQUFXLFFBQVEsR0FBRztBQUMxQixZQUFNLElBQUksTUFBTSx5QkFBeUIsVUFBVTtBQUFBLElBQ3ZEO0FBQ0EsT0FBRyxlQUFlLFVBQVUsR0FBRyxRQUFRLGVBQWUsT0FBTyxJQUFJLEdBQUcsT0FBTztBQUFBLE1BQ3ZFLFVBQVU7QUFBQSxJQUNkLENBQUM7QUFBQTtBQUdMLE1BQVMsaUNBQXNCLENBQUMsS0FBSyxPQUFPO0FBQ3hDLFVBQU0sWUFBWSxnQkFBZ0IsT0FBTyxHQUFHO0FBQzVDLFVBQU0saUJBQWlCLFFBQVEsZUFBZSxLQUFLO0FBSW5ELFFBQUksSUFBSSxTQUFTLFNBQVMsR0FBRztBQUN6QixZQUFNLElBQUksTUFBTSw0REFBNEQsWUFBWTtBQUFBLElBQzVGO0FBQ0EsUUFBSSxlQUFlLFNBQVMsU0FBUyxHQUFHO0FBQ3BDLFlBQU0sSUFBSSxNQUFNLDZEQUE2RCxZQUFZO0FBQUEsSUFDN0Y7QUFDQSxXQUFPLEdBQUcsUUFBUSxZQUFZLEdBQUcsTUFBTSxpQkFBaUIsR0FBRyxNQUFNO0FBQUE7QUFwRHJFLE1BQUksa0JBQW1CLFdBQVEsUUFBSyxvQkFBcUIsT0FBTyxpQkFBa0IsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQzVGLFFBQUksT0FBTztBQUFXLFdBQUs7QUFDM0IsV0FBTyxlQUFlLEdBQUcsSUFBSSxFQUFFLFlBQVksTUFBTSxhQUFhLEdBQUc7QUFBRSxhQUFPLEVBQUU7QUFBQSxNQUFNLENBQUM7QUFBQSxjQUN6RSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUk7QUFDeEIsUUFBSSxPQUFPO0FBQVcsV0FBSztBQUMzQixNQUFFLE1BQU0sRUFBRTtBQUFBO0FBRWQsTUFBSSxxQkFBc0IsV0FBUSxRQUFLLHVCQUF3QixPQUFPLGlCQUFrQixDQUFDLEdBQUcsR0FBRztBQUMzRixXQUFPLGVBQWUsR0FBRyxXQUFXLEVBQUUsWUFBWSxNQUFNLE9BQU8sRUFBRSxDQUFDO0FBQUEsY0FDekQsQ0FBQyxHQUFHLEdBQUc7QUFDaEIsTUFBRSxhQUFhO0FBQUE7QUFFbkIsTUFBSSxlQUFnQixXQUFRLFFBQUssd0JBQTBCLENBQUMsS0FBSztBQUM3RCxRQUFJLE9BQU8sSUFBSTtBQUFZLGFBQU87QUFDbEMsUUFBSSxTQUFTLENBQUM7QUFDZCxRQUFJLE9BQU87QUFBTSxlQUFTLEtBQUs7QUFBSyxZQUFJLE1BQU0sYUFBYSxPQUFPLGVBQWUsS0FBSyxLQUFLLENBQUM7QUFBRywwQkFBZ0IsUUFBUSxLQUFLLENBQUM7QUFBQTtBQUM3SCx1QkFBbUIsUUFBUSxHQUFHO0FBQzlCLFdBQU87QUFBQTtBQUVYLFNBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxVQUFRLHlCQUF5QixRQUFRLG1CQUF3QjtBQUdqRSxNQUFNLEtBQUssc0NBQTBCO0FBQ3JDLE1BQU0sS0FBSyxzQ0FBMEI7QUFDckMsTUFBTTtBQUNOLE1BQU07QUFhTixVQUFRLG1CQUFtQjtBQWUzQixVQUFRLHlCQUF5QjtBQUFBOzs7QUNCakNHQSxNQUFTLHNCQUFXLENBQUMsUUFBUTtBQUN6QixVQUFNLFdBQVcsT0FBTyxhQUFhO0FBQ3JDLFFBQUksWUFBWSxNQUFNLEdBQUc7QUFDckI7QUFBQSxJQUNKO0FBQ0EsVUFBTSxZQUFZLE1BQU07QUFDcEIsVUFBSSxVQUFVO0FBQ1YsZUFBTyxRQUFRLElBQUksa0JBQWtCLFFBQVEsSUFBSTtBQUFBLE1BQ3JELE9BQ0s7QUFDRCxlQUFPLFFBQVEsSUFBSSxpQkFBaUIsUUFBUSxJQUFJO0FBQUE7QUFBQSxPQUVyRDtBQUNILFFBQUksVUFBVTtBQUNWLFVBQUk7QUFDQSxlQUFPLElBQUksSUFBSSxRQUFRO0FBQUEsZUFFcEIsSUFBUDtBQUNJLGFBQUssU0FBUyxXQUFXLFNBQVMsTUFBTSxTQUFTLFdBQVcsVUFBVTtBQUNsRSxpQkFBTyxJQUFJLElBQUksVUFBVSxVQUFVO0FBQUE7QUFBQSxJQUUvQyxPQUNLO0FBQ0Q7QUFBQTtBQUFBO0FBSVIsTUFBUyxzQkFBVyxDQUFDLFFBQVE7QUFDekIsU0FBSyxPQUFPLFVBQVU7QUFDbEIsYUFBTztBQUFBLElBQ1g7QUFDQSxVQUFNLFVBQVUsT0FBTztBQUN2QixRQUFJLGtCQUFrQixPQUFPLEdBQUc7QUFDNUIsYUFBTztBQUFBLElBQ1g7QUFDQSxVQUFNLFVBQVUsUUFBUSxJQUFJLGVBQWUsUUFBUSxJQUFJLGVBQWU7QUFDdEUsU0FBSyxTQUFTO0FBQ1YsYUFBTztBQUFBLElBQ1g7QUFFQSxRQUFJO0FBQ0osUUFBSSxPQUFPLE1BQU07QUFDYixnQkFBVSxPQUFPLE9BQU8sSUFBSTtBQUFBLElBQ2hDLFdBQ1MsT0FBTyxhQUFhLFNBQVM7QUFDbEMsZ0JBQVU7QUFBQSxJQUNkLFdBQ1MsT0FBTyxhQUFhLFVBQVU7QUFDbkMsZ0JBQVU7QUFBQSxJQUNkO0FBRUEsVUFBTSxnQkFBZ0IsQ0FBQyxPQUFPLFNBQVMsWUFBWSxDQUFDO0FBQ3BELGVBQVcsWUFBWSxVQUFVO0FBQzdCLG9CQUFjLEtBQUssR0FBRyxjQUFjLE1BQU0sU0FBUztBQUFBLElBQ3ZEO0FBRUEsZUFBVyxvQkFBb0IsUUFDMUIsTUFBTSxHQUFHLEVBQ1QsSUFBSSxPQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxFQUMvQixPQUFPLE9BQUssQ0FBQyxHQUFHO0FBQ2pCLFVBQUkscUJBQXFCLE9BQ3JCLGNBQWMsS0FBSyxPQUFLLE1BQU0sb0JBQzFCLEVBQUUsU0FBUyxJQUFJLGtCQUFrQixLQUNoQyxpQkFBaUIsV0FBVyxHQUFHLEtBQzVCLEVBQUUsU0FBUyxHQUFHLGtCQUFrQixDQUFFLEdBQUc7QUFDN0MsZUFBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQ0EsV0FBTztBQUFBO0FBR1gsTUFBUyw0QkFBaUIsQ0FBQyxNQUFNO0FBQzdCLFVBQU0sWUFBWSxLQUFLLFlBQVk7QUFDbkMsV0FBUSxjQUFjLGVBQ2xCLFVBQVUsV0FBVyxNQUFNLEtBQzNCLFVBQVUsV0FBVyxPQUFPLEtBQzVCLFVBQVUsV0FBVyxtQkFBbUI7QUFBQTtBQTlFaEQsU0FBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELEVBQVEsc0JBQXNCLHNCQUFtQjtBQTJCakQsRUFBUSxzQkFBYztBQTRDdEIsRUFBUSxzQkFBYztBQUFBOzs7QUNCdEJpQkEsTUFBUyx1QkFBWSxDQUFDLFNBQVM7QUFDN0IsUUFBSSxRQUFRLElBQUksZUFBZSxPQUFPO0FBQ3RDLFVBQU0sVUFBVSxLQUFLO0FBQ3JCLFdBQU87QUFBQTtBQUdULE1BQVMsd0JBQWEsQ0FBQyxTQUFTO0FBQzlCLFFBQUksUUFBUSxJQUFJLGVBQWUsT0FBTztBQUN0QyxVQUFNLFVBQVUsS0FBSztBQUNyQixVQUFNLGVBQWU7QUFDckIsVUFBTSxjQUFjO0FBQ3BCLFdBQU87QUFBQTtBQUdULE1BQVMsd0JBQWEsQ0FBQyxTQUFTO0FBQzlCLFFBQUksUUFBUSxJQUFJLGVBQWUsT0FBTztBQUN0QyxVQUFNLFVBQVUsTUFBTTtBQUN0QixXQUFPO0FBQUE7QUFHVCxNQUFTLHlCQUFjLENBQUMsU0FBUztBQUMvQixRQUFJLFFBQVEsSUFBSSxlQUFlLE9BQU87QUFDdEMsVUFBTSxVQUFVLE1BQU07QUFDdEIsVUFBTSxlQUFlO0FBQ3JCLFVBQU0sY0FBYztBQUNwQixXQUFPO0FBQUE7QUFJVCxNQUFTLHlCQUFjLENBQUMsU0FBUztBQUMvQixRQUFJLE9BQU87QUFDWCxTQUFLLFVBQVUsV0FBVyxDQUFDO0FBQzNCLFNBQUssZUFBZSxLQUFLLFFBQVEsU0FBUyxDQUFDO0FBQzNDLFNBQUssYUFBYSxLQUFLLFFBQVEsY0FBYyxLQUFLLE1BQU07QUFDeEQsU0FBSyxXQUFXLENBQUM7QUFDakIsU0FBSyxVQUFVLENBQUM7QUFFaEIsU0FBSyxHQUFHLGlCQUFpQixNQUFNLENBQUMsUUFBUSxNQUFNLE1BQU0sY0FBYztBQUNoRSxVQUFJLFdBQVUsVUFBVSxNQUFNLE1BQU0sWUFBWTtBQUNoRCxlQUFTLElBQUksR0FBRyxNQUFNLEtBQUssU0FBUyxPQUFRLElBQUksT0FBTyxHQUFHO0FBQ3hELFlBQUksVUFBVSxLQUFLLFNBQVM7QUFDNUIsWUFBSSxRQUFRLFNBQVMsU0FBUSxRQUFRLFFBQVEsU0FBUyxTQUFRLE1BQU07QUFHbEUsZUFBSyxTQUFTLE9BQU8sR0FBRyxDQUFDO0FBQ3pCLGtCQUFRLFFBQVEsU0FBUyxNQUFNO0FBQy9CO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFDQSxhQUFPLFFBQVE7QUFDZixXQUFLLGFBQWEsTUFBTTtBQUFBLEtBQ3pCO0FBQUE7QUF3SUgsTUFBUyw2QkFBa0IsQ0FBQyxTQUFTLElBQUk7QUFDdkMsUUFBSSxPQUFPO0FBQ1gsbUJBQWUsVUFBVSxhQUFhLEtBQUssTUFBTSxpQkFBaUIsQ0FBQyxRQUFRO0FBQ3pFLFVBQUksYUFBYSxRQUFRLFFBQVEsVUFBVSxNQUFNO0FBQ2pELFVBQUksYUFBYSxhQUFhLENBQUMsR0FBRyxLQUFLLFNBQVM7QUFBQSxRQUM5QztBQUFBLFFBQ0EsWUFBWSxhQUFhLFdBQVcsUUFBUSxRQUFRLEVBQUUsSUFBSSxRQUFRO0FBQUEsTUFDcEUsQ0FBQztBQUdELFVBQUksZUFBZSxJQUFJLFFBQVEsR0FBRyxVQUFVO0FBQzVDLFdBQUssUUFBUSxLQUFLLFFBQVEsUUFBUSxNQUFNLEtBQUs7QUFDN0MsU0FBRyxZQUFZO0FBQUEsS0FDaEI7QUFBQTtBQUlILE1BQVMsb0JBQVMsQ0FBQyxNQUFNLE1BQU0sY0FBYztBQUMzQyxlQUFXLFNBQVMsVUFBVTtBQUM1QixhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUE7QUFHVCxNQUFTLHVCQUFZLENBQUMsUUFBUTtBQUM1QixhQUFTLElBQUksR0FBRyxNQUFNLFVBQVUsT0FBUSxJQUFJLE9BQU8sR0FBRztBQUNwRCxVQUFJLFlBQVksVUFBVTtBQUMxQixpQkFBVyxjQUFjLFVBQVU7QUFDakMsWUFBSSxPQUFPLE9BQU8sS0FBSyxTQUFTO0FBQ2hDLGlCQUFTLElBQUksR0FBRyxTQUFTLEtBQUssT0FBUSxJQUFJLFVBQVUsR0FBRztBQUNyRCxjQUFJLElBQUksS0FBSztBQUNiLGNBQUksVUFBVSxPQUFPLFdBQVc7QUFDOUIsbUJBQU8sS0FBSyxVQUFVO0FBQUEsVUFDeEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUE7QUFuUFQsTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUdKLEVBQVEsdUJBQWU7QUFDdkIsRUFBUSx3QkFBZ0I7QUFDeEIsRUFBUSx3QkFBZ0I7QUFDeEIsRUFBUSx5QkFBaUI7QUF3RHpCLE9BQUssU0FBUyxnQkFBZ0IsT0FBTyxZQUFZO0FBRWpELGlCQUFlLFVBQVUsc0JBQXNCLFVBQVUsQ0FBQyxLQUFLLE1BQU0sTUFBTSxjQUFjO0FBQ3ZGLFFBQUksT0FBTztBQUNYLFFBQUksVUFBVSxhQUFhLEVBQUMsU0FBUyxJQUFHLEdBQUcsS0FBSyxTQUFTLFVBQVUsTUFBTSxNQUFNLFlBQVksQ0FBQztBQUU1RixRQUFJLEtBQUssUUFBUSxVQUFVLEtBQUssWUFBWTtBQUUxQyxXQUFLLFNBQVMsS0FBSyxPQUFPO0FBQzFCO0FBQUEsSUFDRjtBQUdBLFNBQUssYUFBYSxpQkFBaUIsQ0FBQyxRQUFRO0FBQzFDLGFBQU8sR0FBRyxRQUFRLE1BQU07QUFDeEIsYUFBTyxHQUFHLFNBQVMsZUFBZTtBQUNsQyxhQUFPLEdBQUcsZUFBZSxlQUFlO0FBQ3hDLFVBQUksU0FBUyxNQUFNO0FBRW5CLGVBQVMsTUFBTSxHQUFHO0FBQ2hCLGFBQUssS0FBSyxRQUFRLFFBQVEsT0FBTztBQUFBO0FBR25DLGVBQVMsZUFBZSxDQUFDLEtBQUs7QUFDNUIsYUFBSyxhQUFhLE1BQU07QUFDeEIsZUFBTyxlQUFlLFFBQVEsTUFBTTtBQUNwQyxlQUFPLGVBQWUsU0FBUyxlQUFlO0FBQzlDLGVBQU8sZUFBZSxlQUFlLGVBQWU7QUFBQTtBQUFBLEtBRXZEO0FBQUE7QUFHSCxpQkFBZSxVQUFVLHdCQUF3QixZQUFZLENBQUMsU0FBUyxJQUFJO0FBQ3pFLFFBQUksT0FBTztBQUNYLFFBQUksY0FBYyxDQUFDO0FBQ25CLFNBQUssUUFBUSxLQUFLLFdBQVc7QUFFN0IsUUFBSSxpQkFBaUIsYUFBYSxDQUFDLEdBQUcsS0FBSyxjQUFjO0FBQUEsTUFDdkQsUUFBUTtBQUFBLE1BQ1IsTUFBTSxRQUFRLE9BQU8sTUFBTSxRQUFRO0FBQUEsTUFDbkMsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsTUFBTSxRQUFRLE9BQU8sTUFBTSxRQUFRO0FBQUEsTUFDckM7QUFBQSxJQUNGLENBQUM7QUFDRCxRQUFJLFFBQVEsY0FBYztBQUN4QixxQkFBZSxlQUFlLFFBQVE7QUFBQSxJQUN4QztBQUNBLFFBQUksZUFBZSxXQUFXO0FBQzVCLHFCQUFlLFVBQVUsZUFBZSxXQUFXLENBQUM7QUFDcEQscUJBQWUsUUFBUSx5QkFBeUIsV0FDNUMsSUFBSSxPQUFPLGVBQWUsU0FBUyxFQUFFLFNBQVMsUUFBUTtBQUFBLElBQzVEO0FBRUEsVUFBTSx3QkFBd0I7QUFDOUIsUUFBSSxhQUFhLEtBQUssUUFBUSxjQUFjO0FBQzVDLGVBQVcsOEJBQThCO0FBQ3pDLGVBQVcsS0FBSyxZQUFZLFVBQVU7QUFDdEMsZUFBVyxLQUFLLFdBQVcsU0FBUztBQUNwQyxlQUFXLEtBQUssV0FBVyxTQUFTO0FBQ3BDLGVBQVcsS0FBSyxTQUFTLE9BQU87QUFDaEMsZUFBVyxJQUFJO0FBRWYsYUFBUyxVQUFVLENBQUMsS0FBSztBQUV2QixVQUFJLFVBQVU7QUFBQTtBQUdoQixhQUFTLFNBQVMsQ0FBQyxLQUFLLFFBQVEsTUFBTTtBQUVwQyxjQUFRLGlCQUFpQixHQUFHO0FBQzFCLGtCQUFVLEtBQUssUUFBUSxJQUFJO0FBQUEsT0FDNUI7QUFBQTtBQUdILGFBQVMsU0FBUyxDQUFDLEtBQUssUUFBUSxNQUFNO0FBQ3BDLGlCQUFXLG1CQUFtQjtBQUM5QixhQUFPLG1CQUFtQjtBQUUxQixVQUFJLElBQUksZUFBZSxLQUFLO0FBQzFCLGNBQU0sNERBQ0osSUFBSSxVQUFVO0FBQ2hCLGVBQU8sUUFBUTtBQUNmLFlBQUksUUFBUSxJQUFJLE1BQU0sMkRBQ0osSUFBSSxVQUFVO0FBQ2hDLGNBQU0sT0FBTztBQUNiLGdCQUFRLFFBQVEsS0FBSyxTQUFTLEtBQUs7QUFDbkMsYUFBSyxhQUFhLFdBQVc7QUFDN0I7QUFBQSxNQUNGO0FBQ0EsVUFBSSxLQUFLLFNBQVMsR0FBRztBQUNuQixjQUFNLHNDQUFzQztBQUM1QyxlQUFPLFFBQVE7QUFDZixZQUFJLFFBQVEsSUFBSSxNQUFNLHNDQUFzQztBQUM1RCxjQUFNLE9BQU87QUFDYixnQkFBUSxRQUFRLEtBQUssU0FBUyxLQUFLO0FBQ25DLGFBQUssYUFBYSxXQUFXO0FBQzdCO0FBQUEsTUFDRjtBQUNBLFlBQU0sc0NBQXNDO0FBQzVDLFdBQUssUUFBUSxLQUFLLFFBQVEsUUFBUSxXQUFXLEtBQUs7QUFDbEQsYUFBTyxHQUFHLE1BQU07QUFBQTtBQUdsQixhQUFTLE9BQU8sQ0FBQyxPQUFPO0FBQ3RCLGlCQUFXLG1CQUFtQjtBQUU5QixZQUFNLHlEQUNBLE1BQU0sU0FBUyxNQUFNLEtBQUs7QUFDaEMsVUFBSSxRQUFRLElBQUksTUFBTSxzREFDVyxNQUFNLE9BQU87QUFDOUMsWUFBTSxPQUFPO0FBQ2IsY0FBUSxRQUFRLEtBQUssU0FBUyxLQUFLO0FBQ25DLFdBQUssYUFBYSxXQUFXO0FBQUE7QUFBQTtBQUlqQyxpQkFBZSxVQUFVLHdCQUF3QixZQUFZLENBQUMsUUFBUTtBQUNwRSxRQUFJLE1BQU0sS0FBSyxRQUFRLFFBQVEsTUFBTTtBQUNyQyxRQUFJLFNBQVEsR0FBSTtBQUNkO0FBQUEsSUFDRjtBQUNBLFNBQUssUUFBUSxPQUFPLEtBQUssQ0FBQztBQUUxQixRQUFJLFVBQVUsS0FBSyxTQUFTLE1BQU07QUFDbEMsUUFBSSxTQUFTO0FBR1gsV0FBSyxhQUFhLGlCQUFpQixDQUFDLFNBQVE7QUFDMUMsZ0JBQVEsUUFBUSxTQUFTLE9BQU07QUFBQSxPQUNoQztBQUFBLElBQ0g7QUFBQTtBQWdERixNQUFJO0FBQ0osTUFBSSxRQUFRLElBQUksY0FBYyxhQUFhLEtBQUssUUFBUSxJQUFJLFVBQVUsR0FBRztBQUN2RSxvQkFBZ0IsR0FBRztBQUNqQixVQUFJLE9BQU8sTUFBTSxVQUFVLE1BQU0sS0FBSyxTQUFTO0FBQy9DLGlCQUFXLEtBQUssT0FBTyxVQUFVO0FBQy9CLGFBQUssS0FBSyxhQUFhLEtBQUs7QUFBQSxNQUM5QixPQUFPO0FBQ0wsYUFBSyxRQUFRLFNBQVM7QUFBQTtBQUV4QixjQUFRLE1BQU0sTUFBTSxTQUFTLElBQUk7QUFBQTtBQUFBLEVBRXJDLE9BQU87QUFDTCxvQkFBZ0IsR0FBRztBQUFBO0FBQUE7QUFFckIsRUFBUSxnQkFBUTtBQUFBOzs7QUNCaEJvRkEsTUFBUyxzQkFBVyxDQUFDLFdBQVc7QUFDNUIsVUFBTSxXQUFXLEdBQUcsWUFBWSxJQUFJLElBQUksU0FBUyxDQUFDO0FBQ2xELFdBQU8sV0FBVyxTQUFTLE9BQU87QUFBQTtBQTJEdEMsTUFBUyxrQkFBTyxDQUFDLFlBQVk7QUFDekIsVUFBTSxZQUFZLElBQUksSUFBSSxVQUFVO0FBQ3BDLFdBQU8sVUFBVSxhQUFhO0FBQUE7QUFqSmxDLE1BQUksa0JBQW1CLFdBQVEsUUFBSyxvQkFBcUIsT0FBTyxpQkFBa0IsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQzVGLFFBQUksT0FBTztBQUFXLFdBQUs7QUFDM0IsUUFBSSxPQUFPLE9BQU8seUJBQXlCLEdBQUcsQ0FBQztBQUMvQyxTQUFLLFNBQVMsU0FBUyxRQUFRLEVBQUUsYUFBYSxLQUFLLFlBQVksS0FBSyxlQUFlO0FBQ2pGLGFBQU8sRUFBRSxZQUFZLE1BQU0sYUFBYSxHQUFHO0FBQUUsZUFBTyxFQUFFO0FBQUEsUUFBTTtBQUFBLElBQzlEO0FBQ0EsV0FBTyxlQUFlLEdBQUcsSUFBSSxJQUFJO0FBQUEsY0FDdkIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQ3hCLFFBQUksT0FBTztBQUFXLFdBQUs7QUFDM0IsTUFBRSxNQUFNLEVBQUU7QUFBQTtBQUVkLE1BQUkscUJBQXNCLFdBQVEsUUFBSyx1QkFBd0IsT0FBTyxpQkFBa0IsQ0FBQyxHQUFHLEdBQUc7QUFDM0YsV0FBTyxlQUFlLEdBQUcsV0FBVyxFQUFFLFlBQVksTUFBTSxPQUFPLEVBQUUsQ0FBQztBQUFBLGNBQ3pELENBQUMsR0FBRyxHQUFHO0FBQ2hCLE1BQUUsYUFBYTtBQUFBO0FBRW5CLE1BQUksZUFBZ0IsV0FBUSxRQUFLLHdCQUEwQixDQUFDLEtBQUs7QUFDN0QsUUFBSSxPQUFPLElBQUk7QUFBWSxhQUFPO0FBQ2xDLFFBQUksU0FBUyxDQUFDO0FBQ2QsUUFBSSxPQUFPO0FBQU0sZUFBUyxLQUFLO0FBQUssWUFBSSxNQUFNLGFBQWEsT0FBTyxVQUFVLGVBQWUsS0FBSyxLQUFLLENBQUM7QUFBRywwQkFBZ0IsUUFBUSxLQUFLLENBQUM7QUFBQTtBQUN2SSx1QkFBbUIsUUFBUSxHQUFHO0FBQzlCLFdBQU87QUFBQTtBQUVYLE1BQUksWUFBYSxXQUFRLFFBQUsscUJBQXVCLENBQUMsU0FBUyxZQUFZLEdBQUcsV0FBVztBQUNyRixhQUFTLEtBQUssQ0FBQyxPQUFPO0FBQUUsYUFBTyxpQkFBaUIsSUFBSSxRQUFRLElBQUksVUFBVyxDQUFDLFNBQVM7QUFBRSxnQkFBUSxLQUFLO0FBQUEsT0FBSTtBQUFBO0FBQ3hHLFdBQU8sS0FBSyxNQUFNLElBQUksa0JBQW1CLENBQUMsU0FBUyxRQUFRO0FBQ3ZELGVBQVMsU0FBUyxDQUFDLE9BQU87QUFBRSxZQUFJO0FBQUUsZUFBSyxVQUFVLEtBQUssS0FBSyxDQUFDO0FBQUEsaUJBQVksR0FBUDtBQUFZLGlCQUFPLENBQUM7QUFBQTtBQUFBO0FBQ3JGLGVBQVMsUUFBUSxDQUFDLE9BQU87QUFBRSxZQUFJO0FBQUUsZUFBSyxVQUFVLFNBQVMsS0FBSyxDQUFDO0FBQUEsaUJBQVksR0FBUDtBQUFZLGlCQUFPLENBQUM7QUFBQTtBQUFBO0FBQ3hGLGVBQVMsSUFBSSxDQUFDLFFBQVE7QUFBRSxlQUFPLE9BQU8sUUFBUSxPQUFPLEtBQUssSUFBSSxNQUFNLE9BQU8sS0FBSyxFQUFFLEtBQUssV0FBVyxRQUFRO0FBQUE7QUFDMUcsWUFBTSxZQUFZLFVBQVUsTUFBTSxTQUFTLGNBQWMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQUEsS0FDdkU7QUFBQTtBQUVMLFNBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxVQUFRLGFBQWEsUUFBUSxVQUFVLFFBQVEscUJBQXFCLFFBQVEsa0JBQWtCLFFBQVEsY0FBYyxRQUFRLGFBQWEsUUFBUSxVQUFVLFFBQVEsWUFBaUI7QUFDcEwsTUFBTSxPQUFPLHdDQUE0QjtBQUN6QyxNQUFNLFFBQVEseUNBQTZCO0FBQzNDLE1BQU0sS0FBSyw0QkFBK0I7QUFDMUMsTUFBTSxTQUFTLDZCQUE4QjtBQUM3QyxNQUFNO0FBQ04sTUFBSTtBQUNKLFdBQVUsQ0FBQyxZQUFXO0FBQ2xCLGVBQVUsV0FBVSxRQUFRLE9BQU87QUFDbkMsZUFBVSxXQUFVLHFCQUFxQixPQUFPO0FBQ2hELGVBQVUsV0FBVSxzQkFBc0IsT0FBTztBQUNqRCxlQUFVLFdBQVUsbUJBQW1CLE9BQU87QUFDOUMsZUFBVSxXQUFVLGNBQWMsT0FBTztBQUN6QyxlQUFVLFdBQVUsaUJBQWlCLE9BQU87QUFDNUMsZUFBVSxXQUFVLGNBQWMsT0FBTztBQUN6QyxlQUFVLFdBQVUsaUJBQWlCLE9BQU87QUFDNUMsZUFBVSxXQUFVLHVCQUF1QixPQUFPO0FBQ2xELGVBQVUsV0FBVSx1QkFBdUIsT0FBTztBQUNsRCxlQUFVLFdBQVUsZ0JBQWdCLE9BQU87QUFDM0MsZUFBVSxXQUFVLGtCQUFrQixPQUFPO0FBQzdDLGVBQVUsV0FBVSxxQkFBcUIsT0FBTztBQUNoRCxlQUFVLFdBQVUsZUFBZSxPQUFPO0FBQzFDLGVBQVUsV0FBVSxjQUFjLE9BQU87QUFDekMsZUFBVSxXQUFVLHNCQUFzQixPQUFPO0FBQ2pELGVBQVUsV0FBVSxtQkFBbUIsT0FBTztBQUM5QyxlQUFVLFdBQVUsaUNBQWlDLE9BQU87QUFDNUQsZUFBVSxXQUFVLG9CQUFvQixPQUFPO0FBQy9DLGVBQVUsV0FBVSxjQUFjLE9BQU87QUFDekMsZUFBVSxXQUFVLFVBQVUsT0FBTztBQUNyQyxlQUFVLFdBQVUscUJBQXFCLE9BQU87QUFDaEQsZUFBVSxXQUFVLHlCQUF5QixPQUFPO0FBQ3BELGVBQVUsV0FBVSxvQkFBb0IsT0FBTztBQUMvQyxlQUFVLFdBQVUsZ0JBQWdCLE9BQU87QUFDM0MsZUFBVSxXQUFVLHdCQUF3QixPQUFPO0FBQ25ELGVBQVUsV0FBVSxvQkFBb0IsT0FBTztBQUFBLEtBQ2hELGNBQWMsUUFBUSxZQUFZLFlBQVksQ0FBQyxFQUFFO0FBQ3BELE1BQUk7QUFDSixXQUFVLENBQUMsVUFBUztBQUNoQixhQUFRLFlBQVk7QUFDcEIsYUFBUSxpQkFBaUI7QUFBQSxLQUMxQixZQUFZLFFBQVEsVUFBVSxVQUFVLENBQUMsRUFBRTtBQUM5QyxNQUFJO0FBQ0osV0FBVSxDQUFDLGFBQVk7QUFDbkIsZ0JBQVcscUJBQXFCO0FBQUEsS0FDakMsZUFBZSxRQUFRLGFBQWEsYUFBYSxDQUFDLEVBQUU7QUFTdkQsVUFBUSxjQUFjO0FBQ3RCLE1BQU0sb0JBQW9CO0FBQUEsSUFDdEIsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLEVBQ2Q7QUFDQSxNQUFNLHlCQUF5QjtBQUFBLElBQzNCLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxFQUNkO0FBQ0EsTUFBTSxxQkFBcUIsQ0FBQyxXQUFXLE9BQU8sVUFBVSxNQUFNO0FBQzlELE1BQU0sNEJBQTRCO0FBQ2xDLE1BQU0sOEJBQThCO0FBQ3BDO0FBQUEsUUFBTSx3QkFBd0IsTUFBTTtBQUFBLElBQ2hDLFdBQVcsQ0FBQyxTQUFTLFlBQVk7QUFDN0IsWUFBTSxPQUFPO0FBQ2IsV0FBSyxPQUFPO0FBQ1osV0FBSyxhQUFhO0FBQ2xCLGFBQU8sZUFBZSxNQUFNLGdCQUFnQixTQUFTO0FBQUE7QUFBQSxFQUU3RDtBQUNBLFVBQVEsa0JBQWtCO0FBQzFCO0FBQUEsUUFBTSxtQkFBbUI7QUFBQSxJQUNyQixXQUFXLENBQUMsU0FBUztBQUNqQixXQUFLLFVBQVU7QUFBQTtBQUFBLElBRW5CLFFBQVEsR0FBRztBQUNQLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxlQUFPLElBQUksUUFBUSxDQUFDLFlBQVksVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUN6RSxjQUFJLFNBQVMsT0FBTyxNQUFNLENBQUM7QUFDM0IsZUFBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLFVBQVU7QUFDL0IscUJBQVMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUM7QUFBQSxXQUN6QztBQUNELGVBQUssUUFBUSxHQUFHLE9BQU8sTUFBTTtBQUN6QixvQkFBUSxPQUFPLFNBQVMsQ0FBQztBQUFBLFdBQzVCO0FBQUEsU0FDSixDQUFDO0FBQUEsT0FDTDtBQUFBO0FBQUEsSUFFTCxjQUFjLEdBQUc7QUFDYixhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsZUFBTyxJQUFJLFFBQVEsQ0FBQyxZQUFZLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDekUsZ0JBQU0sU0FBUyxDQUFDO0FBQ2hCLGVBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVO0FBQy9CLG1CQUFPLEtBQUssS0FBSztBQUFBLFdBQ3BCO0FBQ0QsZUFBSyxRQUFRLEdBQUcsT0FBTyxNQUFNO0FBQ3pCLG9CQUFRLE9BQU8sT0FBTyxNQUFNLENBQUM7QUFBQSxXQUNoQztBQUFBLFNBQ0osQ0FBQztBQUFBLE9BQ0w7QUFBQTtBQUFBLEVBRVQ7QUFDQSxVQUFRLHFCQUFxQjtBQUs3QixVQUFRLFVBQVU7QUFDbEI7QUFBQSxRQUFNLFdBQVc7QUFBQSxJQUNiLFdBQVcsQ0FBQyxXQUFXLFVBQVUsZ0JBQWdCO0FBQzdDLFdBQUssa0JBQWtCO0FBQ3ZCLFdBQUssa0JBQWtCO0FBQ3ZCLFdBQUssMEJBQTBCO0FBQy9CLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssY0FBYztBQUNuQixXQUFLLGFBQWE7QUFDbEIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssWUFBWTtBQUNqQixXQUFLLFdBQVcsWUFBWSxDQUFDO0FBQzdCLFdBQUssaUJBQWlCO0FBQ3RCLFVBQUksZ0JBQWdCO0FBQ2hCLFlBQUksZUFBZSxrQkFBa0IsTUFBTTtBQUN2QyxlQUFLLGtCQUFrQixlQUFlO0FBQUEsUUFDMUM7QUFDQSxhQUFLLGlCQUFpQixlQUFlO0FBQ3JDLFlBQUksZUFBZSxrQkFBa0IsTUFBTTtBQUN2QyxlQUFLLGtCQUFrQixlQUFlO0FBQUEsUUFDMUM7QUFDQSxZQUFJLGVBQWUsMEJBQTBCLE1BQU07QUFDL0MsZUFBSywwQkFBMEIsZUFBZTtBQUFBLFFBQ2xEO0FBQ0EsWUFBSSxlQUFlLGdCQUFnQixNQUFNO0FBQ3JDLGVBQUssZ0JBQWdCLEtBQUssSUFBSSxlQUFlLGNBQWMsQ0FBQztBQUFBLFFBQ2hFO0FBQ0EsWUFBSSxlQUFlLGFBQWEsTUFBTTtBQUNsQyxlQUFLLGFBQWEsZUFBZTtBQUFBLFFBQ3JDO0FBQ0EsWUFBSSxlQUFlLGdCQUFnQixNQUFNO0FBQ3JDLGVBQUssZ0JBQWdCLGVBQWU7QUFBQSxRQUN4QztBQUNBLFlBQUksZUFBZSxjQUFjLE1BQU07QUFDbkMsZUFBSyxjQUFjLGVBQWU7QUFBQSxRQUN0QztBQUFBLE1BQ0o7QUFBQTtBQUFBLElBRUosT0FBTyxDQUFDLFlBQVksbUJBQW1CO0FBQ25DLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxlQUFPLEtBQUssUUFBUSxXQUFXLFlBQVksTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO0FBQUEsT0FDM0U7QUFBQTtBQUFBLElBRUwsR0FBRyxDQUFDLFlBQVksbUJBQW1CO0FBQy9CLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxlQUFPLEtBQUssUUFBUSxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO0FBQUEsT0FDdkU7QUFBQTtBQUFBLElBRUwsR0FBRyxDQUFDLFlBQVksbUJBQW1CO0FBQy9CLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxlQUFPLEtBQUssUUFBUSxVQUFVLFlBQVksTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO0FBQUEsT0FDMUU7QUFBQTtBQUFBLElBRUwsSUFBSSxDQUFDLFlBQVksTUFBTSxtQkFBbUI7QUFDdEMsYUFBTyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2hELGVBQU8sS0FBSyxRQUFRLFFBQVEsWUFBWSxNQUFNLHFCQUFxQixDQUFDLENBQUM7QUFBQSxPQUN4RTtBQUFBO0FBQUEsSUFFTCxLQUFLLENBQUMsWUFBWSxNQUFNLG1CQUFtQjtBQUN2QyxhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsZUFBTyxLQUFLLFFBQVEsU0FBUyxZQUFZLE1BQU0scUJBQXFCLENBQUMsQ0FBQztBQUFBLE9BQ3pFO0FBQUE7QUFBQSxJQUVMLEdBQUcsQ0FBQyxZQUFZLE1BQU0sbUJBQW1CO0FBQ3JDLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxlQUFPLEtBQUssUUFBUSxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO0FBQUEsT0FDdkU7QUFBQTtBQUFBLElBRUwsSUFBSSxDQUFDLFlBQVksbUJBQW1CO0FBQ2hDLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxlQUFPLEtBQUssUUFBUSxRQUFRLFlBQVksTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO0FBQUEsT0FDeEU7QUFBQTtBQUFBLElBRUwsVUFBVSxDQUFDLE1BQU0sWUFBWSxRQUFRLG1CQUFtQjtBQUNwRCxhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsZUFBTyxLQUFLLFFBQVEsTUFBTSxZQUFZLFFBQVEsaUJBQWlCO0FBQUEsT0FDbEU7QUFBQTtBQUFBLElBTUwsT0FBTyxDQUFDLFlBQVksb0JBQW9CLENBQUMsR0FBRztBQUN4QyxhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsMEJBQWtCLFFBQVEsVUFBVSxLQUFLLDRCQUE0QixtQkFBbUIsUUFBUSxRQUFRLFdBQVcsZUFBZTtBQUNsSSxjQUFNLE1BQU0sTUFBTSxLQUFLLElBQUksWUFBWSxpQkFBaUI7QUFDeEQsZUFBTyxLQUFLLGlCQUFpQixLQUFLLEtBQUssY0FBYztBQUFBLE9BQ3hEO0FBQUE7QUFBQSxJQUVMLFFBQVEsQ0FBQyxZQUFZLEtBQUssb0JBQW9CLENBQUMsR0FBRztBQUM5QyxhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsY0FBTSxPQUFPLEtBQUssVUFBVSxLQUFLLE1BQU0sQ0FBQztBQUN4QywwQkFBa0IsUUFBUSxVQUFVLEtBQUssNEJBQTRCLG1CQUFtQixRQUFRLFFBQVEsV0FBVyxlQUFlO0FBQ2xJLDBCQUFrQixRQUFRLGVBQWUsS0FBSyw0QkFBNEIsbUJBQW1CLFFBQVEsYUFBYSxXQUFXLGVBQWU7QUFDNUksY0FBTSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxpQkFBaUI7QUFDL0QsZUFBTyxLQUFLLGlCQUFpQixLQUFLLEtBQUssY0FBYztBQUFBLE9BQ3hEO0FBQUE7QUFBQSxJQUVMLE9BQU8sQ0FBQyxZQUFZLEtBQUssb0JBQW9CLENBQUMsR0FBRztBQUM3QyxhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsY0FBTSxPQUFPLEtBQUssVUFBVSxLQUFLLE1BQU0sQ0FBQztBQUN4QywwQkFBa0IsUUFBUSxVQUFVLEtBQUssNEJBQTRCLG1CQUFtQixRQUFRLFFBQVEsV0FBVyxlQUFlO0FBQ2xJLDBCQUFrQixRQUFRLGVBQWUsS0FBSyw0QkFBNEIsbUJBQW1CLFFBQVEsYUFBYSxXQUFXLGVBQWU7QUFDNUksY0FBTSxNQUFNLE1BQU0sS0FBSyxJQUFJLFlBQVksTUFBTSxpQkFBaUI7QUFDOUQsZUFBTyxLQUFLLGlCQUFpQixLQUFLLEtBQUssY0FBYztBQUFBLE9BQ3hEO0FBQUE7QUFBQSxJQUVMLFNBQVMsQ0FBQyxZQUFZLEtBQUssb0JBQW9CLENBQUMsR0FBRztBQUMvQyxhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsY0FBTSxPQUFPLEtBQUssVUFBVSxLQUFLLE1BQU0sQ0FBQztBQUN4QywwQkFBa0IsUUFBUSxVQUFVLEtBQUssNEJBQTRCLG1CQUFtQixRQUFRLFFBQVEsV0FBVyxlQUFlO0FBQ2xJLDBCQUFrQixRQUFRLGVBQWUsS0FBSyw0QkFBNEIsbUJBQW1CLFFBQVEsYUFBYSxXQUFXLGVBQWU7QUFDNUksY0FBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLFlBQVksTUFBTSxpQkFBaUI7QUFDaEUsZUFBTyxLQUFLLGlCQUFpQixLQUFLLEtBQUssY0FBYztBQUFBLE9BQ3hEO0FBQUE7QUFBQSxJQU9MLE9BQU8sQ0FBQyxNQUFNLFlBQVksTUFBTSxTQUFTO0FBQ3JDLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxZQUFJLEtBQUssV0FBVztBQUNoQixnQkFBTSxJQUFJLE1BQU0sbUNBQW1DO0FBQUEsUUFDdkQ7QUFDQSxjQUFNLFlBQVksSUFBSSxJQUFJLFVBQVU7QUFDcEMsWUFBSSxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sV0FBVyxPQUFPO0FBRXhELGNBQU0sV0FBVyxLQUFLLGlCQUFpQixtQkFBbUIsU0FBUyxJQUFJLElBQ2pFLEtBQUssY0FBYyxJQUNuQjtBQUNOLFlBQUksV0FBVztBQUNmLFlBQUk7QUFDSixXQUFHO0FBQ0MscUJBQVcsTUFBTSxLQUFLLFdBQVcsTUFBTSxJQUFJO0FBRTNDLGNBQUksWUFDQSxTQUFTLFdBQ1QsU0FBUyxRQUFRLGVBQWUsVUFBVSxjQUFjO0FBQ3hELGdCQUFJO0FBQ0osdUJBQVcsV0FBVyxLQUFLLFVBQVU7QUFDakMsa0JBQUksUUFBUSx3QkFBd0IsUUFBUSxHQUFHO0FBQzNDLHdDQUF3QjtBQUN4QjtBQUFBLGNBQ0o7QUFBQSxZQUNKO0FBQ0EsZ0JBQUksdUJBQXVCO0FBQ3ZCLHFCQUFPLHNCQUFzQixxQkFBcUIsTUFBTSxNQUFNLElBQUk7QUFBQSxZQUN0RSxPQUNLO0FBR0QscUJBQU87QUFBQTtBQUFBLFVBRWY7QUFDQSxjQUFJLHFCQUFxQixLQUFLO0FBQzlCLGlCQUFPLFNBQVMsUUFBUSxjQUNwQixrQkFBa0IsU0FBUyxTQUFTLFFBQVEsVUFBVSxLQUN0RCxLQUFLLG1CQUNMLHFCQUFxQixHQUFHO0FBQ3hCLGtCQUFNLGNBQWMsU0FBUyxRQUFRLFFBQVE7QUFDN0MsaUJBQUssYUFBYTtBQUVkO0FBQUEsWUFDSjtBQUNBLGtCQUFNLG9CQUFvQixJQUFJLElBQUksV0FBVztBQUM3QyxnQkFBSSxVQUFVLGFBQWEsWUFDdkIsVUFBVSxhQUFhLGtCQUFrQixhQUN4QyxLQUFLLHlCQUF5QjtBQUMvQixvQkFBTSxJQUFJLE1BQU0sOEtBQThLO0FBQUEsWUFDbE07QUFHQSxrQkFBTSxTQUFTLFNBQVM7QUFFeEIsZ0JBQUksa0JBQWtCLGFBQWEsVUFBVSxVQUFVO0FBQ25ELHlCQUFXLFVBQVUsU0FBUztBQUUxQixvQkFBSSxPQUFPLFlBQVksTUFBTSxpQkFBaUI7QUFDMUMseUJBQU8sUUFBUTtBQUFBLGdCQUNuQjtBQUFBLGNBQ0o7QUFBQSxZQUNKO0FBRUEsbUJBQU8sS0FBSyxnQkFBZ0IsTUFBTSxtQkFBbUIsT0FBTztBQUM1RCx1QkFBVyxNQUFNLEtBQUssV0FBVyxNQUFNLElBQUk7QUFDM0M7QUFBQSxVQUNKO0FBQ0EsZUFBSyxTQUFTLFFBQVEsZUFDakIsdUJBQXVCLFNBQVMsU0FBUyxRQUFRLFVBQVUsR0FBRztBQUUvRCxtQkFBTztBQUFBLFVBQ1g7QUFDQSxzQkFBWTtBQUNaLGNBQUksV0FBVyxVQUFVO0FBQ3JCLGtCQUFNLFNBQVMsU0FBUztBQUN4QixrQkFBTSxLQUFLLDJCQUEyQixRQUFRO0FBQUEsVUFDbEQ7QUFBQSxRQUNKLFNBQVMsV0FBVztBQUNwQixlQUFPO0FBQUEsT0FDVjtBQUFBO0FBQUEsSUFLTCxPQUFPLEdBQUc7QUFDTixVQUFJLEtBQUssUUFBUTtBQUNiLGFBQUssT0FBTyxRQUFRO0FBQUEsTUFDeEI7QUFDQSxXQUFLLFlBQVk7QUFBQTtBQUFBLElBT3JCLFVBQVUsQ0FBQyxNQUFNLE1BQU07QUFDbkIsYUFBTyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2hELGVBQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ3BDLG1CQUFTLGlCQUFpQixDQUFDLEtBQUssS0FBSztBQUNqQyxnQkFBSSxLQUFLO0FBQ0wscUJBQU8sR0FBRztBQUFBLFlBQ2QsWUFDVSxLQUFLO0FBRVgscUJBQU8sSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUFBLFlBQ3JDLE9BQ0s7QUFDRCxzQkFBUSxHQUFHO0FBQUE7QUFBQTtBQUduQixlQUFLLHVCQUF1QixNQUFNLE1BQU0saUJBQWlCO0FBQUEsU0FDNUQ7QUFBQSxPQUNKO0FBQUE7QUFBQSxJQVFMLHNCQUFzQixDQUFDLE1BQU0sTUFBTSxVQUFVO0FBQ3pDLGlCQUFXLFNBQVMsVUFBVTtBQUMxQixhQUFLLEtBQUssUUFBUSxTQUFTO0FBQ3ZCLGVBQUssUUFBUSxVQUFVLENBQUM7QUFBQSxRQUM1QjtBQUNBLGFBQUssUUFBUSxRQUFRLG9CQUFvQixPQUFPLFdBQVcsTUFBTSxNQUFNO0FBQUEsTUFDM0U7QUFDQSxVQUFJLGlCQUFpQjtBQUNyQixlQUFTLFlBQVksQ0FBQyxLQUFLLEtBQUs7QUFDNUIsYUFBSyxnQkFBZ0I7QUFDakIsMkJBQWlCO0FBQ2pCLG1CQUFTLEtBQUssR0FBRztBQUFBLFFBQ3JCO0FBQUE7QUFFSixZQUFNLE1BQU0sS0FBSyxXQUFXLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUTtBQUN2RCxjQUFNLE1BQU0sSUFBSSxtQkFBbUIsR0FBRztBQUN0QyxxQkFBYSxXQUFXLEdBQUc7QUFBQSxPQUM5QjtBQUNELFVBQUk7QUFDSixVQUFJLEdBQUcsVUFBVSxVQUFRO0FBQ3JCLGlCQUFTO0FBQUEsT0FDWjtBQUVELFVBQUksV0FBVyxLQUFLLGtCQUFrQixJQUFJLE9BQU8sTUFBTTtBQUNuRCxZQUFJLFFBQVE7QUFDUixpQkFBTyxJQUFJO0FBQUEsUUFDZjtBQUNBLHFCQUFhLElBQUksTUFBTSxvQkFBb0IsS0FBSyxRQUFRLE1BQU0sQ0FBQztBQUFBLE9BQ2xFO0FBQ0QsVUFBSSxHQUFHLGlCQUFrQixDQUFDLEtBQUs7QUFHM0IscUJBQWEsR0FBRztBQUFBLE9BQ25CO0FBQ0QsVUFBSSxlQUFlLFNBQVMsVUFBVTtBQUNsQyxZQUFJLE1BQU0sTUFBTSxNQUFNO0FBQUEsTUFDMUI7QUFDQSxVQUFJLGVBQWUsU0FBUyxVQUFVO0FBQ2xDLGFBQUssR0FBRyxpQkFBa0IsR0FBRztBQUN6QixjQUFJLElBQUk7QUFBQSxTQUNYO0FBQ0QsYUFBSyxLQUFLLEdBQUc7QUFBQSxNQUNqQixPQUNLO0FBQ0QsWUFBSSxJQUFJO0FBQUE7QUFBQTtBQUFBLElBUWhCLFFBQVEsQ0FBQyxXQUFXO0FBQ2hCLFlBQU0sWUFBWSxJQUFJLElBQUksU0FBUztBQUNuQyxhQUFPLEtBQUssVUFBVSxTQUFTO0FBQUE7QUFBQSxJQUVuQyxrQkFBa0IsQ0FBQyxXQUFXO0FBQzFCLFlBQU0sWUFBWSxJQUFJLElBQUksU0FBUztBQUNuQyxZQUFNLFdBQVcsR0FBRyxZQUFZLFNBQVM7QUFDekMsWUFBTSxXQUFXLFlBQVksU0FBUztBQUN0QyxXQUFLLFVBQVU7QUFDWDtBQUFBLE1BQ0o7QUFDQSxhQUFPLEtBQUsseUJBQXlCLFdBQVcsUUFBUTtBQUFBO0FBQUEsSUFFNUQsZUFBZSxDQUFDLFFBQVEsWUFBWSxTQUFTO0FBQ3pDLFlBQU0sT0FBTyxDQUFDO0FBQ2QsV0FBSyxZQUFZO0FBQ2pCLFlBQU0sV0FBVyxLQUFLLFVBQVUsYUFBYTtBQUM3QyxXQUFLLGFBQWEsV0FBVyxRQUFRO0FBQ3JDLFlBQU0sY0FBYyxXQUFXLE1BQU07QUFDckMsV0FBSyxVQUFVLENBQUM7QUFDaEIsV0FBSyxRQUFRLE9BQU8sS0FBSyxVQUFVO0FBQ25DLFdBQUssUUFBUSxPQUFPLEtBQUssVUFBVSxPQUM3QixTQUFTLEtBQUssVUFBVSxJQUFJLElBQzVCO0FBQ04sV0FBSyxRQUFRLFFBQ1IsS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVTtBQUNoRSxXQUFLLFFBQVEsU0FBUztBQUN0QixXQUFLLFFBQVEsVUFBVSxLQUFLLGNBQWMsT0FBTztBQUNqRCxVQUFJLEtBQUssYUFBYSxNQUFNO0FBQ3hCLGFBQUssUUFBUSxRQUFRLGdCQUFnQixLQUFLO0FBQUEsTUFDOUM7QUFDQSxXQUFLLFFBQVEsUUFBUSxLQUFLLFVBQVUsS0FBSyxTQUFTO0FBRWxELFVBQUksS0FBSyxVQUFVO0FBQ2YsbUJBQVcsV0FBVyxLQUFLLFVBQVU7QUFDakMsa0JBQVEsZUFBZSxLQUFLLE9BQU87QUFBQSxRQUN2QztBQUFBLE1BQ0o7QUFDQSxhQUFPO0FBQUE7QUFBQSxJQUVYLGFBQWEsQ0FBQyxTQUFTO0FBQ25CLFVBQUksS0FBSyxrQkFBa0IsS0FBSyxlQUFlLFNBQVM7QUFDcEQsZUFBTyxPQUFPLE9BQU8sQ0FBQyxHQUFHLGNBQWMsS0FBSyxlQUFlLE9BQU8sR0FBRyxjQUFjLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFBQSxNQUNyRztBQUNBLGFBQU8sY0FBYyxXQUFXLENBQUMsQ0FBQztBQUFBO0FBQUEsSUFFdEMsMkJBQTJCLENBQUMsbUJBQW1CLFFBQVEsVUFBVTtBQUM3RCxVQUFJO0FBQ0osVUFBSSxLQUFLLGtCQUFrQixLQUFLLGVBQWUsU0FBUztBQUNwRCx1QkFBZSxjQUFjLEtBQUssZUFBZSxPQUFPLEVBQUU7QUFBQSxNQUM5RDtBQUNBLGFBQU8sa0JBQWtCLFdBQVcsZ0JBQWdCO0FBQUE7QUFBQSxJQUV4RCxTQUFTLENBQUMsV0FBVztBQUNqQixVQUFJO0FBQ0osWUFBTSxXQUFXLEdBQUcsWUFBWSxTQUFTO0FBQ3pDLFlBQU0sV0FBVyxZQUFZLFNBQVM7QUFDdEMsVUFBSSxLQUFLLGNBQWMsVUFBVTtBQUM3QixnQkFBUSxLQUFLO0FBQUEsTUFDakI7QUFDQSxVQUFJLEtBQUssZUFBZSxVQUFVO0FBQzlCLGdCQUFRLEtBQUs7QUFBQSxNQUNqQjtBQUVBLFVBQUksT0FBTztBQUNQLGVBQU87QUFBQSxNQUNYO0FBQ0EsWUFBTSxXQUFXLFVBQVUsYUFBYTtBQUN4QyxVQUFJLGFBQWE7QUFDakIsVUFBSSxLQUFLLGdCQUFnQjtBQUNyQixxQkFBYSxLQUFLLGVBQWUsY0FBYyxLQUFLLFlBQVk7QUFBQSxNQUNwRTtBQUVBLFVBQUksWUFBWSxTQUFTLFVBQVU7QUFDL0IsY0FBTSxlQUFlO0FBQUEsVUFDakI7QUFBQSxVQUNBLFdBQVcsS0FBSztBQUFBLFVBQ2hCLE9BQU8sT0FBTyxPQUFPLE9BQU8sT0FBTyxDQUFDLElBQUssU0FBUyxZQUFZLFNBQVMsYUFBYTtBQUFBLFlBQ2hGLFdBQVcsR0FBRyxTQUFTLFlBQVksU0FBUztBQUFBLFVBQ2hELENBQUUsR0FBRyxFQUFFLE1BQU0sU0FBUyxVQUFVLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFBQSxRQUN6RDtBQUNBLFlBQUk7QUFDSixjQUFNLFlBQVksU0FBUyxhQUFhO0FBQ3hDLFlBQUksVUFBVTtBQUNWLHdCQUFjLFlBQVksT0FBTyxpQkFBaUIsT0FBTztBQUFBLFFBQzdELE9BQ0s7QUFDRCx3QkFBYyxZQUFZLE9BQU8sZ0JBQWdCLE9BQU87QUFBQTtBQUU1RCxnQkFBUSxZQUFZLFlBQVk7QUFDaEMsYUFBSyxjQUFjO0FBQUEsTUFDdkI7QUFFQSxVQUFJLEtBQUssZUFBZSxPQUFPO0FBQzNCLGNBQU0sVUFBVSxFQUFFLFdBQVcsS0FBSyxZQUFZLFdBQVc7QUFDekQsZ0JBQVEsV0FBVyxJQUFJLE1BQU0sTUFBTSxPQUFPLElBQUksSUFBSSxLQUFLLE1BQU0sT0FBTztBQUNwRSxhQUFLLFNBQVM7QUFBQSxNQUNsQjtBQUVBLFdBQUssT0FBTztBQUNSLGdCQUFRLFdBQVcsTUFBTSxjQUFjLEtBQUs7QUFBQSxNQUNoRDtBQUNBLFVBQUksWUFBWSxLQUFLLGlCQUFpQjtBQUlsQyxjQUFNLFVBQVUsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDLEdBQUc7QUFBQSxVQUMvQyxvQkFBb0I7QUFBQSxRQUN4QixDQUFDO0FBQUEsTUFDTDtBQUNBLGFBQU87QUFBQTtBQUFBLElBRVgsd0JBQXdCLENBQUMsV0FBVyxVQUFVO0FBQzFDLFVBQUk7QUFDSixVQUFJLEtBQUssWUFBWTtBQUNqQixxQkFBYSxLQUFLO0FBQUEsTUFDdEI7QUFFQSxVQUFJLFlBQVk7QUFDWixlQUFPO0FBQUEsTUFDWDtBQUNBLFlBQU0sV0FBVyxVQUFVLGFBQWE7QUFDeEMsbUJBQWEsSUFBSSxTQUFTLFdBQVcsT0FBTyxPQUFPLEVBQUUsS0FBSyxTQUFTLE1BQU0sYUFBYSxLQUFLLGFBQWEsSUFBSSxFQUFFLElBQUssU0FBUyxZQUFZLFNBQVMsYUFBYTtBQUFBLFFBQzFKLE9BQU8sR0FBRyxTQUFTLFlBQVksU0FBUztBQUFBLE1BQzVDLENBQUUsQ0FBQztBQUNILFdBQUssd0JBQXdCO0FBQzdCLFVBQUksWUFBWSxLQUFLLGlCQUFpQjtBQUlsQyxtQkFBVyxVQUFVLE9BQU8sT0FBTyxXQUFXLFFBQVEsY0FBYyxDQUFDLEdBQUc7QUFBQSxVQUNwRSxvQkFBb0I7QUFBQSxRQUN4QixDQUFDO0FBQUEsTUFDTDtBQUNBLGFBQU87QUFBQTtBQUFBLElBRVgsMEJBQTBCLENBQUMsYUFBYTtBQUNwQyxhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsc0JBQWMsS0FBSyxJQUFJLDJCQUEyQixXQUFXO0FBQzdELGNBQU0sS0FBSyw4QkFBOEIsS0FBSyxJQUFJLEdBQUcsV0FBVztBQUNoRSxlQUFPLElBQUksUUFBUSxhQUFXLFdBQVcsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQUEsT0FDaEU7QUFBQTtBQUFBLElBRUwsZ0JBQWdCLENBQUMsS0FBSyxTQUFTO0FBQzNCLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxlQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2pGLGdCQUFNLGFBQWEsSUFBSSxRQUFRLGNBQWM7QUFDN0MsZ0JBQU0sV0FBVztBQUFBLFlBQ2I7QUFBQSxZQUNBLFFBQVE7QUFBQSxZQUNSLFNBQVMsQ0FBQztBQUFBLFVBQ2Q7QUFFQSxjQUFJLGVBQWUsVUFBVSxVQUFVO0FBQ25DLG9CQUFRLFFBQVE7QUFBQSxVQUNwQjtBQUVBLG1CQUFTLG9CQUFvQixDQUFDLEtBQUssT0FBTztBQUN0Qyx1QkFBVyxVQUFVLFVBQVU7QUFDM0Isb0JBQU0sSUFBSSxJQUFJLEtBQUssS0FBSztBQUN4QixtQkFBSyxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUc7QUFDckIsdUJBQU87QUFBQSxjQUNYO0FBQUEsWUFDSjtBQUNBLG1CQUFPO0FBQUE7QUFFWCxjQUFJO0FBQ0osY0FBSTtBQUNKLGNBQUk7QUFDQSx1QkFBVyxNQUFNLElBQUksU0FBUztBQUM5QixnQkFBSSxZQUFZLFNBQVMsU0FBUyxHQUFHO0FBQ2pDLGtCQUFJLFdBQVcsUUFBUSxrQkFBa0I7QUFDckMsc0JBQU0sS0FBSyxNQUFNLFVBQVUsb0JBQW9CO0FBQUEsY0FDbkQsT0FDSztBQUNELHNCQUFNLEtBQUssTUFBTSxRQUFRO0FBQUE7QUFFN0IsdUJBQVMsU0FBUztBQUFBLFlBQ3RCO0FBQ0EscUJBQVMsVUFBVSxJQUFJLFFBQVE7QUFBQSxtQkFFNUIsS0FBUDtBQUFBO0FBSUEsY0FBSSxhQUFhLEtBQUs7QUFDbEIsZ0JBQUk7QUFFSixnQkFBSSxPQUFPLElBQUksU0FBUztBQUNwQixvQkFBTSxJQUFJO0FBQUEsWUFDZCxXQUNTLFlBQVksU0FBUyxTQUFTLEdBQUc7QUFFdEMsb0JBQU07QUFBQSxZQUNWLE9BQ0s7QUFDRCxvQkFBTSxvQkFBb0I7QUFBQTtBQUU5QixrQkFBTSxNQUFNLElBQUksZ0JBQWdCLEtBQUssVUFBVTtBQUMvQyxnQkFBSSxTQUFTLFNBQVM7QUFDdEIsbUJBQU8sR0FBRztBQUFBLFVBQ2QsT0FDSztBQUNELG9CQUFRLFFBQVE7QUFBQTtBQUFBLFNBRXZCLENBQUM7QUFBQSxPQUNMO0FBQUE7QUFBQSxFQUVUO0FBQ0EsVUFBUSxhQUFhO0FBQ3JCLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxPQUFPLEtBQUssR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLE9BQVEsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLElBQUssSUFBSSxDQUFDLENBQUM7QUFBQTs7O0FDQnZHQ0EsTUFBSSxZQUFhLFdBQVEsUUFBSyxxQkFBdUIsQ0FBQyxTQUFTLFlBQVksR0FBRyxXQUFXO0FBQ3JGLGFBQVMsS0FBSyxDQUFDLE9BQU87QUFBRSxhQUFPLGlCQUFpQixJQUFJLFFBQVEsSUFBSSxVQUFXLENBQUMsU0FBUztBQUFFLGdCQUFRLEtBQUs7QUFBQSxPQUFJO0FBQUE7QUFDeEcsV0FBTyxLQUFLLE1BQU0sSUFBSSxrQkFBbUIsQ0FBQyxTQUFTLFFBQVE7QUFDdkQsZUFBUyxTQUFTLENBQUMsT0FBTztBQUFFLFlBQUk7QUFBRSxlQUFLLFVBQVUsS0FBSyxLQUFLLENBQUM7QUFBQSxpQkFBWSxHQUFQO0FBQVksaUJBQU8sQ0FBQztBQUFBO0FBQUE7QUFDckYsZUFBUyxRQUFRLENBQUMsT0FBTztBQUFFLFlBQUk7QUFBRSxlQUFLLFVBQVUsU0FBUyxLQUFLLENBQUM7QUFBQSxpQkFBWSxHQUFQO0FBQVksaUJBQU8sQ0FBQztBQUFBO0FBQUE7QUFDeEYsZUFBUyxJQUFJLENBQUMsUUFBUTtBQUFFLGVBQU8sT0FBTyxRQUFRLE9BQU8sS0FBSyxJQUFJLE1BQU0sT0FBTyxLQUFLLEVBQUUsS0FBSyxXQUFXLFFBQVE7QUFBQTtBQUMxRyxZQUFNLFlBQVksVUFBVSxNQUFNLFNBQVMsY0FBYyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7QUFBQSxLQUN2RTtBQUFBO0FBRUwsU0FBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELFVBQVEsdUNBQXVDLFFBQVEsMEJBQTBCLFFBQVEseUJBQThCO0FBQ3ZIO0FBQUEsUUFBTSx1QkFBdUI7QUFBQSxJQUN6QixXQUFXLENBQUMsVUFBVSxVQUFVO0FBQzVCLFdBQUssV0FBVztBQUNoQixXQUFLLFdBQVc7QUFBQTtBQUFBLElBRXBCLGNBQWMsQ0FBQyxTQUFTO0FBQ3BCLFdBQUssUUFBUSxTQUFTO0FBQ2xCLGNBQU0sTUFBTSw0QkFBNEI7QUFBQSxNQUM1QztBQUNBLGNBQVEsUUFBUSxtQkFBbUIsU0FBUyxPQUFPLEtBQUssR0FBRyxLQUFLLFlBQVksS0FBSyxVQUFVLEVBQUUsU0FBUyxRQUFRO0FBQUE7QUFBQSxJQUdsSCx1QkFBdUIsR0FBRztBQUN0QixhQUFPO0FBQUE7QUFBQSxJQUVYLG9CQUFvQixHQUFHO0FBQ25CLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxjQUFNLElBQUksTUFBTSxpQkFBaUI7QUFBQSxPQUNwQztBQUFBO0FBQUEsRUFFVDtBQUNBLFVBQVEseUJBQXlCO0FBQ2pDO0FBQUEsUUFBTSx3QkFBd0I7QUFBQSxJQUMxQixXQUFXLENBQUMsT0FBTztBQUNmLFdBQUssUUFBUTtBQUFBO0FBQUEsSUFJakIsY0FBYyxDQUFDLFNBQVM7QUFDcEIsV0FBSyxRQUFRLFNBQVM7QUFDbEIsY0FBTSxNQUFNLDRCQUE0QjtBQUFBLE1BQzVDO0FBQ0EsY0FBUSxRQUFRLG1CQUFtQixVQUFVLEtBQUs7QUFBQTtBQUFBLElBR3RELHVCQUF1QixHQUFHO0FBQ3RCLGFBQU87QUFBQTtBQUFBLElBRVgsb0JBQW9CLEdBQUc7QUFDbkIsYUFBTyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2hELGNBQU0sSUFBSSxNQUFNLGlCQUFpQjtBQUFBLE9BQ3BDO0FBQUE7QUFBQSxFQUVUO0FBQ0EsVUFBUSwwQkFBMEI7QUFDbEM7QUFBQSxRQUFNLHFDQUFxQztBQUFBLElBQ3ZDLFdBQVcsQ0FBQyxPQUFPO0FBQ2YsV0FBSyxRQUFRO0FBQUE7QUFBQSxJQUlqQixjQUFjLENBQUMsU0FBUztBQUNwQixXQUFLLFFBQVEsU0FBUztBQUNsQixjQUFNLE1BQU0sNEJBQTRCO0FBQUEsTUFDNUM7QUFDQSxjQUFRLFFBQVEsbUJBQW1CLFNBQVMsT0FBTyxLQUFLLE9BQU8sS0FBSyxPQUFPLEVBQUUsU0FBUyxRQUFRO0FBQUE7QUFBQSxJQUdsRyx1QkFBdUIsR0FBRztBQUN0QixhQUFPO0FBQUE7QUFBQSxJQUVYLG9CQUFvQixHQUFHO0FBQ25CLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxjQUFNLElBQUksTUFBTSxpQkFBaUI7QUFBQSxPQUNwQztBQUFBO0FBQUEsRUFFVDtBQUNBLFVBQVEsdUNBQXVDO0FBQUE7OztBQ0IvQ0NBLE1BQUksWUFBYSxXQUFRLFFBQUsscUJBQXVCLENBQUMsU0FBUyxZQUFZLEdBQUcsV0FBVztBQUNyRixhQUFTLEtBQUssQ0FBQyxPQUFPO0FBQUUsYUFBTyxpQkFBaUIsSUFBSSxRQUFRLElBQUksVUFBVyxDQUFDLFNBQVM7QUFBRSxnQkFBUSxLQUFLO0FBQUEsT0FBSTtBQUFBO0FBQ3hHLFdBQU8sS0FBSyxNQUFNLElBQUksa0JBQW1CLENBQUMsU0FBUyxRQUFRO0FBQ3ZELGVBQVMsU0FBUyxDQUFDLE9BQU87QUFBRSxZQUFJO0FBQUUsZUFBSyxVQUFVLEtBQUssS0FBSyxDQUFDO0FBQUEsaUJBQVksR0FBUDtBQUFZLGlCQUFPLENBQUM7QUFBQTtBQUFBO0FBQ3JGLGVBQVMsUUFBUSxDQUFDLE9BQU87QUFBRSxZQUFJO0FBQUUsZUFBSyxVQUFVLFNBQVMsS0FBSyxDQUFDO0FBQUEsaUJBQVksR0FBUDtBQUFZLGlCQUFPLENBQUM7QUFBQTtBQUFBO0FBQ3hGLGVBQVMsSUFBSSxDQUFDLFFBQVE7QUFBRSxlQUFPLE9BQU8sUUFBUSxPQUFPLEtBQUssSUFBSSxNQUFNLE9BQU8sS0FBSyxFQUFFLEtBQUssV0FBVyxRQUFRO0FBQUE7QUFDMUcsWUFBTSxZQUFZLFVBQVUsTUFBTSxTQUFTLGNBQWMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQUEsS0FDdkU7QUFBQTtBQUVMLFNBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxVQUFRLGFBQWtCO0FBQzFCLE1BQU07QUFDTixNQUFNO0FBQ04sTUFBTTtBQUNOO0FBQUEsUUFBTSxXQUFXO0FBQUEsV0FDTixnQkFBZ0IsQ0FBQyxhQUFhLE1BQU0sV0FBVyxJQUFJO0FBQ3RELFlBQU0saUJBQWlCO0FBQUEsUUFDbkIsY0FBYztBQUFBLFFBQ2QsWUFBWTtBQUFBLE1BQ2hCO0FBQ0EsYUFBTyxJQUFJLGNBQWMsV0FBVyx1QkFBdUIsQ0FBQyxJQUFJLE9BQU8sd0JBQXdCLFdBQVcsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLGNBQWM7QUFBQTtBQUFBLFdBRTFJLGVBQWUsR0FBRztBQUNyQixZQUFNLFFBQVEsUUFBUSxJQUFJO0FBQzFCLFdBQUssT0FBTztBQUNSLGNBQU0sSUFBSSxNQUFNLDJEQUEyRDtBQUFBLE1BQy9FO0FBQ0EsYUFBTztBQUFBO0FBQUEsV0FFSixhQUFhLEdBQUc7QUFDbkIsWUFBTSxhQUFhLFFBQVEsSUFBSTtBQUMvQixXQUFLLFlBQVk7QUFDYixjQUFNLElBQUksTUFBTSx5REFBeUQ7QUFBQSxNQUM3RTtBQUNBLGFBQU87QUFBQTtBQUFBLFdBRUosT0FBTyxDQUFDLGNBQWM7QUFDekIsVUFBSTtBQUNKLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxjQUFNLGFBQWEsV0FBVyxpQkFBaUI7QUFDL0MsY0FBTSxNQUFNLE1BQU0sV0FDYixRQUFRLFlBQVksRUFDcEIsTUFBTSxXQUFTO0FBQ2hCLGdCQUFNLElBQUksTUFBTTtBQUFBLHVCQUNULE1BQU07QUFBQSx5QkFDSixNQUFNLFNBQVM7QUFBQSxTQUMzQjtBQUNELGNBQU0sWUFBWSxLQUFLLElBQUksWUFBWSxRQUFRLE9BQVksWUFBUyxZQUFJLEdBQUc7QUFDM0UsYUFBSyxVQUFVO0FBQ1gsZ0JBQU0sSUFBSSxNQUFNLCtDQUErQztBQUFBLFFBQ25FO0FBQ0EsZUFBTztBQUFBLE9BQ1Y7QUFBQTtBQUFBLFdBRUUsVUFBVSxDQUFDLFVBQVU7QUFDeEIsYUFBTyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2hELFlBQUk7QUFFQSxjQUFJLGVBQWUsV0FBVyxjQUFjO0FBQzVDLGNBQUksVUFBVTtBQUNWLGtCQUFNLGtCQUFrQixtQkFBbUIsUUFBUTtBQUNuRCwyQkFBZSxHQUFHLHlCQUF5QjtBQUFBLFVBQy9DO0FBQ0EsaUJBQU8sTUFBTSxtQkFBbUIsY0FBYztBQUM5QyxnQkFBTSxXQUFXLE1BQU0sV0FBVyxRQUFRLFlBQVk7QUFDdEQsaUJBQU8sVUFBVSxRQUFRO0FBQ3pCLGlCQUFPO0FBQUEsaUJBRUosT0FBUDtBQUNJLGdCQUFNLElBQUksTUFBTSxrQkFBa0IsTUFBTSxTQUFTO0FBQUE7QUFBQSxPQUV4RDtBQUFBO0FBQUEsRUFFVDtBQUNBLFVBQVEsYUFBYTtBQUFBOzs7QUNCckJDQSxNQUFJLFlBQWEsV0FBUSxRQUFLLHFCQUF1QixDQUFDLFNBQVMsWUFBWSxHQUFHLFdBQVc7QUFDckYsYUFBUyxLQUFLLENBQUMsT0FBTztBQUFFLGFBQU8saUJBQWlCLElBQUksUUFBUSxJQUFJLFVBQVcsQ0FBQyxTQUFTO0FBQUUsZ0JBQVEsS0FBSztBQUFBLE9BQUk7QUFBQTtBQUN4RyxXQUFPLEtBQUssTUFBTSxJQUFJLGtCQUFtQixDQUFDLFNBQVMsUUFBUTtBQUN2RCxlQUFTLFNBQVMsQ0FBQyxPQUFPO0FBQUUsWUFBSTtBQUFFLGVBQUssVUFBVSxLQUFLLEtBQUssQ0FBQztBQUFBLGlCQUFZLEdBQVA7QUFBWSxpQkFBTyxDQUFDO0FBQUE7QUFBQTtBQUNyRixlQUFTLFFBQVEsQ0FBQyxPQUFPO0FBQUUsWUFBSTtBQUFFLGVBQUssVUFBVSxTQUFTLEtBQUssQ0FBQztBQUFBLGlCQUFZLEdBQVA7QUFBWSxpQkFBTyxDQUFDO0FBQUE7QUFBQTtBQUN4RixlQUFTLElBQUksQ0FBQyxRQUFRO0FBQUUsZUFBTyxPQUFPLFFBQVEsT0FBTyxLQUFLLElBQUksTUFBTSxPQUFPLEtBQUssRUFBRSxLQUFLLFdBQVcsUUFBUTtBQUFBO0FBQzFHLFlBQU0sWUFBWSxVQUFVLE1BQU0sU0FBUyxjQUFjLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUFBLEtBQ3ZFO0FBQUE7QUFFTCxTQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBUSxVQUFVLFFBQVEsa0JBQWtCLFFBQVEsbUJBQW1CLFFBQVEsa0JBQXVCO0FBQ3RHLE1BQU07QUFDTixNQUFNO0FBQ04sUUFBUSxRQUFRLFlBQVksY0FBYyxLQUFLO0FBQy9DLFVBQVEsa0JBQWtCO0FBQzFCLFVBQVEsbUJBQW1CO0FBQzNCO0FBQUEsUUFBTSxRQUFRO0FBQUEsSUFDVixXQUFXLEdBQUc7QUFDVixXQUFLLFVBQVU7QUFBQTtBQUFBLElBUW5CLFFBQVEsR0FBRztBQUNQLGFBQU8sVUFBVSxNQUFXLFdBQVEscUJBQWEsR0FBRztBQUNoRCxZQUFJLEtBQUssV0FBVztBQUNoQixpQkFBTyxLQUFLO0FBQUEsUUFDaEI7QUFDQSxjQUFNLGNBQWMsUUFBUSxJQUFJLFFBQVE7QUFDeEMsYUFBSyxhQUFhO0FBQ2QsZ0JBQU0sSUFBSSxNQUFNLDZDQUE0QyxRQUFRLDRFQUE0RTtBQUFBLFFBQ3BKO0FBQ0EsWUFBSTtBQUNBLGdCQUFNLE9BQU8sYUFBYSxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsSUFBSTtBQUFBLGlCQUVoRSxJQUFQO0FBQ0ksZ0JBQU0sSUFBSSxNQUFNLG1DQUFtQyxxRUFBcUU7QUFBQTtBQUU1SCxhQUFLLFlBQVk7QUFDakIsZUFBTyxLQUFLO0FBQUEsT0FDZjtBQUFBO0FBQUEsSUFXTCxJQUFJLENBQUMsS0FBSyxTQUFTLFFBQVEsQ0FBQyxHQUFHO0FBQzNCLFlBQU0sWUFBWSxPQUFPLFFBQVEsS0FBSyxFQUNqQyxJQUFJLEVBQUUsS0FBSyxXQUFXLElBQUksUUFBUSxRQUFRLEVBQzFDLEtBQUssRUFBRTtBQUNaLFdBQUssU0FBUztBQUNWLGVBQU8sSUFBSSxNQUFNO0FBQUEsTUFDckI7QUFDQSxhQUFPLElBQUksTUFBTSxhQUFhLFlBQVk7QUFBQTtBQUFBLElBUzlDLEtBQUssQ0FBQyxTQUFTO0FBQ1gsYUFBTyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2hELGNBQU0sZUFBZSxZQUFZLFFBQVEsWUFBaUIsWUFBUyxZQUFJLFFBQVE7QUFDL0UsY0FBTSxXQUFXLE1BQU0sS0FBSyxTQUFTO0FBQ3JDLGNBQU0sWUFBWSxZQUFZLFlBQVk7QUFDMUMsY0FBTSxVQUFVLFVBQVUsS0FBSyxTQUFTLEVBQUUsVUFBVSxPQUFPLENBQUM7QUFDNUQsZUFBTyxLQUFLLFlBQVk7QUFBQSxPQUMzQjtBQUFBO0FBQUEsSUFPTCxLQUFLLEdBQUc7QUFDSixhQUFPLFVBQVUsTUFBVyxXQUFRLHFCQUFhLEdBQUc7QUFDaEQsZUFBTyxLQUFLLFlBQVksRUFBRSxNQUFNLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxPQUN0RDtBQUFBO0FBQUEsSUFPTCxTQUFTLEdBQUc7QUFDUixhQUFPLEtBQUs7QUFBQTtBQUFBLElBT2hCLGFBQWEsR0FBRztBQUNaLGFBQU8sS0FBSyxRQUFRLFdBQVc7QUFBQTtBQUFBLElBT25DLFdBQVcsR0FBRztBQUNWLFdBQUssVUFBVTtBQUNmLGFBQU87QUFBQTtBQUFBLElBVVgsTUFBTSxDQUFDLE1BQU0sU0FBUyxPQUFPO0FBQ3pCLFdBQUssV0FBVztBQUNoQixhQUFPLFNBQVMsS0FBSyxPQUFPLElBQUk7QUFBQTtBQUFBLElBT3BDLE1BQU0sR0FBRztBQUNMLGFBQU8sS0FBSyxPQUFPLEtBQUssR0FBRztBQUFBO0FBQUEsSUFVL0IsWUFBWSxDQUFDLE1BQU0sTUFBTTtBQUNyQixZQUFNLFFBQVEsT0FBTyxPQUFPLENBQUMsR0FBSSxRQUFRLEVBQUUsS0FBSyxDQUFFO0FBQ2xELFlBQU0sVUFBVSxLQUFLLEtBQUssT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSztBQUMvRCxhQUFPLEtBQUssT0FBTyxPQUFPLEVBQUUsT0FBTztBQUFBO0FBQUEsSUFVdkMsT0FBTyxDQUFDLE9BQU8sVUFBVSxPQUFPO0FBQzVCLFlBQU0sTUFBTSxVQUFVLE9BQU87QUFDN0IsWUFBTSxZQUFZLE1BQU0sSUFBSSxVQUFRLEtBQUssS0FBSyxNQUFNLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUNsRSxZQUFNLFVBQVUsS0FBSyxLQUFLLEtBQUssU0FBUztBQUN4QyxhQUFPLEtBQUssT0FBTyxPQUFPLEVBQUUsT0FBTztBQUFBO0FBQUEsSUFTdkMsUUFBUSxDQUFDLE1BQU07QUFDWCxZQUFNLFlBQVksS0FDYixJQUFJLFNBQU87QUFDWixjQUFNLFFBQVEsSUFDVCxJQUFJLFVBQVE7QUFDYixxQkFBVyxTQUFTLFVBQVU7QUFDMUIsbUJBQU8sS0FBSyxLQUFLLE1BQU0sSUFBSTtBQUFBLFVBQy9CO0FBQ0Esa0JBQVEsUUFBUSxNQUFNLFNBQVMsWUFBWTtBQUMzQyxnQkFBTSxNQUFNLFNBQVMsT0FBTztBQUM1QixnQkFBTSxRQUFRLE9BQU8sT0FBTyxPQUFPLE9BQU8sQ0FBQyxHQUFJLFdBQVcsRUFBRSxRQUFRLENBQUUsR0FBSSxXQUFXLEVBQUUsUUFBUSxDQUFFO0FBQ2pHLGlCQUFPLEtBQUssS0FBSyxLQUFLLE1BQU0sS0FBSztBQUFBLFNBQ3BDLEVBQ0ksS0FBSyxFQUFFO0FBQ1osZUFBTyxLQUFLLEtBQUssTUFBTSxLQUFLO0FBQUEsT0FDL0IsRUFDSSxLQUFLLEVBQUU7QUFDWixZQUFNLFVBQVUsS0FBSyxLQUFLLFNBQVMsU0FBUztBQUM1QyxhQUFPLEtBQUssT0FBTyxPQUFPLEVBQUUsT0FBTztBQUFBO0FBQUEsSUFVdkMsVUFBVSxDQUFDLE9BQU8sU0FBUztBQUN2QixZQUFNLFVBQVUsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFdBQVcsS0FBSyxJQUFJLE9BQU87QUFDMUUsYUFBTyxLQUFLLE9BQU8sT0FBTyxFQUFFLE9BQU87QUFBQTtBQUFBLElBV3ZDLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUztBQUN4QixjQUFRLE9BQU8sV0FBVyxXQUFXLENBQUM7QUFDdEMsWUFBTSxRQUFRLE9BQU8sT0FBTyxPQUFPLE9BQU8sQ0FBQyxHQUFJLFNBQVMsRUFBRSxNQUFNLENBQUUsR0FBSSxVQUFVLEVBQUUsT0FBTyxDQUFFO0FBQzNGLFlBQU0sVUFBVSxLQUFLLEtBQUssT0FBTyxNQUFNLE9BQU8sT0FBTyxFQUFFLEtBQUssSUFBSSxHQUFHLEtBQUssQ0FBQztBQUN6RSxhQUFPLEtBQUssT0FBTyxPQUFPLEVBQUUsT0FBTztBQUFBO0FBQUEsSUFVdkMsVUFBVSxDQUFDLE1BQU0sT0FBTztBQUNwQixZQUFNLE1BQU0sSUFBSTtBQUNoQixZQUFNLGFBQWEsQ0FBQyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sSUFBSSxFQUFFLFNBQVMsR0FBRyxJQUM5RCxNQUNBO0FBQ04sWUFBTSxVQUFVLEtBQUssS0FBSyxZQUFZLElBQUk7QUFDMUMsYUFBTyxLQUFLLE9BQU8sT0FBTyxFQUFFLE9BQU87QUFBQTtBQUFBLElBT3ZDLFlBQVksR0FBRztBQUNYLFlBQU0sVUFBVSxLQUFLLEtBQUssTUFBTSxJQUFJO0FBQ3BDLGFBQU8sS0FBSyxPQUFPLE9BQU8sRUFBRSxPQUFPO0FBQUE7QUFBQSxJQU92QyxRQUFRLEdBQUc7QUFDUCxZQUFNLFVBQVUsS0FBSyxLQUFLLE1BQU0sSUFBSTtBQUNwQyxhQUFPLEtBQUssT0FBTyxPQUFPLEVBQUUsT0FBTztBQUFBO0FBQUEsSUFVdkMsUUFBUSxDQUFDLE1BQU0sTUFBTTtBQUNqQixZQUFNLFFBQVEsT0FBTyxPQUFPLENBQUMsR0FBSSxRQUFRLEVBQUUsS0FBSyxDQUFFO0FBQ2xELFlBQU0sVUFBVSxLQUFLLEtBQUssY0FBYyxNQUFNLEtBQUs7QUFDbkQsYUFBTyxLQUFLLE9BQU8sT0FBTyxFQUFFLE9BQU87QUFBQTtBQUFBLElBVXZDLE9BQU8sQ0FBQyxNQUFNLE1BQU07QUFDaEIsWUFBTSxVQUFVLEtBQUssS0FBSyxLQUFLLE1BQU0sRUFBRSxLQUFLLENBQUM7QUFDN0MsYUFBTyxLQUFLLE9BQU8sT0FBTyxFQUFFLE9BQU87QUFBQTtBQUFBLEVBRTNDO0FBQ0EsTUFBTSxXQUFXLElBQUk7QUFJckIsVUFBUSxrQkFBa0I7QUFDMUIsVUFBUSxVQUFVO0FBQUE7OztBQ0JsQjhCQSxNQUFTLHNCQUFXLENBQUMsS0FBSztBQUN0QixXQUFPLElBQUksUUFBUSxTQUFTLEdBQUc7QUFBQTtBQVVuQyxNQUFTLHNCQUFXLENBQUMsS0FBSztBQUN0QixXQUFPLElBQUksUUFBUSxRQUFRLElBQUk7QUFBQTtBQVduQyxNQUFTLHlCQUFjLENBQUMsS0FBSztBQUN6QixXQUFPLElBQUksUUFBUSxVQUFVLEtBQUssR0FBRztBQUFBO0FBckR6QyxNQUFJLGtCQUFtQixXQUFRLFFBQUssb0JBQXFCLE9BQU8saUJBQWtCLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSTtBQUM1RixRQUFJLE9BQU87QUFBVyxXQUFLO0FBQzNCLFdBQU8sZUFBZSxHQUFHLElBQUksRUFBRSxZQUFZLE1BQU0sYUFBYSxHQUFHO0FBQUUsYUFBTyxFQUFFO0FBQUEsTUFBTSxDQUFDO0FBQUEsY0FDekUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQ3hCLFFBQUksT0FBTztBQUFXLFdBQUs7QUFDM0IsTUFBRSxNQUFNLEVBQUU7QUFBQTtBQUVkLE1BQUkscUJBQXNCLFdBQVEsUUFBSyx1QkFBd0IsT0FBTyxpQkFBa0IsQ0FBQyxHQUFHLEdBQUc7QUFDM0YsV0FBTyxlQUFlLEdBQUcsV0FBVyxFQUFFLFlBQVksTUFBTSxPQUFPLEVBQUUsQ0FBQztBQUFBLGNBQ3pELENBQUMsR0FBRyxHQUFHO0FBQ2hCLE1BQUUsYUFBYTtBQUFBO0FBRW5CLE1BQUksZUFBZ0IsV0FBUSxRQUFLLHdCQUEwQixDQUFDLEtBQUs7QUFDN0QsUUFBSSxPQUFPLElBQUk7QUFBWSxhQUFPO0FBQ2xDLFFBQUksU0FBUyxDQUFDO0FBQ2QsUUFBSSxPQUFPO0FBQU0sZUFBUyxLQUFLO0FBQUssWUFBSSxNQUFNLGFBQWEsT0FBTyxlQUFlLEtBQUssS0FBSyxDQUFDO0FBQUcsMEJBQWdCLFFBQVEsS0FBSyxDQUFDO0FBQUE7QUFDN0gsdUJBQW1CLFFBQVEsR0FBRztBQUM5QixXQUFPO0FBQUE7QUFFWCxTQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBUSxpQkFBaUIsUUFBUSxjQUFjLFFBQVEsY0FBbUI7QUFDMUUsTUFBTSxPQUFPLHdDQUE0QjtBQVd6QyxVQUFRLGNBQWM7QUFXdEIsVUFBUSxjQUFjO0FBWXRCLFVBQVEsaUJBQWlCO0FBQUE7OztBQ0J6QjREQSxNQUFTLHlCQUFjLENBQUMsTUFBTSxLQUFLO0FBQy9CLFVBQU0sZUFBZSxRQUFRLGVBQWUsR0FBRztBQUMvQyxZQUFRLElBQUksUUFBUTtBQUNwQixVQUFNLFdBQVc7QUFDakIsUUFBSSxVQUFVO0FBQ1YsYUFBTyxlQUFlLGlCQUFpQixPQUFPLGVBQWUsdUJBQXVCLE1BQU0sR0FBRyxDQUFDO0FBQUEsSUFDbEc7QUFDQSxjQUFVLGFBQWEsV0FBVyxFQUFFLEtBQUssR0FBRyxZQUFZO0FBQUE7QUFPNUQsTUFBUyxvQkFBUyxDQUFDLFFBQVE7QUFDdkIsY0FBVSxhQUFhLFlBQVksQ0FBQyxHQUFHLE1BQU07QUFBQTtBQU9qRCxNQUFTLGtCQUFPLENBQUMsV0FBVztBQUN4QixVQUFNLFdBQVc7QUFDakIsUUFBSSxVQUFVO0FBQ1YscUJBQWUsaUJBQWlCLFFBQVEsU0FBUztBQUFBLElBQ3JELE9BQ0s7QUFDRCxnQkFBVSxhQUFhLFlBQVksQ0FBQyxHQUFHLFNBQVM7QUFBQTtBQUVwRCxZQUFRLElBQUksVUFBVSxHQUFHLFlBQVksS0FBSyxZQUFZO0FBQUE7QUFZMUQsTUFBUyxtQkFBUSxDQUFDLE1BQU0sU0FBUztBQUM3QixVQUFNLE1BQU0sUUFBUSxJQUFJLFNBQVMsS0FBSyxRQUFRLE1BQU0sR0FBRyxFQUFFLFlBQVksUUFBUTtBQUM3RSxRQUFJLFdBQVcsUUFBUSxhQUFhLEtBQUs7QUFDckMsWUFBTSxJQUFJLE1BQU0sb0NBQW9DLE1BQU07QUFBQSxJQUM5RDtBQUNBLFFBQUksV0FBVyxRQUFRLG1CQUFtQixPQUFPO0FBQzdDLGFBQU87QUFBQSxJQUNYO0FBQ0EsV0FBTyxJQUFJLEtBQUs7QUFBQTtBQVdwQixNQUFTLDRCQUFpQixDQUFDLE1BQU0sU0FBUztBQUN0QyxVQUFNLFNBQVMsU0FBUyxNQUFNLE9BQU8sRUFDaEMsTUFBTSxJQUFJLEVBQ1YsT0FBTyxPQUFLLE1BQU0sRUFBRTtBQUN6QixRQUFJLFdBQVcsUUFBUSxtQkFBbUIsT0FBTztBQUM3QyxhQUFPO0FBQUEsSUFDWDtBQUNBLFdBQU8sT0FBTyxJQUFJLFdBQVMsTUFBTSxLQUFLLENBQUM7QUFBQTtBQWEzQyxNQUFTLDBCQUFlLENBQUMsTUFBTSxTQUFTO0FBQ3BDLFVBQU0sWUFBWSxDQUFDLFFBQVEsUUFBUSxNQUFNO0FBQ3pDLFVBQU0sYUFBYSxDQUFDLFNBQVMsU0FBUyxPQUFPO0FBQzdDLFVBQU0sTUFBTSxTQUFTLE1BQU0sT0FBTztBQUNsQyxRQUFJLFVBQVUsU0FBUyxHQUFHO0FBQ3RCLGFBQU87QUFDWCxRQUFJLFdBQVcsU0FBUyxHQUFHO0FBQ3ZCLGFBQU87QUFDWCxVQUFNLElBQUksVUFBVSw2REFBNkQsV0FDN0UsNEVBQTRFO0FBQUE7QUFVcEYsTUFBUyxvQkFBUyxDQUFDLE1BQU0sT0FBTztBQUM1QixVQUFNLFdBQVc7QUFDakIsUUFBSSxVQUFVO0FBQ1YsYUFBTyxlQUFlLGlCQUFpQixVQUFVLGVBQWUsdUJBQXVCLE1BQU0sS0FBSyxDQUFDO0FBQUEsSUFDdkc7QUFDQSxZQUFRLE9BQU8sTUFBTSxHQUFHLEdBQUc7QUFDM0IsY0FBVSxhQUFhLGNBQWMsRUFBRSxLQUFLLEdBQUcsUUFBUSxlQUFlLEtBQUssQ0FBQztBQUFBO0FBUWhGLE1BQVMseUJBQWMsQ0FBQyxTQUFTO0FBQzdCLGNBQVUsTUFBTSxRQUFRLFVBQVUsT0FBTyxLQUFLO0FBQUE7QUFXbEQsTUFBUyxvQkFBUyxDQUFDLFNBQVM7QUFDeEIsWUFBUSxXQUFXLFNBQVM7QUFDNUIsVUFBTSxPQUFPO0FBQUE7QUFTakIsTUFBUyxrQkFBTyxHQUFHO0FBQ2YsV0FBTyxRQUFRLElBQUksb0JBQW9CO0FBQUE7QUFPM0MsTUFBUyxnQkFBSyxDQUFDLFNBQVM7QUFDcEIsY0FBVSxhQUFhLFNBQVMsQ0FBQyxHQUFHLE9BQU87QUFBQTtBQVEvQyxNQUFTLGdCQUFLLENBQUMsU0FBUyxhQUFhLENBQUMsR0FBRztBQUNyQyxjQUFVLGFBQWEsU0FBUyxRQUFRLG9CQUFvQixVQUFVLEdBQUcsbUJBQW1CLFFBQVEsUUFBUSxTQUFTLElBQUksT0FBTztBQUFBO0FBUXBJLE1BQVMsa0JBQU8sQ0FBQyxTQUFTLGFBQWEsQ0FBQyxHQUFHO0FBQ3ZDLGNBQVUsYUFBYSxXQUFXLFFBQVEsb0JBQW9CLFVBQVUsR0FBRyxtQkFBbUIsUUFBUSxRQUFRLFNBQVMsSUFBSSxPQUFPO0FBQUE7QUFRdEksTUFBUyxpQkFBTSxDQUFDLFNBQVMsYUFBYSxDQUFDLEdBQUc7QUFDdEMsY0FBVSxhQUFhLFVBQVUsUUFBUSxvQkFBb0IsVUFBVSxHQUFHLG1CQUFtQixRQUFRLFFBQVEsU0FBUyxJQUFJLE9BQU87QUFBQTtBQU9ySSxNQUFTLGVBQUksQ0FBQyxTQUFTO0FBQ25CLFlBQVEsT0FBTyxNQUFNLFVBQVUsR0FBRyxHQUFHO0FBQUE7QUFVekMsTUFBUyxxQkFBVSxDQUFDLE1BQU07QUFDdEIsY0FBVSxNQUFNLFNBQVMsSUFBSTtBQUFBO0FBTWpDLE1BQVMsbUJBQVEsR0FBRztBQUNoQixjQUFVLE1BQU0sVUFBVTtBQUFBO0FBVzlCLE1BQVMsZ0JBQUssQ0FBQyxNQUFNLElBQUk7QUFDckIsV0FBTyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2hELGlCQUFXLElBQUk7QUFDZixVQUFJO0FBQ0osVUFBSTtBQUNBLGlCQUFTLE1BQU0sR0FBRztBQUFBLGdCQUV0QjtBQUNJLGlCQUFTO0FBQUE7QUFFYixhQUFPO0FBQUEsS0FDVjtBQUFBO0FBYUwsTUFBUyxvQkFBUyxDQUFDLE1BQU0sT0FBTztBQUM1QixVQUFNLFdBQVc7QUFDakIsUUFBSSxVQUFVO0FBQ1YsYUFBTyxlQUFlLGlCQUFpQixTQUFTLGVBQWUsdUJBQXVCLE1BQU0sS0FBSyxDQUFDO0FBQUEsSUFDdEc7QUFDQSxjQUFVLGFBQWEsY0FBYyxFQUFFLEtBQUssR0FBRyxRQUFRLGVBQWUsS0FBSyxDQUFDO0FBQUE7QUFTaEYsTUFBUyxtQkFBUSxDQUFDLE1BQU07QUFDcEIsV0FBTyxRQUFRLElBQUksU0FBUyxXQUFXO0FBQUE7QUFHM0MsTUFBUyxxQkFBVSxDQUFDLEtBQUs7QUFDckIsV0FBTyxVQUFVLE1BQVcsV0FBUSxxQkFBYSxHQUFHO0FBQ2hELGFBQU8sTUFBTSxhQUFhLFdBQVcsV0FBVyxHQUFHO0FBQUEsS0FDdEQ7QUFBQTtBQTFUTCxNQUFJLGtCQUFtQixXQUFRLFFBQUssb0JBQXFCLE9BQU8saUJBQWtCLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSTtBQUM1RixRQUFJLE9BQU87QUFBVyxXQUFLO0FBQzNCLFdBQU8sZUFBZSxHQUFHLElBQUksRUFBRSxZQUFZLE1BQU0sYUFBYSxHQUFHO0FBQUUsYUFBTyxFQUFFO0FBQUEsTUFBTSxDQUFDO0FBQUEsY0FDekUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQ3hCLFFBQUksT0FBTztBQUFXLFdBQUs7QUFDM0IsTUFBRSxNQUFNLEVBQUU7QUFBQTtBQUVkLE1BQUkscUJBQXNCLFdBQVEsUUFBSyx1QkFBd0IsT0FBTyxpQkFBa0IsQ0FBQyxHQUFHLEdBQUc7QUFDM0YsV0FBTyxlQUFlLEdBQUcsV0FBVyxFQUFFLFlBQVksTUFBTSxPQUFPLEVBQUUsQ0FBQztBQUFBLGNBQ3pELENBQUMsR0FBRyxHQUFHO0FBQ2hCLE1BQUUsYUFBYTtBQUFBO0FBRW5CLE1BQUksZUFBZ0IsV0FBUSxRQUFLLHdCQUEwQixDQUFDLEtBQUs7QUFDN0QsUUFBSSxPQUFPLElBQUk7QUFBWSxhQUFPO0FBQ2xDLFFBQUksU0FBUyxDQUFDO0FBQ2QsUUFBSSxPQUFPO0FBQU0sZUFBUyxLQUFLO0FBQUssWUFBSSxNQUFNLGFBQWEsT0FBTyxlQUFlLEtBQUssS0FBSyxDQUFDO0FBQUcsMEJBQWdCLFFBQVEsS0FBSyxDQUFDO0FBQUE7QUFDN0gsdUJBQW1CLFFBQVEsR0FBRztBQUM5QixXQUFPO0FBQUE7QUFFWCxNQUFJLFlBQWEsV0FBUSxRQUFLLHFCQUF1QixDQUFDLFNBQVMsWUFBWSxHQUFHLFdBQVc7QUFDckYsYUFBUyxLQUFLLENBQUMsT0FBTztBQUFFLGFBQU8saUJBQWlCLElBQUksUUFBUSxJQUFJLFVBQVcsQ0FBQyxTQUFTO0FBQUUsZ0JBQVEsS0FBSztBQUFBLE9BQUk7QUFBQTtBQUN4RyxXQUFPLEtBQUssTUFBTSxJQUFJLGtCQUFtQixDQUFDLFNBQVMsUUFBUTtBQUN2RCxlQUFTLFNBQVMsQ0FBQyxPQUFPO0FBQUUsWUFBSTtBQUFFLGVBQUssVUFBVSxLQUFLLEtBQUssQ0FBQztBQUFBLGlCQUFZLEdBQVA7QUFBWSxpQkFBTyxDQUFDO0FBQUE7QUFBQTtBQUNyRixlQUFTLFFBQVEsQ0FBQyxPQUFPO0FBQUUsWUFBSTtBQUFFLGVBQUssVUFBVSxTQUFTLEtBQUssQ0FBQztBQUFBLGlCQUFZLEdBQVA7QUFBWSxpQkFBTyxDQUFDO0FBQUE7QUFBQTtBQUN4RixlQUFTLElBQUksQ0FBQyxRQUFRO0FBQUUsZUFBTyxPQUFPLFFBQVEsT0FBTyxLQUFLLElBQUksTUFBTSxPQUFPLEtBQUssRUFBRSxLQUFLLFdBQVcsUUFBUTtBQUFBO0FBQzFHLFlBQU0sWUFBWSxVQUFVLE1BQU0sU0FBUyxjQUFjLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUFBLEtBQ3ZFO0FBQUE7QUFFTCxTQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBUSxhQUFhLFFBQVEsV0FBVyxRQUFRLFlBQVksUUFBUSxRQUFRLFFBQVEsV0FBVyxRQUFRLGFBQWEsUUFBUSxPQUFPLFFBQVEsU0FBUyxRQUFRLFVBQVUsUUFBUSxRQUFRLFFBQVEsUUFBUSxRQUFRLFVBQVUsUUFBUSxZQUFZLFFBQVEsaUJBQWlCLFFBQVEsWUFBWSxRQUFRLGtCQUFrQixRQUFRLG9CQUFvQixRQUFRLFdBQVcsUUFBUSxVQUFVLFFBQVEsWUFBWSxRQUFRLGlCQUFpQixRQUFRLFdBQWdCO0FBQ3piLE1BQU07QUFDTixNQUFNO0FBQ04sTUFBTTtBQUNOLE1BQU0sS0FBSyxzQ0FBMEI7QUFDckMsTUFBTSxPQUFPLHdDQUE0QjtBQUN6QyxNQUFNO0FBSU4sTUFBSTtBQUNKLFdBQVUsQ0FBQyxXQUFVO0FBSWpCLGNBQVMsVUFBUyxhQUFhLEtBQUs7QUFJcEMsY0FBUyxVQUFTLGFBQWEsS0FBSztBQUFBLEtBQ3JDLFdBQVcsUUFBUSxhQUFhLFFBQVEsV0FBVyxDQUFDLEVBQUU7QUFtQnpELFVBQVEsaUJBQWlCO0FBUXpCLFVBQVEsWUFBWTtBQWVwQixVQUFRLFVBQVU7QUFvQmxCLFVBQVEsV0FBVztBQWtCbkIsVUFBUSxvQkFBb0I7QUFzQjVCLFVBQVEsa0JBQWtCO0FBZ0IxQixVQUFRLFlBQVk7QUFTcEIsVUFBUSxpQkFBaUI7QUFhekIsVUFBUSxZQUFZO0FBVXBCLFVBQVEsVUFBVTtBQVFsQixVQUFRLFFBQVE7QUFTaEIsVUFBUSxRQUFRO0FBU2hCLFVBQVEsVUFBVTtBQVNsQixVQUFRLFNBQVM7QUFRakIsVUFBUSxPQUFPO0FBV2YsVUFBUSxhQUFhO0FBT3JCLFVBQVEsV0FBVztBQXNCbkIsVUFBUSxRQUFRO0FBa0JoQixVQUFRLFlBQVk7QUFVcEIsVUFBUSxXQUFXO0FBTW5CLFVBQVEsYUFBYTtBQUlyQixNQUFJO0FBQ0osU0FBTyxlQUFlLFNBQVMsV0FBVyxFQUFFLFlBQVksTUFBTSxhQUFjLEdBQUc7QUFBRSxXQUFPLFVBQVU7QUFBQSxJQUFXLENBQUM7QUFJOUcsTUFBSTtBQUNKLFNBQU8sZUFBZSxTQUFTLG1CQUFtQixFQUFFLFlBQVksTUFBTSxhQUFjLEdBQUc7QUFBRSxXQUFPLFVBQVU7QUFBQSxJQUFtQixDQUFDO0FBSTlILE1BQUk7QUFDSixTQUFPLGVBQWUsU0FBUyxlQUFlLEVBQUUsWUFBWSxNQUFNLGFBQWMsR0FBRztBQUFFLFdBQU8sYUFBYTtBQUFBLElBQWUsQ0FBQztBQUN6SCxTQUFPLGVBQWUsU0FBUyxlQUFlLEVBQUUsWUFBWSxNQUFNLGFBQWMsR0FBRztBQUFFLFdBQU8sYUFBYTtBQUFBLElBQWUsQ0FBQztBQUN6SCxTQUFPLGVBQWUsU0FBUyxrQkFBa0IsRUFBRSxZQUFZLE1BQU0sYUFBYyxHQUFHO0FBQUUsV0FBTyxhQUFhO0FBQUEsSUFBa0IsQ0FBQztBQUFBOzs7QUM3MGdnZ2dCL0hBQTs7O0FDLy8vLy9mQUFBO0FBQ0E7QUF5Q08sU0FBUyxDQUFDLENBQUMsWUFBWSxRQUFRO0FBQ3BDLE9BQUssTUFBTSxRQUFRLE9BQU8sR0FBRztBQUMzQixXQUFPLEVBQUUsS0FBSyxPQUFPLE9BQU8sUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDO0FBQUEsRUFDbEQ7QUFDQSxRQUFNLFNBQVMsQ0FBQyxVQUFVLFlBQVk7QUFDdEMsUUFBTSxRQUFRO0FBQ2QsUUFBTSxjQUFjLFFBQ2pCLFFBQVEsQ0FBQyxHQUFHLE1BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsRUFDOUMsS0FBSyxFQUFFO0FBQ1YsTUFBSSxPQUFPLFlBQVksTUFBTSxLQUFLO0FBQ2xDLFNBQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsT0FBTyxDQUFDLEdBQUcsTUFBTSxPQUFPLEVBQUUsQ0FBQztBQUNoRSxRQUFNLFFBQVEsS0FBSyxNQUFNO0FBQ3pCLFFBQU0sS0FBSyxNQUFNLE9BQU8sTUFBTSxRQUFRLENBQUMsQ0FBQztBQUN4QyxRQUFNLFVBQVUsR0FBRyxTQUFTLE9BQU8saUJBQy9CLElBQUksU0FBUyxlQUFlLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQ2xEO0FBQ0osUUFBTSxVQUFVLEdBQUcsU0FBUyxPQUFPLGlCQUMvQixJQUFJLFNBQVMsZUFBZSxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUNsRDtBQUNKLFFBQU0sSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFLEtBQUssUUFBUSxVQUFVLFlBQVk7QUFDNUQsVUFBTSxNQUFNO0FBQUEsTUFDVixTQUFTLE1BQU0sVUFBVSxRQUFRO0FBQUEsTUFDakMsU0FBUyxNQUFNLFVBQVUsUUFBUTtBQUFBLE1BQ2pDO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFDQSxTQUFLLE1BQU0sVUFBVSxTQUFTLFVBQVU7QUFDdEMsWUFBTTtBQUFBLElBQ1IsT0FBTztBQUNMLGFBQU87QUFBQTtBQUFBLEdBRVY7QUFDRCxLQUFHLE9BQU8sRUFBRSxLQUFLLEtBQUssQ0FBQztBQUN2QixTQUFPO0FBQUE7QUF4RVQsS0FBSyxlQUFlLE1BQU07QUFDeEIsaUJBQWUsZUFBZ0IsQ0FBQyxhQUFhO0FBQzNDLFNBQUssYUFBYTtBQUNoQixZQUFNLElBQUksVUFDUixxRUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGtCQUNHLFlBQVksT0FBTyxtQkFBbUIsYUFDekMsWUFBWSxPQUFPLGVBQWUsV0FDM0IsWUFBWSxPQUFPLGNBQWMsYUFDeEMsWUFBWSxPQUFPLFVBQVUsSUFDN0I7QUFFTixTQUFLLFVBQVU7QUFDYixZQUFNLElBQUksVUFDUixxRUFDRjtBQUFBLElBQ0Y7QUFFQSxXQUFPLElBQUksZUFBZTtBQUFBLFdBQ2xCLEtBQUksQ0FBQyxZQUFZO0FBQ3JCLFlBQUk7QUFDRixrQkFBUSxPQUFPLFNBQVMsTUFBTSxTQUFTLEtBQUs7QUFFNUMsY0FBSSxNQUFNO0FBQ1IsdUJBQVcsTUFBTTtBQUFBLFVBQ25CLE9BQU87QUFDTCx1QkFBVyxRQUFRLEtBQUs7QUFBQTtBQUFBLGlCQUVuQixPQUFQO0FBQ0EscUJBQVcsTUFBTSxLQUFLO0FBQUE7QUFBQTtBQUFBLElBRzVCLENBQUM7QUFBQTtBQUVMOyIsCiAgImRlYnVnSWQiOiAiN0UzQkVCODE3NEFCOTc4RDY0NzU2ZTIxNjQ3NTZlMjEiLAogICJuYW1lcyI6IFtdCn0=
