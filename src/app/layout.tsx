import type { Metadata } from "next";
import { Big_Shoulders, Familjen_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { VideoProvider } from "@/components/video/VideoPlayer";
import { site } from "@/config/site";

// Display: condensed, signage-like, drawn from urban architecture lettering.
const display = Big_Shoulders({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
});

// Body: a Swedish grotesque with its own drawing (the "g", the "a"), easy to read at length.
const body = Familjen_Grotesk({
  variable: "--font-body-face",
  subsets: ["latin", "latin-ext"],
});

// Labels and data: a technical mono, slightly condensed, like a drawing's title block.
const mono = Martian_Mono({
  variable: "--font-mono-face",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
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
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SmoothScroll>
          <VideoProvider>
          <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3">
            Pular para o conteúdo
          </a>
          <Nav />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          </VideoProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
