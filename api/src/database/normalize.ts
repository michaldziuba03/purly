import mongoose, { SchemaOptions, ToObjectOptions } from 'mongoose';

function makeIdFirstKey(obj: object) {
  const entries = Object.entries(obj).sort(function (item) {
    const key = item[0];
    if (key === 'id') return -1;
    return 0;
  });

  for (const [key, value] of entries) {
    delete obj[key];
    obj[key] = value;
  }

  return obj;
}

export interface BaseDocument {
  id: string;
  _id: any;
  __v: number;
}

interface Schema extends mongoose.Schema {
  options: SchemaOptions;
}

function normalize(doc: Partial<BaseDocument>) {
  // make id string to avoid serialization problems with class-transform
  if (doc._id && doc._id.toString && typeof doc._id.toString === 'function') {
    doc.id = doc._id.toString();
  } else {
    doc.id = doc._id;
  }

  delete doc._id;
  delete doc.__v;

  makeIdFirstKey(doc);
}

function createTransform(toObject?: ToObjectOptions) {
  return function transform(
    _doc: unknown,
    converted: unknown,
    options: object,
  ) {
    if (
      toObject &&
      toObject.transform &&
      typeof toObject.transform === 'function'
    ) {
      toObject.transform(_doc, converted, options);
    }

    return normalize(converted);
  };
}

export function normalizer(schema: Schema) {
  schema.options.toJSON = {
    transform: createTransform(schema.options.toJSON),
  };

  schema.options.toObject = {
    transform: createTransform(schema.options.toObject),
  };

  schema.post('find', findHandler);
  schema.post('findOne', findHandler);
  schema.post('findOneAndUpdate', findHandler);
  schema.post('findOneAndDelete', findHandler);
}

function findHandler(result) {
  if (!result) {
    return result;
  }

  if (this._mongooseOptions.lean) {
    if (Array.isArray(result)) {
      result.forEach((doc) => normalize(doc));
    } else {
      normalize(result);
    }
  }
}
