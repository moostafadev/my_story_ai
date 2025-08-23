import { prisma } from "@/lib/prisma";
import { CreateStoryInput, UpdateStoryInput } from "./types";

export class StoryService {
  static async createStory(data: CreateStoryInput) {
    return prisma.story.create({ data });
  }

  static async getStoryById(id: string) {
    return prisma.story.findUnique({
      where: { id },
      include: { user: true, order: true, image: true, pdf: true },
    });
  }

  static async getAllStories() {
    return prisma.story.findMany({
      include: { user: true, order: true, image: true, pdf: true },
    });
  }

  static async updateStory(id: string, data: UpdateStoryInput) {
    return prisma.story.update({ where: { id }, data });
  }

  static async deleteStory(id: string) {
    return prisma.story.delete({ where: { id } });
  }
}
