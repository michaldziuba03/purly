CREATE TABLE IF NOT EXISTS "oauth_accounts" (
	"provider_id" varchar NOT NULL,
	"provider_name" varchar NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_provider_id_provider_name" PRIMARY KEY("provider_id","provider_name");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"token" varchar NOT NULL,
	"user_id" uuid PRIMARY KEY NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar,
	"picture_url" varchar,
	"picture_key" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"verified" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"plan" varchar DEFAULT 'free' NOT NULL,
	"billing_id" varchar,
	"billing_email" varchar,
	"slug" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"alias" varchar NOT NULL,
	"message" varchar DEFAULT '',
	"url" text NOT NULL,
	"destination_url" text NOT NULL,
	"solved" boolean DEFAULT false,
	"abuse_type" varchar,
	"link_id" uuid NOT NULL
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
	"is_element" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invites" (
	"token" varchar NOT NULL,
	"workspace_id" uuid NOT NULL,
	"email" varchar NOT NULL,
	"role" integer NOT NULL,
	"invited_at" timestamp DEFAULT now(),
	"expires_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_email_workspace_id" PRIMARY KEY("email","workspace_id");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspaces_members" (
	"user_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"role" integer DEFAULT 200 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workspaces_members" ADD CONSTRAINT "workspaces_members_workspace_id_user_id" PRIMARY KEY("workspace_id","user_id");
--> statement-breakpoint
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
	"name" varchar,
	"description" varchar DEFAULT '',
	"bg_color" varchar
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reset_token_index" ON "password_reset_tokens" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_index" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "billing_id_index" ON "workspaces" ("billing_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workspace_slug_index" ON "workspaces" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "alias_index" ON "links" ("alias");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "link_workspace_index" ON "links" ("workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "invite_token_idx" ON "invites" ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "invites_workspace_idx" ON "invites" ("workspace_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspaces_member_idx" ON "workspaces_members" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspaces_workspace_idx" ON "workspaces_members" ("workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bio_id_unique" ON "bio_pages" ("identifier");