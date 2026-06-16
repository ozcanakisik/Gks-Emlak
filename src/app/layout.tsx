import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Sanayi & Fabrika Gayrimenkulü`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "kiralık fabrika",
    "satılık fabrika",
    "sanayi arsası",
    "fabrika deposu",
    "Silivri sanayi",
    "Çerkezköy fabrika",
    "Çorlu sanayi arsası",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: `${site.name} — Sanayi & Fabrika Gayrimenkulü`,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${archivo.variable} ${hanken.variable}`}>
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
