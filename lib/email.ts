import nodemailer from 'nodemailer'

interface FormData {
    name: string
    email: string
    phone: string
    domicile?: string
    buildingSize?: string
    serviceType?: string
    message?: string
}

const buildingSizeLabels: Record<string, string> = {
    small: '500 m2',
    medium: '1000 m2',
    large: 'Lebih dari 1000 m2',
}

const serviceTypeLabels: Record<string, string> = {
    full: 'Beli Gudang Baru',
    legal: 'Beli Kavling Baru',
    consult: 'Jual Kavling / Gudang Laksana',
}

export async function sendFormNotification(to: string, formData: FormData): Promise<boolean> {
    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('Email sending skipped: SMTP not configured')
        return false
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    const buildingSizeText = formData.buildingSize
        ? buildingSizeLabels[formData.buildingSize] || formData.buildingSize
        : '-'

    const serviceTypeText = formData.serviceType
        ? serviceTypeLabels[formData.serviceType] || formData.serviceType
        : '-'

    const htmlContent = `
        <h2>Form Submission Baru dari Website Laksana</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 40%;">Nama Lengkap</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.name}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.email}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Nomor Telepon</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.phone}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Domisili</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.domicile || '-'}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Kebutuhan Luas Bangunan</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${buildingSizeText}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Pilihan Layanan</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${serviceTypeText}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Pesan</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.message || '-'}</td>
            </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Email ini dikirim secara otomatis dari form kontak website Laksana Business Park.
        </p>
    `

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject: `[Laksana] Form Submission Baru dari ${formData.name}`,
            html: htmlContent,
            replyTo: formData.email,
        })
        console.log('Email notification sent successfully to:', to)
        return true
    } catch (error) {
        console.error('Failed to send email notification:', error)
        return false
    }
}
