import Image from "next/image";
import Link from "next/link";
import { byPhase, type Property } from "@/data/properties";

/**
 * Delivered projects as two endless belts running in opposite directions.
 * Hovering or focusing a belt pauses it and lifts the card under the pointer.
 */
export default function PortfolioIndex() {
  const list = byPhase("portfolio");
  const half = Math.ceil(list.length / 2);
  const rows = [list.slice(0, half), list.slice(half)];

  return (
    <section aria-labelledby="entregues" className="overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mono text-teal-deep">Portfólio · {list.length} obras entregues</p>
          <h2 id="entregues" className="display mt-5 text-[clamp(2.8rem,8vw,8rem)] text-forest">
            Chaves <span className="accent text-teal-deep">entregues</span>
          </h2>
        </div>
        <Link href="/empreendimentos/portfolio" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">
          Ver portfólio completo
        </Link>
      </div>

      <div className="mt-14 space-y-5">
        {rows.map((row, r) => (
          <Belt key={r} items={row} reverse={r === 1} />
        ))}
      </div>
    </section>
  );
}

function Belt({ items, reverse }: { items: Property[]; reverse: boolean }) {
  // Repeat the set so the loop never shows a gap; only the first copy is reachable by keyboard.
  const copies = [items, items, items, items];
  return (
    <div className="belt group/belt relative">
      <ul
        className={`marquee flex w-max gap-5 group-hover/belt:[animation-play-state:paused] group-focus-within/belt:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:px-4 ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${items.length * 9}s` }}
      >
        {copies.flatMap((set, c) =>
          set.map((p) => (
            <li key={`${c}-${p.slug}`} aria-hidden={c > 0 || undefined} className="w-[17rem] shrink-0 sm:w-[22rem]">
              <Link
                href={`/imovel/${p.slug}`}
                tabIndex={c > 0 ? -1 : undefined}
                className="group/card relative block aspect-[4/5] overflow-hidden rounded-[2rem] transition duration-500 group-hover/belt:opacity-60 hover:!opacity-100"
              >
                <Image src={p.cover} alt={c > 0 ? "" : p.name} fill sizes="22rem" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                  <p className="mono text-paper/70">{p.city ?? "Entregue"}</p>
                  <p className="display mt-1 text-3xl leading-[0.9] sm:text-4xl">{p.name}</p>
                </div>
                <span className="absolute right-5 top-5 grid size-11 scale-75 place-items-center rounded-full bg-paper text-forest opacity-0 transition duration-500 group-hover/card:scale-100 group-hover/card:opacity-100" aria-hidden>
                  ↗
                </span>
              </Link>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
