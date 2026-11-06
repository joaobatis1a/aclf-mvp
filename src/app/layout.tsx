import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { site } from "@/config/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name}: apartamentos em Pernambuco`,
    template: `%s · ${site.name}`,
  },
  description:
    "Lançamentos, obras em andamento e imóveis prontos para morar em Paulista, Recife e Caruaru.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${figtree.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SmoothScroll>
          <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3">
            Pular para o conteúdo
          </a>
          <Nav />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
