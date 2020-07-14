export const convertObjectToList = (object) =>
  Object.keys(object).map((key) => ({
    ...object[key],
    uid: key,
  }));