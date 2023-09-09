CREATE TABLE IF NOT EXISTS "launchpads" (
	"workspace_id" uuid PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"name" varchar,
	"description" varchar DEFAULT '',
	"bg_color" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "launchpads_elements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid,
	"redirect" varchar NOT NULL,
	"label" varchar,
	"link_id" uuid NOT NULL
);
--> statement-breakpoint
DROP TABLE "bio_elements";--> statement-breakpoint
DROP TABLE "bio_pages";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bio_id_unique" ON "launchpads" ("slug");