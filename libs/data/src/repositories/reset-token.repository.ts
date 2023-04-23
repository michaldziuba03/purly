import { BaseRepository} from "./base.repository";
import { createHash } from 'crypto';
import { ResetToken, ResetTokenDocument } from "../schemas/reset-token.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ResetTokenRepository extends BaseRepository<ResetTokenDocument, ResetToken> {
  constructor(
    @InjectModel(ResetToken.name) tokenModel: Model<ResetTokenDocument>,
  ) {
    super(tokenModel, ResetToken);
  }

  private hashResetToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  createResetToken(userId: string, token: string) {
    return this.create({
      userId,
      token: this.hashResetToken(token),
      createdAt: new Date(),
    });
  }

  findByToken(token: string) {
    return this.findOne({ token: this.hashResetToken(token) });
  }

  clearTokens(userId: string) {
    return this.deleteMany({ userId });
  }
}
