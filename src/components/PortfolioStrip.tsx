import Image from "next/image";
import Link from "next/link";
import { byPhase } from "@/data/properties";

export default function PortfolioStrip() {
  const list = byPhase("portfolio");
  return (
    <section className="py-20" aria-labelledby="portfolio">
      <div className="container-x flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portfólio</p>
          <h2 id="portfolio" className="mt-2 font-display text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
            Cada chave entregue é uma promessa cumprida.
          </h2>
        </div>
        <Link href="/empreendimentos/portfolio" className="font-semibold text-brand underline-offset-4 hover:underline">
          Ver todos os {list.length} →
        </Link>
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:thin] sm:px-[max(1rem,calc((100vw-78rem)/2))]">
        {list.map((p) => (
          <li key={p.slug} className="w-64 shrink-0 snap-start">
            <Link href={`/imovel/${p.slug}`} className="group block">
              <div className="arch-sm relative aspect-[3/4]">
                <Image src={p.cover} alt={p.name} fill sizes="16rem" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                <p className="absolute inset-x-4 bottom-5 text-center font-display text-lg font-semibold leading-tight text-white">{p.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
