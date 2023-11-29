"use client";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState, type FC } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};


const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
