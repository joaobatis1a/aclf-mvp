import { numbers } from "@/data/content";

export default function Numbers() {
  return (
    <section className="container-x py-20" aria-labelledby="numeros">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div>
          <p className="eyebrow">Desde 1999</p>
          <h2 id="numeros" className="mt-2 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-forest sm:text-5xl">
            Mais de duas décadas construindo a costa norte de Pernambuco.
          </h2>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
          {numbers.map((n) => (
            <div key={n.label} className="bg-paper p-6 sm:p-8">
              <dt className="order-2 mt-1 text-sm text-ink-soft">{n.label}</dt>
              <dd className="font-display text-4xl font-semibold text-brand sm:text-5xl">{n.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
