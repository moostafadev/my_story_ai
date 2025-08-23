import { prisma } from "@/lib/prisma";
import { CreateAddressInput, UpdateAddressInput } from "./types";

export class AddressService {
  static async createAddress(data: CreateAddressInput) {
    return prisma.address.create({ data });
  }

  static async getAddressById(id: string) {
    return prisma.address.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  static async updateAddress(id: string, data: UpdateAddressInput) {
    return prisma.address.update({ where: { id }, data });
  }

  static async deleteAddress(id: string) {
    return prisma.address.delete({ where: { id } });
  }
}
