import Image from "next/image";
import Link from "next/link";

export default function AwardsTeaser() {
  return (
    <section className="container-x pb-20" aria-labelledby="premios">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-paper-deep lg:grid-cols-2">
        <div className="relative min-h-80">
          <Image src="/images/company/award-master.jpg" alt="Equipe com o Troféu Master do 30º Troféu ADEMI-PE" fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
        </div>
        <div className="p-8 sm:p-14">
          <p className="eyebrow">Reconhecimento</p>
          <h2 id="premios" className="mt-2 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-forest">
            Troféu Master no 30º ADEMI-PE, com mais quatro prêmios.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            O Mirante do Frio Residence levou o principal prêmio do mercado imobiliário pernambucano. Somos
            também a primeira empresa do estado com a certificação NDT 1 e temos o selo Casa Azul + Caixa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/premiacoes" className="rounded-full bg-forest px-7 py-3.5 font-semibold text-white transition hover:bg-brand">Ver premiações</Link>
            <Link href="/certificacoes" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-white">Certificações</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
