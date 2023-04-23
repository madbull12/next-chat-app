"use client"

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </SessionProvider>
  );
};

export default Providers;
