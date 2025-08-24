"use server";

import bcrypt from "bcrypt";

async function hashPassword(password: string, saltRounds = 12) {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}
export default hashPassword;
