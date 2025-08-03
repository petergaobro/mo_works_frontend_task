/**
 * Type definitions file
 * Provides complete type support for the Animatiopforbackground component system
 * Uses JSDoc comments to provide type information
 */

/**
 * Device type enumeration
 * @typedef {'mobile' | 'desktop1440' | 'desktop'} DeviceType
 */

/**
 * Path point type
 * @typedef {Object} PathPoint
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 */

/**
 * Grid parameters type
 * @typedef {Object} GridParams
 * @property {number} cols - Number of columns
 * @property {number} rows - Number of rows
 * @property {number} radius - Dot radius
 * @property {number} offsetX - X offset
 */

/**
 * Grid dot type
 * @typedef {Object} Dot
 * @property {number} left - Left position
 * @property {number} top - Top position
 * @property {number} cx - Center X coordinate
 * @property {number} cy - Center Y coordinate
 */

/**
 * Avatar message type
 * @typedef {Object} AvatarMessage
 * @property {string} avatar - Avatar image path
 * @property {string} message - Message content
 * @property {string} name - User name
 */

/**
 * Position type for UI elements
 * @typedef {Object} Position
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 */

/**
 * Hover information type
 * @typedef {Object} HoverInfo
 * @property {AvatarMessage} avatarData - Avatar data
 * @property {Position} position - Position information
 */

/**
 * RGB color type
 * @typedef {Object} RGBColor
 * @property {number} r - Red component (0-255)
 * @property {number} g - Green component (0-255)
 * @property {number} b - Blue component (0-255)
 */

/**
 * Distance calculation type
 * @typedef {Object} DistanceInfo
 * @property {number} distance - Distance value
 * @property {number} radius - Radius value
 */

/**
 * Hover info component props type
 * @typedef {Object} HoverInfoProps
 * @property {AvatarMessage} avatarData - Avatar data
 * @property {Position} position - Position information
 * @property {Function} [onClose] - Close callback function
 */

/**
 * Gradient path hook return type
 * @typedef {Object} UseGradientPathReturn
 * @property {Function} updateCenters - Function to update center positions
 */

/**
 * Animation frame reference type
 * @typedef {number|null} AnimationFrameRef
 */

/**
 * Timer reference type
 * @typedef {NodeJS.Timeout|null} TimerRef
 */

/**
 * Event handler function type
 * @typedef {Function} EventHandler
 * @param {Event} event - DOM event object
 * @param {number} [index] - Optional index parameter
 */

// Export type definitions for use by other modules
export {};
