"use client";

import AuthInfoMessage from "@/components/auth/InfoMessage";
import LoadingSpinner from "@/components/auth/LoadingSpinner";
import ElderhelpLogo from "@/components/business/ElderhelpLogo";
import Button from "@/components/layout/Button";
import { apiClient } from "@/lib/connections/api";
import { useAuth } from "@/lib/context/AuthContext";
import { AuthMessage } from "@/lib/types/ErrorTypes";
import { UserAuth } from "@/lib/types/UserTypes";
import { authFormValidation } from "@/lib/validations/authFormValidation";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

// import { useEffect } from "react";
const AuthPage = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<AuthMessage | null>(null);
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
      const validation = authFormValidation(authFormData);
      if (!validation.isSuccessful) {
        setIsLoading(false);
        setMessage({
          type: "error",
          text: validation.message,
        });
        return;
      }
      const dataToSend = {
        name: authFormData.name,
        age: Number(authFormData.age),
        email: authFormData.email,
        password: authFormData.password,
      };
      const res = await apiClient.post("/auth", dataToSend);

      if (res.status === 200) {
        setMessage({
          type: "success",
          text: res.data.message,
        });

        const dataToLogin = {
          email: authFormData.email,
          password: authFormData.password,
        };

        login({ loginData: dataToLogin, e });
      }
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setMessage({
          type: "error",
          text: error.response?.data.message || "Something went wrong",
        });
      } else {
        setMessage({
          type: "error",
          text: "Network error or server not reachable",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-[70vh] bg-yellow-light gap-10">
      <ElderhelpLogo className="italic font-semibold text-3xl" />
      <div className="flex flex-col items-center h-fit p-4 rounded-md gap-4 w-[35vw] bg-white shadow-md">
        <div className="w-fit h-fit flex flex-col items-center gap-1.5">
          <p className="text-2xl">Welcome!</p>
          <p className="text-sm">Create you account with us</p>
        </div>
        <form
          action=""
          onSubmit={handleAuthentication}
          className="flex flex-col w-full gap-10"
        >
          <div className="w-full px-4 flex flex-col gap-5">
            <div className="w-full flex justify-between">
              <label htmlFor="name" className="text-xl font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={handleInputChange}
                className="w-1/2 px-2 focus:outline-yellow-light"
                required
              />
            </div>

            <div className="w-full flex justify-between">
              <label htmlFor="age" className="text-xl font-medium">
                Age
              </label>
              <input
                type="text"
                name="age"
                placeholder="Your age"
                onChange={handleInputChange}
                className="w-1/2 px-2 focus:outline-yellow-light"
                required
              />
            </div>

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

            <div className="w-full flex justify-between">
              <label htmlFor="repeatPassword" className="text-xl font-medium">
                Repeat Password
              </label>
              <input
                type="text"
                name="repeatPassword"
                placeholder="Repeat your password"
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
            onClick={handleAuthentication}
          />
        </form>
      </div>
      <div>
        Existing User?{" "}
        <Link href={"/login"} className="text-blue-500">
          Log in
        </Link>{" "}
      </div>
    </div>
  );
};

export default AuthPage;
