"use client";
import Image from 'next/image';
import { useState, useRef, useEffect, useMemo } from 'react';

export default function FacilitySection() {
  // Array of facility data
  const facilities = useMemo(() => [
    {
      icon: '/luxima/images/facilities/one_gate_system.png',
      title: [
        'Dilengkapi Teknologi',
        'One Gate System'
      ],
      description: [
        'Sistem satu pintu untuk keamanan',
        'dan efisiensi operasional'
      ]
    },
    {
      icon: '/luxima/images/facilities/cctv_dan_keamanan.png',
      title: [
        'CCTV + Keamanan',
        '24 Jam'
      ],
      description: [
        'Sistem keamanan 24 jam dengan',
        'CCTV dan petugas keamanan'
      ]
    },
    {
      icon: '/luxima/images/facilities/ketersediaan_porter_bongkar_muat.png',
      title: [
        'Ketersediaan Porter',
        'Bongkar Muat'
      ],
      description: [
        'Layanan porter bongkar muat',
        'memastikan proses logistik lancar'
      ]
    },
    {
      icon: '/luxima/images/facilities/akses_jalan_lebar_dan_leluasa.png',
      title: [
        'Akses Jalan Luas',
        'dan Mobilitas Nyaman'
      ],
      description: [
        'Meningkatkan produktivitas operasional',
        'logistik Anda dengan jalan ROW 16'
      ]
    },
  ], []);

  // Create random sparkle positions for each facility card
  const generateSparkles = (count: number) => {
    return Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 1.5,
      duration: 1.5 + Math.random() * 1
    }));
  };

  // Track which cards have active sparkle animations
  const [finishingSparkles, setFinishingSparkles] = useState<number[]>([]);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Handle mouse leave to allow animation to finish
  const handleMouseLeave = (index: number) => {
    if (!finishingSparkles.includes(index)) {
      setFinishingSparkles(prev => [...prev, index]);

      if (timeoutRefs.current[index]) {
        clearTimeout(timeoutRefs.current[index]);
      }

      const timeout = setTimeout(() => {
        setFinishingSparkles(prev => prev.filter(i => i !== index));
      }, 2500);

      timeoutRefs.current[index] = timeout;
    }
  };

  // Initialize with empty sparkles for server rendering
  const [facilitySparkles, setFacilitySparkles] = useState<Array<Array<{
    top: string;
    left: string;
    size: number;
    delay: number;
    duration: number;
  }>>>([]);

  // Generate sparkles only on client-side to avoid hydration mismatch
  useEffect(() => {
    const sparkles = facilities.map(() => generateSparkles(15));
    setFacilitySparkles(sparkles);
  }, [facilities]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/luxima/images/banner_2-optimized.webp"
          alt="Facility Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-luxima-gold leading-[125%]">Fasilitas</span>
          </h2>
          <p className="text-white font-light max-w-2xl mx-auto leading-[125%]">
          Luxima BizHub menyediakan berbagai fasilitas modern untuk mendukung kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="facility-card bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center transition-all duration-300 hover:scale-105 border border-luxima-gold/30 hover:border-luxima-gold"
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Sparkle elements - only render on client side after hydration */}
              {facilitySparkles[index]?.map((sparkle, i) => (
                <span
                  key={`sparkle-${i}`}
                  className={`sparkle-effect ${finishingSparkles.includes(index) ? 'sparkle-finishing' : ''}`}
                  style={{
                    top: sparkle.top,
                    left: sparkle.left,
                    width: `${sparkle.size}px`,
                    height: `${sparkle.size}px`,
                    animationDelay: `${sparkle.delay}s`,
                    animationDuration: `${sparkle.duration}s`
                  }}
                />
              ))}

              <div className="mb-2 mx-auto w-28 h-28 md:w-32 md:h-32 relative">
                <Image
                  src={facility.icon}
                  alt={facility.title.join(' ')}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <ul className="list-none">
                {facility.title.map((line, i) => (
                  <li key={`title-${i}`} className="text-luxima-gold font-bold text-base md:text-lg lg:text-xl leading-[150%] px-1">
                    {line}
                  </li>
                ))}
                <li className="h-2"></li>
                {facility.description.map((line, i) => (
                  <li key={`desc-${i}`} className="text-white text-xs md:text-sm font-light leading-[160%]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
