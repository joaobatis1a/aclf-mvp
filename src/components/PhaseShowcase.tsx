"use client";

import Link from "next/link";
import { useState } from "react";
import PropertyCard from "./PropertyCard";
import { byPhase, phaseLabel, type Phase } from "@/data/properties";

const tabs: Phase[] = ["lancamento", "em-construcao", "pronto-para-morar"];

export default function PhaseShowcase() {
  const [phase, setPhase] = useState<Phase>("lancamento");
  const list = byPhase(phase);

  return (
    <section className="container-x py-20" aria-labelledby="vitrine">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Vitrine</p>
          <h2 id="vitrine" className="mt-2 font-display text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
            Para cada momento de vida, um endereço.
          </h2>
        </div>
        <div role="tablist" aria-label="Fase" className="flex gap-1 rounded-full border border-line bg-white p-1">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={phase === t}
              onClick={() => setPhase(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${phase === t ? "bg-forest text-white" : "hover:bg-paper-deep"}`}
            >
              {phaseLabel[t]}
            </button>
          ))}
        </div>
      </div>

      <ul key={phase} role="tabpanel" className="reveal mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <PropertyCard property={p} />
          </li>
        ))}
      </ul>

      <div className="mt-14 text-center">
        <Link href={`/empreendimentos/${phase}`} className="inline-flex rounded-full border border-forest px-7 py-3 font-semibold text-forest transition hover:bg-forest hover:text-white">
          Ver todos: {phaseLabel[phase].toLowerCase()}
        </Link>
      </div>
    </section>
  );
}
