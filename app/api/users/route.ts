import { createUser } from "@/models/users/createUser";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const users = await createUser();
        return NextResponse.json(users, {status: 200})
    } catch (error) {
        NextResponse.json({message: "Failed to fetch users"}, {status: 500})
    }
}