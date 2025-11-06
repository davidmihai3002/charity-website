"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { apiClient } from "../connections/api";
import { LoginFormData } from "../types/AuthTypes";
import { DisplayUser } from "../types/UserTypes";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../auth/JWTUtilities";

export interface AuthContextTypes {
  accessToken: string | null;
  login: ({
    loginData,
    e,
  }: {
    loginData: LoginFormData;
    e: React.FormEvent<HTMLFormElement>;
  }) => void;
  logout: () => void;
  user: DisplayUser | null;
  setUser: React.Dispatch<React.SetStateAction<DisplayUser | null>>;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<DisplayUser | null>(null);
  const hasInitialized = useRef(false);

  const login = async ({
    loginData,
    e,
  }: {
    loginData: LoginFormData;
    e: React.FormEvent<HTMLFormElement>;
  }) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/login", loginData);
      if (response.status !== 200) {
        setUser(null);
        setAccessToken(null);
        console.log("login unsuccessful", response.data);
        return;
      }

      const { accessToken } = response.data;
      const decodedUser = jwtDecode<TokenPayload>(accessToken);
      setAccessToken(accessToken);
      setUser(decodedUser);
    } catch (error) {
      console.log(error);
      setUser(null);
      setAccessToken(null);
    } finally {
      // window.location.reload();
    }
  };
  const logout = async () => {
    try {
      await apiClient.post("/logout");
      setAccessToken(null);
      setUser(null);
    } catch (error) {
      console.log("Logout failed");
    }
  };

  const passedValues = {
    accessToken,
    login,
    logout,
    user,
    setUser,
  };

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeAuth = async () => {
      try {
        const response = await apiClient.get("/refresh");
        const { accessToken } = response.data;

        const decoded = jwtDecode<TokenPayload>(accessToken);
        console.log(decoded);

        setAccessToken(accessToken);
        setUser(decoded);
      } catch (error) {
        console.log("User not logged in or refresh failed");
        setUser(null);
        setAccessToken(null);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={passedValues}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
