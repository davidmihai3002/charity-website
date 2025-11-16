"use client";
import { createContext, useContext, useState } from "react";
import { apiClient } from "../connections/api";
import { useAuth } from "./AuthContext";

export interface DonationsContextProps {
  submitDonation: (e?: React.FormEvent<HTMLFormElement>) => void;
  infoMessage: InfoMessageType | null;
  isLoading: boolean;
  donationsFormData: DonationsProps | null;
  setDonationsFormData: React.Dispatch<
    React.SetStateAction<DonationsProps | null>
  >;
}
export interface DonationsProps {
  name: string;
  email: string;
  amount: string;
  message?: string;
  userId?: number;
}

export interface InfoMessageType {
  type: "error" | "success" | "";
  message: string;
}

const DonationsContext = createContext<DonationsContextProps | null>(null);

export function DonationsProvider({ children }: { children: React.ReactNode }) {
  const [donationsFormData, setDonationsFormData] =
    useState<DonationsProps | null>({
      name: "",
      email: "",
      amount: "",
      message: "",
      userId: undefined,
    });
  const [infoMessage, setInfoMessage] = useState<InfoMessageType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getLoggedUserId, user } = useAuth();

  const submitDonation = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const dataToSend = {
        name: user ? user.name : donationsFormData?.name,
        email: user ? user.email : donationsFormData?.email,
        amount: Number(donationsFormData?.amount),
        message:
          donationsFormData?.message?.length! > 0
            ? donationsFormData?.message
            : "none",
        userId: getLoggedUserId(),
      };
      const res = await apiClient.post("/donate", dataToSend);
      if (res.status === 200) {
        setIsLoading(false);
        setInfoMessage({ type: "success", message: res.data.message });
      }
      //   TODO: Continue with this function, add api route also
    } catch (error) {
      setIsLoading(false);
      setInfoMessage({
        type: "error",
        message:
          "Your donation could not be processed. Please check your credentials and try again.",
      });
    }
  };

  const passedValues = {
    submitDonation,
    infoMessage,
    isLoading,
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
