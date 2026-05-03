"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function BizHubSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-luxima-blue leading-[125%]">Luxima</span> 
              <span className="text-luxima-gold block mt-2 leading-[125%]">BizHub</span>
            </h2>
            
            <p className="mb-6 leading-[125%]">
              Luxima BizHub is a modern business complex that offers a variety of office spaces and commercial areas designed to meet the needs of businesses of all sizes. With state-of-the-art facilities and a strategic location, Luxima BizHub provides the perfect environment for businesses to thrive.
            </p>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-luxima-blue">Key Features:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Flexible office spaces from 50 to 500 sqm</li>
                <li>High-speed internet connectivity</li>
                <li>24/7 security and access control</li>
                <li>Meeting and conference facilities</li>
                <li>Ample parking space</li>
                <li>On-site cafeteria and recreational areas</li>
              </ul>
            </div>
            
            <Link href="/luxima/bizhub" className="inline-block px-6 py-3 bg-luxima-blue text-white font-semibold rounded-lg hover:bg-luxima-gold transition duration-300">
              Explore BizHub
            </Link>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/images/bizhub.png" 
                alt="Luxima BizHub"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 