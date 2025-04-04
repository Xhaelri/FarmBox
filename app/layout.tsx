import type { Metadata } from "next";

import "./globals.css";
import TopBar from "./_components/TopBar";
import NavBar from "./_components/NavBar";
import { TanstackProvider } from "./_components/providers/tanstack-provider";

export const metadata: Metadata = {
  title: "FarmBox",
  description: "E-commerce website for farm products",
  keywords: [
    "farm products",
    "e-commerce",
    "online shopping",
    "agriculture",
    "organic",
    "sustainable",
    "farmers market",
    "fresh produce",
    "local food",
    "farmbox",
    "farm to table",
    "farm delivery",
    "farm subscription",
    "farm fresh",
    "farm produce",
    "farm goods",
    "farm store",
  ],
  authors: [
    {
      name: "FarmBox Team",
    },
  ],
  creator: "FarmBox Team",
  publisher: "FarmBox Team",
  openGraph: {
    title: "FarmBox",
    description: "E-commerce website for farm products",
    siteName: "FarmBox",
  },
  icons: {
    icon: "/app/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <header className="w-full">
          <TopBar />
          <NavBar />
        </header>
        <main className="flex-grow">
        <TanstackProvider>{children}</TanstackProvider>
        </main>
      </body>
    </html>
  );
}