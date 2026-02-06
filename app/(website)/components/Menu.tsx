'use client';
import {
  useEffect,
  useState
} from 'react';

interface MenuProps {
  settings?: any;
}

export default function Menu({ settings }: MenuProps) {
  const [language, setLanguage] = useState('ID');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: 'ID', label: 'Bahasa Indonesia' },
    { code: 'EN', label: 'English' },
    { code: 'CN', label: '中文' }
  ];

  // Extract navigation from settings or use defaults
  const navigation = settings?.navigation?.length > 0
    ? settings.navigation.map((item: any) => ({
        href: item.link || '/',
        label: item.label || 'Link',
      }))
    : [
        { href: '/', label: 'Home' },
        { href: '/product', label: 'Produk' },
        { href: '/our-company', label: 'Tentang Kami' },
        { href: '/facilities', label: 'Fasilitas' },
        { href: '/article', label: 'Artikel' },
      ];

  // Extract contact info from settings or use defaults
  const contactInfo = settings?.contactInformation || {};
  const phoneNumbers = contactInfo.phoneNumbers || [
    { label: 'Kantor', number: '(021) 588 6000' },
    { label: 'WhatsApp', number: '0818 588 6000' },
  ];
  const email = contactInfo.email || 'info@laksanabusinesspark.id';

  // Extract addresses from richText or use defaults
  const getAddressText = (richText: any, fallback: string[]) => {
    if (!richText?.root?.children) return fallback;
    return richText.root.children.map((p: any) =>
      p.children?.map((c: any) => c.text).join('') || ''
    ).filter(Boolean);
  };

  const headOfficeAddress = getAddressText(contactInfo.headOfficeAddress, [
    'Jl. Pantai Indah Selatan No.9',
    'Blok DC, RT.9/RW.6, Kapuk',
    'Muara, Penjaringan, North Jakarta 14460',
  ]);

  const marketingOfficeAddress = getAddressText(contactInfo.marketingOfficeAddress, [
    'Jl. Raya Kali Baru, Laksana,',
    'Kecamatan Paku Haji,',
    'Kabupaten Tangerang, Banten 15570',
  ]);

  useEffect(() => {
    // Initialize Lucide icons if available
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const body = document.body;

    function openMenu() {
      menuOverlay?.classList.remove('translate-x-full');
      menuOverlay?.classList.add('menu-open');
      body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menuOverlay?.classList.add('translate-x-full');
      menuOverlay?.classList.remove('menu-open');
      body.style.overflow = '';
    }
    menuToggle?.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    // Navigation Scroll Effect (Smart Nav)
    const nav = document.getElementById('main-nav');
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        nav?.classList.remove('nav-hidden', 'nav-visible');
        nav?.classList.add('nav-top');
      } else if (currentScrollY > lastScrollY) {
        nav?.classList.add('nav-hidden');
        nav?.classList.remove('nav-visible', 'nav-top');
      } else {
        nav?.classList.remove('nav-hidden', 'nav-top');
        nav?.classList.add('nav-visible');
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      menuToggle?.removeEventListener('click', openMenu);
      menuClose?.removeEventListener('click', closeMenu);
      menuLinks.forEach(link => {
        link.removeEventListener('click', closeMenu);
      });
    };
  }, []);

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };
  return (<>
      {/* GLOBAL NAVIGATION (Smart Nav) */}
      <nav
        className="fixed z-50 md:px-12 flex w-full pt-6 pr-6 pb-6 pl-6 top-0 left-0 items-center justify-between nav-top"
        id="main-nav"
      >
        {/* Brand / Logo */}
        <a href="/" className="flex items-center gap-3 group z-50 relative">
          <img
            src="/images/logo/logo.svg"
            alt="Laksana Logo"
            className="group-hover:opacity-90 transition-opacity duration-300 h-8 sm:h-10 md:h-12 lg:h-9 w-auto object-contain invert brightness-0"
          />
        </a>

        {/* Right Side: CTA & Mobile Trigger */}
        <div className="flex items-center gap-6 z-50">
          <a
            href="/our-company#contact"
            className="hidden md:flex items-center gap-2 bg-brand hover:bg-sand hover:text-white px-6 py-3 text-xs tracking-[0.15em] font-medium uppercase transition-all duration-300 shadow-lg text-black z-10 border border-transparent"
          >
            <span className="font-sans relative z-10">Konsultasi Gratis</span>
          </a>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="group cursor-pointer flex items-center justify-center w-12 h-12 border border-white/20 hover:bg-[#1d2088] hover:border-brand backdrop-blur-sm transition-all duration-300 focus:outline-none text-white"
            >
              <span className="text-sm font-semibold">{language}</span>
            </button>

            {/* Language Dropdown */}
            {isLanguageOpen && (
              <div className="absolute top-full mt-2 right-0 bg-navy border border-white/20 backdrop-blur-sm z-50 min-w-max overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full px-4 py-3 text-left text-sm transition-all duration-300 font-sans ${
                      language === lang.code
                        ? 'bg-black text-white text-bold cursor-pointer'
                        : 'text-white/70 hover:bg-[#1d2088] hover:text-white cursor-pointer'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Burger Trigger */}
          <button
            id="menu-toggle"
            className="group cursor-pointer flex flex-col items-center justify-center gap-[5px] w-12 h-12 border border-white/20 hover:bg-[#1d2088] hover:border-brand backdrop-blur-sm transition-all duration-300 focus:outline-none text-white"
          >
            <span className="h-[2px] w-5 transition-all duration-300 group-hover:bg-white bg-current"></span>
            <span className="h-[2px] w-5 transition-all duration-300 group-hover:bg-white bg-current"></span>
            <span className="h-[2px] w-5 transition-all duration-300 group-hover:bg-white bg-current"></span>
          </button>
        </div>
      </nav>

      {/* MODERN FULLSCREEN MENU OVERLAY */}
      <div
        id="menu-overlay"
        className="fixed inset-0 z-[60] transition-transform duration-[800ms] cubic-bezier(0.76, 0, 0.24, 1) flex flex-col bg-navy translate-x-full"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-22 pointer-events-none"></div>

        {/* Close Button Area */}
        <div className="w-full flex justify-end p-6 md:p-12 z-10">
          <button
            id="menu-close"
            className="group cursor-pointer flex items-center gap-3 transition-colors text-white/60"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-normal">
              Close
            </span>
            <div className="relative w-10 h-10 flex items-center justify-center border group-hover:border-sand transition-all duration-300 group-hover:rotate-90 group-hover:bg-[#1d2088] border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="x"
                className="lucide lucide-x w-5 h-5 text-white group-hover:text-sand stroke-[1.5]"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </div>
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 flex flex-col md:flex-row px-6 md:px-12 pb-12 gap-12 overflow-y-auto z-10">
          {/* Left: Links List */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center">
            <nav className="flex flex-col gap-2 menu-hover-dim" id="mobile-nav-list">
              {navigation.map((item: any, idx: number) => (
                <div key={idx} className="menu-link-wrapper overflow-hidden cursor-pointer group">
                  <a
                    href={item.href}
                    className={`menu-item delay-${idx * 20} block text-3xl md:text-5xl lg:text-6xl tracking-tight menu-link group-hover:text-brand font-normal text-white leading-tight pb-2`}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </nav>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col justify-end gap-12 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-12 border-white/10">
            <div className="menu-item delay-500">
              <h1 className="text-2xl uppercase tracking-[0.2em] text-white font-sans font-normal">
                Hubungi Kami
              </h1>
            </div>
            <div className="menu-item delay-500">
              <h3 className="text-xs uppercase tracking-[0.2em] text-brand mb-4 font-sans font-normal">
                Kontak
              </h3>
              <p className="text-base leading-relaxed font-sans font-normal text-white/70">
                {phoneNumbers.map((phone: any, idx: number) => (
                  <span key={idx}>
                    {phone.number}
                    {idx < phoneNumbers.length - 1 && <br />}
                  </span>
                ))}
                <br />
                {email}
              </p>
            </div>
            <div className="menu-item delay-500">
              <h3 className="text-xs uppercase tracking-[0.2em] text-brand mb-4 font-sans font-normal">
                Kantor Pusat
              </h3>
              <p className="text-base leading-relaxed font-sans font-normal text-white/70">
                {headOfficeAddress.map((line: string, idx: number) => (
                  <span key={idx}>
                    {line}
                    {idx < headOfficeAddress.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="menu-item delay-500">
              <h3 className="text-xs uppercase tracking-[0.2em] text-brand mb-4 font-sans font-normal">
                Kantor Pemasaran
              </h3>
              <p className="text-base leading-relaxed font-sans font-normal text-white/70">
                {marketingOfficeAddress.map((line: string, idx: number) => (
                  <span key={idx}>
                    {line}
                    {idx < marketingOfficeAddress.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="menu-item delay-500">
              <a
                href="#"
                className="block w-full py-4 border text-center uppercase text-sm tracking-[0.2em] hover:bg-sand hover:border-sand hover:text-white transition-all duration-300 font-sans font-normal bg-white border-white/10 text-black"
              >
                Download e-Brochure
              </a>
            </div>
          </div>
        </div>
      </div>
    </>);
}
