"use client";

import Image from "@/components/ui/Img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { site, type NavItem } from "@/config/site";
import { getProperty } from "@/data/properties";
import MobileDock from "./MobileDock";

const items: NavItem[] = [
  {
    label: "Empreendimentos",
    href: "/empreendimentos",
    children: [
      { label: "Lançamentos", href: "/empreendimentos/lancamento" },
      { label: "Em construção", href: "/empreendimentos/em-construcao" },
      { label: "Pronto para morar", href: "/empreendimentos/pronto-para-morar" },
      { label: "Portfólio", href: "/empreendimentos/portfolio", hint: "Obras entregues" },
    ],
  },
  {
    label: "Empresa",
    href: "/empresa",
    children: [
      { label: "Nossa história", href: "/empresa", hint: "Desde 1999" },
      { label: "Premiações", href: "/premiacoes", hint: "30º Troféu ADEMI-PE" },
      { label: "Certificações", href: "/certificacoes", hint: "Selos Caixa" },
      { label: "Pode+", href: "/pode-mais" },
      { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "Portal do cliente",
    href: "/portal-do-cliente",
    children: [
      { label: "Área do cliente", href: "/portal-do-cliente" },
      { label: "Assistência técnica", href: "/assistencia-tecnica" },
      { label: "Atendimento", href: "/contato" },
      { label: "Ouvidoria", href: "/ouvidoria" },
    ],
  },
];

/** Pages that open on a dark full-bleed photo need light type while the bar sits on top of it. */
function opensOnDark(pathname: string) {
  const m = pathname.match(/^\/imovel\/([^/]+)/);
  return Boolean(m && getProperty(m[1])?.hero);
}

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  // Desktop dropdown, also tied to the page it was opened on so a navigation always closes it.
  const [drop, setDrop] = useState<{ label: string; path: string } | null>(null);
  const dropOpen = (label: string) => drop?.label === label && drop.path === pathname;

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 40));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrop(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // At the top the bar dissolves into the page; once scrolling, it tightens into a capsule.
  const light = compact || opensOnDark(pathname);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
        <div
          className={`flex w-full items-center justify-between gap-4 rounded-full transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
            compact
              ? "max-w-[64rem] bg-forest/90 py-1.5 pl-5 pr-1.5 shadow-[0_10px_40px_-12px_rgba(15,29,12,0.55)] ring-1 ring-white/10 backdrop-blur-xl"
              : "max-w-[86rem] bg-transparent py-3 pl-2 pr-0"
          } ${light ? "text-paper" : "text-ink"}`}
        >
          <Link href="/" aria-label={`${site.name}, página inicial`} className="shrink-0">
            <Image
              src={light ? site.logoWhite : site.logo}
              alt={site.name}
              width={130}
              height={40}
              priority
              className={`w-auto transition-all duration-500 ${compact ? "h-7" : "h-9"}`}
            />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li
                  key={item.label}
                  className="group relative"
                  onMouseEnter={() => item.children && setDrop({ label: item.label, path: pathname })}
                  onMouseLeave={() => setDrop(null)}
                  onFocus={() => item.children && setDrop({ label: item.label, path: pathname })}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDrop(null);
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setDrop(null)}
                    aria-expanded={item.children ? dropOpen(item.label) : undefined}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition ${light ? "text-paper/80 hover:text-paper" : "text-ink/75 hover:text-ink"}`}
                  >
                    {item.label}
                    {item.children && (
                      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden className={`opacity-60 transition duration-300 ${dropOpen(item.label) ? "rotate-180" : ""}`}>
                        <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}
                    <span
                      aria-hidden
                      className={`absolute inset-x-4 bottom-1 h-px origin-left bg-paineira transition-transform duration-500 ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                  {item.children && (
                    <div
                      className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition duration-300 ${
                        dropOpen(item.label) ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
                      }`}
                    >
                      <ul className="overflow-hidden rounded-[1.5rem] bg-paper p-2 text-ink shadow-[0_24px_60px_-20px_rgba(15,29,12,0.45)] ring-1 ring-line">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link href={c.href} onClick={() => setDrop(null)} className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition hover:bg-paper-deep">
                              <span>
                                <span className="block text-sm font-semibold">{c.label}</span>
                                {c.hint && <span className="mono block text-ink-soft">{c.hint}</span>}
                              </span>
                              <span aria-hidden className="text-teal-deep">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition sm:flex ${
                light ? "bg-paper text-forest hover:bg-paineira" : "bg-forest text-paper hover:bg-brand"
              }`}
            >
              <span className="size-1.5 rounded-full bg-teal" aria-hidden />
              Fale conosco
            </a>
          </div>
        </div>
      </header>

      <MobileDock />
    </>
  );
}
