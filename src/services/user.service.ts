import { setTokenCookies } from "@/lib/cookies";
import { signRefreshToken, signToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { CreateUserInput, UpdateUserInput } from "@/services/types";
import { OTPGenerator } from "@/lib/otpGenerator";
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
        throw new Error("Email or phone number already exists");
      }
    }

    const username = await this.generateUniqueUsername(data.fName, data.lName);

    const token = signToken({
      fName: data.fName,
      lName: data.lName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      username,
      role: data.role,
    });

    const refreshToken = signRefreshToken({ token });
    setTokenCookies(token, refreshToken);

    // generate OTP
    const { code, expiresAt } = OTPGenerator(6, 15);

    const user = await prisma.user.create({
      data: {
        ...data,
        username,
        verificationCode: code, // 🔑 store OTP
        verificationExpiry: expiresAt,
      },
    });

    if (user.email) {
      await sendVerificationEmail(user.email, user.fName, code);
      // TODO: send OTP email here
    }
    if (user.phoneNumber) {
      // TODO: send OTP via SMS provider
    }

    return user;
  }

  static async verifyUser(userId: string, code: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.verificationCode || !user.verificationExpiry) {
      throw new Error("User not found or no OTP set");
    }

    if (new Date() > user.verificationExpiry) {
      throw new Error("OTP expired");
    }

    if (user.verificationCode !== code) {
      throw new Error("Invalid OTP");
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

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { stories: true, orders: true, addresses: true },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }

  static async getUserByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }

  static async getUserByPhoneNumber(phoneNumber: string) {
    return prisma.user.findFirst({ where: { phoneNumber } });
  }

  static async getAllUsers() {
    return prisma.user.findMany({
      include: { stories: true, orders: true, addresses: true },
    });
  }

  static async updateUser(id: string, data: UpdateUserInput) {
    return prisma.user.update({ where: { id }, data });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
