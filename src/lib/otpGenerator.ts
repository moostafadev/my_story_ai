import crypto from "crypto";

/**
 * Generate an OTP with an expiry time
 * @param length number of digits (default 6)
 * @param expiry expiry time in minutes (default 15)
 */
export const OTPGenerator = (length: number = 6, expiry: number = 15) => {
  if (length < 4) length = 4;

  const max = Math.pow(10, length) - 1;
  const min = Math.pow(10, length - 1);

  const verificationCode = crypto.randomInt(min, max).toString();
  const expiresAt = new Date(Date.now() + expiry * 60 * 1000);

  return {
    code: verificationCode, // code to send to the user
    expiresAt, // expiration timestamp
  };
};

/**
 * Hash the OTP before storing in DB
 */
export const hashOTP = (otp: string) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

/**
 * Verify OTP
 * @param enteredCode - code entered by the user
 * @param storedHash - hashed OTP stored in the DB
 * @param expiresAt - expiration timestamp
 */
export const verifyOTP = (
  enteredCode: string,
  storedHash: string,
  expiresAt: Date
): boolean => {
  if (new Date() > expiresAt) {
    return false; // expired
  }

  const hashedEntered = hashOTP(enteredCode);
  return hashedEntered === storedHash;
};
