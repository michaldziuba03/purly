import * as joi from 'joi';

export const UrlSchema = joi
.string()
.min(10)
.max(2048)
.required();
