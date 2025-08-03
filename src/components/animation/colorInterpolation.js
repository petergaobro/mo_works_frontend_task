import { lerp } from "./utils/mathUtils";

/**
 * https://p5js.org/reference/p5/lerpColor/
 * Performs linear interpolation between two hexadecimal colors
 * aHex and bHex according to the ratio t, returning an rgb string of
 * the intermediate color.
 * Linear color interpolation function
 * @param {string} aHex - Starting color (hexadecimal)
 * @param {string} bHex - Ending color (hexadecimal)
 * @param {number} t - Interpolation factor (0–1)
 * @returns {string} RGB color string, e.g., "rgb(255, 0, 0)"
 */
export function lerpColor(aHex, bHex, t) {
  const a = hexToRgb(aHex),
    b = hexToRgb(bHex);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const b2 = Math.round(lerp(a.b, b.b, t));
  return `rgb(${r}, ${g}, ${b2})`;
}

/**
 * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * This function converts the hexadecimal colors commonly used by web designers
 * into RGB values that can be calculated by the program.
 * @param {string} hex - Hexadecimal color values (such as "#FF0000" or "#F00")
 * @returns {Object} An object containing r, g, b properties, with values ranging from 0 to 255
 */
export function hexToRgb(hex) {
  // Handle shorthand notations (e.g. #F00 -> #FF0000)
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
