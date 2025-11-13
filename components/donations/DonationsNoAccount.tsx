import { useDonations } from "@/lib/context/DonationsContext";
import DonationsWrapper from "./DonationsWrapper";
import Button from "../layout/Button";
import { useCallback } from "react";
import Link from "next/link";

const DonationsNoAccount = () => {
  const { submitDonation } = useDonations();
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      submitDonation(e);
    },
    [submitDonation]
  );
  return (
    <>
      <DonationsWrapper>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-7"
        >
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-row gap-5 justify-between w-full">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="name"
                className="border px-1.5 border-foreground rounded-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-row gap-5 justify-between w-full">
              <label htmlFor="email">Your email</label>
              <input
                type="text"
                name="email"
                className="border px-1.5 border-foreground rounded-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-row gap-5 justify-between w-full">
              <label htmlFor="amount">Enter Amount</label>
              <input
                type="text"
                name="amount"
                className="border px-1.5 border-foreground rounded-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-row gap-5 justify-between w-full">
              <label htmlFor="message">Your message (optional)</label>
              <input
                type="text"
                name="message"
                className="border px-1.5 border-foreground rounded-sm focus:outline-none"
              />
            </div>
          </div>
          <Button variant="primary" text="Donate now" buttonType="submit" />
        </form>
      </DonationsWrapper>
      <div className="mt-5">
        This is a donation without an account.{" "}
        <Link href={"/login"} className={"text-blue-500"}>
          Create one here
        </Link>
      </div>
    </>
  );
};

export default DonationsNoAccount;
