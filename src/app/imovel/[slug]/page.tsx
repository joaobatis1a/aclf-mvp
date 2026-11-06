import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { Reveal } from "@/components/motion/Reveal";
import DetailHero from "@/components/property/DetailHero";
import HoverPreviewList from "@/components/ui/HoverPreviewList";
import { site } from "@/config/site";
import { getProperty, phaseDot, phaseLabel, properties, specList } from "@/data/properties";

// Pages are fully prerendered via generateStaticParams, so blocking validation is unnecessary.
export const instant = false;

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
  const specs = specList(p);
  const wa = `${site.whatsappHref}?text=${encodeURIComponent(`Olá! Quero saber mais sobre o ${p.name}.`)}`;
  const related = properties.filter((o) => o.slug !== p.slug && o.phase === p.phase);

  return (
    <>
      <DetailHero name={p.name} image={p.hero ?? p.cover} fullBleed={Boolean(p.hero)} phase={phaseLabel[p.phase]} phaseDotClass={phaseDot[p.phase]} where={where} />

      {specs.length > 0 && (
        <section aria-label="Ficha técnica" className="border-b border-line bg-paper">
          <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
            {specs.map((s) => (
              <div key={s.k} className="border-b border-line py-7 pr-4 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <dt className="mono text-ink-soft">{s.k}</dt>
                <dd className="display mt-2 text-[clamp(2.2rem,4vw,3.8rem)] text-forest">{s.v}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="mono text-teal-deep">Sobre o empreendimento</p>
          <Reveal>
            <p className="display-soft mt-6 text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.1] text-forest">{p.summary}</p>
          </Reveal>
          {p.highlights && (
            <ul className="mt-12 border-t border-line">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-center gap-4 border-b border-line py-5 text-lg">
                  <span className="size-2 shrink-0 rounded-full bg-paineira" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-forest p-8 text-paper">
            <p className="mono text-leaf">Fale com um consultor</p>
            <p className="display mt-4 text-5xl">Quer conhecer?</p>
            <p className="mt-3 text-paper/70">A conversa no WhatsApp já começa com o {p.name}.</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-7 block rounded-full bg-teal px-6 py-4 text-center font-semibold transition hover:bg-leaf text-forest">
              Chamar no WhatsApp
            </a>
            <a href={site.phoneHref} className="mt-3 block rounded-full px-6 py-4 text-center font-medium ring-1 ring-line-inv transition hover:bg-paper hover:text-forest">
              Ligar {site.phone}
            </a>
          </div>
        </aside>
      </section>

      {p.amenities && (
        <section aria-labelledby="lazer" className="bg-forest py-20 text-paper sm:py-28">
          <div className="container-x">
            <p className="mono text-leaf">Condomínio clube · {p.amenities.length} itens de lazer</p>
            <h2 id="lazer" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)]">
              Lazer <span className="text-paineira">sem sair de casa</span>
            </h2>
            <ul className="mt-12 flex flex-wrap gap-3">
              {p.amenities.map((a) => (
                <li key={a} className="display-soft rounded-full px-6 py-3.5 text-xl ring-1 ring-line-inv sm:text-2xl">{a}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {p.gallery && (
        <section aria-labelledby="galeria" className="py-20 sm:py-28">
          <div className="container-x">
            <p className="mono text-teal-deep">Galeria · {p.gallery.length} imagens</p>
            <h2 id="galeria" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">
              Por dentro <span className="text-teal-deep">e por fora</span>
            </h2>
          </div>
          <div className="mt-10">
            <Gallery images={p.gallery} name={p.name} />
          </div>
        </section>
      )}

      {p.floorPlan && (
        <section aria-labelledby="planta" className="bg-paper-deep py-20 sm:py-28">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <p className="mono text-teal-deep">Planta</p>
              <h2 id="planta" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">Apartamento tipo</h2>
              {p.areaLabel && <p className="mt-5 text-lg text-ink-soft">{p.areaLabel} de área privativa.</p>}
            </div>
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-paper">
              <Image src={p.floorPlan} alt={`Planta do apartamento tipo do ${p.name}`} fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-contain p-6" />
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="outros" className="container-x py-20 sm:py-28">
          <p className="mono text-teal-deep">Também em {phaseLabel[p.phase].toLowerCase()}</p>
          <h2 id="outros" className="display mb-10 mt-5 text-[clamp(2.4rem,5vw,4.8rem)] text-forest">Veja também</h2>
          <HoverPreviewList
            items={related.slice(0, 6).map((r) => ({
              href: `/imovel/${r.slug}`,
              title: r.name,
              image: r.cover,
              aside: specList(r).map((s) => s.v).join(" · ") || "Entregue",
            }))}
          />
        </section>
      )}

      <div className="container-x pb-16">
        <p className="text-xs leading-relaxed text-ink-soft">Imagens ilustrativas, sujeitas a alterações. {p.registry}</p>
      </div>
    </>
  );
}
