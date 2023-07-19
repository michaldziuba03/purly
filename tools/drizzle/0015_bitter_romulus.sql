CREATE TABLE IF NOT EXISTS "invites" (
	"id" uuid DEFAULT gen_random_uuid(),
	"token" varchar NOT NULL,
	"workspace_id" uuid NOT NULL,
	"email" varchar NOT NULL,
	"role" integer NOT NULL,
	"invited_at" timestamp DEFAULT now(),
	"expires_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_id_workspace_id" PRIMARY KEY("id","workspace_id");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "invite_token_idx" ON "invites" ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "invites_workspace_idx" ON "invites" ("workspace_id");