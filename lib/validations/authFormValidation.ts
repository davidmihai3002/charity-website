import { UserAuth } from "../types/UserTypes";
import { looseEmailRegex } from "./emailRegex";
import { loosePasswordRegex } from "./passwordRegex";

export const authFormValidation = (formData: UserAuth) => {
  if (formData.name.length < 5) {
    return {
      isSuccessful: false,
      message: "Name must be at least 5 characters long.",
    };
  }

  if (Number(formData.age) < 18) {
    return {
      isSuccessful: false,
      message: "You must be 18 or over to sign up.",
    };
  }

  if (!looseEmailRegex.test(formData.email)) {
    return {
      isSuccessful: false,
      message: "Invalid email syntax. Try again.",
    };
  }

  if (formData.password !== formData.repeatPassword) {
    return {
      isSuccessful: false,
      message: "Passwords don't match. Try again.",
    };
  }
  if (
    !loosePasswordRegex.test(formData.password) ||
    !loosePasswordRegex.test(formData.repeatPassword)
  ) {
    return {
      isSuccessful: false,
      message: "Password format incorrect. Try again.",
    };
  }
  return {
    isSuccessful: true,
    message: "Credentials are fine! Waiting for authentication.",
  };
};
