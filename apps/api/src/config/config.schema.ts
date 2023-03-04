import * as joi from 'joi';
import { NodeEnv } from './config.types';

export const ConfigSchema = joi.object().keys({
  NODE_ENV: joi
    .string()
    .valid(NodeEnv.DEV, NodeEnv.PROD, NodeEnv.TEST)
    .default(NodeEnv.DEV),
  MONGO_URI: joi.string().required(),
  ZOOKEEPER_URI: joi.string().required(),
  PORT: joi.number().required(),
  ALIAS_SALT: joi.string().default('md2003'),
  SESSION_SECRET: joi.string().required(),
  API_PREFIX: joi.string().optional(),
});
