import Button from "./Button";
import Link from "next/link";

export const navLinks = [
  {
    linkTitle: "Account",
    linkUrl: "/login",
  },
  {
    linkTitle: "About Us",
    linkUrl: "/about-us",
  },
  {
    linkTitle: "What we do",
    linkUrl: "/our-process",
  },
  {
    linkTitle: "Media",
    linkUrl: "/media",
  },
  {
    linkTitle: "Contact",
    linkUrl: "/contact",
  },
];

const MainHeader = () => {
  return (
    <div className="w-screen bg-background h-fit flex flex-row justify-between items-center px-[110px] py-[18px] ">
      <Link href={"/"} className="text-2xl text-dark-text">
        ElderHelp
      </Link>
      <div className="w-fit flex flex-row justify-between py-4 gap-10 text-inactive-text">
        {navLinks.map((link, i) => (
          <Link key={i} href={link.linkUrl}>
            {link.linkTitle}
          </Link>
        ))}
      </div>
      <Button variant="navigation" text="Donate" />
    </div>
  );
};

export default MainHeader;
