export function isDuplicatedError(column: string, err: any) {
  if (!err) {
    return false;
  }

  if (typeof err !== 'object') {
    return false;
  }

  if (!err.code && !err.detail) {
    return false;
  }

  if (err.code !== '23505') {
    return false;
  }

  if (!err.detail.includes(column)) {
    return false;
  }

  return true;
}
