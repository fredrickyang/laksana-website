"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Header component for the Luxima website
 * Features:
 * - Responsive design with mobile menu
 * - Transparent background that changes on scroll
 * - Smooth transitions
 * - Hamburger icon for mobile menu toggle with animation
 */
const Header = () => {
  const params = useParams();
  const locale = params?.locale as string || 'id';
  
  // State to track scroll position for header styling
  const [scrolled, setScrolled] = useState(false);
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled down
      setScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check - ensure it starts transparent
    setScrolled(window.scrollY > 50);
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`font-montserrat fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/${locale}/luxima`} className="cursor-pointer hover:opacity-80 transition-opacity">
            <Image 
              src={scrolled ? "/luxima/images/luxima-logo.png" : "/luxima/images/luxima-logo-white.png"} 
              alt="Luxima Logo" 
              width={190}
              height={60}
              className="h-20 w-auto"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href={`/${locale}/luxima`} className={`p-2 rounded-xl font-medium hover:text-luxima-gold transition duration-300 leading-[125%] ${scrolled ? 'text-luxima-blue' : 'text-luxima-blue bg-black/10'}`}>Home</Link>
          <Link
            href={`/${locale}`}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-montserrat text-lg font-medium hover:text-luxima-gold transition duration-300 leading-[125%] ${
              scrolled ? 'text-luxima-blue' : 'text-luxima-blue bg-black/10'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Laksana
          </Link>
          {/* <Link href={`/${locale}/luxima/projects`} className={`font-medium hover:text-luxima-gold transition duration-300 leading-[125%] ${scrolled ? 'text-luxima-blue' : 'text-white'}`}>Projects</Link> */}
          {/* <Link href={`/${locale}/luxima/contact`} className={`font-medium hover:text-luxima-gold transition duration-300 leading-[125%] ${scrolled ? 'text-luxima-blue' : 'text-white'}`}>Contact</Link> */}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className={`p-4 leading-[125%] relative ${scrolled ? 'text-luxima-blue' : 'text-luxima-gold'} cursor-pointer`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {/* Close (X) icon - Absolute positioned over hamburger */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                mobileMenuOpen 
                  ? 'opacity-100 transform rotate-0 scale-100' 
                  : 'opacity-0 transform rotate-90 scale-75'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>
            
            {/* Hamburger menu icon */}
            <div 
              className={`flex items-center justify-center transition-all duration-500 ease-in-out ${
                mobileMenuOpen 
                  ? 'opacity-0 transform rotate-90 scale-75' 
                  : 'opacity-100 transform rotate-0 scale-100'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden shadow-lg absolute top-full left-0 right-0 py-4 bg-white z-50"
          >
            <div className="container mx-auto px-6 flex flex-col space-y-4">
              <Link href={`/${locale}/luxima`} onClick={() => setMobileMenuOpen(false)} className="text-luxima-blue font-medium hover:text-luxima-gold transition duration-300 leading-[125%] py-2">Home</Link>
              <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)} className="text-luxima-blue font-medium hover:text-luxima-gold transition duration-300 leading-[125%] py-2 flex items-center gap-2">
                <MoveLeft />Back to Laksana
              </Link>
              {/* <Link href={`/${locale}/luxima/projects`} onClick={() => setMobileMenuOpen(false)} className="text-luxima-blue font-medium hover:text-luxima-gold transition duration-300 leading-[125%] py-2">Projects</Link> */}
              {/* <Link href={`/${locale}/luxima/contact`} onClick={() => setMobileMenuOpen(false)} className="text-luxima-blue font-medium hover:text-luxima-gold transition duration-300 leading-[125%] py-2">Contact</Link> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
 