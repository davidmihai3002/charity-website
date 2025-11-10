"use client";

import Hero from "@/components/hero/Hero";
import AboutUsHomepageSection from "@/components/layout/AboutUsHomepageSection";
import { apiClient } from "@/lib/connections/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    apiClient.get("/users").then((res) => console.log(res.data));
  }, []);
  return (
    <div className="">
      <Hero />
      <AboutUsHomepageSection />
    </div>
  );
}
