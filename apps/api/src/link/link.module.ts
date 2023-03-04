import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './link.schema';
import { LinkRepository } from './link.repository';
import { RangeModule } from '../range/range.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
    RangeModule,
  ],
  providers: [LinkService, LinkRepository],
  controllers: [LinkController],
})
export class LinkModule {}
