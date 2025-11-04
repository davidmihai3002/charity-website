import { createUser } from "@/services/users/createUser";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { userEligibleForRegistering } from "@/lib/middleware/authMiddleware";

const saltRounds = 10;

export async function POST(req: Request) {
  try {
    const receivedUser = await req.json();
    const isUserValidToBeRegistered = await userEligibleForRegistering(
      receivedUser
    );

    if (isUserValidToBeRegistered?.ableToAuth) {
      const hashedPassword = await bcrypt.hash(
        receivedUser.password,
        saltRounds
      );
      const userToRegister = {
        name: receivedUser.name,
        age: receivedUser.age,
        email: receivedUser.email,
        password: hashedPassword,
      };
      const insertId = await createUser(userToRegister);
      if (insertId) {
        return NextResponse.json(
          { message: isUserValidToBeRegistered.message },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            message:
              "We couldn't process your account. Please check your information and try again.",
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: isUserValidToBeRegistered?.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "User not created" }, { status: 500 });
  }
}
