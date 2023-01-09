import * as Joi from "joi";

export enum NodeEnv {
    dev = 'development',
    prod = 'production',
    test = 'test',
}

export const configSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
        .valid(NodeEnv.dev, NodeEnv.prod, NodeEnv.test)
        .default(NodeEnv.dev),
    REDIS_URI: Joi.string(),
    MONGO_URI: Joi.string(),
});