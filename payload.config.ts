import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Products } from './payload/collections/Products'
import { Articles } from './payload/collections/Articles'
import { Categories } from './payload/collections/Categories'

import { Settings } from './payload/globals/Settings'
import { HomePage } from './payload/globals/HomePage'
import { AboutPage } from './payload/globals/AboutPage'
import { FacilitiesPage } from './payload/globals/FacilitiesPage'

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
  },
  collections: [Users, Media, Products, Articles, Categories],
  globals: [Settings, HomePage, AboutPage, FacilitiesPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./laksana.db',
    },
  }),
  sharp,
  plugins: [
    // Add plugins here
  ],
})
