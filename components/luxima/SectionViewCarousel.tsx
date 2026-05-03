"use client";
import Image from 'next/image';
import { useState, useEffect, useRef, TouchEvent, MouseEvent } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function SectionViewCarousel() {
  // State untuk carousel tampilan bagian
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const sectionImages = [
    '/luxima/images/view_1-optimized.webp',
    '/luxima/images/view_2-optimized.webp',
    '/luxima/images/view_3-optimized.webp',
    '/luxima/images/view_4-optimized.webp',
  ];

  // Efek untuk rotasi gambar tampilan bagian
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSectionIndex((prevIndex) => 
        prevIndex === sectionImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Ganti gambar setiap 3 detik

    return () => clearInterval(interval);
  }, [sectionImages.length, autoplay]);

  // Fungsi untuk navigasi ke slide berikutnya atau sebelumnya
  const goToSlide = (index: number): void => {
    let newIndex = index;
    if (newIndex < 0) newIndex = sectionImages.length - 1;
    if (newIndex >= sectionImages.length) newIndex = 0;
    setCurrentSectionIndex(newIndex);
  };

  // Tangani klik navigasi titik
  const handleDotClick = (index: number): void => {
    setCurrentSectionIndex(index);
    setAutoplay(false); // Hentikan autoplay saat pengguna berinteraksi
    // Mulai ulang autoplay setelah 5 detik tidak ada interaksi
    setTimeout(() => setAutoplay(true), 5000);
  };

  // Tangani klik panah navigasi
  const handleArrowClick = (direction: 'prev' | 'next'): void => {
    const newIndex = direction === 'next' 
      ? (currentSectionIndex + 1) % sectionImages.length
      : (currentSectionIndex - 1 + sectionImages.length) % sectionImages.length;
    
    setCurrentSectionIndex(newIndex);
    setAutoplay(false); // Hentikan autoplay saat pengguna berinteraksi
    // Mulai ulang autoplay setelah 5 detik tidak ada interaksi
    setTimeout(() => setAutoplay(true), 5000);
  };

  // Tangani sentuhan dimulai (touchstart)
  const handleTouchStart = (e: TouchEvent): void => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setAutoplay(false); // Hentikan autoplay saat pengguna berinteraksi
  };

  // Tangani sentuhan berakhir (touchend)
  const handleTouchEnd = (e: TouchEvent): void => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    // Jika perbedaan cukup besar, navigasi ke slide berikutnya/sebelumnya
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe kiri, navigasi ke slide berikutnya
        goToSlide(currentSectionIndex + 1);
      } else {
        // Swipe kanan, navigasi ke slide sebelumnya
        goToSlide(currentSectionIndex - 1);
      }
    }
    
    setIsDragging(false);
    // Mulai ulang autoplay setelah 5 detik tidak ada interaksi
    setTimeout(() => setAutoplay(true), 5000);
  };

  // Tangani mouse down
  const handleMouseDown = (e: MouseEvent): void => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoplay(false); // Hentikan autoplay saat pengguna berinteraksi
  };

  // Tangani mouse up
  const handleMouseUp = (e: MouseEvent): void => {
    if (!isDragging) return;
    
    const endX = e.clientX;
    const diffX = startX - endX;
    
    // Jika perbedaan cukup besar, navigasi ke slide berikutnya/sebelumnya
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Drag kiri, navigasi ke slide berikutnya
        goToSlide(currentSectionIndex + 1);
      } else {
        // Drag kanan, navigasi ke slide sebelumnya
        goToSlide(currentSectionIndex - 1);
      }
    }
    
    setIsDragging(false);
    // Mulai ulang autoplay setelah 5 detik tidak ada interaksi
    setTimeout(() => setAutoplay(true), 5000);
  };

  // Tangani mouse leave
  const handleMouseLeave = (): void => {
    if (isDragging) {
      setIsDragging(false);
      // Mulai ulang autoplay setelah 5 detik tidak ada interaksi
      setTimeout(() => setAutoplay(true), 5000);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-luxima-gold">
      <div className="container mx-auto px-6 py-16">
        {/* Meningkatkan tinggi dan menambahkan wadah rasio aspek untuk tampilan gambar yang lebih baik */}
        <div className="relative h-[420px] md:h-[650px] lg:h-[550px] rounded-lg overflow-hidden">
          {/* Carousel tampilan bagian */}
          <div 
            ref={carouselRef}
            className="h-full w-full relative cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {sectionImages.map((image, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSectionIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image 
                  src={image} 
                  alt={`Tampilan Bagian Luxima ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority={index === 0}
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center',
                    pointerEvents: 'none', // Ini memastikan gambar tidak mengintervensi event drag
                  }}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
          
          {/* Tombol navigasi kiri/kanan */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-luxima-blue cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
            onClick={() => handleArrowClick('prev')}
            aria-label="Lihat gambar sebelumnya"
          >
            <FaChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 text-luxima-blue cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
            onClick={() => handleArrowClick('next')}
            aria-label="Lihat gambar berikutnya"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
        
        {/* Titik navigasi */}
        <div className="flex justify-center mt-6 space-x-3">
          {sectionImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSectionIndex 
                  ? 'bg-luxima-blue' 
                  : 'bg-white hover:bg-gray-300'
              }`}
              aria-label={`Lihat gambar tampilan bagian ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}