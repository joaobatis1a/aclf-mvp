"use client";

import Image from "@/components/ui/Img";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Chips, Specs } from "./PropertyTile";
import type { Property } from "@/data/properties";

const touchQuery = "(hover: none)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(touchQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
/** True on touch screens, where there is no hover to open a panel. */
const useTouch = () => useSyncExternalStore(subscribe, () => window.matchMedia(touchQuery).matches, () => false);

/**
 * A group of photo panels. The one under the pointer (or keyboard focus) opens wide and
 * reveals its details while the others narrow, the same gesture as the awards on the home.
 * On phones the group stacks vertically like an accordion: the first panel starts open,
 * a tap opens another, and a tap on an open panel goes to the project.
 */
export default function PanelRow({ items, priority = false }: { items: Property[]; priority?: boolean }) {
  const touch = useTouch();
  const [picked, setPicked] = useState<number | null>(null);
  const active = picked ?? (touch ? 0 : null);

  return (
    <ul
      className="flex h-[40rem] flex-col gap-2 sm:h-[44rem] lg:h-[30rem] lg:flex-row lg:gap-3"
      onMouseLeave={() => !touch && setPicked(null)}
    >
      {items.map((p, i) => {
        const open = active === i;
        const where = [p.neighborhood, p.city].filter(Boolean).join(" · ");
        return (
          <li
            key={p.slug}
            className={`relative min-h-0 min-w-0 overflow-hidden rounded-[1.5rem] bg-forest transition-[flex-grow] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:rounded-[1.75rem] ${open ? "grow-[4] lg:grow-[2.6]" : "grow"}`}
            style={{ flexBasis: 0 }}
            onMouseEnter={() => !touch && setPicked(i)}
          >
            <Link
              href={`/imovel/${p.slug}`}
              onFocus={() => setPicked(i)}
              onClick={(e) => {
                // First tap on a closed panel opens it; the next tap follows the link.
                if (touch && !open) {
                  e.preventDefault();
                  setPicked(i);
                }
              }}
              aria-expanded={touch ? open : undefined}
              className="absolute inset-0 text-paper"
            >
              <Image
                src={p.hero ?? p.cover}
                alt=""
                fill
                priority={priority}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover transition duration-700 ${active !== null && !open ? "brightness-[0.55] saturate-[0.7]" : ""}`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
              <span className={`absolute left-4 top-4 transition duration-300 ${open ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
                <Chips p={p} />
              </span>
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 lg:gap-3 lg:p-6">
                {where && <span className={`mono truncate text-paper/75 ${open ? "" : "hidden lg:block"}`}>{where}</span>}
                <span className={`display leading-[0.9] transition-all duration-500 ${open ? "text-[clamp(2.2rem,8vw,3rem)]" : "text-[clamp(1.4rem,5.5vw,2.3rem)] lg:text-[clamp(1.6rem,2.2vw,2.3rem)]"}`}>
                  {p.name}
                </span>
                <span className={`grid transition-[grid-template-rows,opacity] duration-500 ${open ? "grid-rows-[1fr] opacity-100 delay-200" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="flex min-h-0 items-end justify-between gap-3 overflow-hidden">
                    <span className="flex flex-col gap-3">
                      <span className="hidden max-w-md text-sm leading-relaxed text-paper/80 sm:block">{p.summary}</span>
                      <Specs p={p} />
                    </span>
                    <span className="flex shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-forest">
                      Ver <span aria-hidden>→</span>
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
