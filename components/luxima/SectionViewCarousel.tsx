"use client";
import Image from 'next/image';
import { useState, useEffect, useRef, TouchEvent, MouseEvent } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function SectionViewCarousel() {
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

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSectionIndex((prevIndex) =>
        prevIndex === sectionImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [sectionImages.length, autoplay]);

  const goToSlide = (index: number): void => {
    let newIndex = index;
    if (newIndex < 0) newIndex = sectionImages.length - 1;
    if (newIndex >= sectionImages.length) newIndex = 0;
    setCurrentSectionIndex(newIndex);
  };

  const handleDotClick = (index: number): void => {
    setCurrentSectionIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const handleArrowClick = (direction: 'prev' | 'next'): void => {
    const newIndex = direction === 'next'
      ? (currentSectionIndex + 1) % sectionImages.length
      : (currentSectionIndex - 1 + sectionImages.length) % sectionImages.length;

    setCurrentSectionIndex(newIndex);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const handleTouchStart = (e: TouchEvent): void => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setAutoplay(false);
  };

  const handleTouchEnd = (e: TouchEvent): void => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToSlide(currentSectionIndex + 1);
      } else {
        goToSlide(currentSectionIndex - 1);
      }
    }

    setIsDragging(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const handleMouseDown = (e: MouseEvent): void => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoplay(false);
  };

  const handleMouseUp = (e: MouseEvent): void => {
    if (!isDragging) return;

    const endX = e.clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToSlide(currentSectionIndex + 1);
      } else {
        goToSlide(currentSectionIndex - 1);
      }
    }

    setIsDragging(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const handleMouseLeave = (): void => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => setAutoplay(true), 5000);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-luxima-gold">
      <div className="container mx-auto px-6 py-16">
        <div className="relative h-[420px] md:h-[650px] lg:h-[550px] rounded-lg overflow-hidden">
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
                    pointerEvents: 'none',
                  }}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
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

        {/* Dot navigation */}
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
