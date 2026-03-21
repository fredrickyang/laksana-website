import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'

const locales = ['id', 'en', 'zh'] as const

const journeyData = [
    {
        year: "2010",
        title: "Agung Intiland didirikan",
        description: "Dimulai perusahaan kami dengan visi untuk menjadi pelopor dalam industri properti pergudangan, mengutamakan inovasi dan keberlanjutan dalam setiap proyek yang kami jalankan.",
        imagePath: "./public/images/timeline/tl-1.jpg"
    },
    {
        year: "2015",
        title: "Pembangunan Proyek Perdana",
        description: "Laksana Business Park Tahap 1 dibangun, menandai tonggak penting dalam perjalanan kami. Proyek ini menampilkan desain modern dan fasilitas ramah lingkungan yang menetapkan standar baru untuk pergudangan di kawasan ini.",
        imagePath: "./public/images/timeline/tl-2.jpg"
    },
    {
        year: "2017",
        title: "Pembangunan Infrastruktur & Fasilitas Komersial",
        description: "Pembangunan infrastruktur pendukung seperti jalan akses utama, sistem drainase tertutup, dan fasilitas komersial untuk mendukung kebutuhan operasional tenant kami.",
        imagePath: "./public/images/timeline/tl-3.jpg"
    },
    {
        year: "2019",
        title: "Pembangunan Laksana Business Park Tahap 2",
        description: "Pengembangan Laksana Business Park Tahap 2 dengan penambahan area kawasan, seiring bertambahnya permintaan pasar terhadap fasilitas pergudangan modern dan terintegrasi.",
        imagePath: "./public/images/timeline/tl-4.jpg"
    },
    {
        year: "2022",
        title: "Peluncuran Pasar Laksana Business Park Tahap 2",
        description: "Peresmian peluncuran Laksana Business Park Tahap 2, menandai ekspansi besar-besaran dengan fasilitas yang lebih canggih, area kawasan yang luas, dan row jalan lebar untuk mendukung operasional tenant kami.",
        imagePath: "./public/images/timeline/tl-5.jpg"
    },
    {
        year: "2025",
        title: "Peluncuran Luxima Bizhub, Gudang dengan konsep 4 in 1",
        description: "Peluncuran Luxima Bizhub, gudang dengan konsep 4 in 1 yang mengintegrasikan fungsi pergudangan, kantor, ruko, dan fasilitas pendukung lainnya dalam satu kawasan terpadu untuk memenuhi kebutuhan bisnis modern.",
        imagePath: "./public/images/timeline/tl-6.jpg"
    }
];

async function seedTimeline() {
    console.log('🌱 Seeding timeline data...');
    const payload = await getPayload({ config })

    const timelineWithMedia = [];

    // Upload images
    for (const item of journeyData) {
        let mediaId = null;

        const absolutePath = path.resolve(process.cwd(), item.imagePath);
        if (fs.existsSync(absolutePath)) {
            try {
                // Check if media already exists by filename
                const filename = path.basename(absolutePath);
                console.log(`Checking if media ${filename} exists...`);
                const existing = await payload.find({
                    collection: 'media',
                    where: { filename: { equals: filename } },
                });

                if (existing.totalDocs > 0) {
                    console.log(`Media ${filename} already exists, using existing ID.`);
                    mediaId = existing.docs[0].id;
                } else {
                    console.log(`Uploading ${filename}...`);
                    const buffer = fs.readFileSync(absolutePath);
                    const size = fs.statSync(absolutePath).size;
                    const fileObj = {
                        data: buffer,
                        mimetype: 'image/jpeg',
                        name: filename,
                        size: size,
                    };
                    
                    const media = await payload.create({
                        collection: 'media',
                        data: { alt: item.title },
                        file: fileObj,
                    });
                    mediaId = media.id;
                    console.log(`Uploaded media with ID ${mediaId}`);
                }
            } catch (err: any) {
                console.error(`Error uploading image ${item.imagePath}:`, err.message);
            }
        } else {
            console.warn(`Warning: Image not found at ${absolutePath}`);
        }

        timelineWithMedia.push({
            year: item.year,
            title: item.title,
            description: item.description,
            image: mediaId,
        });
    }

    console.log('Updating About Page Global...');

    // Since we only have Indonesian text for this array from defaultJourneyData,
    // we will apply it to all locales so there is no fallback issue.
    for (const locale of locales) {
        try {
            console.log(`Updating for locale: ${locale}`);
            // Fetch current data to preserve other fields
            const currentAboutPage = await payload.findGlobal({ slug: 'about-page', locale, depth: 0 });
            
            await payload.updateGlobal({
                slug: 'about-page',
                locale,
                data: {
                    ...currentAboutPage,
                    timelineHeading: "Perjalanan Kami",
                    timelineSubheading: "Tonggak sejarah penting dalam perjalanan Laksana Business Park",
                    timeline: timelineWithMedia,
                },
            });
            console.log(`Successfully updated timeline for locale ${locale}`);
        } catch (err: any) {
            console.error(`Failed to update About Page for locale ${locale}:`, err.message);
        }
    }

    console.log('🎉 Timeline seed complete!');
    process.exit(0);
}

seedTimeline().catch(err => {
    console.error('Fatal error in seedTimeline:', err);
    process.exit(1);
});
