/**
 * Calculate grid layout parameters
 * Based on panel dimensions and configuration parameters, calculate grid columns, rows and offsets
 * Ensures all dots are fully displayed (not cut off as half circles)
 * @param {Object} config - Device configuration object
 * @returns {Object} Grid parameters containing cols, rows, radius, offsetX
 */
export function calcGrid(config) {
  const { PANEL_W, PANEL_H, DOT_DIAM, OFFSET_X, OFFSET_Y, GAP_X, GAP_Y, PADDING_RIGHT, MIN_PADDING_X } = config;
  const radius = DOT_DIAM / 2;  // Dot radius
  
  // Get actual panel dimensions
  const actualWidth = typeof PANEL_W === 'string' ? window.innerWidth : PANEL_W;
  const actualHeight = typeof PANEL_H === 'string' ? window.innerHeight : PANEL_H;
  
  let cols, rows, offsetX;
  
  if (MIN_PADDING_X !== undefined) {
    // Mobile mode: center aligned with minimum left and right margins
    const usableW = actualWidth - 2 * (MIN_PADDING_X + radius);  // Usable width
    cols = Math.max(0, Math.floor(usableW / GAP_X) + 1);         // Number of columns
    
    // Calculate actual grid width
    const actualGridWidth = (cols - 1) * GAP_X + DOT_DIAM;
    // Calculate left offset needed for centering
    offsetX = (actualWidth - actualGridWidth) / 2;
  } else {
    // Desktop mode: use fixed offset
    const rightPadding = PADDING_RIGHT || OFFSET_X;               // Right margin
    const usableW = actualWidth - (OFFSET_X + radius) - (rightPadding + radius);  // Usable width
    cols = Math.max(0, Math.floor(usableW / GAP_X) + 1);         // Number of columns
    offsetX = OFFSET_X;                                          // Use configured left offset
  }
  
  // Calculate number of rows (vertical layout)
  const usableH = actualHeight - 2 * (OFFSET_Y + radius);        // Usable height
  rows = Math.max(0, Math.floor(usableH / GAP_Y) + 1);          // Number of rows
  
  return { cols, rows, radius, offsetX };
}