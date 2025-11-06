import Link from "next/link";

const UserAlreadyLoggedIn = () => {
  return (
    <div className="flex items-center justify-center w-screen flex-1 bg-yellow-light">
      User already logged in
      <Link href={"/"}>Go to home</Link>
    </div>
  );
};

export default UserAlreadyLoggedIn;
