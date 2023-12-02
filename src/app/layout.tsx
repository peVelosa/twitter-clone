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
      <html lang="en" className="dark">
        <body
          className={`${inter.className} min-h-screen w-screen overflow-x-hidden bg-default pb-8 text-default`}
        >
          <div className="mx-auto flex max-w-4xl flex-row pl-4 pr-8">
            <Sidebar />
            <main className="w-full">{children}</main>
            <ReactQueryDevtools initialIsOpen={false} position="right" />
          </div>
        </body>
      </html>
    </Providers>
  );
}
