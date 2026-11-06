"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "./PropertyCard";
import { cities, phaseLabel, phaseOrder, properties, type Phase } from "@/data/properties";

const chip = (active: boolean) =>
  `rounded-full border px-4 py-2 text-sm font-medium transition ${
    active ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-brand"
  }`;

export default function PropertyExplorer({ initialPhase }: { initialPhase?: Phase }) {
  const params = useSearchParams();
  const paramPhase = params.get("fase") as Phase | null;
  const [phase, setPhase] = useState<Phase | "">(initialPhase ?? paramPhase ?? "");
  const [city, setCity] = useState(params.get("cidade") ?? "");
  const [bedrooms, setBedrooms] = useState(params.get("quartos") ?? "");
  const [query, setQuery] = useState("");

  const list = useMemo(
    () =>
      properties.filter((p) => {
        if (phase && p.phase !== phase) return false;
        if (city && p.city !== city) return false;
        if (bedrooms && p.bedrooms !== Number(bedrooms)) {
          // Solar das Paineiras has 2 or 3 bedroom floor plans
          if (!(bedrooms === "3" && p.slug === "solar-das-paineiras")) return false;
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
      <div className="rounded-3xl border border-line bg-white p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Fase do empreendimento">
          <button type="button" className={chip(phase === "")} onClick={() => setPhase("")} aria-pressed={phase === ""}>
            Todos
          </button>
          {phaseOrder.map((p) => (
            <button key={p} type="button" className={chip(phase === p)} onClick={() => setPhase(p)} aria-pressed={phase === p}>
              {phaseLabel[p]}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Nome
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex.: Mirante"
              className="rounded-xl border border-line bg-paper px-4 py-3 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-teal"
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Cidade
            <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-line bg-paper px-4 py-3 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-teal">
              <option value="">Todas</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Quartos
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="rounded-xl border border-line bg-paper px-4 py-3 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-teal">
              <option value="">Qualquer</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-soft" aria-live="polite">
        {list.length} {list.length === 1 ? "empreendimento encontrado" : "empreendimentos encontrados"}
      </p>

      {list.length > 0 ? (
        <ul className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug}>
              <PropertyCard property={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-line p-12 text-center">
          <p className="font-display text-2xl font-semibold">Nenhum empreendimento com esses filtros.</p>
          <p className="mt-2 text-ink-soft">Remova um filtro para ver mais opções.</p>
          <button type="button" onClick={reset} className="mt-6 rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-forest">
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
