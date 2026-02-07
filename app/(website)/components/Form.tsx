"use client";
import React, { useState } from 'react';

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      domicile: formData.get('domicile') as string,
      buildingSize: formData.get('budget') as string,
      serviceType: formData.get('timeline') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Terjadi kesalahan, silakan coba lagi.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Gagal mengirim form. Periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 border-t border-neutral-200 bg-white relative z-10"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 tracking-tighter mb-4">
            Konsultasi Gratis Dengan Tim Kami
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm font-light">
            Lihat Unit yang tersedia, Buat janji dengan tim kami.
          </p>
        </div>
        <div className="relative p-[1px] bg-gradient-to-b from-neutral-200 to-neutral-300 shadow-sm">
          <form
            id="projectForm"
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 bg-neutral-50 p-6 sm:p-8 rounded-[1px]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="">
                <label className="block text-[10px] uppercase text-neutral-500 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full input-base border border-neutral-400 px-3 py-3 text-sm"
                  placeholder="Nama Lengkap"
                />
              </div>
              <div className="">
                <label className="block text-[10px] uppercase text-neutral-500 mb-1.5">
                  Email Anda
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full input-base px-3 py-3 text-sm border border-neutral-400"
                  placeholder="email@contoh-email.com"
                />
              </div>
              <div className="">
                <label className="block text-[10px] uppercase text-neutral-500 mb-1.5">
                  Nomor Telfon
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  className="w-full input-base border border-neutral-400 px-3 py-3 text-sm"
                  placeholder="0812XXXXX"
                />
              </div>
              <div className="">
                <label className="block text-[10px] uppercase text-neutral-500 mb-1.5">
                  Domisili
                </label>
                <input
                  type="text"
                  name="domicile"
                  required
                  className="w-full input-base border border-neutral-400 px-3 py-3 text-sm"
                  placeholder="Contoh: Jakarta Utara"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="">
                <label className="block text-[10px] uppercase text-neutral-500 mb-1.5">
                  Kebutuhan Luas Bangunan
                </label>
                <select
                  name="budget"
                  required
                  className="w-full input-base px-3 py-3 border border-neutral-400 text-sm text-neutral-600"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilihan
                  </option>
                  <option value="small">500 m2</option>
                  <option value="medium">1000 m2</option>
                  <option value="large">Lebih dari 1000 m2</option>
                </select>
              </div>
              <div className="">
                <label className="block text-[10px] uppercase text-neutral-500 mb-1.5">
                  Pilihan Layanan
                </label>
                <select
                  name="timeline"
                  required
                  className="w-full input-base px-3 py-3 border border-neutral-400 text-sm text-neutral-600"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilihan
                  </option>
                  <option value="full">Beli Gudang Baru</option>
                  <option value="legal">Beli Kavling Baru</option>
                  <option value="consult">Jual Kavling / Gudang Laksana</option>
                </select>
              </div>
            </div>
            <div className="">
              <label className="block text-[10px] uppercase text-neutral-500 mb-1.5">
                Pesan Tambahan
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full input-base px-3 py-3 border border-neutral-400 text-sm"
                placeholder="Buat janji dengan tim kami untuk konsultasi gratis. Lihat Unit yang tersedia, Isi tanggal visit dengan tim kami."
                defaultValue={""}
              />
            </div>
            <div className="p-[1px] bg-gradient-to-b from-neutral-700 to-neutral-900 shadow-sm mt-4">
              <button
                type="submit"
                id="submitBtn"
                disabled={isLoading}
                className="w-full bg-neutral-900 text-white py-4 text-xs font-semibold tracking-wide hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    MENGIRIM...
                  </>
                ) : (
                  <>
                    KIRIM PESAN
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14m-7-7l7 7l-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
            {status === 'success' && (
              <div className="text-center text-sm mt-4 text-green-600 font-medium">
                ✓ Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.
              </div>
            )}
            {status === 'error' && (
              <div className="text-center text-sm mt-4 text-red-600 font-medium">
                ✗ {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>

  );
}
