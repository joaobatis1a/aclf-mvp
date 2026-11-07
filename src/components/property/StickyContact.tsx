"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

/** Slides in after the hero and steps aside when the footer arrives, so contact is always one tap away. */
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

  const wa = `${site.whatsappHref}?text=${encodeURIComponent(`Olá! Quero saber mais sobre o ${name}.`)}`;

  return (
    <AnimatePresence>
      {past && !footer && (
        <motion.aside
          aria-label={`Contato sobre o ${name}`}
          className="fixed inset-x-3 bottom-[6rem] z-40 flex justify-center lg:bottom-5"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex w-full max-w-2xl items-center gap-3 rounded-full bg-forest/95 py-2 pl-5 pr-2 text-paper shadow-[0_20px_50px_-15px_rgba(15,29,12,0.6)] ring-1 ring-white/10 backdrop-blur-xl">
            <div className="min-w-0 flex-1">
              <p className="mono flex items-center gap-2 text-paper/60">
                <span className={`size-1.5 rounded-full ${dotClass}`} aria-hidden /> {phase}
              </p>
              <p className="display-soft truncate text-lg">{name}</p>
            </div>
            <a href={site.phoneHref} className="hidden rounded-full px-4 py-2.5 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-paper hover:text-forest sm:block">
              Ligar
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-paineira">
              WhatsApp
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
