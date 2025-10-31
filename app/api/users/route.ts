import { getUsers } from "@/services/users/getUsers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Users not found" }, { status: 500 });
  }
}
