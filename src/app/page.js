"use client";

import Mobile_navbar from "@/components/navbar/mobileNavbar";
import HeroContent from "@/components/content/heroSection";
import { useNavbar } from "@/hooks/useNavbar";
import AnimationForBackground from "@/components/animation/animationForBackground";

export default function Page() {
  const {
    isNavOpen,
    showWarning,
    toggleNav,
    closeNav,
    handleMenuOutsideClick,
    handleNavLinkClick,
    handleCTAClick,
  } = useNavbar();

  return (
    <>
      {/* Mobile Navigation Component */}
      <Mobile_navbar
        isNavOpen={isNavOpen}
        showWarning={showWarning}
        onToggleNav={toggleNav}
        onCloseNav={closeNav}
        onCTAClick={handleCTAClick}
        onNavLinkClick={handleNavLinkClick}
        onMenuOutsideClick={handleMenuOutsideClick}
      />

      <main className="min-h-screen m-0 bg-[#191924] grid place-items-center relative overflow-hidden">
        {/* Animated Background Layer: Renders grid dot animation, z-index: 1 */}
        <AnimationForBackground />

        {/* Main Content Layer: Contains title, description and CTA, z-index: 10, above background */}
        <HeroContent onCTAClick={handleCTAClick} />
      </main>
    </>
  );
}
