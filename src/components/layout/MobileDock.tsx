"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

const icon = {
  home: "M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z",
  buildings: "M4 20V8l6-3v15M10 20V10l10 3v7M3 20h18M13 15h1M17 15h1M6.5 11h1M6.5 14.5h1",
  company: "M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4 7.2 18.9l.9-5.4L4.2 9.7l5.4-.8z",
  key: "M14.5 9.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM13.3 12l6.2 6.2M17 15.7l1.8-1.8M15.2 13.9l1.8-1.8",
  chat: "M5 18.5 6.2 15A7 7 0 1 1 9 17.8z",
};

const items = [
  { label: "Início", href: "/", d: icon.home },
  { label: "Imóveis", href: "/empreendimentos", d: icon.buildings },
  { label: "Empresa", href: "/empresa", d: icon.company },
  { label: "Cliente", href: "/portal-do-cliente", d: icon.key },
];

/**
 * Phones: an app-style bar fixed at the bottom, within thumb reach, instead of a menu
 * that covers the page. The rest of the site is linked from the footer.
 */
export default function MobileDock() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <nav aria-label="Navegação rápida" className="fixed inset-x-3 bottom-3 z-50 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <ul className="mx-auto flex max-w-md items-stretch justify-between gap-1 rounded-[1.75rem] bg-forest/95 p-1.5 text-paper shadow-[0_18px_40px_-14px_rgba(15,29,12,0.6)] ring-1 ring-white/10 backdrop-blur-xl">
        {items.map((it) => {
          const on = isActive(it.href);
          return (
            <li key={it.href} className="flex-1">
              <Link
                href={it.href}
                aria-current={on ? "page" : undefined}
                className={`flex flex-col items-center gap-1 rounded-[1.25rem] py-2 text-[0.68rem] font-medium transition ${on ? "bg-paper text-forest" : "text-paper/75 active:bg-white/10"}`}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={it.d} />
                </svg>
                {it.label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 rounded-[1.25rem] bg-teal py-2 text-[0.68rem] font-semibold text-forest"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={icon.chat} />
            </svg>
            WhatsApp
          </a>
        </li>
      </ul>
    </nav>
  );
}
