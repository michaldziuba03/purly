import { Prop, PropOptions } from "@nestjs/mongoose";
import { applyDecorators } from '@nestjs/common'
import mongoose from "mongoose";
import { Transform } from "class-transformer";

export const TransformObjectId = () => Transform((params) => {
  const { obj, value, key } = params;

  if(obj[key] && obj[key].toString && typeof obj[key].toString === "function"){
    return obj[key].toString();
  } else {
    return value;
  }
})

export const ObjectIdProp = (options: Omit<PropOptions, 'type'> = {}) => applyDecorators(
  TransformObjectId(),
  Prop({ ...options, type: mongoose.Schema.Types.ObjectId })
)
