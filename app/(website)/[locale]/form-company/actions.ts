'use server';

import { getPayloadClient } from '@/lib/payload'

async function uploadFile(payload: any, file: File) {
  if (!file || file.size === 0 || file.name === 'undefined') return null;
  const arrayBuffer = await file.arrayBuffer();
  if (arrayBuffer.byteLength === 0) return null;
  
  const buffer = Buffer.from(arrayBuffer);
  
  const doc = await payload.create({
    collection: 'form-attachments',
    data: { alt: file.name },
    file: {
      data: buffer,
      name: file.name,
      mimetype: file.type || 'application/octet-stream',
      size: file.size,
    }
  });
  return doc.id;
}

export async function submitForm(formData: FormData) {
  try {
    const payload = await getPayloadClient();
    const data: Record<string, any> = {};
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > 0 && value.name !== 'undefined') {
          const docId = await uploadFile(payload, value);
          if (docId) {
            if (key === 'dokumen_tambahan') {
              if (!data[key]) data[key] = [];
              data[key].push(docId);
            } else {
              data[key] = docId;
            }
          }
        }
      } else {
        if (value !== '') {
            data[key] = value;
        }
      }
    }

    const collection = 'form-company-submissions';

    await payload.create({
      collection,
      data,
    });

    console.log(`Successfully created submission in ${collection}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: String(error) };
  }
}
