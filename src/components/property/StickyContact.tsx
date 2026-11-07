"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

/**
 * Slides in after the hero and steps aside when the footer arrives, so contact is always one tap away.
 * On phones it stands in for the bottom dock while shown, with a way back to the listing.
 */
export default function StickyContact({ name, phase, dotClass }: { name: string; phase: string; dotClass: string }) {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  const [footer, setFooter] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPast(y > window.innerHeight * 0.75));

  useEffect(() => {
    const el = document.querySelector("footer");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setFooter(e.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = past && !footer;
  useEffect(() => {
    document.documentElement.toggleAttribute("data-contact", shown);
    return () => document.documentElement.removeAttribute("data-contact");
  }, [shown]);

  const wa = `${site.whatsappHref}?text=${encodeURIComponent(`Olá! Quero saber mais sobre o ${name}.`)}`;

  return (
    <AnimatePresence>
      {shown && (
        <motion.aside
          aria-label={`Contato sobre o ${name}`}
          className="fixed inset-x-3 bottom-3 z-40 flex justify-center lg:bottom-5"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex w-full max-w-2xl items-center gap-3 rounded-full bg-forest/95 py-2 pl-2 pr-2 lg:pl-5 text-paper shadow-[0_20px_50px_-15px_rgba(15,29,12,0.6)] ring-1 ring-white/10 backdrop-blur-xl">
            <Link href="/empreendimentos" aria-label="Voltar aos empreendimentos" className="grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-white/20 active:bg-white/10 lg:hidden">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </Link>
            <div className="min-w-0 flex-1">
              <p className="mono flex items-center gap-2 text-paper/60">
                <span className={`size-1.5 rounded-full ${dotClass}`} aria-hidden /> {phase}
              </p>
              <p className="display-soft truncate text-lg">{name}</p>
            </div>
            <a href={site.phoneHref} className="hidden rounded-full px-4 py-2.5 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-paper hover:text-forest sm:block">
              Ligar
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-paper px-5 py-3 text-sm font-semibold text-forest transition hover:bg-paineira">
              WhatsApp
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
