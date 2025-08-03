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
import { calculateDistance } from "./colorUtils";
import HoverInfoAvatar from "./hoverInfoAvatar";

function AnimationForBackground() {
  // state management
  const [deviceType, setDeviceType] = useState(() => {
    if (typeof window !== "undefined") {
      return getDeviceType();
    }
    return "desktop"; // Default value for server-side rendering
  });

  /**
   * Automatically select the appropriate layout and animation parameters based on the current
   * device type (mobile/desktop) to ensure that the dynamic background effect can be displayed
   * correctly on different devices
   */
  const [configDeviceValue, setConfigDeviceValue] = useState(() => {
    const initialDeviceType =
      typeof window !== "undefined" ? getDeviceType() : "desktop";
    return DEVICE_CONFIGS[initialDeviceType];
  });

  /** User information currently shown on hover; null indicates no display */
  const [hoverInfoAvatar, setHoverInfoAvatar] = useState(null);

  // Calculate the distance to each gradient center
  function getColor(cx, cy) {
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
    return lerpColor(GRADIENT_COLOR, BASE_DOT_COLOR, t);
  }

  //   rendering
  return (
    <div
      className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-auto
        transition-all duration-300 ease-in-out
        ${configDeviceValue.isResponsive ? "w-screen h-screen" : ""}
        ${deviceType === "desktop" ? "w-screen h-screen" : ""}
        ${deviceType === "desktop1440" ? "w-screen h-screen" : ""}
      `}
      style={{
        width: configDeviceValue.isResponsive
          ? "100vw"
          : configDeviceValue.PANEL_W,
        height: configDeviceValue.isResponsive
          ? "100vh"
          : configDeviceValue.PANEL_H,
      }}
      aria-label={`Background animation panel ${
        configDeviceValue.isResponsive
          ? "responsive"
          : configDeviceValue.PANEL_W
      }*${
        configDeviceValue.isResponsive
          ? "responsive"
          : configDeviceValue.PANEL_H
      }`}
    >
      {hoverInfoAvatar && (
        <HoverInfoAvatar
          avatarData={hoverInfoAvatar.avatarData}
          position={hoverInfoAvatar.position}
          onClose={() => setHoverInfoAvatar(null)}
        />
      )}
    </div>
  );
}

export default AnimationForBackground;
