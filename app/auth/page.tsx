"use client";

import Button from "@/components/layout/Button";
import { apiClient } from "@/lib/connections/api";
import { UserAuth } from "@/lib/types/UserTypes";
import { looseEmailRegex } from "@/lib/validations/emailRegex";
import { loosePasswordRegex } from "@/lib/validations/passwordRegex";
import { useState, type MouseEvent } from "react";

// import { useEffect } from "react";
const AuthPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authFormData, setAuthFormData] = useState<UserAuth>({
    name: "",
    age: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const handleAuthentication = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    try {
      setIsLoading(true);
      const validation = formValidation();
      if (!validation.isSuccessful) {
        setIsLoading(false);
        return;
      }
      const dataToSend = {
        name: authFormData.name,
        age: Number(authFormData.age),
        email: authFormData.email,
        password: authFormData.password,
      };
      const res = await apiClient.post("/auth", dataToSend);

      if (res.status !== 200) {
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formValidation = () => {
    if (!looseEmailRegex.test(authFormData.email)) {
      return {
        isSuccessful: false,
        message: "Invalid email syntax. Try again.",
      };
    }

    if (authFormData.password !== authFormData.repeatPassword) {
      return {
        isSuccessful: false,
        message: "Passwords don't match. Try again.",
      };
    }

    if (
      !loosePasswordRegex.test(authFormData.password) ||
      !loosePasswordRegex.test(authFormData.repeatPassword)
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

  return (
    <div className="flex items-center justify-center ">
      <form action="" onSubmit={handleAuthentication}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          placeholder="Your age"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Your email"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="Your password"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="text"
          name="repeatPassword"
          placeholder="Your password"
          onChange={handleInputChange}
          required
        />

        <Button
          variant="primary"
          buttonType="submit"
          text="Create Account"
          className="hover:scale-[1.05] transition-all"
          onClick={handleAuthentication}
        />
      </form>
    </div>
  );
};

export default AuthPage;
