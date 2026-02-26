"use client";

import Image from 'next/image';
import { WHATSAPP_CONTACT } from '@/constants/contacts';
import { motion } from 'framer-motion';

/**
 * HeroSection component
 * - Displays the main hero section with banner
 */
export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="w-full h-screen max-h-[1080px] min-h-[450px] relative">
        <Image
          src="/luxima/images/banners/banner-desktop.webp"
          alt="Luxima Banner"
          fill
          priority
          className="object-cover hidden md:block"
          sizes="100vw"
        />
        <Image
          src="/luxima/images/banners/banner-mobile.webp"
          alt="Luxima Banner"
          fill
          priority
          className="object-cover block md:hidden"
        />
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-4xl px-6 md:px-16 pt-16 md:pt-24 flex flex-col justify-center h-full z-10 items-start">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
              className="text-4xl md:text-6xl font-black text-luxima-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] tracking-wider mb-6 leading-[1.1]"
            >
              CLUSTER GUDANG INDUSTRI MODERN
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
              className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-5"
            >
              Multifungsi sebagai:
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
              className="mb-5 md:mb-7 space-y-2 md:space-y-3"
            >
              {['Gudang', 'Toko', 'Hunian', 'Kantor'].map((item) => (
                <li key={item} className="flex items-center text-white text-base md:text-xl font-medium">
                  <svg className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {item}
                </li>
              ))}
            </motion.ul>
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 1.1, ease: 'easeInOut' }}
              className="text-white text-base md:text-lg mb-8 md:mb-10 max-w-md"
            >
              Hadir sebagai solusi cerdas untuk mengembangkan bisnis dalam satu lokasi yang efisien, strategis, dan terintegrasi.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.4, ease: 'easeInOut' }}
              href={WHATSAPP_CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-lg shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
            >
              Hubungi Team Kami
            </motion.a>
          </div>
        </div>
        {/* Overlay for readability on mobile */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent md:from-blue-900/70 md:via-blue-900/40 md:to-transparent z-0" />
      </div>
    </section>
  );
}
