import { clearRefreshTokenCookie } from "@/lib/auth/JWTUtilities";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await clearRefreshTokenCookie();
    return NextResponse.json(
      { message: "Logging out successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
