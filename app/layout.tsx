import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/layout/MainHeader";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "ElderHelp",
  description: "Here to aid the old",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-screen h-screen`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
