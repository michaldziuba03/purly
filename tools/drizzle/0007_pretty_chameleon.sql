CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"plan" varchar DEFAULT 'free' NOT NULL,
	"billing_id" varchar
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "billing_id_index" ON "workspaces" ("billing_id");