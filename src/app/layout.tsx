import Providers from "@/components/Providers";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "discu.",
  description: "Next generation chat app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
