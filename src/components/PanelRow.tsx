"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Chips, Specs } from "./PropertyTile";
import type { Property } from "@/data/properties";

/**
 * A row of photo panels. The one under the pointer (or keyboard focus) opens wide and
 * reveals its details while the others narrow, the same gesture as the awards on the home.
 */
export default function PanelRow({ items, priority = false }: { items: Property[]; priority?: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <ul className="flex h-[30rem] gap-3" onMouseLeave={() => setActive(null)}>
      {items.map((p, i) => {
        const open = active === i;
        const where = [p.neighborhood, p.city].filter(Boolean).join(" · ");
        return (
          <li
            key={p.slug}
            className={`relative min-w-0 overflow-hidden rounded-[1.75rem] bg-forest transition-[flex-grow] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "grow-[2.6]" : "grow"}`}
            style={{ flexBasis: 0 }}
            onMouseEnter={() => setActive(i)}
          >
            <Link
              href={`/imovel/${p.slug}`}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="absolute inset-0 text-paper"
            >
              <Image
                src={p.hero ?? p.cover}
                alt=""
                fill
                priority={priority}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover transition duration-700 ${active !== null && !open ? "brightness-[0.6] saturate-[0.7]" : ""}`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
              <span className="absolute left-4 top-4">
                <Chips p={p} />
              </span>
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                {where && <span className="mono truncate text-paper/75">{where}</span>}
                <span className={`display leading-[0.9] transition-all duration-500 ${open ? "text-5xl" : "text-[clamp(1.6rem,2.2vw,2.3rem)]"}`}>{p.name}</span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ${open ? "grid-rows-[1fr] opacity-100 delay-200" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <span className="flex min-h-0 items-end justify-between gap-3 overflow-hidden">
                    <span className="flex flex-col gap-3">
                      <span className="max-w-md text-sm leading-relaxed text-paper/80">{p.summary}</span>
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
