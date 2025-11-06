import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  verifyRefreshToken,
  generateAccessToken,
} from "@/lib/auth/JWTUtilities";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshToken(refreshToken);

    const tokenPayload = {
      id: decoded.id,
      age: decoded.age,
      email: decoded.email,
      name: decoded.name,
    };
    const newAccessToken = generateAccessToken(tokenPayload);

    return NextResponse.json({ accessToken: newAccessToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
