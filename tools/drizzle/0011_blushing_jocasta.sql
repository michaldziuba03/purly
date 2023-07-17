CREATE TABLE IF NOT EXISTS "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"url" text NOT NULL,
	"destination_url" text NOT NULL,
	"solved" boolean DEFAULT false,
	"abuse_type" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"alias" varchar NOT NULL,
	"name" varchar,
	"long_url" text NOT NULL,
	"workspace_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true,
	"expires_at" timestamp,
	"android_redirect" text,
	"ios_redirect" text,
	"enable_utm" boolean DEFAULT false,
	"utm_source" varchar,
	"utm_medium" varchar,
	"utm_campaign" varchar,
	"utm_term" varchar,
	"utm_content" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "alias_index" ON "links" ("alias");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "link_workspace_index" ON "links" ("workspace_id");