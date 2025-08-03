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
import { bottomeThreeRowsLimitation } from "./utils/hoverUtils";

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
  const [mobileAutoHoverAvatarIdx, setMobileAutoHoverAvatarIdx] =
    useState(null);

  // =========================================== ref management =============================================
  // A reference to the animation frame request, used to cancel the animation
  const requestRef = useRef();

  // Reference to the automatic hover timer on mobile devices
  const mobileHoverTimerRef = useRef(null);

  // ======================================= initial setup effect =========================================
  /**
   * Set the initial configuration and gradient center, which is only executed once
   * when the component is mounted, to establish the initial device configuration,
   * path and center point
   */
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
      // Fixed size equipment
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

  // =================================== mobile effect automatically ==============================================
  useEffect(() => {
    // If not on mobile, clear timer and reset state
    if (deviceType !== "mobile") {
      clearInterval(mobileHoverTimerRef.current);
      mobileHoverTimerRef.current = null;
      setMobileAutoHoverAvatarIdx(null);
      return;
    }

    // Function to randomly select a dot from the bottom three rows and update hover info
    /**
     *
     * @returns Get the candidate index array and randomly pick an
     * idx to control the avatar and message display
     */
    const showRandomHover = () => {
      const indices = bottomeThreeRowsLimitation(configDeviceValue);
      if (!indices.length) return;

      // Pick a random point from the bottom
      /**
       * A point is randomly selected from the bottom, and the position
       * of the bubble is calculated based on its position,
       * showing the corresponding avatar and conversation content.
       */
      const idx = indices[Math.floor(Math.random() * indices.length)];
      setMobileAutoHoverAvatarIdx(idx);

      const avatarData = AVATAR_MESSAGES[idx % AVATAR_MESSAGES.length];
      const { cols, offsetX } = calcGrid(configDeviceValue);
      const row = Math.floor(idx / cols);
      const col = idx % cols;

      setHoverInfoAvatar({
        avatarData,
        position: {
          x:
            offsetX +
            configDeviceValue.DOT_DIAM / 2 +
            col * configDeviceValue.GAP_X,
          y:
            configDeviceValue.OFFSET_Y +
            configDeviceValue.DOT_DIAM / 2 +
            row * configDeviceValue.GAP_Y -
            20, // slightly offset upward
        },
      });
    };

    // Start auto-hover after slight delay to ensure grid is ready
    const timer = setTimeout(() => {
      showRandomHover(); // Initial hover
      mobileHoverTimerRef.current = setInterval(showRandomHover, 2000); // Cycle every 2s
    }, 500);

    // Cleanup timer and interval on unmount or device change
    return () => {
      clearTimeout(timer);
      clearInterval(mobileHoverTimerRef.current);
      mobileHoverTimerRef.current = null;
    };
  }, [deviceType, configDeviceValue]);

  // =========================== Window size change monitoring effect ================================
  useEffect(() => {
    const handleResize = () => {
      // peek at the window size to figure out if we’re on mobile, desktop, etc
      const newTypeDevice = getDeviceType();
      console.log("Checking Device:", {
        width: window.innerWidth,
        height: window.innerHeight,
        deviceType: newTypeDevice,
      });

      // If it’s the same device type as before, we just stop right there.
      if (newTypeDevice === deviceType) return;

      // Otherwise, we update our state with the new deviceType and grab its config.
      const newConfigDeviceValue = DEVICE_CONFIGS[newTypeDevice];
      setDeviceType(newTypeDevice);
      setConfigDeviceValue(newConfigDeviceValue);

      // rebuild the animation’s path points using that fresh config
      const newPathPoints = generatePathPoints(
        newConfigDeviceValue.PANEL_W,
        newConfigDeviceValue.PANEL_H
      );
      setPathPoints(newPathPoints);

      // reset both gradient-centers so they start back at the beginning of those new paths.
      const newCenters = newPathPoints.map((path, idx) => ({
        x: path[0].x,
        y: path[0].y,
        pathIndex: 0,
        segmentProgress: 0,
        GRADIENT_RADIUS_PX:
          newConfigDeviceValue.GRADIENT_RADIUS_MULTIPLIER[idx] *
          newConfigDeviceValue.GAP_X,
      }));
      setCenters(newCenters);
    };

    window.addEventListener("resize", handleResize);
    // Execute once immediately when the component is mounted to ensure the initial state is correct
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [deviceType]);

  // ======================== Animation effect that appears after the page is initialized ===============
  /**The two gradient apertures begin to move dynamically,
   * triggering the color change of the dot */
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
        const isMobileAutoHover =
          deviceType === "mobile" && mobileAutoHoverAvatarIdx === idx;
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
              transform: isMobileAutoHover ? "scale(1.2)" : "scale(1)",
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
