import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/SiteHeader";
import { CompareDrawer } from "@/components/CompareDrawer";

const modelo = localFont({
  src: [
    {
      path: "../../public/fonts/ModeloThin.woff2",
      weight: "200",
      style: "normal"
    },
    {
      path: "../../public/fonts/ModeloLight.woff2",
      weight: "300",
      style: "normal"
    },
    {
      path: "../../public/fonts/ModeloRegular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/ModeloBold.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-modelo",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"]
});

export const metadata: Metadata = {
  title: "NNormal Finder",
  description: "Compara models de NNormal i troba la sabata ideal per al teu trail.",
  metadataBase: new URL("https://www.nnormal.com")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ca" className={modelo.variable}>
      <body>
        <Providers>
          <div className="min-h-screen pb-24">
            <SiteHeader />
            <main>{children}</main>
            <footer className="border-t border-[var(--border)] py-8 text-center text-sm font-light text-steel">
              NNormal Shoe Finder - dissenyat per comparar i decidir més ràpid.
            </footer>
          </div>
          <CompareDrawer />
        </Providers>
      </body>
    </html>
  );
}
