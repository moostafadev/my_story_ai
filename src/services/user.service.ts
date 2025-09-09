import { prisma } from "@/lib/prisma";
import { CreateUserInput, UpdateUserInput } from "@/services/types";
import { hashOTP, OTPGenerator, verifyOTP } from "@/lib/otpGenerator";
import { sendVerificationEmail } from "@/components/emails/SendVerificationEmail";

export class UserService {
  private static async generateUniqueUsername(fName: string, lName: string) {
    const baseUsername =
      `${fName.toLowerCase()}.${lName.toLowerCase()}`.replace(/\s+/g, "");
    let username = baseUsername;
    let counter = 1;

    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  }

  static async checkUserExists(
    value: string,
    type: "email" | "phone"
  ): Promise<"email" | "phone" | null> {
    const exists = await prisma.user.findFirst({
      where:
        type === "email"
          ? { email: value, isVerified: true }
          : { phoneNumber: value, isVerified: true },
      select: { id: true },
    });

    if (exists) {
      return type;
    }

    return null;
  }

  static async createUser(data: CreateUserInput) {
    if (data.email || data.phoneNumber) {
      const exists = await prisma.user.findFirst({
        where: {
          OR: [
            ...(data.email ? [{ email: data.email }] : []),
            ...(data.phoneNumber ? [{ phoneNumber: data.phoneNumber }] : []),
          ],
        },
      });

      if (exists) {
        if (exists.isVerified) {
          throw new Error("User already exists and is verified");
        } else {
          // user exists but not verified → resend OTP
          await this.resendOTP(exists.id);
          return { ...exists, message: "Verification code resent" };
        }
      }
    }

    const username = await this.generateUniqueUsername(data.fName, data.lName);

    // generate OTP
    const { code, expiresAt } = OTPGenerator(6, 15);
    const hashedCode = hashOTP(code);

    const user = await prisma.user.create({
      data: {
        ...data,
        username,
        isVerified: false,
        verificationCode: hashedCode,
        verificationExpiry: expiresAt,
      },
    });

    if (user.email) {
      await sendVerificationEmail(user.email, user.fName, code);
    }

    return user;
  }

  static async verifyUser(userId: string, code: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.verificationCode || !user.verificationExpiry) {
      throw new Error("User not found or no OTP set");
    }

    const isVerified = verifyOTP(
      code,
      user.verificationCode,
      user.verificationExpiry
    );

    if (!isVerified) {
      throw new Error("Invalid or expired OTP");
    }

    return prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationExpiry: null,
      },
    });
  }

  static async resendOTP(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    // generate new OTP
    const { code, expiresAt } = OTPGenerator(6, 15);
    const hashedCode = hashOTP(code);

    // update user with new OTP
    await prisma.user.update({
      where: { id: userId },
      data: {
        verificationCode: hashedCode,
        verificationExpiry: expiresAt,
      },
    });

    // send via email if exists
    if (user.email) {
      await sendVerificationEmail(user.email, user.fName, code);
    }

    return { success: true };
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { orders: true, addresses: true },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email, isVerified: true } });
  }

  static async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username, isVerified: true },
      include: { orders: true, addresses: true },
    });
  }

  static async getUserByPhoneNumber(phoneNumber: string) {
    return prisma.user.findFirst({ where: { phoneNumber, isVerified: true } });
  }

  static async getAllUsers() {
    return prisma.user.findMany({
      include: { orders: true, addresses: true },
      where: {
        NOT: {
          username: "mystory.ai",
        },
      },
    });
  }

  static async updateUser(id: string, data: UpdateUserInput) {
    return prisma.user.update({ where: { id }, data });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
