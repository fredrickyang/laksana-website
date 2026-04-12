import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add missing columns to products_locales if they don't exist
  await db.execute(sql`ALTER TABLE "products_locales" ADD COLUMN IF NOT EXISTS "cta_title" varchar;`)
  await db.execute(sql`ALTER TABLE "products_locales" ADD COLUMN IF NOT EXISTS "cta_description" varchar;`)
  await db.execute(sql`ALTER TABLE "products_locales" ADD COLUMN IF NOT EXISTS "virtual_tour_title" jsonb;`)
  await db.execute(sql`ALTER TABLE "products_locales" ADD COLUMN IF NOT EXISTS "virtual_tour_description" varchar;`)

  // Create products_virtual_tour_reasons table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "products_virtual_tour_reasons" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );
  `)

  // Create products_virtual_tour_reasons_locales table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "products_virtual_tour_reasons_locales" (
      "title" varchar,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
  `)

  // Add constraints
  await db.execute(sql`
    DO $$ 
    BEGIN 
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_virtual_tour_reasons_parent_id_fk') THEN
        ALTER TABLE "products_virtual_tour_reasons" ADD CONSTRAINT "products_virtual_tour_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_virtual_tour_reasons_locales_parent_id_fk') THEN
        ALTER TABLE "products_virtual_tour_reasons_locales" ADD CONSTRAINT "products_virtual_tour_reasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_virtual_tour_reasons"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "products_virtual_tour_reasons_locales";`)
  await db.execute(sql`DROP TABLE IF EXISTS "products_virtual_tour_reasons";`)
  await db.execute(sql`ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "cta_title";`)
  await db.execute(sql`ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "cta_description";`)
  await db.execute(sql`ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "virtual_tour_title";`)
  await db.execute(sql`ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "virtual_tour_description";`)
}
