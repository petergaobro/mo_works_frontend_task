/**
 * Holds all configuration
 * settings and constant values to simplify maintenance and support internationalization.
 */

// ===== Base Color Constants =====
export const BASE_DOT_COLOR = "#292933"; // Base color for grid dots (dark gray)
export const GRADIENT_COLOR = "#665FEE"; // Color for gradient centers (purple)

/**
 * Stores information for user avatars, names, and chat messages displayed on hover.
 * Uses modulo to cycle through the array, aligning each item with a corresponding grid dot index.
 */

export const AVATAR_MESSAGES = [
  {
    avatar: "/p1.png", // Avatar image path in public
    message: "Hi, I'm calling because...", // Conversation content
    name: "Sarah", // User name
  },
  {
    avatar: "/Image_01.png",
    message: "Hello! How can I help you today?",
    name: "Mike",
  },
  {
    avatar: "/Image_02.png",
    message: "Thanks for your patience...",
    name: "Sarah",
  },
  {
    avatar: "/Image_01.png",
    message: "I understand your concern...",
    name: "Mike",
  },
  {
    avatar: "/Image_02.png",
    message: "Let me check that for you...",
    name: "Sarah",
  },
  {
    avatar: "/Image_01.png",
    message: "Is there anything else I can assist with?",
    name: "Mike",
  },
  {
    avatar: "/Image_02.png",
    message: "I'll make sure to follow up...",
    name: "Sarah",
  },
  {
    avatar: "/Image_01.png",
    message: "Your satisfaction is our priority...",
    name: "Mike",
  },
  {
    avatar: "/Image_02.png",
    message: "Your satisfaction is our priority...",
    name: "Mike",
  },
];
/**
 * Settings optimized for different devices.
 * Dynamically adapts layout and animations according to the screen size and device type
 */

export const DEVICE_CONFIGS = {  
  // 1440px specific desktop configuration (for 1:1 design restoration)
  desktop1440: {
    PANEL_W: 1440,                        // Fixed panel width
    PANEL_H: 800,                         // Fixed panel height
    DOT_DIAM: 12,                         // Dot diameter
    OFFSET_X: 38,                         // Left offset
    OFFSET_Y: 0,                          // Top offset
    GAP_X: 52,                            // Horizontal spacing
    GAP_Y: 52,                            // Vertical spacing
    SPEED: 0.007,                         // Movement speed
    GRADIENT_RADIUS_MULTIPLIER: [10, 6],  // Gradient radius multiplier
    isResponsive: false                   // Fixed size, does not respond to window changes
  },
  
  // General desktop configuration (width > 768px and doesn't meet 1440 specific conditions)
  desktop: {
    PANEL_W: '100vw',                     // Full screen width
    PANEL_H: '100vh',                     // Full screen height
    DOT_DIAM: 10,                         // Dot diameter
    OFFSET_X: 30,                         // Left offset
    OFFSET_Y: 0,                          // Top offset
    GAP_X: 52,                            // Horizontal spacing
    GAP_Y: 52,                            // Vertical spacing
    SPEED: 0.006,                         // Movement speed
    GRADIENT_RADIUS_MULTIPLIER: [9, 7],   // Gradient radius multiplier
    isResponsive: true                    // Responsive configuration
  }
};