'use server';

import { getPayloadClient } from '@/lib/payload'

async function uploadFile(payload: any, file: File, prefix: string, fieldName: string) {
  if (!file || file.size === 0 || file.name === 'undefined') return null;
  const arrayBuffer = await file.arrayBuffer();
  if (arrayBuffer.byteLength === 0) return null;
  
  const buffer = Buffer.from(arrayBuffer);
  
  // Slugify prefix and fieldName
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  const ext = file.name.split('.').pop();
  const baseName = file.name.replace(`.${ext}`, '');
  const newName = `${slugify(prefix)}_${slugify(fieldName)}_${slugify(baseName)}.${ext}`;
  
  const doc = await payload.create({
    collection: 'form-attachments',
    data: { alt: newName },
    file: {
      data: buffer,
      name: newName,
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

    // Get name prefix for safety (though renaming is handled on frontend)
    const namePrefix = formData.get('fullname_company') as string || 'submission';

    for (const key of uniqueKeys) {
      const values = formData.getAll(key);
      
      for (const value of values) {
        if (value instanceof File) {
          if (value.size > 0 && value.name !== 'undefined') {
            const docId = await uploadFile(payload, value, namePrefix, key);
            if (docId) {
              if (key === 'dokumen_tambahan') {
                if (!data[key]) data[key] = [];
                data[key].push(docId);
              } else {
                data[key] = docId;
              }
            }
          }
        } else if (value !== '' && value !== null && value !== undefined) {
          if (key === 'declaration') {
            data[key] = value === 'on' || value === 'true';
          } else if (key === 'dokumen_tambahan') {
            if (!data[key]) data[key] = [];
            data[key].push(value);
          } else {
            // For all other fields (text, IDs, etc)
            // Attempt to cast to number if it looks like a database ID (integer)
            if (typeof value === 'string' && /^\d+$/.test(value) && key !== 'phone_company' && key !== 'phone_direksi' && key !== 'employee_id') {
              data[key] = parseInt(value, 10);
            } else {
              data[key] = value;
            }
          }
        }
      }
    }

    const collection = 'form-company-submissions';

    console.log(`Submitting to ${collection}:`, JSON.stringify(data, null, 2));

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
