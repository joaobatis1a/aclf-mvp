import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { awards } from "@/data/content";

export const metadata: Metadata = { title: "Premiações" };

export default function PremiacoesPage() {
  return (
    <>
      <PageHeader eyebrow="Empresa" title="Reconhecimento de quem conhece o mercado.">
        No 30º Troféu ADEMI-PE, a maior premiação do setor imobiliário de Pernambuco, conquistamos cinco troféus.
      </PageHeader>
      <div className="container-x py-16">
        <ul className="grid gap-8 md:grid-cols-2">
          {awards.map((a, i) => (
            <li key={a.name} className={`overflow-hidden rounded-[2rem] bg-white ${i === 0 ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}>
              <div className={`relative ${i === 0 ? "min-h-80" : "aspect-[16/10]"} bg-paper-deep`}>
                <Image src={a.image} alt={`${a.name}`} fill sizes="(min-width: 768px) 40rem, 100vw" className="object-cover" />
              </div>
              <div className="p-8">
                <p className="eyebrow">{a.edition}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-forest">{a.name}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
