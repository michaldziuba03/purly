import Joi from "joi";

export const configSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(8000),
    ZK_CONNECT: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
})
