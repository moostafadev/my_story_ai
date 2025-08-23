import { prisma } from "@/lib/prisma";
import { CreateImageInput, UpdateImageInput } from "./types";

export class ImageService {
  static async createImage(data: CreateImageInput) {
    return prisma.image.create({ data });
  }

  static async getImageById(id: string) {
    return prisma.image.findUnique({
      where: { id },
      include: { story: true },
    });
  }

  static async updateImage(id: string, data: UpdateImageInput) {
    return prisma.image.update({ where: { id }, data });
  }

  static async deleteImage(id: string) {
    return prisma.image.delete({ where: { id } });
  }
}
