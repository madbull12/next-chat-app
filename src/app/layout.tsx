import Providers from "@/components/Providers";
import "./globals.css";
import { Poppins, Roboto } from 'next/font/google';

export const metadata = {
  title: "discu.",
  description: "Next generation chat app",
};

const poppins =Poppins({
  weight: ['300','400','500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={poppins.className}>
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
