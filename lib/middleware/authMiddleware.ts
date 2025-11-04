import { getUsers } from "@/services/users/getUsers";
import { User } from "../types/UserTypes";
import { strictEmailRegex } from "../validations/emailRegex";

export const isUserAlreadyRegistered = async (user: User) => {
  const databaseUsers = await getUsers();
  const isRegisteredUser = databaseUsers.findIndex(
    (searchedUser) => searchedUser.email === user.email
  );

  if (isRegisteredUser >= 0) {
    return true;
  }
  return false;
};

export const isEmailSyntaxValid = (user: User) => {
  return strictEmailRegex.test(user.email);
};

export const userEligibleForRegistering = async (user: User) => {
  const userAlreadyExists = await isUserAlreadyRegistered(user);
  const emailSyntaxValidity = isEmailSyntaxValid(user);

  if (userAlreadyExists) {
    return {
      ableToAuth: false,
      message: "A user with this email already exists.",
    };
  }

  if (!emailSyntaxValidity) {
    return {
      ableToAuth: false,
      message: "Email address invalid.",
    };
  }

  if (!userAlreadyExists && emailSyntaxValidity) {
    return {
      ableToAuth: true,
      message: "Authentication successful!",
    };
  }
};
