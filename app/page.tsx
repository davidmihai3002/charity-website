"use client";

import { Auth } from "@/components/Auth";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  age: string;
  email: string;
  password: string;
}

export default function Home() {
  return (
    <div className="">
      <Auth />
    </div>
  );
}
