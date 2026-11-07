import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { Reveal } from "@/components/motion/Reveal";
import PropertyTile from "@/components/PropertyTile";
import DetailHero from "@/components/property/DetailHero";
import StickyContact from "@/components/property/StickyContact";
import VideoSection from "@/components/property/VideoSection";
import Reel from "@/components/ui/Reel";
import { site } from "@/config/site";
import { getProperty, phaseDot, phaseLabel, properties, shotsOf, specList } from "@/data/properties";

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
  const shots = shotsOf(p);
  const wa = `${site.whatsappHref}?text=${encodeURIComponent(`Olá! Quero saber mais sobre o ${p.name}.`)}`;
  const related = properties.filter((o) => o.slug !== p.slug && o.phase === p.phase).slice(0, 4);
  const secondPhoto = p.gallery?.find((g) => g !== (p.hero ?? p.cover)) ?? p.cover;

  return (
    <>
      <DetailHero name={p.name} images={shots} video={p.video} fullBleed={Boolean(p.hero)} phase={phaseLabel[p.phase]} phaseDotClass={phaseDot[p.phase]} where={where} />
      <StickyContact name={p.name} phase={phaseLabel[p.phase]} dotClass={phaseDot[p.phase]} />

      {/* Facts */}
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

      {/* Introduction: statement, reasons, a second view of the project */}
      <section className="container-x grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mono text-teal-deep">Sobre o empreendimento</p>
          <Reveal>
            <p className="display-soft mt-6 text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.05] text-forest">{p.summary}</p>
          </Reveal>
          {p.highlights && (
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h, i) => (
                <Reveal as="li" key={h} delay={i * 0.05} className="flex items-start gap-3 rounded-[1.25rem] bg-paper-deep p-5">
                  <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-paineira" aria-hidden />
                  <span className="font-medium leading-snug">{h}</span>
                </Reveal>
              ))}
            </ul>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-forest px-7 py-4 font-semibold text-paper transition hover:bg-brand">
              Quero conhecer
            </a>
            {p.videos?.length ? (
              <a href="#videos" className="rounded-full px-7 py-4 font-semibold text-forest ring-1 ring-forest transition hover:bg-forest hover:text-paper">
                ▶ Assistir {p.videos.length > 1 ? `${p.videos.length} vídeos` : "vídeo"}
              </a>
            ) : null}
          </div>
        </div>
        <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-deep">
          <Image src={secondPhoto} alt={`Imagem do ${p.name}`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </Reveal>
      </section>

      {p.videos && p.videos.length > 0 && <VideoSection videos={p.videos} />}

      {/* Leisure: the list beside a reel of the project's own images */}
      {p.amenities && (
        <section aria-labelledby="lazer" className="py-24 sm:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mono text-teal-deep">Condomínio clube · {p.amenities.length} itens</p>
              <h2 id="lazer" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">
                Lazer <span className="accent text-teal-deep">sem sair de casa</span>
              </h2>
              <ul className="mt-10 border-t border-line">
                {p.amenities.map((a, i) => (
                  <Reveal as="li" key={a} delay={Math.min(i, 8) * 0.03} className="flex items-center justify-between gap-4 border-b border-line py-4">
                    <span className="display-soft text-[clamp(1.3rem,2vw,1.8rem)] text-forest">{a}</span>
                    <span className="size-2 shrink-0 rounded-full bg-teal" aria-hidden />
                  </Reveal>
                ))}
              </ul>
            </div>
            {shots.length > 1 && (
              <div className="sticky top-20 z-10 order-first h-[40svh] lg:order-none lg:top-28 lg:h-[calc(100vh-9rem)] lg:self-start">
                <div className="relative h-full overflow-hidden rounded-[2rem]">
                  <Reel images={[...(p.gallery ?? shots)].slice(0, 8)} alt={`Áreas do ${p.name}`} sizes="(min-width: 1024px) 45vw, 100vw" shot={2600} progress />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {p.gallery && (
        <section aria-labelledby="galeria" className="overflow-hidden bg-paper-deep py-24 sm:py-28">
          <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono text-teal-deep">Galeria · {p.gallery.length} imagens</p>
              <h2 id="galeria" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">
                Por dentro <span className="accent text-teal-deep">e por fora</span>
              </h2>
            </div>
            <p className="max-w-xs text-ink-soft">Passe o mouse para pausar. Toque em uma foto para ampliar.</p>
          </div>
          <Gallery images={p.gallery} name={p.name} />
        </section>
      )}

      {p.floorPlan && (
        <section aria-labelledby="planta" className="py-24 sm:py-28">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <p className="mono text-teal-deep">Planta</p>
              <h2 id="planta" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">Apartamento tipo</h2>
              {p.areaLabel && <p className="mt-5 text-lg text-ink-soft">{p.areaLabel} de área privativa.</p>}
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-forest px-7 py-4 font-semibold text-paper hover:bg-brand">
                Pedir a planta completa
              </a>
            </div>
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white ring-1 ring-line">
              <Image src={p.floorPlan} alt={`Planta do apartamento tipo do ${p.name}`} fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-contain p-6" />
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="outros" className="container-x pb-20">
          <div className="border-t border-line pt-16">
            <h2 id="outros" className="display text-[clamp(2.4rem,5vw,4.8rem)] text-forest">
              Também em <span className="accent text-teal-deep">{phaseLabel[p.phase].toLowerCase()}</span>
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 lg:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="min-w-0">
                <PropertyTile property={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="container-x pb-10">
        <p className="text-xs leading-relaxed text-ink-soft">Imagens ilustrativas, sujeitas a alterações. {p.registry}</p>
      </div>
    </>
  );
}
