export function getKeyByValue(obj: object, value: string) {
  const index = Object.values(obj).indexOf(value);
  const key = Object.keys(obj)[index];
  return key;
}