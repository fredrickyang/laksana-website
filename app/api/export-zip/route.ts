import { getPayloadClient } from '@/lib/payload';
import { NextRequest, NextResponse } from 'next/server';
import archiver from 'archiver';
import { PassThrough, Readable } from 'stream';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection');

    if (!collection || !['form-company-submissions', 'form-personal-submissions'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const payload = await getPayloadClient();
    
    // Check authentication using Next.js headers helper
    const { user } = await payload.auth({ headers: await headers() });
    if (!user || !(user.role === 'admin' || user.role === 'legal')) {
      console.warn('Unauthorized export attempt by:', user?.email || 'anonymous');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`Starting export for collection: ${collection}...`);

    // Fetch all submissions
    const submissions = await payload.find({
      collection: collection as any,
      limit: 1000,
      depth: 1, 
    });

    if (submissions.docs.length === 0) {
      return NextResponse.json({ error: 'No data to export' }, { status: 404 });
    }

    const passthrough = new PassThrough();
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.pipe(passthrough);

    const filename = `export_${collection}_${new Date().toISOString().split('T')[0]}.zip`;

    // Process submissions in the background and pipe to passthrough
    (async () => {
      try {
        for (const sub of submissions.docs) {
          const nameField = collection === 'form-company-submissions' ? 'fullname_company' : 'fullname_customer';
          const name = sub[nameField] || 'unknown';
          const date = sub.createdAt ? new Date(sub.createdAt).toISOString().split('T')[0] : 'no-date';
          const folderName = `${date} - ${name}`;

          const fileFields = collection === 'form-company-submissions' 
            ? ['ktp_kitas', 'nib', 'akta_perusahaan', 'surat_pernyataan', 'surat_persetujuan', 'booking_form', 'dokumen_tambahan']
            : ['ktp_kitas', 'npwp_pribadi', 'kartu_keluarga', 'akta_kelahiran_pernikahan', 'booking_form', 'dokumen_tambahan'];

          for (const field of fileFields) {
            const files = Array.isArray(sub[field]) ? sub[field] : sub[field] ? [sub[field]] : [];
            
            for (const fileDoc of files) {
              if (fileDoc && typeof fileDoc === 'object' && fileDoc.filename) {
                const fileUrl = `${process.env.NEXT_PUBLIC_S3_URL}/${fileDoc.filename}`;
                
                try {
                  const fileRes = await fetch(fileUrl);
                  if (fileRes.ok) {
                    const arrayBuffer = await fileRes.arrayBuffer();
                    archive.append(Buffer.from(arrayBuffer), { 
                      name: `${folderName}/${field}/${fileDoc.filename}` 
                    });
                  } else {
                    console.error(`File not found in S3: ${fileUrl}`);
                  }
                } catch (err) {
                  console.error(`Failed to fetch file: ${fileUrl}`, err);
                }
              }
            }
          }
        }
        await archive.finalize();
        console.log('Archive finalized successfully.');
      } catch (err) {
        console.error('Error during archive generation:', err);
        archive.abort();
      } finally {
        // The passthrough will close when archive ends
      }
    })();

    // Convert Node stream to Web stream for NextResponse
    const webStream = Readable.toWeb(passthrough);

    return new NextResponse(webStream as any, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Export API error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
