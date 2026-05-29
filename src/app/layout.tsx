import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.SITE_URL || "https://aeronsteels.com";

export const metadata: Metadata = {
  title: {
    default: "Aeron Steels | Steel Manufacturing & Fabrication in Rohtak, Haryana",
    template: "%s | Aeron Steels",
  },
  description:
    "Aeron Steels Private Limited (ASPL) — ISO 9001:2015 certified steel manufacturing, custom fabrication, precision cutting, and durable steel products in Rohtak, Haryana. 10+ years of industrial excellence.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aeron Steels",
    title: "Aeron Steels | Steel Manufacturing & Fabrication",
    description:
      "ISO 9001:2015 certified steel manufacturing, custom fabrication, and precision cutting by Aeron Steels Private Limited, Rohtak, Haryana.",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Aeron Steels Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aeron Steels | Steel Manufacturing & Fabrication",
    description:
      "ISO 9001:2015 certified steel manufacturing and fabrication by Aeron Steels Private Limited.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aeron Steels Private Limited",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description:
    "High-quality steel products, custom fabrication, and precision cutting services.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Khewat no 1306, Village Baniyani, Bhiwani Road",
    addressLocality: "Rohtak",
    addressRegion: "Haryana",
    postalCode: "124001",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8307028125",
    contactType: "sales",
    email: "aeronsteels28@gmail.com",
  },
  knowsAbout: [
    "Steel Manufacturing",
    "Custom Fabrication",
    "Precision Cutting",
    "Component Manufacturing",
    "Mounting Plates",
    "CTL Sheets",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
