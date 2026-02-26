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
import { Articles } from './payload/collections/Articles'
import { Categories } from './payload/collections/Categories'
import { FormSubmissions } from './payload/collections/FormSubmissions'

import { Settings } from './payload/globals/Settings'
import { HomePage } from './payload/globals/HomePage'
import { AboutPage } from './payload/globals/AboutPage'
import { FacilitiesPage } from './payload/globals/FacilitiesPage'
import { PrivacyPolicyPage } from './payload/globals/PrivacyPolicyPage'
import { TermsConditionsPage } from './payload/globals/TermsConditionsPage'

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
    fallback: false,
  },
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Products, Articles, Categories, FormSubmissions],
  globals: [Settings, HomePage, AboutPage, FacilitiesPage, PrivacyPolicyPage, TermsConditionsPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})
