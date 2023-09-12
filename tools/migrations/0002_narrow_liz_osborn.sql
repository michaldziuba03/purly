ALTER TABLE "launchpads" ALTER COLUMN "bg_color" SET DEFAULT '#F3F4F6';--> statement-breakpoint
ALTER TABLE "launchpads" ADD COLUMN "btn_color" varchar DEFAULT '#D1D5DB';--> statement-breakpoint
ALTER TABLE "launchpads" ADD COLUMN "btn_text_color" varchar DEFAULT '#0F172A';--> statement-breakpoint
ALTER TABLE "launchpads" ADD COLUMN "text_color" varchar DEFAULT '#0F172A';