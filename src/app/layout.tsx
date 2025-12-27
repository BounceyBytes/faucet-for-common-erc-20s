import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CommonTokens Faucet",
  description: "Mint canonical testnet tokens on MANTRA Chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(outfit.variable, "bg-background min-h-screen antialiased text-foreground selection:bg-mantra-pink/30")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
