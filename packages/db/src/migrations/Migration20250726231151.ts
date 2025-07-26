import { Migration } from '@mikro-orm/migrations';

export class Migration20250726231151 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "reset_token" ("token" text not null, "user_id" uuid not null, "created_at" timestamptz not null, "expires_at" timestamptz not null, constraint "reset_token_pkey" primary key ("token"));`);

    this.addSql(`alter table "reset_token" add constraint "reset_token_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "reset_token" cascade;`);
  }

}
