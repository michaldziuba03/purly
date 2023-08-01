CREATE TABLE IF NOT EXISTS "bio_elements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid,
	"destination" varchar NOT NULL,
	"label" varchar,
	"link_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bio_pages" (
	"workspace_id" uuid PRIMARY KEY NOT NULL,
	"identifier" varchar NOT NULL,
	"description" varchar DEFAULT '',
	"bg_color" varchar
);
--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "is_element" boolean DEFAULT false;