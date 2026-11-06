import Image from "next/image";
import Link from "next/link";
import SentenceSearch from "./SentenceSearch";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[44rem] rounded-full bg-leaf/25 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.15fr_1fr] lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow reveal">Paulista · Recife · Caruaru</p>
          <h1 className="reveal mt-5 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[0.98] tracking-tight text-forest [animation-delay:80ms]">
            Um apartamento.
            <br />
            <span className="whitespace-nowrap text-teal">Um bairro-parque</span>
            <br />
            inteiro em volta.
          </h1>
          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-soft [animation-delay:160ms]">
            Há mais de 25 anos transformando Pernambuco em lugar de morar bem. Conheça os lançamentos,
            acompanhe as obras e mude-se para um condomínio clube completo.
          </p>
          <div className="reveal mt-10 [animation-delay:240ms]">
            <SentenceSearch />
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none [animation-delay:200ms]">
          <div className="arch relative aspect-[3/4] shadow-2xl shadow-forest/25">
            <Image
              src="/images/properties/mirante-paineiras-01.jpg"
              alt="Vista aérea das áreas de lazer do Mirante das Paineiras"
              fill
              priority
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover"
            />
          </div>
          <Link
            href="/imovel/mirante-das-paineiras"
            className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-forest px-6 py-3 text-sm font-medium text-white shadow-xl transition hover:bg-brand"
          >
            <span className="size-2 rounded-full bg-teal" aria-hidden />
            Lançamento · Mirante das Paineiras
          </Link>
        </div>
      </div>
    </section>
  );
}
