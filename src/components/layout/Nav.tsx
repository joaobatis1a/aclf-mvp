"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { site, type NavItem } from "@/config/site";
import { getProperty } from "@/data/properties";

const ease = [0.7, 0, 0.2, 1] as const;

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
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  // The mobile menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 40));

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  // At the top the bar dissolves into the page; once scrolling, it tightens into a capsule.
  const light = compact || open || opensOnDark(pathname);
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
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition ${light ? "text-paper/80 hover:text-paper" : "text-ink/75 hover:text-ink"}`}
                  >
                    {item.label}
                    {item.children && (
                      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden className="opacity-60 transition duration-300 group-hover:rotate-180 group-focus-within:rotate-180">
                        <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}
                    <span
                      aria-hidden
                      className={`absolute inset-x-4 bottom-1 h-px origin-left bg-paineira transition-transform duration-500 ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-[1.5rem] bg-paper p-2 text-ink shadow-[0_24px_60px_-20px_rgba(15,29,12,0.45)] ring-1 ring-line">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link href={c.href} className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition hover:bg-paper-deep">
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
            <button
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold ring-1 transition lg:hidden ${light ? "ring-white/30" : "ring-line"}`}
            >
              {open ? "Fechar" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Small screens only: the links do not fit in the bar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu do site"
            className="fixed inset-0 z-40 overflow-y-auto bg-forest text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            data-lenis-prevent
          >
            <nav aria-label="Menu" className="container-x pb-12 pt-28">
              <ul>
                {items.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                    className="border-b border-line-inv py-4"
                  >
                    <Link href={item.href} className="display text-5xl">{item.label}</Link>
                    {item.children && (
                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link href={c.href} className="text-sm text-paper/65 hover:text-paper">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <a href={site.whatsappHref} className="mt-8 block rounded-full bg-paper px-6 py-4 text-center font-semibold text-forest">
                Fale conosco · {site.whatsappLabel}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
