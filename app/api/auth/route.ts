import { createUser } from "@/services/users/createUser";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUsers } from "@/services/users/getUsers";
import { strictEmailRegex } from "@/lib/validations/emailRegex";

const saltRounds = 10;

export async function POST(req: Request) {
  console.log("route.ts loaded"); // top of the file

  try {
    const receivedUser = await req.json();
    console.log("Received user:", receivedUser);

    const isUserAlreadyRegistered = async () => {
      const databaseUsers = await getUsers();
      const isRegisteredUser = databaseUsers.findIndex(
        (user) => user.email === receivedUser.email
      );

      if (isRegisteredUser >= 0) {
        return true;
      }
      return false;
    };

    const isEmailSyntaxValid = () => {
      return strictEmailRegex.test(receivedUser.email);
    };
    console.log("Email valid:", isEmailSyntaxValid());
    console.log("User already exists:", await isUserAlreadyRegistered());

    const userEligibleForRegistering = async () => {
      const userAlreadyExists = await isUserAlreadyRegistered();
      const emailSyntaxValidity = isEmailSyntaxValid();

      if (!userAlreadyExists && emailSyntaxValidity) {
        return true;
      }
      return false;
    };

    const isUserValidToBeRegistered = await userEligibleForRegistering();

    if (isUserValidToBeRegistered) {
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
      const result = await createUser(userToRegister);
      console.log("Create user result:", result);

      if (result?.insertId) {
        return NextResponse.json({ message: "User created" }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Unable to register user" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "User not createdd" },
        { status: 500 }
      );
    }

    // const hashedPassword = await bcrypt.hash(receivedUser.password, saltRounds);

    // const userToRegister = {
    //   name: receivedUser.name,
    //   age: receivedUser.age,
    //   email: receivedUser.email,
    //   password: hashedPassword,
    // };
    // const result = await createUser(userToRegister);
    // const id = typeof result === "number" ? result : result?.insertId ?? null;

    // return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "User not created" }, { status: 500 });
  }
}
