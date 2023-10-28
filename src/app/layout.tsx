import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./Providers";
import Sidebar from "./components/Sidebar/Sidebar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
          className={`${inter.className} min-h-screen w-screen bg-default text-default`}
        >
          <div className="mx-auto flex max-w-3xl flex-row">
            <Sidebar />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </body>
      </html>
    </Providers>
  );
}
