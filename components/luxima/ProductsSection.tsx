"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { WHATSAPP_CONTACT } from '@/constants/contacts';

// Define interface for product data
interface Product {
  id: string;
  name: string;
  type: string;
  dimensions: string;
  landArea: string;
  buildingArea: string;
  description: string;
  image: string;
  head_image: string;
  images: string[]; // Array of images for carousel
}

export default function ProductsSection() {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  // Video modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoModalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }

    // Handle escape key press
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    }

    // Add event listeners
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  // Open modal with selected product
  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0); // Reset carousel to first image
    setIsModalOpen(true);
  };

  // Carousel navigation functions
  const goToSlide = (index: number): void => {
    if (!selectedProduct) return;

    let newIndex = index;
    if (newIndex < 0) newIndex = selectedProduct.images.length - 1;
    if (newIndex >= selectedProduct.images.length) newIndex = 0;
    setCurrentImageIndex(newIndex);
  };

  const handleDotClick = (index: number): void => {
    setCurrentImageIndex(index);
  };

  const handleArrowClick = (direction: 'prev' | 'next'): void => {
    if (!selectedProduct) return;

    const newIndex = direction === 'next'
      ? (currentImageIndex + 1) % selectedProduct.images.length
      : (currentImageIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length;

    setCurrentImageIndex(newIndex);
  };

  // Touch event handlers for carousel
  const handleTouchStart = (e: React.TouchEvent): void => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent): void => {
    if (!isDragging || !selectedProduct) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToSlide(currentImageIndex + 1);
      } else {
        goToSlide(currentImageIndex - 1);
      }
    }

    setIsDragging(false);
  };

  // Mouse event handlers for carousel
  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent): void => {
    if (!isDragging || !selectedProduct) return;

    const endX = e.clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToSlide(currentImageIndex + 1);
      } else {
        goToSlide(currentImageIndex - 1);
      }
    }

    setIsDragging(false);
  };

  const handleMouseLeave = (): void => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Map product id to video path
  const productVideoMap: Record<string, string> = {
    maxima: '/luxima/images/luxima-products/Maxima/ROOM TOUR_TIPE MAXIMA.mp4',
    nexima: '/luxima/images/luxima-products/Nexima/ROOM TOUR_TIPE NEXIMA.mp4',
    'nexima-plus': '/luxima/images/luxima-products/Nexima/ROOM TOUR_TIPE NEXIMA.mp4',
    opxima: '/luxima/images/luxima-products/Opxima/ROOM TOUR_TIPE OPXIMA.mp4',
  };

  // Handle click outside for video modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (videoModalRef.current && !videoModalRef.current.contains(event.target as Node)) {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
      }
    }
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
      }
    }
    if (isVideoModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isVideoModalOpen]);

  // Open video modal for product
  const openProductVideo = (product: Product) => {
    const videoPath = productVideoMap[product.id];
    if (videoPath) {
      setSelectedVideo(videoPath);
      setIsVideoModalOpen(true);
    }
  };

  // Product data for the four warehouse unit types
  const products: Product[] = [
    {
      id: 'opxima',
      name: 'Opxima',
      type: 'Tipe 6',
      dimensions: '6 × 24 m',
      landArea: '144 m²',
      buildingArea: '126 m²',
      description: 'Area gudang, ideal untuk bisnis berkembang.',
      image: '/luxima/images/luxima-products/Opxima/Opxima denah.JPG',
      head_image: '/luxima/images/luxima-products/Opxima/1x1.png',
      images: [
        '/luxima/images/luxima-products/Opxima/Opxima denah.JPG',
        '/luxima/images/luxima-products/Opxima/Opxima Facade-optimized.webp',
        '/luxima/images/GATE-optimized.webp',
        '/luxima/images/INTERSECTION-optimized.webp',
        '/luxima/images/ROW 12-optimized.webp',
      ],
    },
    {
      id: 'nexima',
      name: 'Nexima',
      type: 'Tipe 8',
      dimensions: '8 × 24 m',
      landArea: '192 m²',
      buildingArea: '168 m²',
      description: 'Area gudang, ideal untuk bisnis berkembang.',
      image: '/luxima/images/luxima-products/Nexima/Nexima denah.JPG',
      head_image: '/luxima/images/luxima-products/Nexima/1x1.png',
      images: [
        '/luxima/images/luxima-products/Nexima/Nexima denah.JPG',
        '/luxima/images/luxima-products/Nexima/Nexima Facade-optimized.webp',
        '/luxima/images/GATE-optimized.webp',
        '/luxima/images/INTERSECTION-optimized.webp',
        '/luxima/images/ROW 12-optimized.webp',
      ],
    },
    {
      id: 'nexima-plus',
      name: 'Nexima +',
      type: 'Tipe 8',
      dimensions: '8 × 30 m',
      landArea: '240 m²',
      buildingArea: '216 m²',
      description: 'Area gudang, cocok untuk pemilik usaha besar.',
      image: '/luxima/images/luxima-products/Nexima Plus/Nexima Plus denah.JPG',
      head_image: '/luxima/images/luxima-products/Nexima Plus/1x1.png',
      images: [
        '/luxima/images/luxima-products/Nexima Plus/Nexima Plus denah.JPG',
        '/luxima/images/luxima-products/Nexima Plus/Nexima Plus Facade-optimized.webp',
        '/luxima/images/GATE-optimized.webp',
        '/luxima/images/INTERSECTION-optimized.webp',
        '/luxima/images/ROW 12-optimized.webp',
      ],
    },
    {
      id: 'maxima',
      name: 'Maxima',
      type: 'Tipe 12',
      dimensions: '12 × 30 m',
      landArea: '360 m²',
      buildingArea: '324 m²',
      description: 'Area gudang, cocok untuk semua pemilik usaha.',
      image: '/luxima/images/luxima-products/Maxima/Maxima denah.JPG',
      head_image: '/luxima/images/luxima-products/Maxima/1x1.png',
      images: [
        '/luxima/images/luxima-products/Maxima/Maxima denah.JPG',
        '/luxima/images/luxima-products/Maxima/Maxima Facade-optimized.webp',
        '/luxima/images/GATE-optimized.webp',
        '/luxima/images/INTERSECTION-optimized.webp',
        '/luxima/images/ROW 12-optimized.webp',
      ],
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-luxima-gold mb-3 md:mb-4">Tipe Unit</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-4xl shadow-[2px_2px_8px_2px_rgba(0,_0,_0,_0.25)] overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col"
            >


              <div
                className="relative h-60 md:min-h-72 cursor-pointer overflow-hidden group"
                onClick={() => openProductDetails(product)}
              >
                <Image
                  src={product.head_image}
                  alt={`${product.name} unit gudang`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  priority
                />
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-luxima-blue">{product.name}</h3>
                    <p className="text-sm md:text-base text-gray-600 font-medium">{product.type}</p>
                  </div>
                  <div className=" text-luxima-gold font-bold py-1 px-2 md:px-3 rounded-full text-xs md:text-sm whitespace-nowrap">
                    {product.dimensions}
                  </div>
                </div>


                <div className="mt-auto">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
                      <span className="block text-gray-500 text-xs">Luas Tanah</span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">{product.landArea}</span>
                    </div>
                    <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
                      <span className="block text-gray-500 text-xs">Luas Bangunan</span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">{product.buildingArea}</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2 pt-3 md:pt-4 border-t border-gray-200">
                    <button
                    onClick={() => openProductVideo(product)}
                    className="flex flex-1 items-center justify-center hover:cursor-pointer bg-white text-luxima-blue border-luxima-blue border-2 hover:bg-luxima-gold hover:text-white rounded-md py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium transition-all duration-300"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => openProductDetails(product)}
                      className="flex flex-1 bg-luxima-blue items-center justify-center hover:cursor-pointer hover:bg-white hover:text-luxima-gold  border-2 border-luxima-gold text-white bg-luxima-gold py-1.5 md:py-2 px-3 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all duration-300"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm overflow-y-auto">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-center p-4 md:p-6 border-b sticky top-0 bg-white z-10">
              <h3 id="modal-title" className="text-xl md:text-2xl font-bold text-luxima-blue flex flex-col md:flex-row md:items-center">
                {selectedProduct.name}
                <span className="md:ml-2 text-gray-600 text-base md:text-lg">- {selectedProduct.type}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-gray-50 rounded-xl p-3 md:p-4">
                  <div className="relative h-[250px] md:h-[350px] mb-4">
                    <div
                      ref={carouselRef}
                      className="h-full w-full relative cursor-grab active:cursor-grabbing"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                    >
                      {selectedProduct.images.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${selectedProduct.name} unit gudang - gambar ${index + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={index === 0}
                            className="object-contain w-full h-full"
                            style={{ pointerEvents: 'none' }}
                          />
                        </div>
                      ))}

                      {/* Navigation arrows */}
                      {selectedProduct.images.length > 1 && (
                        <>
                          <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 text-luxima-blue cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            onClick={() => handleArrowClick('prev')}
                            aria-label="Lihat gambar sebelumnya"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>

                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 text-luxima-blue cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            onClick={() => handleArrowClick('next')}
                            aria-label="Lihat gambar berikutnya"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Dot indicators for carousel */}
                  {selectedProduct.images.length > 1 && (
                    <div className="flex justify-center mt-2 mb-3 space-x-2">
                      {selectedProduct.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleDotClick(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex
                              ? 'bg-luxima-blue'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Lihat gambar ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  <Link href={WHATSAPP_CONTACT.WHATSAPP_URL}>
                  <div className="bg-luxima-blue text-white p-3 md:p-4 rounded-lg mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl md:text-2xl font-bold">
                      Get Your Best Offer Now!
                      </span>
                    </div>
                    <div className="text-xs text-blue-100 text-right mt-1 animate-pulse">(Click disini)</div>
                  </div>
                  </Link>
                </div>

                <div>
                  <div className="mb-6 md:mb-8">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-luxima-blue flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Spesifikasi
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <span className="text-gray-500 text-xs md:text-sm block mb-1">Dimensi</span>
                        <span className="font-bold text-gray-800 text-base md:text-lg">{selectedProduct.dimensions}</span>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <span className="text-gray-500 text-xs md:text-sm block mb-1">Luas Tanah</span>
                        <span className="font-bold text-gray-800 text-base md:text-lg">{selectedProduct.landArea}</span>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <span className="text-gray-500 text-xs md:text-sm block mb-1">Luas Bangunan</span>
                        <span className="font-bold text-gray-800 text-base md:text-lg">{selectedProduct.buildingArea}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-luxima-blue flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Deskripsi
                    </h4>
                    <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                      <p className="text-gray-700 text-sm md:text-base">{selectedProduct.description}</p>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-luxima-blue flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                      </svg>
                      Fitur Lainnya
                    </h4>
                    <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm md:text-base">Lantai Mezzanine</span>
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm md:text-base">Kantor</span>
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm md:text-base">Toilet</span>
                        </li>
                        <li className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm md:text-base">Parkir Depan</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 flex justify-end border-t pt-4 md:pt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 md:py-2 px-4 md:px-5 rounded-md text-xs md:text-sm font-medium transition-colors duration-300 mr-3"
                >
                  Tutup
                </button>
                <Link
                  href={WHATSAPP_CONTACT.WHATSAPP_SHORT_URL}
                  className="bg-luxima-gold hover:bg-luxima-gold-hover text-white py-1.5 md:py-2 px-4 md:px-5 rounded-md text-xs md:text-sm font-medium transition-colors duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Review Modal */}
      {isVideoModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm overflow-y-auto">
          <div
            ref={videoModalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col items-center justify-center p-4 md:p-8 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <button
              onClick={() => { setIsVideoModalOpen(false); setSelectedVideo(null); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 id="video-modal-title" className="text-xl md:text-2xl font-bold text-luxima-blue mb-4">Room Tour Video</h3>
            <video
              src={selectedVideo}
              controls
              preload="none"
              className="w-full h-auto rounded-lg border border-gray-200 bg-black max-h-[60vh]"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
