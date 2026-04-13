import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "phases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "phases_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "phase_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "phases_id" integer;
  ALTER TABLE "phases_locales" ADD CONSTRAINT "phases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."phases"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "phases_slug_idx" ON "phases" USING btree ("slug");
  CREATE INDEX "phases_updated_at_idx" ON "phases" USING btree ("updated_at");
  CREATE INDEX "phases_created_at_idx" ON "phases" USING btree ("created_at");
  CREATE UNIQUE INDEX "phases_locales_locale_parent_id_unique" ON "phases_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "products" ADD CONSTRAINT "products_phase_id_phases_id_fk" FOREIGN KEY ("phase_id") REFERENCES "public"."phases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_phases_fk" FOREIGN KEY ("phases_id") REFERENCES "public"."phases"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_phase_idx" ON "products" USING btree ("phase_id");
  CREATE INDEX "payload_locked_documents_rels_phases_id_idx" ON "payload_locked_documents_rels" USING btree ("phases_id");
  ALTER TABLE "products" DROP COLUMN "phase";
  DROP TYPE "public"."enum_products_phase";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_phase" AS ENUM('Tahap 1', 'Tahap 2', 'Luxima', 'Kavling Industri');
  ALTER TABLE "phases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "phases_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "phases" CASCADE;
  DROP TABLE "phases_locales" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_phase_id_phases_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_phases_fk";
  
  DROP INDEX "products_phase_idx";
  DROP INDEX "payload_locked_documents_rels_phases_id_idx";
  ALTER TABLE "products" ADD COLUMN "phase" "enum_products_phase";
  ALTER TABLE "products" DROP COLUMN "phase_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "phases_id";`)
}
