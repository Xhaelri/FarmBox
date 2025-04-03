import type { Metadata } from "next";
import FilterBar from "../_components/FilterBar";


export const metadata: Metadata = {
  title: "Shop",
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
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <main>
          <FilterBar/>
          {children}
        </main>
  );
}