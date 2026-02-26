'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/luxima" className="flex items-center gap-3">
          <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Luxima
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/luxima"
            className={`text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`}
          >
            Home
          </a>
          <a
            href="/luxima#about"
            className={`text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`}
          >
            About
          </a>
          <a
            href="/luxima#products"
            className={`text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`}
          >
            Products
          </a>
          <a
            href="/luxima#facilities"
            className={`text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`}
          >
            Facilities
          </a>
        </nav>
      </div>
    </header>
  );
}
