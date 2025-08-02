"use client";

import { useCallback, useMemo } from "react";
import ArrowIcon from "../icons/arrowIcon";
import CloseIcon from "../icons/closeIcon";

// ===== Constants =====
const NAVIGATION_LINKS = [
  { href: "#", label: "Homepage" },
  { href: "#", label: "About us" },
  { href: "#", label: "Insights" },
  { href: "#", label: "Contact Us" },
];

const WARNING_ANIMATION_DURATION = 500;

/**
 * Mobile Navigation Component
 *
 * Handles mobile navigation bar and dropdown menu
 */
export default function Mobile_navbar({
  isNavOpen,
  showWarning,
  onToggleNav,
  onCloseNav,
  onCTAClick,
  onNavLinkClick,
  onMenuOutsideClick,
}) {
  // ===== Computed Properties =====
  const navButtonAriaLabel = useMemo(
    () => (isNavOpen ? "Close navigation" : "Open navigation"),
    [isNavOpen]
  );

  const navToggleClassName = useMemo(
    () =>
      `bg-transparent border-none cursor-pointer p-1 transition-transform duration-300 ease-in-out ${
        showWarning ? "animate-shake" : ""
      }`,
    [showWarning]
  );

  const mobileNavMenuClassName = useMemo(
    () =>
      `fixed top-0 left-0 right-0 bg-[#25252F] z-[99] pt-20 transform transition-transform duration-400 ease-out ${
        isNavOpen ? "translate-y-0" : "-translate-y-full"
      }`,
    [isNavOpen]
  );

  return (
    <>
      {/* Mobile Navigation Bar: Fixed at top, contains Logo and menu button */}
      <nav
        className={`hidden max-md:flex fixed top-0 left-0 right-0 z-[100] px-5 py-4 justify-between items-center transition-colors duration-300 ease-in-out ${
          isNavOpen ? "bg-[#25252F]" : "bg-transparent"
        } max-sm:px-4 max-sm:py-3`}
      >
        <div className="flex items-center">
          <img
            src="/Logo.png"
            alt="OI Logo"
            className="h-8 w-auto max-sm:h-6"
            loading="eager"
          />
        </div>

        <div className="flex items-center gap-4 max-sm:gap-3">
          <button
            className="bg-white text-black border-none px-4 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-lg max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
            onClick={onCTAClick}
            aria-label="Book a demo"
          >
            Book a demo
            <ArrowIcon
              className="w-3 h-3 transition-transform duration-300 ease-in-out group-hover:animate-arrow-move"
              width={12}
              height={12}
            />
          </button>

          <button
            className={navToggleClassName}
            onClick={onToggleNav}
            aria-label={navButtonAriaLabel}
            aria-expanded={isNavOpen}
            aria-controls="mobile-nav-menu"
          >
            {isNavOpen ? (
              <CloseIcon
                className="w-5 h-5 stroke-white transition-colors duration-300 ease-in-out"
                showWarning={showWarning}
              />
            ) : (
              <img
                src="/toggle.png"
                alt="Menu"
                className="w-6 h-6 transition-opacity duration-300 ease-in-out"
                loading="lazy"
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Navigation Menu */}
      <div
        id="mobile-nav-menu"
        className={mobileNavMenuClassName}
        onClick={onMenuOutsideClick}
        aria-hidden={!isNavOpen}
      >
        <div className="h-px bg-white/10 mx-5 max-sm:mx-4" />

        <nav className="px-5 py-8 max-sm:py-6 max-sm:px-4" role="navigation">
          {NAVIGATION_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block text-white no-underline text-lg font-medium py-4 border-b border-white/5 transition-colors duration-300 ease-in-out hover:text-white/70 last:border-b-0 max-sm:text-base max-sm:py-3"
              onClick={onNavLinkClick}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="block mx-5 mt-6 p-4 bg-transparent text-white border-2 border-[#665FEE] rounded-lg text-center text-base font-medium no-underline transition-all duration-300 ease-in-out hover:border-white hover:bg-white/5 max-sm:p-3 max-sm:text-sm max-sm:mx-4"
          onClick={onNavLinkClick}
        >
          Partner with us
        </a>

        <a
          href="#"
          className="block mx-5 mt-4 mb-8 p-4 bg-white text-black border-none rounded-lg text-center text-base font-semibold no-underline transition-all duration-300 ease-in-out shadow-lg hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2 max-sm:p-3 max-sm:text-sm max-sm:mb-6 max-sm:mx-4"
          onClick={onCTAClick}
        >
          Book a demo
          <ArrowIcon className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:animate-arrow-move" />
        </a>
      </div>
    </>
  );
}
