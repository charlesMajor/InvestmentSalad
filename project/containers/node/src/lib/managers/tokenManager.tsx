"use server";

import { cookies } from "next/headers";
import { logout, validateToken } from "../services/authService";

const COOKIE_TOKEN_KEY = "access_token";
const IS_HTTPS_SECURE = process.env.IS_HTTPS_SECURE === "true";

export async function addTokenToCookies(token: string) {
  try {
    cookies().set({
      name: COOKIE_TOKEN_KEY,
      value: token,
      httpOnly: true,
      secure: IS_HTTPS_SECURE,
      path: "/",
    });
  } catch (error) {
    throw new Error();
  }
}

export async function getToken(): Promise<string> {
  const token = cookies().get(COOKIE_TOKEN_KEY);
  return token ? token.value : "";
}

export async function deleteToken() {
  try {
    cookies().delete(COOKIE_TOKEN_KEY);
  } catch (error) {
    throw new Error();
  }
}

export async function isTokenInCookiesValid(): Promise<boolean> {
  try {
    const token = cookies().get(COOKIE_TOKEN_KEY)?.value;
    if (token == undefined) throw new Error();

    return await isTokenValid();
  } catch (error) {
    return false;
  }
}

async function isTokenValid(): Promise<boolean> {
  try {
    const isValid = await validateToken();
    if (!isValid) await logout();

    return isValid;
  } catch (error) {
    return false;
  }
}
