
  {/* Hero Section with Background Image */}
  <header className="relative min-h-screen flex flex-col justify-center px-6 border-b border-white/5 overflow-hidden">
    {/* Background Image with Parallax feel (fixed) */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
        alt="Luxury Villa"
        className="w-full h-full object-cover opacity-60"
      />
      {/* Heavy gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-[10px] uppercase tracking-widest font-medium text-slate-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Premium Land Acquisition
          </div>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-white mb-8 leading-[0.95] brand-font">
            The art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
              land &amp; leisure.
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl font-light leading-relaxed border-l border-white/20 pl-6 mb-10">
            Electra Estates bridges the gap between investment strategy and
            lifestyle aspirations. We specialize in curating exceptional second
            homes and land parcels in Alibaug and Dubai.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-slate-200 transition-all flex items-center gap-3 group text-sm tracking-wide"
            >
              Start Consultation
              <iconify-icon
                icon="lucide:arrow-right"
                className="group-hover:translate-x-1 transition-transform"
                width={16}
              >
                <template shadowrootmode="open" />
              </iconify-icon>
            </a>
            <a
              href="#locations"
              className="px-8 py-4 border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm font-medium rounded-sm transition-colors text-sm tracking-wide"
            >
              Explore Locations
            </a>
          </div>
        </div>
        {/* Hero Stats */}
        <div
          className="lg:col-span-4 flex flex-col gap-6 lg:items-end pb-2 fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl w-full max-w-xs hover:bg-white/10 transition-colors cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 uppercase tracking-widest">
                Portfolio
              </span>
              <iconify-icon
                icon="lucide:trending-up"
                className="text-emerald-400"
              >
                <template shadowrootmode="open" />
              </iconify-icon>
            </div>
            <div className="text-3xl font-light text-white brand-font">
              $150M+
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Assets under management
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl w-full max-w-xs hover:bg-white/10 transition-colors cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 uppercase tracking-widest">
                Network
              </span>
              <iconify-icon icon="lucide:users" className="text-indigo-400">
                <template shadowrootmode="open" />
              </iconify-icon>
            </div>
            <div className="text-3xl font-light text-white brand-font">
              250+
            </div>
            <div className="text-xs text-slate-500 mt-1">
              HNI Families advised
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

