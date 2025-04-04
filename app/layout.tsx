import type { Metadata } from "next";

import "./globals.css";
import TopBar from "./_components/TopBar";
import NavBar from "./_components/NavBar";
import { TanstackProvider } from "./_components/providers/tanstack-provider";
import { CartProvider } from "./_components/CartContext/CartContext";
import { auth } from "./_lib/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <CartProvider>
          <TanstackProvider>
            <header className="w-full">
              <TopBar />
              <NavBar session={session} />
            </header>
            <main className="flex-grow">
              {children}
            </main>
          </TanstackProvider>
        </CartProvider>
      </body>
    </html>
  );
}