export default function Footer() {
  return (
    <footer className="w-full justify-between mt-10 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
      <div className="container mx-auto">
        <div className="px-6 py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Brand */}
            <div className="lg:w-1/3 space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/logo.svg"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                  alt="Abstract"
                />
              </div>
              <p className="text-sm text-neutral-500 max-w-sm text-justify">
                Kawasan industri dan komersial terintegrasi di Tangerang Utara, dikembangkan oleh
                PT. Agung Intiland dengan fasilitas modern dan lokasi strategis.
              </p>
              <div className="flex items-center gap-3 text-neutral-500 mb-8">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:x"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z"
                      className=""
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:linkedin"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
                      className=""
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:github"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      className=""
                    />
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
                      Cerita Kami
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
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Tenan
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
                      Berita
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
                      href="#"
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
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      info@laksanabusinesspark.id
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
