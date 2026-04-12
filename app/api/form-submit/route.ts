import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate required fields
        const { name, email, phone, domicile, buildingSize, serviceType, message } = body

        if (!name || !email || !phone) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and phone are required' },
                { status: 400 }
            )
        }

        // Get Payload client
        const payload = await getPayload({ config })

        // Create form submission in CMS
        await payload.create({
            collection: 'form-submissions',
            data: {
                name,
                email,
                phone,
                domicile: domicile || '',
                buildingSize: buildingSize || undefined,
                serviceType: serviceType || undefined,
                message: message || '',
            },
        })



        return NextResponse.json({ success: true, message: 'Form submitted successfully' })
    } catch (error: any) {
        console.error('Full form submission error object:', JSON.stringify(error, null, 2))
        console.error('Error stack trace:', error.stack)
        if (error.data) console.error('Error data:', JSON.stringify(error.data, null, 2))
        
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to submit form',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined 
            },
            { status: 500 }
        )
    }
}
