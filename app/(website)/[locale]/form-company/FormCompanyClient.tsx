"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import Image from "next/image";
import { compressImage } from "@/lib/image-compression";
import { submitForm } from "./actions";

export default function FormCompanyClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Company form submission started");
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const compressedFormData = new FormData();

      // Separate array to handle promises for performance/concurrency
      const uploadPromises: Promise<void>[] = [];

      // Get name prefix for file naming
      const namePrefix = (formData.get('fullname_company') as string) || 'submission';
      const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const getResponseError = async (response: Response, fallback: string) => {
        try {
          const body = await response.json();
          return body?.error ? `${fallback}: ${body.error}` : fallback;
        } catch {
          return fallback;
        }
      };

      for (const [key, value] of formData.entries()) {
        if (value instanceof File && value.size > 0) {
          uploadPromises.push((async () => {
             // 1. Compression (for images)
             const processedFile = value.type.startsWith('image/') ? await compressImage(value) : value;

             // 2. Rename file for better organization
             const ext = value.name.split('.').pop();
             const baseName = value.name.replace(`.${ext}`, '');
             const newName = `${slugify(namePrefix)}_${slugify(key)}_${slugify(baseName)}.${ext}`;
             const fileToUpload = new File([processedFile], newName, { type: processedFile.type });

             // 3. Decide Upload Strategy
             // Use Direct-to-S3 for PDFs or any file over 4MB
             const isLargeFile = fileToUpload.size > 4 * 1024 * 1024;
             const isPDF = fileToUpload.type === 'application/pdf';

             if (isLargeFile || isPDF) {
                console.log(`Using Direct-to-S3 for ${fileToUpload.name}...`);
                // Get Presigned URL
                const signRes = await fetch(`/api/upload/presigned?filename=${encodeURIComponent(fileToUpload.name)}&type=${encodeURIComponent(fileToUpload.type)}`);
                if (!signRes.ok) throw new Error(await getResponseError(signRes, `Failed to get upload link for ${fileToUpload.name}`));
                const { url, key: s3Key } = await signRes.json();

                // Upload to S3
                const s3Res = await fetch(url, {
                  method: 'PUT',
                  body: fileToUpload,
                  headers: { 'Content-Type': fileToUpload.type }
                });
                if (!s3Res.ok) throw new Error(`Failed to upload ${fileToUpload.name} to S3`);

                // Register with Payload
                const regData = new FormData();
                regData.append('s3Key', s3Key);
                regData.append('filename', fileToUpload.name);
                regData.append('filesize', fileToUpload.size.toString());
                regData.append('filetype', fileToUpload.type);

                const regRes = await fetch('/api/upload', {
                  method: 'POST',
                  body: regData,
                });
                if (!regRes.ok) throw new Error(await getResponseError(regRes, `Failed to register ${fileToUpload.name} in CMS`));
                const { id } = await regRes.json();
                compressedFormData.append(key, id);
             } else {
                console.log(`Using Standard Upload for ${fileToUpload.name}...`);
                const uploadData = new FormData();
                uploadData.append('file', fileToUpload);

                const uploadRes = await fetch('/api/upload', {
                  method: 'POST',
                  body: uploadData,
                });

                if (!uploadRes.ok) throw new Error(await getResponseError(uploadRes, `Failed to upload ${fileToUpload.name}`));

                const { id } = await uploadRes.json();
                compressedFormData.append(key, id);
             }
          })());
        } else {
          compressedFormData.append(key, value);
        }
      }

      await Promise.all(uploadPromises);

      console.log("Calling submitForm server action for company...");
      const result = await submitForm(compressedFormData);
      console.log("Server action result:", result);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Form berhasil terkirim. Harap menunggu informasi lebih lanjut melalui Admin.",
        });
        form.reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: "Gagal mengirim form: " + (result.error || "Terjadi kesalahan tidak dikenal"),
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Terjadi kesalahan koneksi. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        <title>
          Laksana Business Park - Solusi Gudang & Properti Strategis
        </title>
        {/* Background Video (fixed) */}
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src="/images/bg-produk.png"
            alt="Background Image"
            width={1400}
            height={400}
          />
          {/* Gradient overlay from top to bottom - 50% black to transparent */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          {/* Left-right gradient overlay for additional text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 md:pt-15 lg:pt-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left side - Title and description */}
            <div className="lg:flex-1 fade-in-up mb-[10%] mt-[10%] justify-center text-center">
              <h1 className="text-4xl md:text-5xl sm:text-4xl font-medium tracking-tight text-white mb-4 leading-[0.95] brand-font">
                <span className="text-white bg-clip-text">FORM INPUT - COMPANY</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 sm:p-12">
        <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg sm:p-10">
          <Image
            src="https://d2ml0yc0mb1c0r.cloudfront.net/utj.jpg"
            alt="Form Illustration"
            width={960}
            height={540}
            className="mb-8 w-full rounded-lg sm:mb-12"
          />
          <form onSubmit={handleAction} method="post" encType="multipart/form-data">
            {/* Title and Description */}
            <div className="mb-8 text-center">
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Tolong isi semua kolom yang diperlukan yang di tandai dengan tanda bintang <span className="text-red-500">*</span>. Pastikan semua informasi yang diberikan akurat dan dokumen yang diunggah valid untuk mempercepat proses pengajuan UTJ Anda.
              </p>
            </div>
            {/* Personal Information */}
            <div className="mb-6">
              <label
                htmlFor="fullname"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama Lengkap (Sales)<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="employee-id"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ID Karyawan (Optional)
              </label>
              <input
                type="text"
                name="employee_id"
                id="employee_id"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="fullname_company"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama Lengkap (Perusahaan)<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullname_company"
                id="fullname_company"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone_company"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nomor Telefon Perusahaan<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="phone_company"
                id="phone_company"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone_direksi"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nomor Telefon Direksi / Komisaris<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="phone_direksi"
                id="phone_direksi"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label
                htmlFor="alamat_company"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Alamat Perusahaan <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat_company"
                id="alamat_company"
                rows={3}
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                defaultValue={""}
                required
              />
            </div>



            <div className="mb-6">
              <label
                htmlFor="expense-date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Tanggal UTJ<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="expense_date"
                id="expense_date"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="leads"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Customer Leads<span className="text-red-500">*</span>
              </label>
              <select
                name="customer_leads"
                id="customer_leads"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              >
                <option value="walk-in">Walk In Customer</option>
                <option value="social-media">Social Media / Qontak</option>
                <option value="website">Website</option>
                <option value="personal">Customer Pribadi</option>
                <option value="open-table">Open Table</option>

              </select>
            </div>

            <div className="mb-8 mt-16">
              <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
                Dokumen Penting Yang Harus Dilengkapi
              </h2>
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <label
                htmlFor="ktp-kitas"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Upload KTP / NPWP / Paspor(Jika WNA) - Direksi/Komisaris<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="ktp_kitas"
                id="ktp_kitas"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <label
                htmlFor="nib"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Upload NIB Berbasis Resiko<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="nib"
                id="nib"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <label
                htmlFor="akta-perusahaan"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Upload Akta Pendirian/Perubahan Perusahaan<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="akta_perusahaan"
                id="akta_perusahaan"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <label
                htmlFor="surat-penyataan"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
              Surat pernyataan yang menerangkan bahwa akta pendirian & akta perubahan yang diserahkan adalah akta terakhir.<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="surat_pernyataan"
                id="surat_pernyataan"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

             <div className="mb-6">
              <label
                htmlFor="surat-persetujuan"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Surat Persetujuan Dewan Komisaris (Optional)
              </label>
              <input
                type="file"
                name="surat_persetujuan"
                id="surat_persetujuan"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

             <div className="mb-6">
              <label
                htmlFor="booking-form"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Booking Form  (Optional)
              </label>
              <input
                type="file"
                name="booking_form"
                id="booking_form"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="dokumen_tambahan"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Dokumen Tambahan (Optional)
              </label>
              <input
                type="file"
                name="dokumen_tambahan"
                id="dokumen_tambahan"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label
                htmlFor="catatan-tambahan"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Catatan Tambahan (Optional)
              </label>
              <textarea
                name="catatan_tambahan"
                id="catatan_tambahan"
                rows={3}
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                defaultValue={""}
              />
            </div>
            {/* Declaration / Consent */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="declaration"
                name="declaration"
                className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
              <label htmlFor="declaration" className="ml-2 text-sm text-gray-600">
                {" "}
                Dengan ini saya menyatakan bahwa informasi di atas adalah benar dan dokumen yang dilampirkan valid.{" "}
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative z-30 w-full rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition duration-300 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Mengirim Data...' : 'Submit Data UTJ Sekarang'}
            </button>
            <div aria-live="polite" className="mt-4 min-h-12">
              {submitStatus && (
                <p
                  className={`rounded-md border px-4 py-3 text-sm ${
                    submitStatus.type === "success"
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
