"use client";
import { createContext, useContext, useState } from "react";
import { apiClient } from "../connections/api";
import { useAuth } from "./AuthContext";

export interface DonationsContextProps {
  submitDonation: (e?: React.FormEvent<HTMLFormElement>) => void;

  donationsFormData: DonationsProps | null;
  setDonationsFormData: React.Dispatch<
    React.SetStateAction<DonationsProps | null>
  >;
}
export interface DonationsProps {
  name: string;
  email: string;
  amount: number;
  message?: string;
  userId?: number;
}

const DonationsContext = createContext<DonationsContextProps | null>(null);

export function DonationsProvider({ children }: { children: React.ReactNode }) {
  const [donationsFormData, setDonationsFormData] =
    useState<DonationsProps | null>(null);
  const { getLoggedUserId } = useAuth();

  const submitDonation = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    try {
      const dataToSend = {
        name: donationsFormData?.name,
        email: donationsFormData?.email,
        amount: Number(donationsFormData?.amount),
        message: donationsFormData?.message ?? null,
        userId: getLoggedUserId(),
      };
      apiClient.post("/donate", dataToSend);
      console.log("donated");

      //   TODO: Continue with this function, add api route also
    } catch (error) {}
  };

  const passedValues = {
    submitDonation,
    donationsFormData,
    setDonationsFormData,
  };

  return (
    <DonationsContext.Provider value={passedValues}>
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationsContext);
  if (!context) {
    throw new Error("There has been a problem");
  }
  return context;
}
