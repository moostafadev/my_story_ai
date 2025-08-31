"use server";

import { cookies } from "next/headers";

export async function setUserCookies(user: {
  userId: string;
  firstName: string;
  lastName: string;
}) {
  const cookieStore = await cookies();

  const days = parseInt(process.env.COOKIE_MAX_AGE_DAYS || "7", 10);
  const maxAge = 60 * 60 * 24 * days;

  cookieStore.set("userId", user.userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
    path: "/",
  });

  cookieStore.set("firstName", user.firstName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
    path: "/",
  });

  cookieStore.set("lastName", user.lastName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
    path: "/",
  });
}

export async function removeUserCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
  cookieStore.delete("firstName");
  cookieStore.delete("lastName");
}

export async function getUserFromCookies() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value || null;
  const firstName = cookieStore.get("firstName")?.value || null;
  const lastName = cookieStore.get("lastName")?.value || null;

  if (!userId || !firstName || !lastName) {
    return null;
  }

  return { userId, firstName, lastName };
}
