"use client";
import DonationsNoAccount from "@/components/donations/DonationsNoAccount";
import { useAuth } from "@/lib/context/AuthContext";

const DonationPage = () => {
  const { user } = useAuth();
  return (
    <div className="w-screen h-fit bg-yellow-light flex flex-col gap-3 items-center justify-center py-35">
      Support our work by donating
      <DonationsNoAccount />
    </div>
  );
};

export default DonationPage;
