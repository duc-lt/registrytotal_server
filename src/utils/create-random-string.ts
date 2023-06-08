export function createRandomString(length = 8) {
  // https://stackoverflow.com/a/10727155
  return Math.round(
    Math.pow(36, length + 1) - Math.random() * Math.pow(36, length),
  )
    .toString(36)
    .slice(1);
}
