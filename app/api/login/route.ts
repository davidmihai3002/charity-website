import { getSpecificUserByEmail } from "@/services/users/getSpecificUser";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const loginCredentials = await req.json();
    const existingUser =
      (await getSpecificUserByEmail(loginCredentials.email)) ?? null;

    if (existingUser) {
      const isUserValid = await bcrypt.compare(
        loginCredentials.password,
        existingUser.password
      );
      if (!isUserValid) {
        return NextResponse.json(
          { message: "Password incorrect." },
          { status: 401 }
        );
      }

      //   generate access tokens with helper functions from lib
    }
  } catch (error) {}
}
