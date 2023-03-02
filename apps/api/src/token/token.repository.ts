import { EntityRepository } from '../database/entity.repository';
import { Model } from 'mongoose';
import {
  ResetToken,
  ResetTokenDoc,
  VerificationToken,
  VerificationTokenDoc,
} from './token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetTokenRepository extends EntityRepository<ResetTokenDoc> {
  constructor(
    @InjectModel(ResetToken.name)
    private readonly resetTokenModel: Model<ResetTokenDoc>,
  ) {
    super(resetTokenModel);
  }
}

@Injectable()
export class VerificationTokenRepository extends EntityRepository<VerificationTokenDoc> {
  constructor(
    @InjectModel(VerificationToken.name)
    private readonly verificationTokenModel: Model<VerificationTokenDoc>,
  ) {
    super(verificationTokenModel);
  }
}
