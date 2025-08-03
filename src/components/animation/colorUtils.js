export function hexToRgb(hex) {
  // Handle shorthand form (e.g., #F00 -> #FF0000)
  const c =
    hex.replace("#", "").length === 3
      ? hex
          .replace("#", "")
          .split("")
          .map((s) => s + s)
          .join("")
      : hex.replace("#", "");
  const n = parseInt(c, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/**
 * Convert RGB object to hexadecimal color string
 * @param {Object} rgb - Object containing r, g, b properties (0-255)
 * @returns {string} Hexadecimal color string (e.g., "#FF0000")
 */
export function rgbToHex(rgb) {
  const { r, g, b } = rgb;
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function lerpColor(aHex, bHex, t) {
  const a = hexToRgb(aHex),
    b = hexToRgb(bHex);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const b2 = Math.round(lerp(a.b, b.b, t));
  return `rgb(${r}, ${g}, ${b2})`;
}

// Euclidean Distance
/**https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot */
export function calculateDistance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
