"use client";

import { navLinks, userNavLinks } from "@/lib/auth/navLinks";
import ElderhelpLogo from "../business/ElderhelpLogo";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

const MainFooter = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const { user } = useAuth();

  const links = user ? userNavLinks : navLinks;

  const handleEmailRegistration = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    window.alert(`Your email, ${userEmail}, has been successfully sent`);
  };

  return (
    <div className="w-screen h-fit py-22 px-29 bg-foreground flex flex-row items-start justify-between text-light-text">
      <ElderhelpLogo className="text-light-text!" />
      <div className="flex flex-row gap-22">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold mb-2">Home</p>
          {links.map((link, index) => (
            <Link href={link.linkUrl} key={index} className="text-sm">
              {link.linkTitle}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold mb-2">Home</p>
          {links.map((link, index) => (
            <Link href={link.linkUrl} key={index} className="text-sm">
              {link.linkTitle}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold mb-2">Home</p>
          {links.map((link, index) => (
            <Link href={link.linkUrl} key={index} className="text-sm">
              {link.linkTitle}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h2 className="text-[40px] font-bold max-w-[440px] leading-[140%]">
          Subscribe to get the latest updates
        </h2>
        <form
          className="flex flex-row w-fit"
          onSubmit={handleEmailRegistration}
        >
          <input
            value={userEmail}
            placeholder="Your email"
            className="px-2 border border-light-text focus:outline-none"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <div className="w-[136px]">
            <Button
              text="Subscribe"
              variant="secondary"
              className="rounded-none!"
              buttonType="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainFooter;
