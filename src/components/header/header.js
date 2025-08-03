"use client";
import ArrowIcon from "../icons/arrowIcon";
import styles from '../../app/helper.module.css'

export default function Header({ onCTAClick }) {
  const menuItems = [
    { label: "Homepage", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E1E1E]/80 border-b border-gray-700/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">OI</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Navigation Actions */}
          <div className="rounded-sm p-0 pb-3 pl-2.5 max-w-[48%] mx-auto relative max-md:max-w-[80%] max-sm:max-w-[90%] mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/15 to-[#191924] from-5% via-5% to-95% via-95% to-transparent rounded-sm pointer-events-none" />
            <button
              className="bg-gradient-to-br from-[#665FEE] to-[#8B7CF6] text-white border-none px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 ease-in-out shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:from-[#362A86] hover:to-[#4A3F9E] relative z-10 max-md:px-7 max-md:py-3.5 max-md:text-base max-sm:px-6 max-sm:py-3 max-sm:text-sm"
              onClick={onCTAClick}
              aria-label="Book product demo"
            >
              Book a demo
              <ArrowIcon className={styles.arrowIcon} />
              {/* <ArrowIcon className="transition-transform duration-300 ease-in-out group-hover:animate-arrow-move" /> */}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
