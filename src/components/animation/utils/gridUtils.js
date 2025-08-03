/**
 * Utility functions collection for animated background component
 *
 * Contains:
 * - Color processing functions
 * - Mathematical calculation functions
 * - Device detection functions
 * - Animation path generation functions
 * - Grid layout calculation functions
 */

import { calcGrid } from "./gridMath";
import { lerp } from "./mathUtils";

export function getDeviceType() {
  // Default to desktop during server-side rendering
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;
  const height = window.innerHeight;

  // Mobile: width less than or equal to 768px
  if (width <= 768) {
    return "mobile";
  }

  // 1440px specific size: specific resolution range for design restoration
  if (width >= 1440 && width <= 1480 && height >= 780 && height <= 850) {
    return "desktop1440";
  }

  // General desktop: all other cases
  return "desktop";
}

/**
 * Debounce function: limits function execution frequency
 * Only executes the last call when called multiple times within a specified time
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time (milliseconds)
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generatePathPoints(PANEL_W, PANEL_H) {
  // If responsive_size (string), use the actual window size; otherwise use a fixed value
  const actualWidth = typeof PANEL_W === "string" ? window.innerWidth : PANEL_W;
  const actualHeight =
    typeof PANEL_H === "string" ? window.innerHeight : PANEL_H;

  return [
    // Rectangular path with gradient center on the left (clockwise)
    [
      { x: actualWidth * 0.2, y: actualHeight * 0.75 }, // Start: bottom-left corner
      { x: actualWidth * 0.2, y: actualHeight * 0.25 }, // Move up: top-left corner
      { x: actualWidth * 0.4, y: actualHeight * 0.25 }, // Move right: top-right corner
      { x: actualWidth * 0.2, y: actualHeight * 0.25 }, // Move left: return to top-left corner
      { x: actualWidth * 0.2, y: actualHeight * 0.75 }, // Move down: return to starting point
    ],
    // Rectangular path in the center of the gradient on the right (clockwise)
    [
      { x: actualWidth * 0.85, y: actualHeight * 0.25 }, // Start: top-right corner
      { x: actualWidth * 0.85, y: actualHeight * 0.75 }, // Move down: bottom-right corner
      { x: actualWidth * 0.55, y: actualHeight * 0.75 }, // Move left: bottom-left corner
      { x: actualWidth * 0.85, y: actualHeight * 0.75 }, // Move right: return to bottom-right corner
      { x: actualWidth * 0.85, y: actualHeight * 0.25 }, // Move up: return to starting point
    ],
  ];
}

// export function generateGridDots(config) {
//   // Calculating grid parameters
//   const { cols, rows, radius, offsetX } = calcGrid(config);
//   const dots = [];

//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       const cx = offsetX + radius + c * config.GAP_X; // center X
//       const cy = config.OFFSET_Y + radius + r * config.GAP_Y; // center Y

//       dots.push({
//         left: Math.round(cx - radius), // top-left X for <i> element
//         top: Math.round(cy - radius), // top-left Y for <i> element
//         cx,
//         cy, // center coordinates (used for color)
//       });
//     }
//   }

//   return { dots, cols, rows, radius, offsetX };
// }

// https://p5js.org/reference/p5/lerp/
/**
 * According to the current path progress and smooth interpolation algorithm,
 * the position of the animation center point on the path is updated to achieve a
 * continuous and cyclic movement effect.
 */

export function updateCenterPosition(center, pathPoints, speed) {
  const currentPoint = pathPoints[center.pathIndex]; // Current path segment start point
  const nextPoint = pathPoints[(center.pathIndex + 1) % pathPoints.length]; // Current path segment end point

  // Use linear interpolation to calculate current position
  const x = lerp(currentPoint.x, nextPoint.x, center.segmentProgress);
  const y = lerp(currentPoint.y, nextPoint.y, center.segmentProgress);

  // Update animation progress
  let newSegmentProgress = center.segmentProgress + speed;
  let newPathIndex = center.pathIndex;

  // When current path segment is complete, move to next segment
  if (newSegmentProgress >= 1) {
    newSegmentProgress = 0; // Reset segment progress
    newPathIndex = (center.pathIndex + 1) % pathPoints.length; // Loop to next segment
  }

  return {
    ...center,
    x, // New X coordinate
    y, // New Y coordinate
    pathIndex: newPathIndex, // Current path segment index
    segmentProgress: newSegmentProgress, // Segment progress (0-1)
  };
}
