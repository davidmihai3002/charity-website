"use client";

import { useAuth } from "@/lib/context/AuthContext";
import Button from "./Button";
import Link from "next/link";
import { navLinks, userNavLinks } from "@/lib/auth/navLinks";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const { user, logout } = useAuth();
  const links = user ? userNavLinks : navLinks;
  const router = useRouter();

  return (
    <div className="w-screen bg-background h-fit flex flex-row justify-between items-center px-[110px] py-[18px] ">
      {user && (
        <>
          <p>{user.name}</p>
          <button onClick={() => logout()}>Log out</button>
        </>
      )}
      <Link href={"/"} className="text-2xl text-dark-text">
        ElderHelp
      </Link>
      <div className="w-fit flex flex-row justify-between py-4 gap-10 text-inactive-text">
        {links.map((link, i) => (
          <Link key={i} href={link.linkUrl}>
            {link.linkTitle}
          </Link>
        ))}
      </div>
      <Button
        variant="navigation"
        text="Donate"
        onClick={() => router.push("/donate")}
      />
    </div>
  );
};

export default MainHeader;
