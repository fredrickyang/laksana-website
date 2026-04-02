import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { COMPANY_CONTACT } from '@/constants/contacts';

interface FooterProps {
  settings?: any;
}

const Footer = ({ settings }: FooterProps) => {
  const footer = settings?.footer || {};
  const contactInfo = settings?.contactInformation || {};

  const companyDescription = footer.companyDescription ||
    'Laksana Business Park Kawasan industri moderen terbesar di Utara Tangerang, bagian dari Agung Intiland. Pengembangan properti premium dengan fokus pada kualitas, inovasi, dan keberlanjutan.';

  const copyrightText = footer.copyrightText ||
    `© ${new Date().getFullYear()} PT Bangun Laksana Persada. All rights reserved.`;

  const email = contactInfo.email || COMPANY_CONTACT.EMAIL;
  const phone = contactInfo.phoneNumbers?.[0]?.number || COMPANY_CONTACT.PHONE;
  
  // Extract address from richText
  const getAddressText = (richText: any) => {
    if (!richText?.root?.children) return COMPANY_CONTACT.ADDRESS;
    return richText.root.children.map((p: any) =>
      p.children?.map((c: any) => c.text).join('') || ''
    ).filter(Boolean).join(' ');
  };

  const address = getAddressText(contactInfo.headOfficeAddress);

  return (
    <footer className="bg-gray-900 text-white py-12 leading-[125%] font-montserrat">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="md:col-span-5 lg:col-span-6">
            <Link href="/luxima" className="cursor-pointer hover:opacity-80 transition-opacity inline-block">
              <Image
                src="/luxima/images/luxima-logo-white.png"
                alt="Luxima Logo"
                width={150}
                height={150}
                className="h-24 w-auto mb-4"
              />
            </Link>
            <p className="text-gray-400 max-w-lg leading-[125%] text-justify mb-6">
              {companyDescription}
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
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

          {/* Links Section */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-luxima-gold leading-[125%]">Projects</h3>
            <ul className="space-y-3">
              <li><a href="/luxima" className="text-gray-400 hover:text-white transition duration-300 leading-[125%]">Commercial</a></li>
              <li><a href="/luxima" className="text-gray-400 hover:text-white transition duration-300 leading-[125%]">Retail</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-xl font-semibold mb-6 text-luxima-gold leading-[125%]">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 leading-[125%]">{email}</li>
              <li className="text-gray-400 leading-[125%]">{phone}</li>
              <li className="text-gray-400 leading-[125%]">{address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="leading-[125%]">&copy; {new Date().getFullYear()} PT Bangun Laksana Persada. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
