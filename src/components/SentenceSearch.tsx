"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cities, phaseLabel, phaseOrder } from "@/data/properties";

const selectCls =
  "mx-1 inline-block max-w-full cursor-pointer appearance-none border-0 border-b-2 border-teal bg-transparent px-1 pb-0.5 pr-6 font-display font-semibold text-brand outline-none transition hover:bg-teal/10 focus-visible:bg-teal/10";

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
    <form
      onSubmit={go}
      className="rounded-[2rem] border border-line bg-white/90 p-6 shadow-2xl shadow-forest/10 backdrop-blur sm:p-8"
      aria-label="Buscar imóveis"
    >
      <p className="font-display text-2xl leading-[2.2] text-ink sm:text-3xl sm:leading-[2.1]">
        Quero um apê com
        <label className="sr-only" htmlFor="q-quartos">Quartos</label>
        <select id="q-quartos" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={selectCls}>
          <option value="">qualquer nº de</option>
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
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-brand px-8 py-3.5 font-semibold text-white transition hover:bg-forest"
        >
          Ver empreendimentos
        </button>
        <span className="text-sm text-ink-soft">Mais filtros na página de empreendimentos.</span>
      </div>
    </form>
  );
}
