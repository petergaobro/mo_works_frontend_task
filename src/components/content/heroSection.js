import ArrowIcon from "../icons/arrowIcon";
import Header from "../header";
import styles from '../../app/helper.module.css'

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
      <Header />
      {/* Product Feature Tags: Display core selling points */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap rounded-sm p-1 pt-6 max-w-[55%] mx-auto mb-8 relative max-md:max-w-[90%] max-md:pt-4 max-sm:max-w-full max-sm:gap-2 max-sm:mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/15 to-[#191924] from-10% via-15% to-85% via-85% to-transparent rounded-sm pointer-events-none" />
        {PRODUCT_TAGS.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center justify-center h-7 px-3 mr-2 bg-[#2E2E38] text-white rounded-md border border-white/8 text-sm font-medium leading-7 whitespace-nowrap relative z-10 max-sm:h-6 max-sm:px-2 max-sm:text-xs max-sm:leading-6"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Main Title Part 1: Enterprise Ready Conversation */}
      <div className="p-1.5 max-w-[85%] mx-auto relative max-md:max-w-[95%] mb-2">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/15 to-[#191924] from-5% via-5% to-95% via-95% to-transparent pointer-events-none" />
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight m-0 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent relative z-10 max-md:text-[clamp(2rem,8vw,2.8rem)] max-sm:text-[clamp(1.8rem,10vw,2.5rem)]">
          Enterprise Ready
          <br />
          Conversation
          <br />
        </h1>
      </div>

      {/* Main Title Part 2: Intelligence (separated to achieve different visual effects) */}
      <div className="p-1.5 max-w-[80%] mx-auto relative max-md:max-w-[95%]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/75 to-[#191924] from-15% via-30% to-50% via-70% to-[#191924] via-85% to-transparent pointer-events-none" />
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight m-0 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent relative z-10 max-md:text-[clamp(2rem,8vw,2.8rem)] max-sm:text-[clamp(1.8rem,10vw,2.5rem)]">
          Intelligence.
        </h1>
      </div>

      {/* Product Description: Detailed introduction of product features and value */}
      <div className="relative max-w-2xl mx-auto my-8 max-sm:my-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#191924]/15 to-[#191924] from-5% via-5% to-95% via-95% to-transparent pointer-events-none" />
        <p className="text-[clamp(1rem,2vw,1.25rem)] leading-8 m-0 text-white/90 relative z-10 max-md:text-[clamp(0.9rem,4vw,1.1rem)] max-md:leading-6 max-sm:text-[clamp(0.9rem,4vw,1.1rem)]">
          OI transforms raw customer conversations across any channel into
          precise, actionable insights and automated workflows. Automate root
          cause, cost analytics, coaching, quality and more.
        </p>
      </div>

      {/* CTA Button: Primary call to action */}
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
  );
}
