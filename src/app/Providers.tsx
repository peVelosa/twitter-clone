"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { FC } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
