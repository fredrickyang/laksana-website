import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add non-localized fields to home_page table
  await db.execute(sql`ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "project_section_cta_link" varchar;`)
  await db.execute(sql`ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "article_section_cta_link" varchar;`)

  // Add localized fields to home_page_locales table
  await db.execute(sql`ALTER TABLE "home_page_locales" ADD COLUMN IF NOT EXISTS "project_section_headline" varchar;`)
  await db.execute(sql`ALTER TABLE "home_page_locales" ADD COLUMN IF NOT EXISTS "project_section_cta_label" varchar;`)
  await db.execute(sql`ALTER TABLE "home_page_locales" ADD COLUMN IF NOT EXISTS "article_section_headline" varchar;`)
  await db.execute(sql`ALTER TABLE "home_page_locales" ADD COLUMN IF NOT EXISTS "article_section_cta_label" varchar;`)
  await db.execute(sql`ALTER TABLE "home_page_locales" ADD COLUMN IF NOT EXISTS "article_section_read_more_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "home_page" DROP COLUMN IF EXISTS "project_section_cta_link";`)
  await db.execute(sql`ALTER TABLE "home_page" DROP COLUMN IF EXISTS "article_section_cta_link";`)
  await db.execute(sql`ALTER TABLE "home_page_locales" DROP COLUMN IF EXISTS "project_section_headline";`)
  await db.execute(sql`ALTER TABLE "home_page_locales" DROP COLUMN IF EXISTS "project_section_cta_label";`)
  await db.execute(sql`ALTER TABLE "home_page_locales" DROP COLUMN IF EXISTS "article_section_headline";`)
  await db.execute(sql`ALTER TABLE "home_page_locales" DROP COLUMN IF EXISTS "article_section_cta_label";`)
  await db.execute(sql`ALTER TABLE "home_page_locales" DROP COLUMN IF EXISTS "article_section_read_more_label";`)
}
