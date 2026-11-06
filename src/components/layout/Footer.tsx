import Image from "next/image";
import Link from "next/link";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { nav, site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-paper">
      <div className="container-x pt-24 sm:pt-32">
        <p className="mono text-leaf">Próximo passo</p>
        <h2 className="display mt-6 text-[clamp(3.2rem,11vw,10.5rem)]">
          <MaskText text="Seu endereço" />
          <br />
          <MaskText text="começa numa" className="text-paineira" delay={0.1} />
          <br />
          <MaskText text="conversa." delay={0.2} />
        </h2>
        <Reveal className="mt-12 flex flex-wrap gap-3">
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-teal px-8 py-4 font-semibold text-white transition hover:bg-teal-deep">
            Chamar no WhatsApp
          </a>
          <a href={site.phoneHref} className="rounded-full border border-line-inv px-8 py-4 font-semibold transition hover:bg-paper hover:text-forest">
            {site.phone}
          </a>
          <Link href="/contato" className="rounded-full border border-line-inv px-8 py-4 font-semibold transition hover:bg-paper hover:text-forest">
            Outros canais
          </Link>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-line-inv pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Image src={site.logoWhite} alt={site.name} width={150} height={46} className="h-9 w-auto" />
            <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-paper/60">
              <p>{site.address}</p>
              <p>{site.hours.join(" · ")}</p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-paper">{site.email}</a>
              </p>
              <p>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a>
              </p>
            </address>
          </div>
          {nav
            .filter((n) => n.children)
            .map((n) => (
              <div key={n.label}>
                <h3 className="mono text-leaf">{n.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-paper/70">
                  {n.children!.map((c) => (
                    <li key={c.href + c.label}>
                      <Link href={c.href} className="transition hover:text-paper">{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      <p aria-hidden className="display outline-text pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[30vw] leading-[0.75] [--outline:rgba(238,242,233,0.22)]">
        {site.shortName}
      </p>

      <div className="border-t border-line-inv">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p>{site.legalName} · CNPJ {site.cnpj}</p>
          <p>
            Imagens ilustrativas · <Link href="/politica-de-privacidade" className="hover:text-paper">Privacidade</Link> ·{" "}
            <Link href="/trabalhe-conosco" className="hover:text-paper">Trabalhe conosco</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
