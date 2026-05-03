"use client";
import { useState } from 'react';
import { COMPANY_CONTACT } from '@/constants/contacts';

export default function ContactSection() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    // Show success message (in a real app)
    alert('Terima kasih atas pesan Anda. Kami akan segera menghubungi Anda!');
  };

  return (
    <section className="py-20 bg-white" id="kontak">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-luxima-blue">Hubungi</span> 
            <span className="text-luxima-gold"> Kami</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Tertarik dengan produk atau solusi kami? Silakan hubungi tim kami.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Information */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-bold mb-6 text-luxima-blue">Dapatkan Informasi</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-luxima-gold mb-1">Alamat</h4>
                  <p className="text-gray-700">
                    {COMPANY_CONTACT.ADDRESS}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-luxima-gold mb-1">Kontak</h4>
                  <p className="text-gray-700">
                    Telepon: {COMPANY_CONTACT.PHONE}<br />
                    Email: {COMPANY_CONTACT.EMAIL}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-luxima-gold mb-1">Jam Operasional</h4>
                  <p className="text-gray-700">
                    Senin - Jumat: 08.00 - 17.00<br />
                    Sabtu: 09.00 - 14.00<br />
                    Minggu: Tutup
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nama</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxima-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxima-blue"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxima-blue"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxima-blue"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-luxima-blue text-white font-semibold rounded-lg hover:bg-luxima-gold transition duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}