import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/payload';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'id') as 'id' | 'en' | 'zh';

    const settings = await getSettings(locale);
    return NextResponse.json({ navigation: settings?.navigation });
}
