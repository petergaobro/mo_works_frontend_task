import ArrowIcon from "../icons/arrowIcon";
import Header from "../header";
import styles from "../../app/helper.module.css";

// ===== Constants =====
const PRODUCT_TAGS = ["No Code", "No Analysts", "No Lift"];

/**
 * Hero Content Component
 *
 * Contains the main hero section with title, description, and CTA
 */
export default function HeroContent({ onCTAClick }) {
  return (
    <div className="relative z-10 text-center max-w-4xl px-5 text-white -mt-15 max-md:pt-12 max-sm:px-4">
      {/* <Header /> */}
      {/* Product Feature Tags: Display core selling points */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap rounded-sm p-1 pt-6 max-w-[55%] mx-auto mb-8 relative max-md:max-w-[90%] max-md:pt-4 max-sm:max-w-full max-sm:gap-2 max-sm:mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(25,25,36,0)] via-[rgba(25,25,36,0.15)] via-[#191924] via-[#191924] via-[rgba(25,25,36,0.15)] to-[rgba(25,25,36,0)] pointer-events-none rounded hidden md:block" />
        <div className="absolute inset-0 bg-radial-gradient from-[#191924] via-[rgba(25,25,36,0.8)] via-[rgba(25,25,36,0.4)] to-transparent pointer-events-none rounded md:hidden" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/15 to-[#191924] from-10% via-15% to-85% via-85% to-transparent rounded-sm pointer-events-none" /> */}
        {PRODUCT_TAGS.map((tag, index) => (
          <span
            key={index}
            className="
                    inline-flex items-center justify-center
                    mr-2 bg-[#2E2E38] text-white rounded border border-[rgba(255,255,255,0.08)]
                    whitespace-nowrap relative z-10 font-medium
                    h-6 px-1.5 text-xs leading-6
                    sm:h-7 sm:px-2 sm:text-sm sm:leading-7
                    lg:h-8 lg:px-2.5 lg:text-base lg:leading-8
                  "
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Main Title Part 1: Enterprise Ready Conversation */}
      <div className=" max-w-[85%] mx-auto relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/15 to-[#191924] from-5% via-5% to-95% via-95% to-transparent pointer-events-none" /> */}
        <div className={styles.titleOneOverlay} />
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight m-0 bg-gradient-to-br from-white to-[#e0e0e0] bg-clip-text text-transparent relative z-10">
          Enterprise Ready
          <br />
          Conversation
          <br />
        </h1>
      </div>

      {/* Main Title Part 2: Intelligence (separated to achieve different visual effects) */}
      <div className="max-w-[80%] mx-auto relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/75 to-[#191924] from-15% via-30% to-50% via-70% to-[#191924] via-85% to-transparent pointer-events-none" /> */}
        <div className={styles.titleTwoOverlay} />
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight m-0 bg-gradient-to-br from-white to-[#e0e0e0] bg-clip-text text-transparent relative z-10">
          Intelligence.
        </h1>
      </div>

      {/* Product Description: Detailed introduction of product features and value */}
      <div
        className="relative mx-auto my-10 md:my-4 sm:my-2
              w-full
              max-w-[280px]
              sm:max-w-[560px]
              md:max-w-[640px]"
      >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/15 to-[#191924] from-5% via-5% to-95% via-95% to-transparent pointer-events-none" /> */}
        <div className={styles.descriptionOverlay} />
        <p className="text-[clamp(1rem,2vw,1.25rem)] leading-8 m-0 text-[rgba(255,255,255,0.9)] relative z-10 md:text-[clamp(0.9rem,4vw,1.1rem)] md:leading-6 sm:text-[clamp(0.9rem,4vw,1.1rem)] sm:leading-6">
          OI transforms raw customer conversations across any channel into
          precise, actionable insights and automated workflows. Automate root
          cause, cost analytics, coaching, quality and more.
        </p>
      </div>

      {/* CTA Button: Primary call to action */}
      <div className="rounded-sm p-0 pb-3 pl-2.5 max-w-[48%] mx-auto relative max-md:max-w-[80%] max-sm:max-w-[90%] mt-4">
        <div className={styles.buttonOverlay} />
        <button
          className="bg-gradient-to-br from-[#665FEE] to-[#8B7CF6] text-white border-none py-4 px-8 rounded-lg text-lg font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(102,95,238,0.3)] backdrop-blur-md relative z-10 hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(102,95,238,0.4)] hover:from-[#362A86] hover:to-[#4A3F9E] md:py-3.5 md:px-7 md:text-base sm:py-3 sm:px-6 sm:text-sm group"
          onClick={onCTAClick}
          aria-label="Book product demo"
        >
          Book a demo
          {/* <ArrowIcon className={styles.arrowIcon} /> */}
          <svg
            className="transition-transform duration-300 group-hover:animate-arrow-move"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 1L15 8L8 15M15 8H1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
