"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import PanelRow from "./PanelRow";
import { cities, phaseDot, phaseLabel, phaseOrder, properties, type Phase } from "@/data/properties";

const chunk = <T,>(arr: T[], n: number) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

const select =
  "rounded-full bg-paper px-4 py-2.5 text-sm font-medium ring-1 ring-line outline-none transition hover:ring-forest focus-visible:ring-teal";

/**
 * The phase is part of the URL (each phase has its own page), so the title,
 * the address bar and the selected tab always agree. City, bedrooms and name filter in place.
 */
export default function PropertyExplorer({ phase }: { phase?: Phase }) {
  const params = useSearchParams();
  const [city, setCity] = useState(params.get("cidade") ?? "");
  const [bedrooms, setBedrooms] = useState(params.get("quartos") ?? "");
  const [query, setQuery] = useState("");

  const inPhase = useMemo(() => properties.filter((p) => !phase || p.phase === phase), [phase]);
  const list = useMemo(
    () =>
      inPhase.filter((p) => {
        if (city && p.city !== city) return false;
        if (bedrooms) {
          // Solar das Paineiras has both 2 and 3 bedroom plans.
          const fits = p.bedrooms === Number(bedrooms) || (p.slug === "solar-das-paineiras" && bedrooms === "3");
          if (!fits) return false;
        }
        if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      }),
    [inPhase, city, bedrooms, query],
  );

  const tabs: { label: string; href: string; key: Phase | "all"; count: number }[] = [
    { label: "Todos", href: "/empreendimentos", key: "all", count: properties.length },
    ...phaseOrder.map((p) => ({ label: phaseLabel[p], href: `/empreendimentos/${p}`, key: p, count: properties.filter((x) => x.phase === p).length })),
  ];
  const current = phase ?? "all";

  const reset = () => {
    setCity("");
    setBedrooms("");
    setQuery("");
  };

  return (
    <div>
      <nav aria-label="Fases" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
        <ul className="flex w-max gap-1 border-b border-line">
          {tabs.map((t) => {
            const on = t.key === current;
            return (
              <li key={t.key}>
                <Link
                  href={t.href}
                  scroll={false}
                  aria-current={on ? "page" : undefined}
                  className={`relative flex items-center gap-2 px-4 py-4 text-sm font-medium transition ${on ? "text-forest" : "text-ink-soft hover:text-forest"}`}
                >
                  {t.key !== "all" && <span className={`size-2 rounded-full ${phaseDot[t.key]}`} aria-hidden />}
                  {t.label}
                  <span className="mono text-ink-soft">{t.count}</span>
                  <span aria-hidden className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-forest transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0"}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="f-nome">Buscar por nome</label>
        <input id="f-nome" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome" className={`${select} w-full sm:w-56`} />
        <label className="sr-only" htmlFor="f-cidade">Cidade</label>
        <select id="f-cidade" value={city} onChange={(e) => setCity(e.target.value)} className={select}>
          <option value="">Todas as cidades</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor="f-quartos">Quartos</label>
        <select id="f-quartos" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={select}>
          <option value="">Qualquer nº de quartos</option>
          <option value="2">2 quartos</option>
          <option value="3">3 quartos</option>
        </select>
        <p className="mono ml-auto text-ink-soft" aria-live="polite">
          {list.length} {list.length === 1 ? "resultado" : "resultados"}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-dashed border-line p-12 text-center">
          <p className="display text-4xl text-forest">Nada com esses filtros</p>
          <p className="mt-3 text-ink-soft">Remova um filtro para ver mais opções.</p>
          <button type="button" onClick={reset} className="mt-6 rounded-full bg-forest px-6 py-3 font-semibold text-paper hover:bg-brand">
            Limpar filtros
          </button>
        </div>
      ) : (
        // The same expanding panels on every screen: rows on desktop, accordions on phones.
        <div className="mt-8 space-y-3">
          {chunk(list, 4).map((row, r) => (
            <div key={row.map((p) => p.slug).join()} className="reveal" style={{ animationDelay: `${r * 60}ms` }}>
              <PanelRow items={row} priority={r === 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
