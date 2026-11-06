import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import PropertyCard, { specsOf } from "@/components/PropertyCard";
import { site } from "@/config/site";
import { getProperty, phaseLabel, properties } from "@/data/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/imovel/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function PropertyPage({ params }: PageProps<"/imovel/[slug]">) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const where = [p.neighborhood, p.city].filter(Boolean).join(" · ");
  const specs = specsOf(p);
  const wa = `${site.whatsappHref}?text=${encodeURIComponent(`Olá! Quero saber mais sobre o ${p.name}.`)}`;
  const related = properties.filter((o) => o.slug !== p.slug && o.phase === p.phase).slice(0, 3);

  return (
    <>
      <section className="relative">
        <div className="relative h-[62vh] min-h-[26rem] w-full bg-forest">
          <Image src={p.cover} alt={`${p.name}`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
          <div className="container-x absolute inset-x-0 bottom-0 pb-10 text-white">
            <nav aria-label="Trilha" className="mb-4 text-sm text-white/70">
              <Link href="/empreendimentos" className="hover:text-white">Empreendimentos</Link> / {p.name}
            </nav>
            <span className="rounded-full bg-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">{phaseLabel[p.phase]}</span>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-none tracking-tight sm:text-7xl">{p.name}</h1>
            {where && <p className="mt-3 text-lg text-white/85">{where}</p>}
          </div>
        </div>
      </section>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-14">
          <div>
            <p className="font-display text-2xl leading-snug text-forest sm:text-3xl">{p.summary}</p>
            {specs.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {specs.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold">{s}</li>
                ))}
              </ul>
            )}
          </div>

          {p.amenities && (
            <section aria-labelledby="lazer">
              <p className="eyebrow">Lazer</p>
              <h2 id="lazer" className="mt-2 font-display text-3xl font-semibold">O condomínio clube</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4">
                    <span className="size-2.5 rounded-full bg-teal" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.highlights && (
            <section aria-labelledby="diferenciais">
              <p className="eyebrow">Diferenciais</p>
              <h2 id="diferenciais" className="mt-2 font-display text-3xl font-semibold">Por que aqui</h2>
              <ul className="mt-6 space-y-3 text-lg">
                {p.highlights.map((h) => (
                  <li key={h} className="border-b border-line pb-3">{h}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-[2rem] bg-forest p-8 text-white">
            <p className="eyebrow !text-leaf">Fale com a gente</p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">Quer conhecer o {p.name}?</h2>
            <p className="mt-3 text-white/75">A conversa já começa com o empreendimento escolhido.</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-full bg-teal px-6 py-3.5 text-center font-semibold text-white transition hover:bg-teal-deep">
              Chamar no WhatsApp
            </a>
            <a href={site.phoneHref} className="mt-3 block rounded-full border border-white/25 px-6 py-3.5 text-center font-medium transition hover:bg-white hover:text-forest">
              Ligar {site.phone}
            </a>
          </div>
        </aside>
      </div>

      {p.gallery && (
        <section className="container-x pb-14" aria-labelledby="galeria">
          <p className="eyebrow">Galeria</p>
          <h2 id="galeria" className="mb-6 mt-2 font-display text-3xl font-semibold">Veja o projeto por dentro e por fora</h2>
          <Gallery images={p.gallery} name={p.name} />
        </section>
      )}

      {p.floorPlan && (
        <section className="container-x pb-14" aria-labelledby="planta">
          <p className="eyebrow">Planta</p>
          <h2 id="planta" className="mb-6 mt-2 font-display text-3xl font-semibold">Apartamento tipo</h2>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-white">
            <Image src={p.floorPlan} alt={`Planta do apartamento tipo do ${p.name}`} fill sizes="(min-width: 1024px) 70rem, 100vw" className="object-contain p-4" />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container-x pb-8" aria-labelledby="outros">
          <h2 id="outros" className="mb-8 font-display text-3xl font-semibold">Outros em “{phaseLabel[p.phase].toLowerCase()}”</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}><PropertyCard property={r} /></li>
            ))}
          </ul>
        </section>
      )}

      <div className="container-x pb-4">
        <p className="text-xs leading-relaxed text-ink-soft">
          Imagens ilustrativas, sujeitas a alterações. {p.registry}
        </p>
      </div>
    </>
  );
}
