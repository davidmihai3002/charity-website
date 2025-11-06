import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET!;

export interface TokenPayload {
  id: number;
  age: number;
  email: string;
  name: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
}

export async function setRefreshTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export async function clearRefreshTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
}
