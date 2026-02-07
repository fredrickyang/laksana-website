import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendFormNotification } from '@/lib/email'

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

        // Fetch notification email from Settings
        const settings = await payload.findGlobal({
            slug: 'settings',
        })

        const notificationEmail = settings?.contactInformation?.formNotificationEmail

        // Send email notification if configured
        if (notificationEmail) {
            await sendFormNotification(notificationEmail, {
                name,
                email,
                phone,
                domicile,
                buildingSize,
                serviceType,
                message,
            })
        }

        return NextResponse.json({ success: true, message: 'Form submitted successfully' })
    } catch (error) {
        console.error('Form submission error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to submit form' },
            { status: 500 }
        )
    }
}
