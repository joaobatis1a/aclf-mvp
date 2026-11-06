"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";

const previews: Record<string, string> = {
  Empresa: "/images/company/story.jpg",
  Empreendimentos: "/images/properties/mirante-paineiras-03.jpg",
  Blog: "/images/blog/familia-apartamento.jpg",
  "Portal do cliente": "/images/properties/mirante-corais-cover.jpg",
  Políticas: "/images/properties/solar-paineiras-02.jpg",
  "Trabalhe conosco": "/images/company/award-mcmv.jpg",
};

const ease = [0.7, 0, 0.2, 1] as const;

const quick = [
  { label: "Empreendimentos", href: "/empreendimentos" },
  { label: "Empresa", href: "/empresa" },
  { label: "Blog", href: "/blog" },
  { label: "Portal do cliente", href: "/portal-do-cliente" },
];

export default function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setOpenOn(next ? pathname : null);
  };
  const [hover, setHover] = useState("Empreendimentos");

  const [compact, setCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > prev);
    setCompact(y > 40);
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4"
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        {/* One capsule: logo, direct links, the main action and the full menu. */}
        <div
          className={`flex w-full items-center justify-between gap-2 rounded-full bg-forest/90 text-paper shadow-[0_10px_40px_-12px_rgba(15,29,12,0.55)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-500 ${
            compact ? "max-w-[58rem] py-1.5 pl-5 pr-1.5" : "max-w-[72rem] py-2 pl-6 pr-2"
          }`}
        >
          <Link href="/" aria-label={`${site.name}, página inicial`} className="shrink-0">
            <Image src={site.logoWhite} alt={site.name} width={120} height={37} priority className={`w-auto transition-all duration-500 ${compact ? "h-7" : "h-8"}`} />
          </Link>

          <nav aria-label="Atalhos" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {quick.map((q) => {
                const active = pathname === q.href || pathname.startsWith(q.href + "/");
                return (
                  <li key={q.href}>
                    <Link
                      href={q.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative block px-4 py-2 text-sm font-medium text-paper/80 transition hover:text-paper"
                    >
                      {q.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-4 bottom-1 h-px origin-left bg-paineira transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-paineira sm:flex"
            >
              <span className="size-1.5 rounded-full bg-teal" aria-hidden />
              Fale conosco
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-11 place-items-center rounded-full ring-1 ring-white/20 transition hover:bg-white/10"
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute right-0 h-0.5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 w-5 -rotate-45" : "top-2.5 w-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu do site"
            className="fixed inset-0 z-40 overflow-y-auto bg-forest text-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            data-lenis-prevent
          >
            <div className="container-x grid min-h-full gap-10 pb-10 pt-28 lg:grid-cols-[1.4fr_1fr] lg:pt-32">
              <nav aria-label="Principal">
                <ul>
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                      className="border-b border-line-inv"
                      onMouseEnter={() => setHover(item.label)}
                    >
                      <Link
                        href={item.href}
                        onFocus={() => setHover(item.label)}
                        className="group flex items-baseline justify-between gap-4 py-3 sm:py-4"
                      >
                        <span className="display text-[clamp(2.4rem,6.5vw,5.5rem)] transition duration-300 group-hover:translate-x-3 group-hover:text-paineira">
                          {item.label}
                        </span>
                        <span className="mono hidden text-paper/50 sm:block">{item.children ? `${item.children.length} páginas` : "→"}</span>
                      </Link>
                      {item.children && (
                        <ul className="-mt-1 flex flex-wrap gap-x-5 gap-y-1 pb-4">
                          {item.children.map((c) => (
                            <li key={c.href + c.label}>
                              <Link href={c.href} className="text-sm text-paper/60 underline-offset-4 transition hover:text-paper hover:underline">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)]">
                <div className="arch relative hidden flex-1 lg:block">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={hover}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <Image src={previews[hover] ?? previews.Empreendimentos} alt="" fill sizes="30vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="grid gap-1 text-sm text-paper/70">
                  <p className="mono text-leaf">Atendimento</p>
                  <a href={site.whatsappHref} className="display-soft text-2xl text-paper hover:text-paineira">{site.whatsappLabel}</a>
                  <a href={site.phoneHref} className="hover:text-paper">{site.phone}</a>
                  <a href={`mailto:${site.email}`} className="hover:text-paper">{site.email}</a>
                  <p className="mt-2">{site.hours.join(" · ")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
