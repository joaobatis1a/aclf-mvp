import Image from "next/image";
import Link from "next/link";
import { MaskText } from "@/components/motion/Reveal";
import { nav, site } from "@/config/site";
import BackToTop from "./BackToTop";

export default function Footer() {
  const columns = nav.filter((n) => n.children);
  return (
    <footer className="bg-paper pt-10">
      {/* Closing scene: a couple on the balcony looking over the neighbourhood. */}
      <section aria-labelledby="fechamento" className="px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] text-paper">
          <Image src="/images/properties/solar-paineiras-01.jpg" alt="Casal na varanda olhando o bairro, no Solar das Paineiras" fill sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/95 via-forest/70 to-forest/10" />
          <div className="container-x grid min-h-[34rem] content-end gap-10 py-14 sm:min-h-[40rem] sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 id="fechamento" className="display text-[clamp(3rem,7.5vw,7.5rem)]">
              <MaskText text="Seu próximo" />
              <br />
              <MaskText text="endereço começa" delay={0.08} />
              <br />
              <span className="accent text-paineira">numa conversa</span>
            </h2>
            <div className="lg:pb-3">
              <p className="max-w-sm text-lg text-paper/80">Um consultor responde com opções que cabem na sua rotina e no seu orçamento.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-paper px-7 py-4 font-semibold text-forest transition hover:bg-paineira">
                  Chamar no WhatsApp
                </a>
                <a href={site.phoneHref} className="rounded-full px-7 py-4 font-semibold ring-1 ring-white/40 backdrop-blur transition hover:bg-paper hover:text-forest">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-3 bg-forest px-3 pb-3 text-paper sm:px-5">
        <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image src={site.logoWhite} alt={site.name} width={160} height={50} className="h-10 w-auto" />
            <p className="mt-6 max-w-xs text-paper/65">Construindo o litoral norte de Pernambuco desde 1999. Paulista, Recife, Caruaru e Fortaleza.</p>
            <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="mono text-leaf">SAC</dt>
                <dd className="mt-1"><a href={site.whatsappHref} className="hover:text-paineira">{site.whatsappLabel}</a></dd>
                <dd><a href={site.phoneHref} className="hover:text-paineira">{site.phone}</a></dd>
                <dd><a href={`mailto:${site.email}`} className="hover:text-paineira">{site.email}</a></dd>
              </div>
              <div>
                <dt className="mono text-leaf">Atendimento</dt>
                {site.hours.map((h) => (
                  <dd key={h} className="mt-1 text-paper/70">{h}</dd>
                ))}
              </div>
              <div className="sm:col-span-2">
                <dt className="mono text-leaf">Sede</dt>
                <dd className="mt-1 text-paper/70">{site.address}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((n) => (
              <div key={n.label}>
                <h3 className="mono text-leaf">{n.label}</h3>
                <ul className="mt-4 space-y-2.5">
                  {n.children!.map((c) => (
                    <li key={c.href + c.label}>
                      <Link href={c.href} className="text-paper/75 transition hover:text-paper">{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="container-x flex flex-col gap-4 border-t border-line-inv py-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.legalName} · CNPJ {site.cnpj} · Imagens ilustrativas</p>
          <div className="flex items-center gap-5">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a>
            <Link href="/trabalhe-conosco" className="hover:text-paper">Trabalhe conosco</Link>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
