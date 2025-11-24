import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import ConditionalShell from "../components/ConditionalShell"

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
    // <html lang="en">
    //   <body className={`${inter.variable} ${poppins.variable} antialiased`}>
    //     {/* <Navbar />
    //     {children}
    //     <Footer /> */}
    //     <ConditionalShell>{children}</ConditionalShell>
    //   </body>
    // </html>
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${poppins.variable} ${montSerrat.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
