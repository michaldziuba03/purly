import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { RangeService } from 'src/range/range.service';
import { Alias, AliasDocument } from './alias.model';
import Hashids from 'hashids';
import { CreateAliasDTO } from './dto/create-alias.dto';

@Injectable()
export class AliasService {
    private readonly hashids = new Hashids('655deb');

    constructor(
        @InjectModel(Alias.name)
        private readonly aliasModel: Model<AliasDocument>,
        private readonly rangeService: RangeService,
    ) {}

    async createAlias(data: CreateAliasDTO, userId: string): Promise<Alias> {
        const number = await this.rangeService.next();
        const token =  this.hashids.encode(number);

        const alias = new this.aliasModel({
            token,
            number,
            userId,
            url: data.url,
        });

        return alias.save();
    }

    async findAlias(token: string): Promise<LeanDocument<AliasDocument>> {
        const alias = await this.aliasModel.findOne({ token })
            .select(['token', 'url', 'createdAt', 'enableTracking'])
            .lean();

        return alias;
    }

    async deleteAlias(token: string, userId: string) {
        const result = await this.aliasModel.deleteOne({
            token,
            userId
        }).lean()

        return result.deletedCount > 0;
    }
}
