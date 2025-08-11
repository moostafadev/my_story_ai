import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // This regex will match everything except:
    // - api, trpc, _next, _vercel, files
    // - admin path
    "/((?!api|trpc|_next|_vercel|.*\\..*|admin).*)",
  ],
};
