import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { COMPANY_CONTACT } from '@/constants/contacts';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 leading-[125%] font-montserrat">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/luxima" className="cursor-pointer hover:opacity-80 transition-opacity inline-block">
              <Image
                src="/luxima/images/luxima-logo-white.png"
                alt="Luxima Logo"
                width={150}
                height={150}
                className="h-24 w-auto mb-4"
              />
            </Link>
            <p className="text-gray-400 max-w-md leading-[125%]">
              Pengembangan properti premium dengan fokus pada kualitas, inovasi, dan keberlanjutan.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.youtube.com/@laksanabusinesspark1393"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-red-600 transition-colors duration-300"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://www.facebook.com/gudanglaksana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/laksanabusinesspark_official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-pink-600 transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@laksana_businesspark"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-400 hover:text-black transition-colors duration-300"
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-luxima-gold leading-[125%]">Projects</h3>
              <ul className="space-y-2">
                <li><a href="/luxima" className="text-gray-400 hover:text-white transition duration-300 leading-[125%]">Commercial</a></li>
                <li><a href="/luxima" className="text-gray-400 hover:text-white transition duration-300 leading-[125%]">Retail</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-luxima-gold leading-[125%]">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 leading-[125%]">{COMPANY_CONTACT.EMAIL}</li>
                <li className="text-gray-400 leading-[125%]">{COMPANY_CONTACT.PHONE}</li>
                <li className="text-gray-400 leading-[125%]">{COMPANY_CONTACT.ADDRESS}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="leading-[125%]">&copy; {new Date().getFullYear()} Luxima. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
