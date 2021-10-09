import * as joi from 'joi';

export const UrlSchema = joi
    .string()
    .min(10)
    .max(2048)
    .required();

export const TokenSchema = 
    joi
    .string()
    .min(1)
    .max(8)
    .alphanum()
    .required();
