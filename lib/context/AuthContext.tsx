"use client";

import { createContext, useContext, useState } from "react";
import { apiClient } from "../connections/api";
import { LoginFormData } from "../types/AuthTypes";
import { User } from "../types/UserTypes";

export interface AuthContextTypes {
  login: (loginData: LoginFormData) => void;
  logout: () => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const login = async (loginData: LoginFormData) => {
    try {
      const response = await apiClient.post("/login", loginData);
      if (response.status === 200) {
        setUser(response.data.body);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {};

  const passedValues = {
    login,
    logout,
    user,
    setUser,
  };

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
