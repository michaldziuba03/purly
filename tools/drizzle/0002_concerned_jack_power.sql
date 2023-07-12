CREATE TABLE IF NOT EXISTS "oauth_accounts" (
	"provider_id" varchar NOT NULL,
	"provider_name" varchar NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_provider_id_provider_name" PRIMARY KEY("provider_id","provider_name");
