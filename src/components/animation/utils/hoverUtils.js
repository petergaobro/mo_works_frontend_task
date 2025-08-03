import { AVATAR_MESSAGES } from "../constants";
import { calcGrid } from "./gridMath";

export function getHoverInfoByIndex(index, config, onlyBottom = false) {
  const { cols, offsetX } = calcGrid(config);
  const rows = config.ROWS;

  let adjustedIndex = index;

  if (onlyBottom) {
    const startRow = Math.max(0, rows - 3);
    const bottomIndices = [];

    for (let r = startRow; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bottomIndices.push(r * cols + c);
      }
    }

    const randomIdx = index % bottomIndices.length;
    adjustedIndex = bottomIndices[randomIdx];
  }

  const r = Math.floor(adjustedIndex / cols);
  const c = adjustedIndex % cols;

  const cx = offsetX + config.DOT_DIAM / 2 + c * config.GAP_X;
  const cy = config.OFFSET_Y + config.DOT_DIAM / 2 + r * config.GAP_Y;

  const avatarData =
    AVATAR_MESSAGES.length > 0 && Number.isFinite(adjustedIndex)
      ? AVATAR_MESSAGES[adjustedIndex % AVATAR_MESSAGES.length]
      : {
          avatar: "/default-avatar.png",
          name: "Unknown",
          message: "",
        };
  if (!Number.isFinite(cx) || !Number.isFinite(cy)) return;
  return {
    avatarData,
    position: {
      x: Number.isFinite(cx) ? cx : 0,
      y: Number.isFinite(cy) ? cy - 10 : 0,
    },
  };
}

export function bottomeThreeRowsLimitation(config) {
  // Return empty array if grid config is not available
  if (!config) return [];

  // Calculate number of columns and rows based on device config
  const { cols, rows } = calcGrid(config);

  // Array to hold the indices from the bottom three rows
  const indices = [];

  // Determine the starting row for the bottom three rows (ensure not negative)
  const startRow = Math.max(0, rows - 2);

  // Loop through the last three rows
  for (let r = startRow; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Calculate the 1D index of the current cell
      const index = r * cols + c;
      indices.push(index);
    }
  }

  // Return the full list of indices from the bottom three rows
  return indices;
}
