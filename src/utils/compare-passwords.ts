import { verify } from 'argon2';

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
) {
  return verify(hashedPassword, plainPassword);
}
