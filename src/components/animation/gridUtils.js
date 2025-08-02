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
