import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://noctillio-ai.github.io";

const defaultTitle = `${site.name}: Open-source deep learning tools`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "open source",
    "deep learning",
    "computer vision",
    "image processing",
    "video processing",
    "model training",
    "VLM fine-tuning",
    "PyTorch",
    "AutoTimm",
    "NightFlow",
  ],
  authors: [{ name: "Krishnatheja Vanka", url: "https://theja-vanka.github.io/" }],
  creator: "Krishnatheja Vanka",
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: defaultTitle,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} owl mark on a night sky` }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: "Noctillio-Ai",
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  description: site.description,
  founder: {
    "@type": "Person",
    name: "Krishnatheja Vanka",
    url: "https://theja-vanka.github.io/",
    sameAs: [
      "https://github.com/theja-vanka",
      "https://www.linkedin.com/in/krishnatheja-vanka/",
    ],
  },
  sameAs: [site.githubOrg],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
