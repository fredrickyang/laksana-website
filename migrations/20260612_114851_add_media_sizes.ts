import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'article-creator', 'legal');
  CREATE TYPE "public"."enum_form_company_submissions_customer_leads" AS ENUM('walk-in', 'social-media', 'website', 'personal', 'open-table');
  CREATE TYPE "public"."enum_form_personal_submissions_customer_leads" AS ENUM('walk-in', 'social-media', 'website', 'personal', 'open-table');
  CREATE TYPE "public"."enum_exports_format" AS ENUM('csv', 'json');
  CREATE TYPE "public"."enum_exports_sort_order" AS ENUM('asc', 'desc');
  CREATE TYPE "public"."enum_exports_locale" AS ENUM('all', 'id', 'en', 'zh');
  CREATE TYPE "public"."enum_exports_drafts" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_imports_import_mode" AS ENUM('create', 'update', 'upsert');
  CREATE TYPE "public"."enum_imports_status" AS ENUM('pending', 'completed', 'partial', 'failed');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');
  CREATE TABLE "form_company_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fullname" varchar NOT NULL,
  	"employee_id" varchar,
  	"fullname_company" varchar NOT NULL,
  	"phone_company" varchar NOT NULL,
  	"phone_direksi" varchar NOT NULL,
  	"alamat_company" varchar NOT NULL,
  	"expense_date" timestamp(3) with time zone NOT NULL,
  	"customer_leads" "enum_form_company_submissions_customer_leads" NOT NULL,
  	"catatan_tambahan" varchar,
  	"ktp_kitas_id" integer NOT NULL,
  	"nib_id" integer NOT NULL,
  	"akta_perusahaan_id" integer NOT NULL,
  	"surat_pernyataan_id" integer NOT NULL,
  	"surat_persetujuan_id" integer,
  	"booking_form_id" integer,
  	"declaration" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_company_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"form_attachments_id" integer
  );
  
  CREATE TABLE "form_personal_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fullname" varchar NOT NULL,
  	"employee_id" varchar,
  	"fullname_customer" varchar NOT NULL,
  	"phone_customer" varchar NOT NULL,
  	"alamat_customer" varchar NOT NULL,
  	"expense_date" timestamp(3) with time zone NOT NULL,
  	"customer_leads" "enum_form_personal_submissions_customer_leads" NOT NULL,
  	"catatan_tambahan" varchar,
  	"ktp_kitas_id" integer NOT NULL,
  	"npwp_pribadi_id" integer NOT NULL,
  	"kartu_keluarga_id" integer,
  	"akta_kelahiran_pernikahan_id" integer,
  	"booking_form_id" integer,
  	"declaration" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_personal_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"form_attachments_id" integer
  );
  
  CREATE TABLE "form_attachments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT '',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"format" "enum_exports_format" DEFAULT 'csv' NOT NULL,
  	"limit" numeric,
  	"page" numeric DEFAULT 1,
  	"sort" varchar,
  	"sort_order" "enum_exports_sort_order",
  	"locale" "enum_exports_locale" DEFAULT 'all',
  	"drafts" "enum_exports_drafts" DEFAULT 'yes',
  	"collection_slug" varchar DEFAULT 'form-submissions' NOT NULL,
  	"where" jsonb DEFAULT '{}'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "exports_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_slug" varchar DEFAULT 'form-submissions' NOT NULL,
  	"import_mode" "enum_imports_import_mode",
  	"match_field" varchar DEFAULT 'id',
  	"status" "enum_imports_status" DEFAULT 'pending',
  	"summary_imported" numeric,
  	"summary_updated" numeric,
  	"summary_total" numeric,
  	"summary_issues" numeric,
  	"summary_issue_details" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "social_page_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"alt_text" varchar
  );
  
  CREATE TABLE "social_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'admin' NOT NULL;
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT '';
  ALTER TABLE "media" ADD COLUMN "sizes_card_480_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_480_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_480_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_480_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_480_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_480_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_768_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_768_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_768_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_768_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_768_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_768_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_content_1200_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_content_1200_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_content_1200_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_content_1200_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_content_1200_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_content_1200_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_1920_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_1920_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_1920_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_1920_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_1920_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_1920_filename" varchar;
  ALTER TABLE "products" ADD COLUMN "highlight_specs_custom_link" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_company_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_personal_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_attachments_id" integer;
  ALTER TABLE "form_company_submissions" ADD CONSTRAINT "form_company_submissions_ktp_kitas_id_form_attachments_id_fk" FOREIGN KEY ("ktp_kitas_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_company_submissions" ADD CONSTRAINT "form_company_submissions_nib_id_form_attachments_id_fk" FOREIGN KEY ("nib_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_company_submissions" ADD CONSTRAINT "form_company_submissions_akta_perusahaan_id_form_attachments_id_fk" FOREIGN KEY ("akta_perusahaan_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_company_submissions" ADD CONSTRAINT "form_company_submissions_surat_pernyataan_id_form_attachments_id_fk" FOREIGN KEY ("surat_pernyataan_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_company_submissions" ADD CONSTRAINT "form_company_submissions_surat_persetujuan_id_form_attachments_id_fk" FOREIGN KEY ("surat_persetujuan_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_company_submissions" ADD CONSTRAINT "form_company_submissions_booking_form_id_form_attachments_id_fk" FOREIGN KEY ("booking_form_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_company_submissions_rels" ADD CONSTRAINT "form_company_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_company_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_company_submissions_rels" ADD CONSTRAINT "form_company_submissions_rels_form_attachments_fk" FOREIGN KEY ("form_attachments_id") REFERENCES "public"."form_attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_personal_submissions" ADD CONSTRAINT "form_personal_submissions_ktp_kitas_id_form_attachments_id_fk" FOREIGN KEY ("ktp_kitas_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_personal_submissions" ADD CONSTRAINT "form_personal_submissions_npwp_pribadi_id_form_attachments_id_fk" FOREIGN KEY ("npwp_pribadi_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_personal_submissions" ADD CONSTRAINT "form_personal_submissions_kartu_keluarga_id_form_attachments_id_fk" FOREIGN KEY ("kartu_keluarga_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_personal_submissions" ADD CONSTRAINT "form_personal_submissions_akta_kelahiran_pernikahan_id_form_attachments_id_fk" FOREIGN KEY ("akta_kelahiran_pernikahan_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_personal_submissions" ADD CONSTRAINT "form_personal_submissions_booking_form_id_form_attachments_id_fk" FOREIGN KEY ("booking_form_id") REFERENCES "public"."form_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_personal_submissions_rels" ADD CONSTRAINT "form_personal_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_personal_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_personal_submissions_rels" ADD CONSTRAINT "form_personal_submissions_rels_form_attachments_fk" FOREIGN KEY ("form_attachments_id") REFERENCES "public"."form_attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exports_texts" ADD CONSTRAINT "exports_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."exports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_page_social_links" ADD CONSTRAINT "social_page_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_page_social_links" ADD CONSTRAINT "social_page_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "form_company_submissions_ktp_kitas_idx" ON "form_company_submissions" USING btree ("ktp_kitas_id");
  CREATE INDEX "form_company_submissions_nib_idx" ON "form_company_submissions" USING btree ("nib_id");
  CREATE INDEX "form_company_submissions_akta_perusahaan_idx" ON "form_company_submissions" USING btree ("akta_perusahaan_id");
  CREATE INDEX "form_company_submissions_surat_pernyataan_idx" ON "form_company_submissions" USING btree ("surat_pernyataan_id");
  CREATE INDEX "form_company_submissions_surat_persetujuan_idx" ON "form_company_submissions" USING btree ("surat_persetujuan_id");
  CREATE INDEX "form_company_submissions_booking_form_idx" ON "form_company_submissions" USING btree ("booking_form_id");
  CREATE INDEX "form_company_submissions_updated_at_idx" ON "form_company_submissions" USING btree ("updated_at");
  CREATE INDEX "form_company_submissions_created_at_idx" ON "form_company_submissions" USING btree ("created_at");
  CREATE INDEX "form_company_submissions_rels_order_idx" ON "form_company_submissions_rels" USING btree ("order");
  CREATE INDEX "form_company_submissions_rels_parent_idx" ON "form_company_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_company_submissions_rels_path_idx" ON "form_company_submissions_rels" USING btree ("path");
  CREATE INDEX "form_company_submissions_rels_form_attachments_id_idx" ON "form_company_submissions_rels" USING btree ("form_attachments_id");
  CREATE INDEX "form_personal_submissions_ktp_kitas_idx" ON "form_personal_submissions" USING btree ("ktp_kitas_id");
  CREATE INDEX "form_personal_submissions_npwp_pribadi_idx" ON "form_personal_submissions" USING btree ("npwp_pribadi_id");
  CREATE INDEX "form_personal_submissions_kartu_keluarga_idx" ON "form_personal_submissions" USING btree ("kartu_keluarga_id");
  CREATE INDEX "form_personal_submissions_akta_kelahiran_pernikahan_idx" ON "form_personal_submissions" USING btree ("akta_kelahiran_pernikahan_id");
  CREATE INDEX "form_personal_submissions_booking_form_idx" ON "form_personal_submissions" USING btree ("booking_form_id");
  CREATE INDEX "form_personal_submissions_updated_at_idx" ON "form_personal_submissions" USING btree ("updated_at");
  CREATE INDEX "form_personal_submissions_created_at_idx" ON "form_personal_submissions" USING btree ("created_at");
  CREATE INDEX "form_personal_submissions_rels_order_idx" ON "form_personal_submissions_rels" USING btree ("order");
  CREATE INDEX "form_personal_submissions_rels_parent_idx" ON "form_personal_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_personal_submissions_rels_path_idx" ON "form_personal_submissions_rels" USING btree ("path");
  CREATE INDEX "form_personal_submissions_rels_form_attachments_id_idx" ON "form_personal_submissions_rels" USING btree ("form_attachments_id");
  CREATE INDEX "form_attachments_updated_at_idx" ON "form_attachments" USING btree ("updated_at");
  CREATE INDEX "form_attachments_created_at_idx" ON "form_attachments" USING btree ("created_at");
  CREATE UNIQUE INDEX "form_attachments_filename_idx" ON "form_attachments" USING btree ("filename");
  CREATE INDEX "exports_updated_at_idx" ON "exports" USING btree ("updated_at");
  CREATE INDEX "exports_created_at_idx" ON "exports" USING btree ("created_at");
  CREATE UNIQUE INDEX "exports_filename_idx" ON "exports" USING btree ("filename");
  CREATE INDEX "exports_texts_order_parent" ON "exports_texts" USING btree ("order","parent_id");
  CREATE INDEX "imports_updated_at_idx" ON "imports" USING btree ("updated_at");
  CREATE INDEX "imports_created_at_idx" ON "imports" USING btree ("created_at");
  CREATE UNIQUE INDEX "imports_filename_idx" ON "imports" USING btree ("filename");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "social_page_social_links_order_idx" ON "social_page_social_links" USING btree ("_order");
  CREATE INDEX "social_page_social_links_parent_id_idx" ON "social_page_social_links" USING btree ("_parent_id");
  CREATE INDEX "social_page_social_links_icon_idx" ON "social_page_social_links" USING btree ("icon_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_company_submissions_fk" FOREIGN KEY ("form_company_submissions_id") REFERENCES "public"."form_company_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_personal_submissions_fk" FOREIGN KEY ("form_personal_submissions_id") REFERENCES "public"."form_personal_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_attachments_fk" FOREIGN KEY ("form_attachments_id") REFERENCES "public"."form_attachments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_sizes_card_480_sizes_card_480_filename_idx" ON "media" USING btree ("sizes_card_480_filename");
  CREATE INDEX "media_sizes_card_768_sizes_card_768_filename_idx" ON "media" USING btree ("sizes_card_768_filename");
  CREATE INDEX "media_sizes_content_1200_sizes_content_1200_filename_idx" ON "media" USING btree ("sizes_content_1200_filename");
  CREATE INDEX "media_sizes_hero_1920_sizes_hero_1920_filename_idx" ON "media" USING btree ("sizes_hero_1920_filename");
  CREATE INDEX "payload_locked_documents_rels_form_company_submissions_i_idx" ON "payload_locked_documents_rels" USING btree ("form_company_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_form_personal_submissions__idx" ON "payload_locked_documents_rels" USING btree ("form_personal_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_form_attachments_id_idx" ON "payload_locked_documents_rels" USING btree ("form_attachments_id");
  ALTER TABLE "products_locales" DROP COLUMN "call_to_action";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_company_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_company_submissions_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_personal_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_personal_submissions_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exports_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "imports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "social_page_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "social_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "form_company_submissions" CASCADE;
  DROP TABLE "form_company_submissions_rels" CASCADE;
  DROP TABLE "form_personal_submissions" CASCADE;
  DROP TABLE "form_personal_submissions_rels" CASCADE;
  DROP TABLE "form_attachments" CASCADE;
  DROP TABLE "exports" CASCADE;
  DROP TABLE "exports_texts" CASCADE;
  DROP TABLE "imports" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "social_page_social_links" CASCADE;
  DROP TABLE "social_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_company_submissions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_personal_submissions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_attachments_fk";
  
  DROP INDEX "media_sizes_card_480_sizes_card_480_filename_idx";
  DROP INDEX "media_sizes_card_768_sizes_card_768_filename_idx";
  DROP INDEX "media_sizes_content_1200_sizes_content_1200_filename_idx";
  DROP INDEX "media_sizes_hero_1920_sizes_hero_1920_filename_idx";
  DROP INDEX "payload_locked_documents_rels_form_company_submissions_i_idx";
  DROP INDEX "payload_locked_documents_rels_form_personal_submissions__idx";
  DROP INDEX "payload_locked_documents_rels_form_attachments_id_idx";
  ALTER TABLE "products_locales" ADD COLUMN "call_to_action" varchar;
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "media" DROP COLUMN "sizes_card_480_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_480_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_480_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_480_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_480_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_480_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_card_768_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_768_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_768_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_768_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_768_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_768_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_content_1200_url";
  ALTER TABLE "media" DROP COLUMN "sizes_content_1200_width";
  ALTER TABLE "media" DROP COLUMN "sizes_content_1200_height";
  ALTER TABLE "media" DROP COLUMN "sizes_content_1200_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_content_1200_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_content_1200_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_1920_url";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_1920_width";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_1920_height";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_1920_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_1920_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_1920_filename";
  ALTER TABLE "products" DROP COLUMN "highlight_specs_custom_link";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_company_submissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_personal_submissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_attachments_id";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_form_company_submissions_customer_leads";
  DROP TYPE "public"."enum_form_personal_submissions_customer_leads";
  DROP TYPE "public"."enum_exports_format";
  DROP TYPE "public"."enum_exports_sort_order";
  DROP TYPE "public"."enum_exports_locale";
  DROP TYPE "public"."enum_exports_drafts";
  DROP TYPE "public"."enum_imports_import_mode";
  DROP TYPE "public"."enum_imports_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
