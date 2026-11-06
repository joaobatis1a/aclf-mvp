import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="mt-24 bg-forest text-white">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Image src={site.logoWhite} alt={site.name} width={160} height={50} className="h-10 w-auto" />
          <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-white/90">
            {site.tagline}.
          </p>
          <address className="mt-8 space-y-2 text-sm not-italic text-white/70">
            <p>{site.address}</p>
            <p>
              <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
              {" · "}
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </p>
            {site.hours.map((h) => (
              <p key={h}>{h}</p>
            ))}
          </address>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full border border-white/25 px-4 py-2 text-sm transition hover:bg-white hover:text-forest"
          >
            Instagram
          </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {nav
            .filter((n) => n.children)
            .map((n) => (
              <div key={n.label}>
                <h3 className="eyebrow !text-leaf">{n.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {n.children!.map((c) => (
                    <li key={c.href + c.label}>
                      <Link href={c.href} className="transition hover:text-white">{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          <div>
            <h3 className="eyebrow !text-leaf">Mais</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/trabalhe-conosco" className="hover:text-white">Trabalhe conosco</Link></li>
              <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>{site.legalName} · CNPJ {site.cnpj}</p>
          <p>Imagens ilustrativas. Projeto de redesign para apresentação.</p>
        </div>
      </div>
    </footer>
  );
}
