CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"token" varchar,
	"user_id" uuid PRIMARY KEY NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reset_token_index" ON "password_reset_tokens" ("token");