export function getRandomEnumValue(enumObject: object) {
  const enumValues = Object.values(enumObject);
  return enumValues[Math.floor(Math.random() * enumValues.length)];
}
