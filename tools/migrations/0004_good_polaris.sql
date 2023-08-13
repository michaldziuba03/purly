ALTER TABLE "workspaces" ADD COLUMN "slug" varchar NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workspace_slug_index" ON "workspaces" ("slug");
