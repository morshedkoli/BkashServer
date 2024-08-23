import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ikram Telecom",
  description: "App Based fund Transfer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const cookieStore = cookies()
  const token = cookieStore.get("token")
  let isLogin = false;
  isLogin = typeof token !== "undefined";
  return (
    <html lang="en">
      <body >

        <Navbar isLogin={isLogin}/>

        <div className="flex flex-col md:flex-row">
    <div className={`bg-secondary  md:w-60 ${isLogin?" ": "hidden"} `}>
      <Sidebar />
    </div>
    <main className="flex-1">{children}</main>
    </div>
            <Toaster />

            

        </body>
    </html>
  );
}
