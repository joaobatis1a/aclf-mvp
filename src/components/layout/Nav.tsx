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

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > prev);
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
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        animate={{ y: hidden && !open ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-label={`${site.name}, página inicial`}
            className="flex h-14 items-center rounded-full bg-paper/85 px-5 shadow-sm ring-1 ring-line backdrop-blur-xl"
          >
            <Image src={site.logo} alt={site.name} width={120} height={37} priority className="h-8 w-auto" />
          </Link>

          <div className="flex h-14 items-center gap-1 rounded-full bg-paper/85 p-1.5 shadow-sm ring-1 ring-line backdrop-blur-xl">
            <Link href="/empreendimentos" className="hidden rounded-full px-4 py-2.5 text-sm font-medium transition hover:bg-ink/5 md:block">
              Empreendimentos
            </Link>
            <Link href="/empresa" className="hidden rounded-full px-4 py-2.5 text-sm font-medium transition hover:bg-ink/5 md:block">
              Empresa
            </Link>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-forest transition hover:bg-leaf sm:block"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-3 rounded-full bg-forest py-2.5 pl-5 pr-4 text-sm font-semibold text-paper transition hover:bg-brand"
            >
              {open ? "Fechar" : "Menu"}
              <span className="relative block h-3 w-4" aria-hidden>
                <span className={`absolute left-0 h-0.5 w-4 bg-current transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-0.5 w-4 bg-current transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-2"}`} />
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
