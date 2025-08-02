"use client";

import { useState, useEffect, useRef } from "react";
/** import components */
import {
  BASE_DOT_COLOR,
  GRADIENT_COLOR,
  AVATAR_MESSAGES,
  DEVICE_CONFIGS,
} from "./constants";
import { getDeviceType, debounce } from "./gridUtils";
// import HoverInfoAvatar from "./hoverInfoAvatar";

function AnimationForBackground() {
  // state management
  const [deviceType, setDeviceType] = useState(() => {
    if (typeof window !== "undefined") {
      return getDeviceType();
    }
    return "desktop"; // Default value for server-side rendering
  });
}

export default AnimationForBackground;
