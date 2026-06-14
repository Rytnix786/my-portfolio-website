import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollReset } from "@/components/ui/scroll-reset";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
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
  themeColor: "#020804",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mehedi Hasan",
  "jobTitle": "AI Systems Engineer",
  "url": "https://mehedi-hasan-portfolio.vercel.app",
  "sameAs": [
    "https://github.com/Rytnix786",
    "https://www.linkedin.com/in/mehedi-hasan-llm"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dhaka",
    "addressCountry": "Bangladesh"
  }
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Mehedi Hasan | AI Systems Engineer Portfolio",
  "description": "Portfolio of Mehedi Hasan, an AI Systems Engineer building production RAG, multi-agent workflows, backend systems, and full-stack AI products.",
  "url": "https://mehedi-hasan-portfolio.vercel.app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Synchronous scroll reset — must run before browser restores scroll position.
            useEffect fires too late; this inline script runs during HTML parsing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = 'manual'; window.scrollTo(0, 0);`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
      </head>
      <body>
        <ScrollReset />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
