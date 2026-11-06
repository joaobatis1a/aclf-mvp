import Image from "next/image";
import Link from "next/link";

const items = ["Piscina com hidromassagem", "Quadra poliesportiva", "Pet place com pet wash", "Brinquedoteca", "Terraço gourmet", "Academia"];

export default function BairroParque() {
  return (
    <section className="bg-forest text-white" aria-labelledby="bairro-parque">
      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div className="relative order-2 lg:order-1">
          <div className="arch relative aspect-[4/5] shadow-2xl shadow-black/30">
            <Image src="/images/properties/solar-paineiras-cover.png" alt="Piscina do condomínio Solar das Paineiras" fill sizes="(min-width: 1024px) 36rem, 90vw" className="object-cover" />
          </div>
          <div className="arch-sm absolute -bottom-6 -right-2 hidden aspect-[3/4] w-40 border-4 border-forest shadow-xl sm:block lg:-right-8">
            <Image src="/images/properties/mirante-paineiras-04.jpg" alt="Quadra do Mirante das Paineiras" fill sizes="10rem" className="object-cover" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow !text-leaf">Lançamento · Paulista</p>
          <h2 id="bairro-parque" className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Paineiras Bairro-Parque
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
            O primeiro bairro-parque de Pernambuco: segurança, organização urbana, acesso rápido à BR-101 e
            ao Paulista North Way Shopping, com o melhor preço por m² da região.
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {items.map((i) => (
              <li key={i} className="flex items-center gap-3 border-b border-white/10 pb-3 text-white/90">
                <span className="size-2 rounded-full bg-teal" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/imovel/mirante-das-paineiras" className="rounded-full bg-teal px-7 py-3.5 font-semibold transition hover:bg-teal-deep">
              Mirante das Paineiras
            </Link>
            <Link href="/imovel/solar-das-paineiras" className="rounded-full border border-white/30 px-7 py-3.5 font-semibold transition hover:bg-white hover:text-forest">
              Solar das Paineiras
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
