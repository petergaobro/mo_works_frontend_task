"use client";

import { useState, useEffect, useRef, useMemo } from "react";
/** import components */
import {
  BASE_DOT_COLOR,
  GRADIENT_COLOR,
  AVATAR_MESSAGES,
  DEVICE_CONFIGS,
} from "./constants";
import {
  getDeviceType,
  debounce,
  generateGridDots,
  generatePathPoints,
  updateCenterPosition,
} from "./utils/gridUtils";
import { getColor } from "./utils/colorUtils";
import HoverInfoAvatar from "./hoverInfoAvatar";
import Dot from "./dot";
import { calcGrid } from "./utils/gridMath";
import styles from "../../app/helper.module.css";
import clsx from "clsx";

function AnimationForBackground() {
  // ================================== state management ==================================================
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

  //   An array of states for the two transition centers, including their positions and animation progress.
  const [centers, setCenters] = useState([]);

  /** User information currently shown on hover; null indicates no display */
  const [hoverInfoAvatar, setHoverInfoAvatar] = useState(null);

  // An array of motion path points for the two gradient centers
  const [pathPoints, setPathPoints] = useState([]);

  // The point index automatically displayed on the mobile terminal is used to automatically
  //  display user information in a loop
  const [mobileAutoHoverIndex, setMobileAutoHoverIndex] = useState(null);

  // =========================================== ref management =============================================
  // A reference to the animation frame request, used to cancel the animation
  const requestRef = useRef();

  // Reference to the automatic hover timer on mobile devices
  const mobileHoverTimerRef = useRef();

  useEffect(() => {
    const initialDeviceType = getDeviceType();
    const initialConfig = DEVICE_CONFIGS[initialDeviceType];

    // If it is a responsive device, you need to wait for the window size to be available
    if (initialConfig.isResponsive && typeof window !== "undefined") {
      const initialPathPoints = generatePathPoints(
        initialConfig.PANEL_W,
        initialConfig.PANEL_H
      );

      setDeviceType(initialDeviceType);
      setConfigDeviceValue(initialConfig);
      setPathPoints(initialPathPoints);

      const initialCenters = [
        {
          x: initialPathPoints[0][0].x,
          y: initialPathPoints[0][0].y,
          pathIndex: 0,
          segmentProgress: 0,
          GRADIENT_RADIUS_PX:
            initialConfig.GRADIENT_RADIUS_MULTIPLIER[0] * initialConfig.GAP_X,
        },
        {
          x: initialPathPoints[1][0].x,
          y: initialPathPoints[1][0].y,
          pathIndex: 0,
          segmentProgress: 0,
          GRADIENT_RADIUS_PX:
            initialConfig.GRADIENT_RADIUS_MULTIPLIER[1] * initialConfig.GAP_X,
        },
      ];
      setCenters(initialCenters);
    } else {
      // 固定尺寸设备
      const initialPathPoints = generatePathPoints(
        initialConfig.PANEL_W,
        initialConfig.PANEL_H
      );

      setDeviceType(initialDeviceType);
      setConfigDeviceValue(initialConfig);
      setPathPoints(initialPathPoints);

      const initialCenters = [
        {
          x: initialPathPoints[0][0].x,
          y: initialPathPoints[0][0].y,
          pathIndex: 0,
          segmentProgress: 0,
          GRADIENT_RADIUS_PX:
            initialConfig.GRADIENT_RADIUS_MULTIPLIER[0] * initialConfig.GAP_X,
        },
        {
          x: initialPathPoints[1][0].x,
          y: initialPathPoints[1][0].y,
          pathIndex: 0,
          segmentProgress: 0,
          GRADIENT_RADIUS_PX:
            initialConfig.GRADIENT_RADIUS_MULTIPLIER[1] * initialConfig.GAP_X,
        },
      ];
      setCenters(initialCenters);
    }
  }, []);

  useEffect(() => {
    if (pathPoints.length === 0 || centers.length === 0) return;

    const animate = () => {
      setCenters((prev) =>
        prev.map((center, index) =>
          updateCenterPosition(
            center,
            pathPoints[index],
            configDeviceValue.SPEED
          )
        )
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [pathPoints, configDeviceValue.SPEED, centers.length]);

  //   Event handling function
  /**
   * Handles mouse hover events for grid points (desktop only) and
   * displays the corresponding user avatar and speech bubble.
   */
  const handleDotHover = (event, dotIndex) => {
    if (deviceType === "mobile") return; // Disable on mobile devices

    const rect = event.currentTarget.getBoundingClientRect();
    const avatarData = AVATAR_MESSAGES[dotIndex % AVATAR_MESSAGES.length];

    setHoverInfoAvatar({
      avatarData,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    });
  };

  /**
   * Handle mouse-off events on grid points (desktop only)
   * Hide user information display
   */
  const handleDotLeave = () => {
    if (deviceType === "mobile") return; // Disable on mobile devices
    setHoverInfoAvatar(null);
  };

  //   const { dots, cols, rows, radius, offsetX } = useMemo(() => {
  //     return generateGridDots(configDeviceValue);
  //   }, [configDeviceValue]);

  //   // No rendering during initialization
  //     if (pathPoints.length === 0 || centers.length === 0) {
  //       return null;
  //     }

  //   const { dots, cols, rows, radius, offsetX } = useMemo(() => {
  //     if (!configDeviceValue)
  //       return { dots: [], cols: 0, rows: 0, radius: 0, offsetX: 0 };
  //     return generateGridDots(configDeviceValue);
  //   }, [configDeviceValue]);

  //  ===== =============================== Data preparation before rendering ====================
  /**
   * No rendering during initialization
   * Avoid rendering with empty data
   */
  if (!configDeviceValue || pathPoints.length === 0 || centers.length === 0) {
    return null;
  }

  // Calculating grid parameters
  const { cols, rows, radius, offsetX } = calcGrid(configDeviceValue);

  const dots = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = offsetX + radius + c * configDeviceValue.GAP_X; // center X
      const cy =
        configDeviceValue.OFFSET_Y + radius + r * configDeviceValue.GAP_Y; // center Y

      dots.push({
        left: Math.round(cx - radius), // top-left X for <i> element
        top: Math.round(cy - radius), // top-left Y for <i> element
        cx,
        cy, // center coordinates (used for color)
      });
    }
  }

  //   rendering
  return (
    <div
      className={clsx(
        styles.animatedBackground,
        styles[`animatedBackground--${deviceType}`]
      )}
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
      {dots.map(({ left, top, cx, cy }, idx) => {
        // const isMobileAutoHover = deviceType === 'mobile' && mobileAutoHoverIndex === idx;
        return (
          <i
            key={idx}
            className={styles.dotElement}
            style={{
              position: "absolute",
              left,
              top,
              width: configDeviceValue.DOT_DIAM,
              height: configDeviceValue.DOT_DIAM,
              borderRadius: "50%",
              background: getColor(cx, cy, centers),
              display: "block",
              cursor: deviceType === "mobile" ? "default" : "pointer",
              transition: "transform 0.2s ease",
              //   transform: isMobileAutoHover ? 'scale(1.2)' : 'scale(1)',
              pointerEvents: deviceType === "mobile" ? "none" : "auto",
            }}
            onMouseEnter={
              deviceType !== "mobile"
                ? (e) => handleDotHover(e, idx)
                : undefined
            }
            onMouseLeave={deviceType !== "mobile" ? handleDotLeave : undefined}
            onMouseOver={
              deviceType !== "mobile"
                ? (e) => {
                    e.currentTarget.style.transform = "scale(1.2)";
                  }
                : undefined
            }
            onMouseOut={
              deviceType !== "mobile"
                ? (e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                : undefined
            }
          />
        );
      })}

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
