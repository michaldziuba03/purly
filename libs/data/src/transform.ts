export function transform(data: any) {
  let obj: any = {};

  if (data._id) {
    if (data._id && data._id.toString && typeof data._id.toString === 'function') {
      obj.id = data._id.toString();
    } else {
      obj.id = data._id;
    }
    delete data._id;
  }

  delete data.__v;

  return {
    ...obj,
    ...data,
  };
}
