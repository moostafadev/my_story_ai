"use server";

import bcrypt from "bcrypt";

export async function hashPassword(password: string, saltRounds = 12) {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function compareHashPassword(
  password: string,
  hashedPassword: string
) {
  const result = await bcrypt.compare(password, hashedPassword);

  return result;
}
