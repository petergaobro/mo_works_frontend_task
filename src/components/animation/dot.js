"use client";
import React from "react";
import styles from "./dot.module.css";

function Dot({
  idx,
  left,
  top,
  cx,
  cy,
  dotSize,
  color,
  isMobileAutoHover,
  deviceType,
  onHover,
  onLeave,
}) {
  const handleMouseEnter = (e) => {
    if (deviceType !== "mobile" && onHover) onHover(e, idx);
  };

  const handleMouseLeave = () => {
    if (deviceType !== "mobile" && onLeave) onLeave();
  };

  const handleMouseOver = (e) => {
    if (deviceType !== "mobile") {
      e.currentTarget.style.transform = "scale(1.2)";
    }
  };

  const handleMouseOut = (e) => {
    if (deviceType !== "mobile") {
      e.currentTarget.style.transform = "scale(1)";
    }
  };

  return (
    <i
      key={idx}
      className={styles.dot}
      style={{
        left,
        top,
        width: dotSize,
        height: dotSize,
        background: color,
        position: "absolute",
        borderRadius: "50%",
        display: "block",
        cursor: deviceType === "mobile" ? "default" : "pointer",
        transform: isMobileAutoHover ? "scale(1.2)" : "scale(1)",
        pointerEvents: deviceType === "mobile" ? "none" : "auto",
        transition: "transform 0.25s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
  );
}

export default Dot;
