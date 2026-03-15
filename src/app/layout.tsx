import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import ConditionalShell from "../components/ConditionalShell"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const montSerrat = localFont({
  src: "./fonts/Montserrat.ttf",
  variable: "--font-poiret",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${poppins.variable} ${montSerrat.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConditionalShell>{children}</ConditionalShell>
        <SpeedInsights />
      </body>
    </html>
  );
}
