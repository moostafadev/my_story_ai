import jwt, { SignOptions } from "jsonwebtoken";

const SECRET: string = process.env.JWT_SECRET ?? "supersecret";
const REFRESH_SECRET: string =
  process.env.JWT_REFRESH_SECRET ?? "superrefreshsecret";

export function signToken(
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1h"
): string {
  const options = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

export function signRefreshToken(
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "7d"
): string {
  const options = { expiresIn };
  return jwt.sign(payload, REFRESH_SECRET, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
