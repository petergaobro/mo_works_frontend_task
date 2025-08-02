'use client';
import Button from "../ui/button";

const Header = () => {
  const menuItems = [
    { label: 'Homepage', href: '/' },
    { label: 'About us', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact Us', href: '/contact' }
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
          <div className="flex items-center space-x-4">
            <Button variant="white" size="md">
              <span>Book a demo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 