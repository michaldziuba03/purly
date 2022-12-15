import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    async createAlias(data: CreateAliasDTO): Promise<Alias> {
        const number = await this.rangeService.next();
        const token =  this.hashids.encode(number);

        const alias = new this.aliasModel({
            token,
            number,
            url: data.url,
        });

        return alias.save();
    }
}
