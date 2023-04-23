import { BaseRepository } from './base.repository';
import { Plan, PlanDocument } from '../schemas/plan.schema';

export class PlanRepository extends BaseRepository<PlanDocument, Plan> {}
