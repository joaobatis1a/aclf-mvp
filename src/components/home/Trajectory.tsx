import { Reveal } from "@/components/motion/Reveal";
import { timeline } from "@/data/content";

/** Milestones as large editorial rows: the marker on the left, the story on the right. */
export default function Trajectory() {
  return (
    <section aria-labelledby="trajetoria" className="container-x py-24 sm:py-32">
      <p className="mono text-teal-deep">Trajetória</p>
      <h2 id="trajetoria" className="display mt-5 text-[clamp(2.8rem,7vw,7rem)] text-forest">
        De 1999 ao <span className="accent text-teal-deep">bairro-parque</span>
      </h2>
      <ol className="mt-14 border-t border-line">
        {timeline.map((t, i) => (
          <Reveal as="li" key={t.year} delay={i * 0.05} className="grid gap-3 border-b border-line py-8 md:grid-cols-[18rem_1fr] md:items-baseline md:gap-10">
            <span className="display text-[clamp(2.6rem,5vw,4.5rem)] text-brand">{t.year}</span>
            <p className="display-soft max-w-3xl text-[clamp(1.3rem,2.2vw,2rem)] leading-snug text-forest">{t.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
