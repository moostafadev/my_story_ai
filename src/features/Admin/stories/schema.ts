import { z } from "zod";

export const storySchema = z.object({
  titleAr: z.string().nonempty({ message: "هذا الحقل مطلوب" }),
  titleEn: z.string().nonempty({ message: "هذا الحقل مطلوب" }),

  miniDescAr: z.string().nonempty({ message: "هذا الحقل مطلوب" }),
  miniDescEn: z.string().nonempty({ message: "هذا الحقل مطلوب" }),

  descAr: z.string().nonempty({ message: "هذا الحقل مطلوب" }),
  descEn: z.string().nonempty({ message: "هذا الحقل مطلوب" }),

  state: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"], {
    error: "هذا الحقل مطلوب",
  }),
});

export type TStorySchema = z.infer<typeof storySchema>;
