import { createUser } from "@/models/users/createUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await req.json();
    const result = await createUser(user);
    const id = typeof result === "number" ? result : result?.insertId ?? null;

    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "User not created" }, { status: 500 });
  }
}
