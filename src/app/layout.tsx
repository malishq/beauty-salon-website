import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Onest } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";

const body = Onest({ variable: "--font-onest", subsets: ["latin", "cyrillic"], weight: ["400", "500", "600"] });
const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description, type: "website", locale: "ru_RU" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${body.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <Script id="js-flag" strategy="beforeInteractive">{`document.documentElement.classList.add("js")`}</Script>
        <SmoothScroll>
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
