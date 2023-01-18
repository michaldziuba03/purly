import * as joi from 'joi';
import { NodeEnv } from './config.types';

export const ConfigSchema = joi.object().keys({
  NODE_ENV: joi.string().valid(NodeEnv.DEV, NodeEnv.PROD, NodeEnv.TEST),
  MONGO_URI: joi.string().required(),
  PORT: joi.number().required(),
  SESSION_SECRET: joi.string().required(),
  API_PREFIX: joi.string().optional(),
});
