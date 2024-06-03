import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./providers/convexprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Generated your podcasts using AI by create next app",
  icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
