"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-luxima-blue">Proyek</span> 
            <span className="text-luxima-gold"> Unggulan</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Beberapa proyek terbaru yang telah kami kerjakan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/project-mall.jpg" 
                alt="Mall Grand Indonesia"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-luxima-blue">Mall Grand Indonesia</h3>
              <p className="text-gray-600 mb-4">Instalasi pencahayaan untuk area publik dan toko retail</p>
              <Link href="/proyek/1" className="text-luxima-gold font-semibold hover:text-luxima-blue transition duration-300">
                Lihat Detail →
              </Link>
            </div>
          </div>
          
          {/* Project Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/project-hotel.jpg" 
                alt="Hotel Mulia Senayan"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-luxima-blue">Hotel Mulia Senayan</h3>
              <p className="text-gray-600 mb-4">Solusi pencahayaan untuk lobi, kamar, dan fasilitas hotel</p>
              <Link href="/proyek/2" className="text-luxima-gold font-semibold hover:text-luxima-blue transition duration-300">
                Lihat Detail →
              </Link>
            </div>
          </div>
          
          {/* Project Card 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/project-residential.jpg" 
                alt="Perumahan Green Ville"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-luxima-blue">Perumahan Green Ville</h3>
              <p className="text-gray-600 mb-4">Proyek pencahayaan eksterior dan interior untuk komplek perumahan</p>
              <Link href="/proyek/3" className="text-luxima-gold font-semibold hover:text-luxima-blue transition duration-300">
                Lihat Detail →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/proyek" className="inline-block px-8 py-3 bg-luxima-blue text-white font-semibold rounded-lg hover:bg-luxima-gold transition duration-300">
            Lihat Semua Proyek
          </Link>
        </div>
      </div>
    </section>
  );
}