"use client";
import { SessionProvider } from "next-auth/react";
import type { FC } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
