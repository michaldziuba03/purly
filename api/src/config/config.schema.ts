import Joi from "joi";

export enum NodeEnv {
    dev = 'development',
    prod = 'production',
    test = 'test',
}

export const configSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
        .valid(NodeEnv.dev, NodeEnv.prod, NodeEnv.test)
        .default(NodeEnv.dev),
    PORT: Joi.number().default(8000),
    ZK_CONNECT: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
})
