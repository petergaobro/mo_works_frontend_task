import { useState, useEffect, useCallback } from "react";

const WARNING_ANIMATION_DURATION = 500;

/**
 * Custom hook for managing navigation state and interactions
 */
export function useNavbar() {
  // ===== State Management =====
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // ===== Event Handlers =====
  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const handleMenuOutsideClick = useCallback(
    (e) => {
      if (isNavOpen && !e.target.closest("a") && !e.target.closest("button")) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), WARNING_ANIMATION_DURATION);
      }
    },
    [isNavOpen]
  );

  const handleNavLinkClick = useCallback(
    (e) => {
      e.preventDefault(); // Prevent default behavior since links are placeholders
      closeNav();
      // TODO: Add actual navigation logic here
    },
    [closeNav]
  );

  const handleCTAClick = useCallback((e) => {
    e.preventDefault(); // Prevent default behavior
    // TODO: Add actual CTA logic here, such as opening booking form
    console.log("CTA button clicked");
  }, []);

  // ===== Side Effects =====
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "unset"; // Restore scrolling
    }

    // Ensure scrolling is restored when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isNavOpen]);

  return {
    isNavOpen,
    showWarning,
    closeNav,
    toggleNav,
    handleMenuOutsideClick,
    handleNavLinkClick,
    handleCTAClick,
  };
}
