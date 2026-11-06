"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cities, phaseLabel, phaseOrder } from "@/data/properties";

const selectCls =
  "mx-1 inline-block max-w-full cursor-pointer appearance-none rounded-lg border-0 border-b-[3px] border-teal bg-transparent px-1 text-teal-deep outline-none transition hover:bg-teal/10 focus-visible:bg-teal/10";

/** The search reads as a sentence the visitor completes. */
export default function SentenceSearch() {
  const router = useRouter();
  const [bedrooms, setBedrooms] = useState("");
  const [city, setCity] = useState("");
  const [phase, setPhase] = useState("");

  function go(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (bedrooms) q.set("quartos", bedrooms);
    if (city) q.set("cidade", city);
    if (phase) q.set("fase", phase);
    router.push(`/empreendimentos${q.size ? `?${q}` : ""}`);
  }

  return (
    <form onSubmit={go} aria-label="Buscar imóveis" className="rounded-[2rem] bg-paper p-6 ring-1 ring-line sm:p-10">
      <p className="display-soft text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.5] text-forest">
        Quero um apê com
        <label className="sr-only" htmlFor="q-quartos">Quartos</label>
        <select id="q-quartos" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={selectCls}>
          <option value="">2 ou 3</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        quartos, em
        <label className="sr-only" htmlFor="q-cidade">Cidade</label>
        <select id="q-cidade" value={city} onChange={(e) => setCity(e.target.value)} className={selectCls}>
          <option value="">qualquer cidade</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        , que esteja
        <label className="sr-only" htmlFor="q-fase">Fase</label>
        <select id="q-fase" value={phase} onChange={(e) => setPhase(e.target.value)} className={selectCls}>
          <option value="">em qualquer fase</option>
          {phaseOrder.filter((p) => p !== "portfolio").map((p) => (
            <option key={p} value={p}>{phaseLabel[p].toLowerCase()}</option>
          ))}
        </select>
        .
      </p>
      <button type="submit" className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 font-semibold text-paper transition hover:bg-brand">
        Ver empreendimentos <span aria-hidden>→</span>
      </button>
    </form>
  );
}
