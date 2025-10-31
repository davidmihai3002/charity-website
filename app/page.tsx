"use client";

import { useEffect } from "react";

interface User {
  id: number;
  name: string;
  age: string;
  email: string;
  password: string;
}

export default function Home() {
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users: User[]) => console.log(users));
  }, []);
  return <div className=""></div>;
}
