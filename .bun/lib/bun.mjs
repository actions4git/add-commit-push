// @ts-check
// https://chat.openai.com/share/72638868-9b3c-4ac7-9b67-be3f258ca287
// semver.mjs

function isValidSemver(version) {
  // Implement your validation logic for a valid semver version
  // For simplicity, you can use a regex pattern for basic validation
  const semverPattern =
    /^(\d+\.\d+\.\d+|\d+\.\d+|\d+)(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+)?$/;
  return semverPattern.test(version);
}

function parseSemver(version) {
  if (!isValidSemver(version)) {
    return null;
  }

  const [core, preRelease, build] = version.split(/[-+]/);
  const [major, minor, patch] = core.split(".").map(Number);

  return {
    major,
    minor,
    patch,
    preRelease: preRelease ? preRelease.split(".") : [],
    build: build ? build.split(".") : [],
  };
}

function satisfies(version, range) {
  if (!isValidSemver(version) || typeof range !== "string") {
    return false;
  }

  const versionInfo = parseSemver(version);
  if (!versionInfo) {
    return false;
  }

  const rangeRegex =
    /^(\^|~|x|[\d]+[xX]|[\d]+\.[xX]|[\d]+\.[\d]+[xX]|[\d]+\.[\d]+\.[xX]|[\d]+\.[\d]+\.[\d]+)(.*)$/;
  const match = range.match(rangeRegex);

  if (!match) {
    return false;
  }

  const operator = match[1];
  const versionRange = match[2];

  const rangeInfo = parseSemver(versionRange);
  if (!rangeInfo) {
    return false;
  }

  if (operator === "^") {
    return (
      versionInfo.major === rangeInfo.major &&
      semverCompare(versionInfo, rangeInfo) >= 0 &&
      semverCompare(versionInfo, getNextMajor(versionInfo)) < 0
    );
  } else if (operator === "~") {
    return (
      versionInfo.major === rangeInfo.major &&
      versionInfo.minor === rangeInfo.minor &&
      semverCompare(versionInfo, rangeInfo) >= 0 &&
      semverCompare(versionInfo, getNextMinor(versionInfo)) < 0
    );
  } else if (operator === "x" || operator === "X") {
    return true;
  } else {
    // Handle specific versions
    return semverCompare(versionInfo, rangeInfo) === 0;
  }
}

function semverCompare(versionA, versionB) {
  if (versionA.major !== versionB.major) {
    return versionA.major - versionB.major;
  }

  if (versionA.minor !== versionB.minor) {
    return versionA.minor - versionB.minor;
  }

  if (versionA.patch !== versionB.patch) {
    return versionA.patch - versionB.patch;
  }

  return compareIdentifiers(versionA.preRelease, versionB.preRelease);
}

function compareIdentifiers(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const aId = a[i];
    const bId = b[i];

    if (aId === undefined) {
      return -1;
    } else if (bId === undefined) {
      return 1;
    }

    const aIsNumber = !isNaN(aId);
    const bIsNumber = !isNaN(bId);

    if (aIsNumber && bIsNumber) {
      const diff = Number(aId) - Number(bId);
      if (diff !== 0) {
        return diff;
      }
    } else if (aIsNumber) {
      return -1;
    } else if (bIsNumber) {
      return 1;
    } else {
      const stringCompare = aId.localeCompare(bId);
      if (stringCompare !== 0) {
        return stringCompare;
      }
    }
  }

  return 0;
}

function getNextMajor(version) {
  return {
    major: version.major + 1,
    minor: 0,
    patch: 0,
    preRelease: [],
    build: [],
  };
}

function getNextMinor(version) {
  return {
    major: version.major,
    minor: version.minor + 1,
    patch: 0,
    preRelease: [],
    build: [],
  };
}

function order(versionA, versionB) {
  const result = semverCompare(parseSemver(versionA), parseSemver(versionB));
  return result === 0 ? 0 : result > 0 ? 1 : -1;
}

export const semver = {
  satisfies,
  order,
};
