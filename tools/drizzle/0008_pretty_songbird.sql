CREATE TABLE IF NOT EXISTS "workspaces_members" (
	"user_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"role" integer DEFAULT 200 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workspaces_members" ADD CONSTRAINT "workspaces_members_workspace_id_user_id" PRIMARY KEY("workspace_id","user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspaces_member_idx" ON "workspaces_members" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspaces_workspace_idx" ON "workspaces_members" ("workspace_id");