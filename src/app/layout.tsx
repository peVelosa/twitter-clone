import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./Providers";
import Sidebar from "./components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${inter.className} min-h-screen w-screen bg-default text-default `}
        >
          <Sidebar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
