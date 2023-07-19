ALTER TABLE "invites" DROP CONSTRAINT "invites_id_workspace_id";--> statement-breakpoint
DROP INDEX IF EXISTS "invite_email_idx";--> statement-breakpoint
ALTER TABLE "invites" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_email_workspace_id" PRIMARY KEY("email","workspace_id");