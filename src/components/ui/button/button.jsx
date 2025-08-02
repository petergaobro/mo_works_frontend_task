'use client';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = "",
  disabled = false,
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = "font-medium transition-all duration-200 flex items-center justify-center space-x-2";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-purple-500",
    white: "bg-white text-black hover:bg-gray-100",
    outline: "border border-gray-600 hover:bg-gray-800 text-white",
    ghost: "hover:bg-gray-800 text-white"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const widthClasses = fullWidth ? "w-full" : "";
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${widthClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 