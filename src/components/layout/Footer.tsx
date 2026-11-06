import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import BackToTop from "./BackToTop";

const links = [
  { label: "Empreendimentos", href: "/empreendimentos" },
  { label: "Empresa", href: "/empresa" },
  { label: "Premiações", href: "/premiacoes" },
  { label: "Blog", href: "/blog" },
  { label: "Portal do cliente", href: "/portal-do-cliente" },
  { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
  { label: "Políticas", href: "/politicas" },
  { label: "Privacidade", href: "/politica-de-privacidade" },
  { label: "Ouvidoria", href: "/ouvidoria" },
];

export default function Footer() {
  return (
    <footer className="px-3 pb-3 pt-16 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-forest text-paper">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[30rem] rounded-full bg-paineira/15 blur-3xl" />

        <div className="container-x relative grid gap-12 pb-12 pt-16 sm:pt-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="display text-[clamp(3rem,8vw,7.5rem)]">
              Vamos achar
              <br />o seu <span className="accent text-paineira">lugar?</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-semibold text-forest transition hover:bg-paineira">
                <span className="size-2 rounded-full bg-teal" aria-hidden />
                WhatsApp {site.whatsappLabel}
              </a>
              <a href={site.phoneHref} className="rounded-full px-7 py-4 font-semibold ring-1 ring-line-inv transition hover:bg-paper hover:text-forest">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="rounded-full px-7 py-4 font-semibold ring-1 ring-line-inv transition hover:bg-paper hover:text-forest">
                {site.email}
              </a>
            </div>
          </div>

          {/* Rotating seal: the company's age and home, set on a circle. */}
          <div className="relative hidden size-44 shrink-0 lg:block" aria-hidden>
            <svg viewBox="0 0 200 200" className="spin-slow size-full text-paper/70">
              <defs>
                <path id="seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="mono" fill="currentColor" fontSize="15" letterSpacing="5">
                <textPath href="#seal">DESDE 1999 · LITORAL NORTE DE PERNAMBUCO ·</textPath>
              </text>
            </svg>
            <span className="accent absolute inset-0 grid place-items-center text-6xl text-paineira">25+</span>
          </div>
        </div>

        <div className="container-x relative border-t border-line-inv py-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-paper/70 underline-offset-4 transition hover:text-paper hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-x relative flex flex-col gap-5 border-t border-line-inv py-6 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image src={site.logoWhite} alt={site.name} width={110} height={34} className="h-7 w-auto" />
            <span>{site.address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <span>CNPJ {site.cnpj}</span>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
