/**
 * ArrowIcon Component
 *
 * A reusable arrow icon component with customizable size and styling
 */
export default function ArrowIcon({ className, width = 16, height = 16 }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1L15 8L8 15M15 8H1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
