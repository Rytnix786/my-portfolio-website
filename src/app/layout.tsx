import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const title = "Mehedi Hasan | AI Systems Engineer";
const description =
  "Portfolio of Mehedi Hasan, an AI Systems Engineer building production RAG, multi-agent workflows, backend systems, and full-stack AI products.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mehedi-hasan-portfolio.vercel.app"),
  title,
  description,
  authors: [{ name: "Mehedi Hasan" }],
  creator: "Mehedi Hasan",
  keywords: [
    "Mehedi Hasan",
    "AI Systems Engineer",
    "RAG",
    "Multi-Agent Systems",
    "LangGraph",
    "FastAPI",
    "Next.js",
    "Backend Engineering",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/mehedi-hasan-profile.jpg",
        width: 957,
        height: 960,
        alt: "Mehedi Hasan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/mehedi-hasan-profile.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
