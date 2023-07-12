ALTER TABLE "password_reset_tokens" ALTER COLUMN "token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD COLUMN "created_at" timestamp DEFAULT now();