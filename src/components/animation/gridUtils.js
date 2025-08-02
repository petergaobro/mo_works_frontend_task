
export function getDeviceType() {
  // Default to desktop during server-side rendering
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Mobile: width less than or equal to 768px
  if (width <= 768) {
    return 'mobile';
  }
  
  // 1440px specific size: specific resolution range for design restoration
  if (width >= 1440 && width <= 1480 && height >= 780 && height <= 850) {
    return 'desktop1440';
  }
  
  // General desktop: all other cases
  return 'desktop';
}
