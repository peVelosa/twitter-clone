import Providers from "./Providers";
import Sidebar from "./components/sidebar/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-screen bg-gray-900 text-white">
          <div className="flex max-w-3xl w-full mx-auto gap-2">
            <Providers>
              <Sidebar />
              <main className="border-x-2 border-gray-500 w-full">
                {children}
              </main>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
