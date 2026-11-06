"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <Link
        href="/certificacoes"
        className="block bg-forest px-4 py-2 text-center text-xs font-medium tracking-wide text-white/90 transition hover:text-white sm:text-sm"
      >
        Conheça nossas certificações e selos Caixa
        <span className="ml-2 inline-block rounded-full bg-teal px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
          Descubra as vantagens
        </span>
      </Link>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-paper/90 py-2 backdrop-blur-xl"
            : "border-transparent bg-paper py-4"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} — página inicial`} className="shrink-0">
            <Image
              src={site.logo}
              alt={site.name}
              width={150}
              height={46}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-brand/10"
                  >
                    {item.label}
                    {item.children && (
                      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-50 transition group-hover:rotate-180">
                        <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-0 top-full w-64 translate-y-1 pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-xl shadow-forest/10">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link
                              href={c.href}
                              className="flex flex-col rounded-xl px-3 py-2.5 transition hover:bg-paper-deep"
                            >
                              <span className="text-sm font-medium">{c.label}</span>
                              {c.hint && <span className="text-xs text-ink-soft">{c.hint}</span>}
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

          <div className="flex items-center gap-3">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest sm:inline-block"
            >
              Falar no WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                {open ? (
                  <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[var(--mobile-top,6.5rem)] overflow-y-auto bg-paper lg:hidden">
          <nav aria-label="Menu móvel" className="container-x py-6">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 font-display text-2xl font-semibold"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 ml-3 grid gap-0.5 border-l border-line pl-3">
                      {item.children.map((c) => (
                        <li key={c.href + c.label}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2 py-1.5 text-sm text-ink-soft"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <a
              href={site.whatsappHref}
              className="mt-6 block rounded-full bg-brand px-6 py-3 text-center font-semibold text-white"
            >
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
