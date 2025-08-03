/**
 * Hover Info Display Component
 *
 * Features:
 * - Shows user avatar along with a message bubble
 * - Allows customizable positioning
 * - Fully styled with animation effects
 */

/**
 * Hover Information Display Component
 * Displays user avatar and conversation bubble when user hovers over grid points
 * @param {Object} avatarData - User data containing avatar, name, message
 * @param {Object} position - Display position containing x, y coordinates
 * @param {Function} onClose - Close callback function (currently unused)
 */

import Image from "next/image";

function HoverInfoAvatar({ avatarData, position, onClose }) {
  if (!avatarData || !avatarData.avatar) return null;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full -mt-2.5 z-[1000] pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {/* Avatar Container */}
      <div className="flex justify-center mb-2">
        <Image
          src={avatarData.avatar}
          alt={avatarData.name}
          width={60}
          height={60}
          className="rounded-full border-3 border-[#665FEE]"
        />
      </div>
      {/* Message Bubble */}
      <div className="relative bg-[rgba(37, 37, 47, 1)] rounded-xl px-4 py-3 min-w-[200px] max-w-[250px] border border-[rgba(102,95,238,0.3)] backdrop-blur-md">
        {/* Message Dot */}
        <div className="w-2 h-2 bg-[#ff4757] rounded-full inline-block mr-2 align-middle"></div>
        {/* Message Text */}
        <span className="text-[#A8A4F6] text-sm leading-relaxed font-sans">
          {avatarData.message}
        </span>
        {/* Arrow pointing to the dot */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-[rgba(45,45,51,0.9)]"></div>
      </div>
    </div>
  );
}

export default HoverInfoAvatar;
