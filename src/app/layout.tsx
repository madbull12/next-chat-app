import Providers from "@/components/Providers";
import "./globals.css";
import { Poppins, Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
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
        <NextTopLoader
            color="hsl(111, 100%, 47%)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            // shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
