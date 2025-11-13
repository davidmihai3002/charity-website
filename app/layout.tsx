import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/layout/MainHeader";
import { AuthProvider } from "@/lib/context/AuthContext";
import MainFooter from "@/components/layout/MainFooter";
import { DonationsProvider } from "@/lib/context/DonationsContext";

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
    <AuthProvider>
      <DonationsProvider>
        <html lang="en">
          <body className={`w-screen min-h-screen flex flex-col`}>
            <MainHeader />
            {children}
            <MainFooter />
          </body>
        </html>
      </DonationsProvider>
    </AuthProvider>
  );
}
