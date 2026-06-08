"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import Image from "next/image";
import { compressImage } from "@/lib/image-compression";
import { submitForm } from "./actions";

import type { Setting } from "@/payload-types";

export default function FormPersonalClient({ settings }: { settings?: Setting }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [uploadProgress, setUploadProgress] = useState<{
    totalBytes: number;
    uploadedBytes: number;
    percentage: number;
    active: boolean;
  } | null>(null);

  const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submission started");
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setUploadProgress(null);

    // Local Helper to track upload progress using XMLHttpRequest
    const uploadWithProgress = (
      url: string,
      method: string,
      body: any,
      headers: Record<string, string>,
      onProgress: (loaded: number) => void
    ): Promise<Response> => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));
        
        if (xhr.upload) {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              onProgress(event.loaded);
            }
          };
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              ok: true,
              status: xhr.status,
              json: async () => JSON.parse(xhr.responseText),
              text: async () => xhr.responseText,
            } as unknown as Response);
          } else {
            resolve({
              ok: false,
              status: xhr.status,
              json: async () => {
                try { return JSON.parse(xhr.responseText); } catch { return {}; }
              },
              text: async () => xhr.responseText,
            } as unknown as Response);
          }
        };
        xhr.onerror = () => reject(new Error("Network connection error"));
        xhr.send(body);
      });
    };

    try {
      const compressedFormData = new FormData();
      const filesToUpload: { key: string; file: File; isLarge: boolean }[] = [];
      let totalBytes = 0;

      const namePrefix = (formData.get('fullname_customer') as string) || 'submission';
      const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const getResponseError = async (response: Response, fallback: string) => {
        try {
          const body = await response.json();
          return body?.error ? `${fallback}: ${body.error}` : fallback;
        } catch {
          return fallback;
        }
      };

      // First Pass: Compress images and prepare all files to calculate total file size
      for (const [key, value] of formData.entries()) {
        if (value instanceof File && value.size > 0) {
          // 1. Compression (for images)
          const processedFile = value.type.startsWith('image/') ? await compressImage(value) : value;

          // 2. Rename file for better organization
          const ext = value.name.split('.').pop();
          const baseName = value.name.replace(`.${ext}`, '');
          const newName = `${slugify(namePrefix)}_${slugify(key)}_${slugify(baseName)}.${ext}`;
          const fileToUpload = new File([processedFile], newName, { type: processedFile.type });

          const isLarge = fileToUpload.size > 4 * 1024 * 1024;
          filesToUpload.push({ key, file: fileToUpload, isLarge });
          totalBytes += fileToUpload.size;
        } else {
          compressedFormData.append(key, value);
        }
      }

      // Initialize upload progress if files exist
      if (totalBytes > 0) {
        setUploadProgress({
          totalBytes,
          uploadedBytes: 0,
          percentage: 0,
          active: true
        });
      }

      const fileProgresses: Record<string, number> = {};
      const updateProgress = (filename: string, loaded: number) => {
        fileProgresses[filename] = loaded;
        const totalUploaded = Object.values(fileProgresses).reduce((sum, val) => sum + val, 0);
        const percent = Math.min(Math.round((totalUploaded / totalBytes) * 100), 99);
        setUploadProgress({
          totalBytes,
          uploadedBytes: totalUploaded,
          percentage: percent,
          active: true
        });
      };

      // Second Pass: Upload files concurrently with progress tracking
      const uploadPromises = filesToUpload.map(async ({ key, file, isLarge }) => {
        updateProgress(file.name, 0);

        if (isLarge) {
          console.log(`Using Direct-to-S3 for ${file.name}...`);
          // Get Presigned URL
          const signRes = await fetch(`/api/upload/presigned?filename=${encodeURIComponent(file.name)}&type=${encodeURIComponent(file.type)}`);
          if (!signRes.ok) throw new Error(await getResponseError(signRes, `Failed to get upload link for ${file.name}`));
          const { url, key: s3Key } = await signRes.json();

          // Upload to S3
          const s3Res = await uploadWithProgress(
            url,
            'PUT',
            file,
            { 'Content-Type': file.type },
            (loaded) => updateProgress(file.name, loaded)
          );
          if (!s3Res.ok) throw new Error(`Failed to upload ${file.name} to S3`);

          // Register with Payload
          const regData = new FormData();
          regData.append('s3Key', s3Key);
          regData.append('filename', file.name);
          regData.append('filesize', file.size.toString());
          regData.append('filetype', file.type);

          const regRes = await fetch('/api/upload', {
            method: 'POST',
            body: regData,
          });
          if (!regRes.ok) throw new Error(await getResponseError(regRes, `Failed to register ${file.name} in CMS`));
          const { id } = await regRes.json();
          compressedFormData.append(key, id);
        } else {
          console.log(`Using Standard Upload for ${file.name}...`);
          const uploadData = new FormData();
          uploadData.append('file', file);

          const uploadRes = await uploadWithProgress(
            '/api/upload',
            'POST',
            uploadData,
            {},
            (loaded) => updateProgress(file.name, loaded)
          );

          if (!uploadRes.ok) throw new Error(await getResponseError(uploadRes, `Failed to upload ${file.name}`));

          const { id } = await uploadRes.json();
          compressedFormData.append(key, id);
        }

        updateProgress(file.name, file.size);
      });

      await Promise.all(uploadPromises);

      console.log("Calling submitForm server action...");
      const result = await submitForm(compressedFormData);
      console.log("Server action result:", result);

      if (result.success) {
        setUploadProgress(prev => prev ? { ...prev, percentage: 100, uploadedBytes: prev.totalBytes } : null);
        setSubmitStatus({
          type: "success",
          message: "Form berhasil terkirim. Harap menunggu informasi lebih lanjut melalui Admin.",
        });
        form.reset();
        setTimeout(() => setUploadProgress(null), 2500);
      } else {
        setUploadProgress(null);
        setSubmitStatus({
          type: "error",
          message: "Gagal mengirim form: " + (result.error || "Terjadi kesalahan tidak dikenal"),
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setUploadProgress(null);
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
                <span className="text-white bg-clip-text">FORM INPUT - PERORANGAN</span>
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
                htmlFor="fullname_customer"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama Lengkap (Customer)<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullname_customer"
                id="fullname_customer"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone_customer"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nomor Telefon Customer<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="phone_customer"
                id="phone_customer"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label
                htmlFor="alamat_customer"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Alamat Customer <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat_customer"
                id="alamat_customer"
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
                htmlFor="payment-method"
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
                Upload KTP/KITAS<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="ktp_kitas"
                id="ktp_kitas"
                accept=".pdf,.jpg,.jpeg,.png,.zip,.mp4,.mov"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <label
                htmlFor="npwp-pribadi"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Upload NPWP Pribadi<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="npwp_pribadi"
                id="npwp_pribadi"
                accept=".pdf,.jpg,.jpeg,.png,.zip,.mp4,.mov"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <label
                htmlFor="kartu-keluarga"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Upload Kartu Keluarga (Optional)
              </label>
              <input
                type="file"
                name="kartu_keluarga"
                id="kartu_keluarga"
                accept=".pdf,.jpg,.jpeg,.png,.zip,.mp4,.mov"
                className="w-full border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <label
                htmlFor="kartu-keluarga"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
              Upload Akta Kelahiran / Akta Pernikahan (Optional)
              </label>
              <input
                type="file"
                name="akta_kelahiran_pernikahan"
                id="akta_kelahiran_pernikahan"
                accept=".pdf,.jpg,.jpeg,.png,.zip,.mp4,.mov"
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
                accept=".pdf,.jpg,.jpeg,.png,.zip,.mp4,.mov"
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
                accept=".pdf,.jpg,.jpeg,.png,.zip,.mp4,.mov"
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

            {/* Upload Progress Bar */}
            {uploadProgress && uploadProgress.active && (
              <div className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50/50 p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    {uploadProgress.percentage === 100 ? "Menyimpan Data UTJ..." : "Mengunggah Dokumen..."}
                  </span>
                  <span className="text-sm font-bold text-indigo-700">
                    {uploadProgress.percentage}%
                  </span>
                </div>
                
                {/* Progress Bar background */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-100">
                  {/* Animated gradient bar */}
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress.percentage}%` }}
                  />
                </div>
                
                <div className="mt-2 text-right text-xs font-medium text-indigo-500">
                  {(uploadProgress.uploadedBytes / (1024 * 1024)).toFixed(2)} MB dari {(uploadProgress.totalBytes / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative z-30 w-full rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition duration-300 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (uploadProgress && uploadProgress.percentage < 100 ? 'Mengunggah File...' : 'Mengirim Data...') : 'Submit Data UTJ Sekarang'}
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

      <Footer settings={settings} />
    </>
  );
}
