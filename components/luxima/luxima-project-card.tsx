import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LuximaProjectCardProps {
  className?: string;
}

export const LuximaProjectCard: React.FC<LuximaProjectCardProps> = ({ className = '' }) => (
  <section className={`flex flex-col items-center bg-white rounded-md shadow-lg p-6 max-w-2xl w-full border border-luxima-gold ${className}`}>
    <div className="flex items-center gap-3 mb-2">
      <Link href="/luxima" className="cursor-pointer hover:opacity-80 transition-opacity">
        <Image src="/luxima/favicon/logo-cropped.png" alt="Luxima Logo" width={40} height={40} className="object-contain" />
      </Link>
      <span className="text-xl font-semibold text-luxima-gold">Luxima</span>
    </div>
    <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
      <div className="flex-1 flex flex-col items-center">
        <Image src="/laksana/3D IMAGE/GUDANG MULTIGUNA/Enscape_2022-08-05-10-21-56.webp" alt="3D Render Gudang Multiguna" width={320} height={180} className="rounded shadow object-cover" />
        <span className="text-xs text-gray-500 mt-1">3D Render Gudang Multiguna</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <Image src="/laksana/3D IMAGE/KAWASAN/Laksana business park - view masterplan.webp" alt="Site Plan Laksana" width={320} height={180} className="rounded shadow object-cover" />
        <span className="text-xs text-gray-500 mt-1">Site Plan Laksana</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 w-full mb-4">
      <div>
        <div className="font-medium text-gray-700">Luas Lahan</div>
        <div className="text-gray-900">± 10 Ha</div>
      </div>
      <div>
        <div className="font-medium text-gray-700">Tipe Unit</div>
        <div className="text-gray-900">Gudang Multiguna, 4 in 1, Ruko</div>
      </div>
      <div>
        <div className="font-medium text-gray-700">Lokasi</div>
        <div className="text-gray-900">Tangerang Utara</div>
      </div>
      <div>
        <div className="font-medium text-gray-700">Status</div>
        <div className="text-gray-900">Tahap 1: Selesai, Tahap 2: Progres</div>
      </div>
    </div>
    <ul className="list-disc pl-5 space-y-1 text-gray-800 mb-4 w-full">
      <li>Akses mudah ke jalan utama dan tol</li>
      <li>Fleksibel untuk kebutuhan logistik, industri, dan komersial</li>
      <li>Keamanan 24 jam dan fasilitas modern</li>
      <li>Lingkungan bisnis yang berkembang</li>
    </ul>
    <Link
      href="/luxima"
      className="inline-block bg-luxima-gold text-white font-medium px-6 py-2 rounded hover:bg-yellow-200 shadow"
    >
      Lihat Detail Luxima
    </Link>
  </section>
); 