import { ModernLaksanaLayout } from '@/components/layout/modern-laksana-layout';
import { SVGBackground } from '@/components/ui/svg-background';

export default function LuximaBizhubPage() {
  return (
    <ModernLaksanaLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
          <SVGBackground variant="grid" opacity={0.1} color="white" />
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Luxima BizHub
            </h1>
            <p className="text-xl text-blue-100">
              Pusat bisnis modern untuk pertumbuhan perusahaan Anda
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>Tentang Luxima BizHub</h2>
              <p>
                Luxima BizHub adalah pusat bisnis modern yang dirancang untuk mendukung pertumbuhan dan kesuksesan perusahaan Anda. 
                Dengan lokasi strategis dan fasilitas lengkap, kami menyediakan lingkungan kerja yang optimal untuk bisnis Anda.
              </p>

              <h3>Fasilitas Unggulan</h3>
              <ul>
                <li>Ruang kantor modern dengan desain ergonomis</li>
                <li>Infrastruktur digital yang canggih</li>
                <li>Sistem keamanan 24/7</li>
                <li>Area parkir yang luas</li>
                <li>Fasilitas meeting room</li>
                <li>Koneksi internet berkecepatan tinggi</li>
              </ul>

              <h3>Keunggulan Lokasi</h3>
              <p>
                Berada di lokasi strategis dengan akses mudah ke berbagai fasilitas publik, 
                transportasi, dan pusat bisnis lainnya.
              </p>

              <h3>Hubungi Kami</h3>
              <p>
                Untuk informasi lebih lanjut tentang Luxima BizHub, silakan hubungi tim kami:
              </p>
              <p>
                Email: info@laksanabusinesspark.id<br />
                Telepon: +62 21 555 5555
              </p>
            </div>
          </div>
        </section>
      </div>
    </ModernLaksanaLayout>
  );
}
