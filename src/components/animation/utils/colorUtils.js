import { useState } from "react";
import { lerpColor } from "../colorInterpolation";
import { BASE_DOT_COLOR, GRADIENT_COLOR } from "../constants";
import { easeOutQuad } from "./mathUtils";

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

// Euclidean Distance
/**https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot */
export function calculateDistance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

// Calculate the distance to each gradient center
export function getColor(cx, cy, centers) {
  // const [centers, setCenters] = useState([]);
  const distances = centers.map((center) => ({
    distance: calculateDistance(cx, cy, center.x, center.y),
    radius: center.GRADIENT_RADIUS_PX,
  }));

  // Find the nearest gradient center
  const nearest = distances.reduce((min, curr) =>
    curr.distance < min.distance ? curr : min
  );

  // Use the easing function to calculate the interpolation factor. The closer the distance, the closer the gradient color.
  const t = easeOutQuad(Math.min(1, nearest.distance / nearest.radius));
  // Color interpolation based on weight
  return lerpColor(GRADIENT_COLOR, BASE_DOT_COLOR, t);
}
