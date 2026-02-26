"use client";
import React from 'react';

interface SpecificationItem {
  label: string;
  value: string;
}

export default function SpecificationSection() {
  // Specifications
  const allSpecs: SpecificationItem[] = [
    { label: 'Pondasi', value: 'Tiang Pancang' },
    { label: 'Lantai 1', value: 'Cor Beton' },
    { label: 'Lantai 2', value: 'Keramik 60x60' },
    { label: 'Dinding', value: 'Bata Merah Finish Cat Dulux Setara' },
    { label: 'Struktur', value: 'Baja WF' },
    { label: 'Pintu & Kusen', value: 'Rolling Door Otomatis' },
    { label: 'Rangka Atap', value: 'Rangka Baja' },
    { label: 'Penutup Atap', value: 'UPVC 2 Layer' },
    { label: 'Sanitair', value: 'Toto Setara' },
    { label: 'Kunci & Handle', value: 'Import Setara' },
    { label: 'Internet', value: 'Fiber Optic' },
    { label: 'Air', value: 'PDAM' },
    { label: 'Listrik', value: 'PLN 4.400 VA' },
    { label: 'Saluran Air', value: 'Tertutup' },
    { label: 'Infra Jaringan Listrik', value: 'Underground' },
  ];

  // Check if specifications count is odd
  const isOddCount = allSpecs.length % 2 !== 0;

  // Copy array to avoid modifying original
  const specsToProcess = [...allSpecs];

  // If odd, take the last item and remove it from specsToProcess
  let lastSpec: SpecificationItem | null = null;
  if (isOddCount) {
    lastSpec = specsToProcess.pop() || null;
  }

  // Split specifications into two columns
  const midPoint = Math.ceil(specsToProcess.length / 2);
  const leftColumnSpecs = specsToProcess.slice(0, midPoint);
  const rightColumnSpecs = specsToProcess.slice(midPoint);

  // Create rows by zipping left and right columns
  const rows = leftColumnSpecs.map((leftSpec, index) => {
    return {
      left: leftSpec,
      right: rightColumnSpecs[index] || null
    };
  });

  return (
    <section id="specification" className="py-8 md:py-16 px-2 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 text-luxima-blue">
          Spesifikasi
        </h2>

        {/* Two-column layout on all screen sizes */}
        <div className="w-full md:w-5/6 lg:w-4/5 mx-auto">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row space-x-2 md:space-x-6 lg:space-x-8 mb-2 md:mb-4">
              {/* Left Column Item */}
              <div className="flex flex-col text-center p-1 md:p-2 w-1/2 border-b-gray-300 border-b-2">
                <div className="font-semibold text-xs md:text-base lg:text-lg mb-1">
                  {row.left.label}
                </div>
                <div className="bg-luxima-gold text-[#775A02] py-1 md:p-2.5 text-center font-bold text-xs md:text-sm lg:text-base h-full flex items-center justify-center">
                  {row.left.value}
                </div>
              </div>

              {/* Right Column Item */}
              {row.right && (
                <div className="flex flex-col text-center p-1 md:p-2 w-1/2 border-b-gray-300 border-b-2">
                  <div className="font-semibold text-xs md:text-base lg:text-lg mb-1">
                    {row.right.label}
                  </div>
                  <div className="bg-luxima-gold text-[#775A02] py-1 md:p-2.5 text-center font-bold text-xs md:text-sm lg:text-base h-full flex items-center justify-center">
                    {row.right.value}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Center the last item if count is odd */}
          {lastSpec && (
            <div className="mx-auto w-1/2 text-center px-1 md:px-4 mt-2 md:mt-4">
              <div className="pb-1 md:pb-2 flex flex-col border-b-gray-300 border-b-2">
                <div className="font-semibold text-xs md:text-base lg:text-lg mb-1">
                  {lastSpec.label}
                </div>
                <div className="bg-luxima-gold text-[#775A02] py-1 md:p-2.5 text-center font-bold text-xs md:text-sm lg:text-base flex items-center justify-center">
                  {lastSpec.value}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
