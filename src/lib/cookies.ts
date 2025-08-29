import { cookies } from "next/headers";

export async function setTokenCookies(
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function removeTokenCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || null;
}

export async function getRefreshTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("refreshToken")?.value || null;
}
