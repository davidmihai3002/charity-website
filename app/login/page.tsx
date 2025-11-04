"use client";

import AuthInfoMessage from "@/components/auth/InfoMessage";
import LoadingSpinner from "@/components/auth/LoadingSpinner";
import ElderhelpLogo from "@/components/business/ElderhelpLogo";
import Button from "@/components/layout/Button";
import { useAuth } from "@/lib/context/AuthContext";
import { AuthMessage } from "@/lib/types/ErrorTypes";
import React, { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<AuthMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen flex-1 bg-yellow-light gap-10">
      <ElderhelpLogo className="italic font-semibold text-3xl" />
      <div className="flex flex-col items-center h-fit p-4 rounded-md gap-4 w-[35vw] bg-white shadow-md">
        <div className="w-fit h-fit flex flex-col items-center gap-1.5">
          <p className="text-2xl">Welcome!</p>
          <p className="text-sm">Log into your account</p>
        </div>
        <form
          action=""
          onSubmit={() => login(loginFormData)}
          className="flex flex-col w-full gap-10"
        >
          <div className="w-full px-4 flex flex-col gap-5">
            <div className="w-full flex justify-between">
              <label htmlFor="email" className="text-xl font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Your email"
                onChange={handleInputChange}
                className="w-1/2 px-2 focus:outline-yellow-light"
                required
              />
            </div>

            <div className="w-full flex justify-between">
              <label htmlFor="password" className="text-xl font-medium">
                Password
              </label>
              <input
                type="text"
                name="password"
                placeholder="Your password"
                onChange={handleInputChange}
                className="w-1/2 px-2 focus:outline-yellow-light"
                required
              />
            </div>
          </div>
          {message && (
            <AuthInfoMessage
              type={message.type}
              message={message.text ?? "An unexpected error occured"}
            />
          )}
          <Button
            variant="primary"
            buttonType="submit"
            text={isLoading ? <LoadingSpinner /> : "Create Account"}
            className="hover:scale-[1.02] transition-all"
            onClick={() => login(loginFormData)}
          />
        </form>
      </div>
      {/* <p>Forgot your password? Reset Password</p> */}
    </div>
  );
};

export default LoginPage;
