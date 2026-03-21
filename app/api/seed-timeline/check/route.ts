import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function GET() {
    try {
        const payload = await getPayload({ config });
        const aboutPageId = await payload.findGlobal({ slug: 'about-page', locale: 'id', depth: 2 });
        const aboutPageEn = await payload.findGlobal({ slug: 'about-page', locale: 'zh', depth: 2 });
        return NextResponse.json({ id: aboutPageId.timeline, en: aboutPageEn.timeline });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
