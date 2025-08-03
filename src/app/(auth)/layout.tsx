import type { Metadata } from "next";
import { Poppins, Fredoka } from "next/font/google";
import "../globals.css";
import Auth from "../../../components/organisms/Auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Angkut.in | Smart Waste Management",
  description: "Smart Waste Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${fredoka.variable} antialiased`}>
        <Auth>{children}</Auth>
      </body>
    </html>
  );
}
