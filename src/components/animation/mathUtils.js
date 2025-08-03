/**
 * Easing function: Quadratic ease out
 * Creates smooth deceleration effect at the end of animation
 * This function is used to calculate the movement of the gradient
 * center point, making the background animation look smoother and more natural,
 * rather than mechanical uniform motion.
 * @param {number} t - Time factor (0-1)
 * @returns {number} Eased value (0-1)
 */
export function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}

/**
 * This function allows you to find the value of any
 * percentage position between two values to achieve a smooth transition effect.
 * Linear interpolation function
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolation result
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}
