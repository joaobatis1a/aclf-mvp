"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { numbers } from "@/data/content";

const TEXT =
  "Desde 1999 transformamos Paulista e o litoral norte de Pernambuco em lugar de morar bem. São mais de *18* grandes empreendimentos, *8 mil* unidades e *800 mil m²* construídos, com a mesma promessa: qualidade a preço justo.";

// Keep "8 mil" and "800 mil m²" as single tokens so they light up together.
const tokens = TEXT.match(/\*[^*]+\*|\S+/g) ?? [];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <section aria-labelledby="manifesto" className="bg-paper py-28 sm:py-40">
      <div className="container-x">
        <p className="mono text-teal-deep">Quem somos</p>
        <div ref={ref}>
          <h2 id="manifesto" className="display-soft mt-8 text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.08] text-forest">
            {tokens.map((t, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / tokens.length, (i + 1) / tokens.length]} token={t} />
            ))}
          </h2>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} className="border-b border-line py-6 pr-4 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <dd className="display text-[clamp(2.4rem,5vw,4.5rem)] text-brand">{n.value}</dd>
              <dt className="mono mt-2 text-ink-soft">{n.label}</dt>
            </div>
          ))}
        </dl>
        <Link href="/empresa" className="mt-10 inline-flex items-center gap-3 rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">
          Conheça nossa história <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

function Word({ token, progress, range }: { token: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const highlight = token.startsWith("*");
  const text = token.replaceAll("*", "");
  return (
    <motion.span style={{ opacity }} className={highlight ? "text-teal-deep" : undefined}>
      {text}{" "}
    </motion.span>
  );
}
