import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Products } from './payload/collections/Products'
import { Phases } from './payload/collections/Phases'
import { Articles } from './payload/collections/Articles'
import { Categories } from './payload/collections/Categories'
import { FormSubmissions } from './payload/collections/FormSubmissions'
import { FormCompanySubmissions } from './payload/collections/FormCompanySubmissions'
import { FormPersonalSubmissions } from './payload/collections/FormPersonalSubmissions'
import { FormAttachments } from './payload/collections/FormAttachments'

import { Settings } from './payload/globals/Settings'
import { HomePage } from './payload/globals/HomePage'
import { AboutPage } from './payload/globals/AboutPage'
import { FacilitiesPage } from './payload/globals/FacilitiesPage'
import { PrivacyPolicyPage } from './payload/globals/PrivacyPolicyPage'
import { TermsConditionsPage } from './payload/globals/TermsConditionsPage'
import { ArticlePage } from './payload/globals/ArticlePage'
import { ProductPage } from './payload/globals/ProductPage'
import { SocialPage } from './payload/globals/SocialPage'
import { importExportPlugin } from '@payloadcms/plugin-import-export'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: [
      {
        label: 'Indonesia',
        code: 'id',
      },
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Chinese',
        code: 'zh',
      },
    ],
    defaultLocale: 'id',
    fallback: true,
  },
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: './payload/components/Logo#Logo',
        Icon: './payload/components/Icon#Icon',
      },
      beforeDashboard: ['./payload/components/S3UsageWidget'],
    },
  },
  collections: [Users, Media, Products, Phases, Articles, Categories, FormSubmissions, FormCompanySubmissions, FormPersonalSubmissions, FormAttachments],
  globals: [Settings, HomePage, AboutPage, FacilitiesPage, PrivacyPolicyPage, TermsConditionsPage, ArticlePage, ProductPage, SocialPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  sharp,
  plugins: [
    importExportPlugin({
      collections: [
        {
          slug: 'form-submissions',
        },
      ],
    }),
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => {
            const baseUrl = process.env.NEXT_PUBLIC_S3_URL || `https://d2ml0yc0mb1c0r.cloudfront.net`
            return `${baseUrl}/${prefix ? prefix + '/' : ''}${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
        ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT } : {}),
      },
    }),
  ],
})
