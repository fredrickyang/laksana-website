import Link from 'next/link';

export const LuximaCard = () => {

 return (
    <>
    {/* Luxima Project Card */}
    <div className="mt-8 flex flex-col items-center bg-white rounded-md shadow-lg p-6 max-w-md w-full border border-luxima-gold">
    <div className="flex items-center gap-3 mb-2">
    <Link href="/luxima" className="cursor-pointer hover:opacity-80 transition-opacity">
      <img src="/luxima/favicon/logo-cropped.png" alt="Luxima Logo" className="w-10 h-10 object-contain" />
    </Link>
    <span className="text-lg font-semibold text-luxima-gold">Luxima</span>
    </div>
    <p className="text-gray-800 mb-4 text-center">
    Luxima adalah gudang multiguna modern di Laksana Business Park, menawarkan fasilitas terbaik untuk kebutuhan logistik dan bisnis Anda.
    </p>
    <a
    href="/luxima"
    className="inline-block bg-luxima-gold text-white font-medium px-5 py-2 rounded hover:bg-luxima-gold/90 transition-colors shadow"
    >
    Lihat Detail Luxima
    </a>
    </div>
    </>
    )
}
