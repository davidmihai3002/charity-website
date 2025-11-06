import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} from "@/lib/auth/JWTUtilities";
import { getSpecificUserByEmail } from "@/services/users/getSpecificUser";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const loginCredentials = await req.json();
    const existingUser = await getSpecificUserByEmail(loginCredentials.email);

    if (!existingUser) {
      return NextResponse.json(
        { message: "No matching user." },
        { status: 401 }
      );
    }

    const isUserValid = await bcrypt.compare(
      loginCredentials.password,
      existingUser.password
    );

    if (!isUserValid) {
      console.log("bad request");

      return NextResponse.json(
        { message: "No matching user." },
        { status: 401 }
      );
    }

    const tokenPayload = {
      id: existingUser.id,
      age: Number(existingUser.age),
      email: existingUser.email,
      name: existingUser.name,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await setRefreshTokenCookie(refreshToken);

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
