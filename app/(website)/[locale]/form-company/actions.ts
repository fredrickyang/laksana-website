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
    
    const allKeys = Array.from(formData.keys());
    const uniqueKeys = Array.from(new Set(allKeys));

    for (const key of uniqueKeys) {
      const values = formData.getAll(key);
      
      for (const value of values) {
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
        } else if (value !== '') {
          if (key === 'declaration') {
            data[key] = value === 'on';
          } else if (key === 'dokumen_tambahan' || (typeof value === 'string' && value.match(/^[0-9a-fA-F-]{24,36}$/))) {
             // If it's a known multi-value field or looks like an ID, treat as relation
             if (key === 'dokumen_tambahan') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
             } else {
                data[key] = value;
             }
          } else {
            data[key] = value;
          }
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
