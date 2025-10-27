import { createUser } from "@/models/users/createUser";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}
export const Auth = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="submit" onSubmit={(e) => handleAuth(e)}>
      <input
        type="text"
        placeholder="email"
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            email: e.target.value,
          }))
        }
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            password: e.target.value,
          }))
        }
      />
      <button type="submit">Sign up</button>
    </form>
  );
};
