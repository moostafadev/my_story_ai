// Additional utility types for better type safety
export type LocaleKey = "en" | "ar";

// For getting the translation function from getTranslations (server-side)
export type ServerTranslationFunction = Awaited<
  ReturnType<typeof import("next-intl/server").getTranslations>
>;

// For getting the translation function from useTranslations (client-side)
export type ClientTranslationFunction = ReturnType<
  typeof import("next-intl").useTranslations
>;
