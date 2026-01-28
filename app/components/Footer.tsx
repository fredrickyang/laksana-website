export default function Footer() {
  return (
    <footer className="w-full justify-between border-t border-neutral-100 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
      <div className="container mx-auto">
        <div className="px-6 py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Brand */}
            <div className="lg:w-1/3 space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/logo.svg"
                  className="h-8 sm:h-10 md:h-10 w-auto object-contain"
                  alt="Abstract"
                />
              </div>
              <p className="text-sm text-neutral-500 max-w-sm text-justify">
                Kawasan industri dan komersial terintegrasi di Tangerang Utara, dikembangkan oleh
                PT. Agung Intiland dengan fasilitas modern dan lokasi strategis.
              </p>
              <div className="flex items-center gap-3 text-neutral-500 mb-8">
                <a
                  href="https://www.instagram.com/laksanabusinesspark.id/"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@laksanabusinesspark"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                    </svg>
                </a>
              </div>
              
              <div className="flex items-center justify-start gap-4 text-neutral-400 mt-10">
                <span className="text-[11px] font-medium text-neutral-400">
                  Developed by
                </span>
                <img
                  src="/images/logo/agung-logo.svg"
                  className="h-7 object-contain"
                  alt="Agung Intiland"
                />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black/75">
                  Perusahaan
                </h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Tentang Kami
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Produk
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Fasilitas
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black/75">
                  Sumber Daya
                </h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Artikel
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Progress Pembangunan
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Unique Selling Point
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black/75">
                  Kontak
                </h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>
                    <div className="flex justify-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 50">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                    <a
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Jl. Pantai Indah Selatan No.9
                      Blok DC, RT.9/RW.6,
                      Kapuk Muara, Penjaringan,
                      North Jakarta 14460
                    </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-start gap-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                    <a
                      href="tel:+62215886000"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      (021) 5886000
                    </a>
                    </div>
                  </li>
                  <li>
                    <div className="absolute flex justify-start gap-3 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                      </svg>
                    <a
                      href="mailto:info@laksanabusinesspark.id"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      contact@agungintiland.com
                    </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Logos + Bottom row */}
          <div className="mt-10 border-t border-neutral-100 pt-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-neutral-400">
              <p>© 2025 PT Bangun Laksana Persada. All rights reserved.</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
