/**
 * CloseIcon Component
 *
 * A reusable close icon component with warning state support
 */
export default function CloseIcon({ className, showWarning }) {
  return (
    <svg
      className={`${className} ${showWarning ? "stroke-red-400" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
