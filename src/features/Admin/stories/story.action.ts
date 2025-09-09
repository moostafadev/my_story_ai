"use server";

import { StoryService } from "@/services/story.service";
import { CreateStoryInput, UpdateStoryInput } from "@/services/types";

// 🟢 إنشاء قصة
export async function createStoryAction(data: CreateStoryInput) {
  try {
    const story = await StoryService.createStory(data);
    return { success: true, story };
  } catch (error) {
    console.error("❌ Error creating story:", error);
    return { success: false, message: "حدث خطأ أثناء إنشاء القصة" };
  }
}

// 🟡 تحديث قصة
export async function updateStoryAction(id: string, data: UpdateStoryInput) {
  try {
    const story = await StoryService.updateStory(id, data);
    return { success: true, story };
  } catch (error) {
    console.error("❌ Error updating story:", error);
    return { success: false, message: "حدث خطأ أثناء تحديث القصة" };
  }
}

// 🔴 حذف قصة
export async function deleteStoryAction(id: string) {
  try {
    await StoryService.deleteStory(id);
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting story:", error);
    return { success: false, message: "حدث خطأ أثناء حذف القصة" };
  }
}

// 🔵 جلب كل القصص
export async function getStoriesAction() {
  try {
    const stories = await StoryService.getAllStories();
    return { success: true, stories };
  } catch (error) {
    console.error("❌ Error fetching stories:", error);
    return { success: false, message: "حدث خطأ أثناء جلب القصص" };
  }
}

// 🟣 جلب قصة بالـ ID
export async function getStoryByIdAction(id: string) {
  try {
    const story = await StoryService.getStoryById(id);
    if (!story) return { success: false, message: "القصة غير موجودة" };
    return { success: true, story };
  } catch (error) {
    console.error("❌ Error fetching story:", error);
    return { success: false, message: "حدث خطأ أثناء جلب القصة" };
  }
}
