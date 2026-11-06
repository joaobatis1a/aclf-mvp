"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import HoverPreviewList from "./ui/HoverPreviewList";
import { cities, phaseDot, phaseLabel, phaseOrder, properties, specList, type Phase } from "@/data/properties";

const pill = (on: boolean) =>
  `flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
    on ? "bg-forest text-paper" : "bg-paper text-ink ring-1 ring-line hover:ring-forest"
  }`;
const select =
  "rounded-full bg-paper px-4 py-2.5 text-sm font-medium ring-1 ring-line outline-none transition hover:ring-forest focus-visible:ring-teal";

export default function PropertyExplorer({ initialPhase }: { initialPhase?: Phase }) {
  const params = useSearchParams();
  const [phase, setPhase] = useState<Phase | "">(initialPhase ?? (params.get("fase") as Phase | null) ?? "");
  const [city, setCity] = useState(params.get("cidade") ?? "");
  const [bedrooms, setBedrooms] = useState(params.get("quartos") ?? "");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "index">("grid");

  const list = useMemo(
    () =>
      properties.filter((p) => {
        if (phase && p.phase !== phase) return false;
        if (city && p.city !== city) return false;
        if (bedrooms) {
          // Solar das Paineiras has both 2 and 3 bedroom plans.
          const fits = p.bedrooms === Number(bedrooms) || (p.slug === "solar-das-paineiras" && bedrooms === "3");
          if (!fits) return false;
        }
        if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      }),
    [phase, city, bedrooms, query],
  );

  const reset = () => {
    setPhase("");
    setCity("");
    setBedrooms("");
    setQuery("");
  };

  return (
    <div>
      <div className="sticky top-20 z-20 -mx-2 rounded-[1.75rem] bg-paper-deep/90 p-2 backdrop-blur-xl sm:top-24">
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Fase" className="flex flex-wrap gap-1.5">
            <button type="button" className={pill(phase === "")} onClick={() => setPhase("")} aria-pressed={phase === ""}>
              Todos
            </button>
            {phaseOrder.map((p) => (
              <button key={p} type="button" className={pill(phase === p)} onClick={() => setPhase(p)} aria-pressed={phase === p}>
                <span className={`size-2 rounded-full ${phaseDot[p]}`} aria-hidden />
                {phaseLabel[p]}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-end gap-1.5">
            <label className="sr-only" htmlFor="f-nome">Buscar por nome</label>
            <input id="f-nome" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome" className={`${select} w-40 sm:w-48`} />
            <label className="sr-only" htmlFor="f-cidade">Cidade</label>
            <select id="f-cidade" value={city} onChange={(e) => setCity(e.target.value)} className={select}>
              <option value="">Todas as cidades</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="f-quartos">Quartos</label>
            <select id="f-quartos" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={select}>
              <option value="">Quartos</option>
              <option value="2">2 quartos</option>
              <option value="3">3 quartos</option>
            </select>
            <div role="group" aria-label="Modo de visualização" className="flex rounded-full bg-paper p-1 ring-1 ring-line">
              {(["grid", "index"] as const).map((v) => (
                <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${view === v ? "bg-forest text-paper" : ""}`}>
                  {v === "grid" ? "Galeria" : "Índice"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mono mt-10 text-ink-soft" aria-live="polite">
        {list.length} {list.length === 1 ? "empreendimento" : "empreendimentos"}
      </p>

      {list.length === 0 ? (
        <div className="mt-6 rounded-[2rem] border border-dashed border-line p-12 text-center">
          <p className="display text-4xl text-forest">Nada com esses filtros</p>
          <p className="mt-3 text-ink-soft">Remova um filtro para ver mais opções.</p>
          <button type="button" onClick={reset} className="mt-6 rounded-full bg-forest px-6 py-3 font-semibold text-paper hover:bg-brand">
            Limpar filtros
          </button>
        </div>
      ) : view === "grid" ? (
        <motion.ul layout className="mt-6 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <PropertyCard property={p} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-6">
          <HoverPreviewList
            items={list.map((p) => ({
              href: `/imovel/${p.slug}`,
              title: p.name,
              image: p.cover,
              meta: phaseLabel[p.phase],
              aside: specList(p).map((s) => s.v).join(" · ") || "Entregue",
            }))}
          />
        </div>
      )}
    </div>
  );
}
