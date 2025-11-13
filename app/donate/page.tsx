"use client";
import DonationAccount from "@/components/donations/DonationAccount";
import DonationsNoAccount from "@/components/donations/DonationsNoAccount";
import { useAuth } from "@/lib/context/AuthContext";

const DonationPage = () => {
  const { user } = useAuth();
  const chooseDonationForm = () => {
    switch (user) {
      default:
        return <DonationAccount />;
      case null:
        return <DonationsNoAccount />;
    }
  };
  return (
    <div className="w-screen h-fit bg-yellow-light flex flex-col gap-3 items-center justify-center py-20">
      Support our work by donating
      {chooseDonationForm()}
    </div>
  );
};

export default DonationPage;
