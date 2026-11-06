import { Reveal } from "@/components/motion/Reveal";
import { timeline } from "@/data/content";

export default function Trajectory({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <section aria-labelledby="trajetoria" className={dark ? "bg-forest py-24 text-paper sm:py-32" : "py-24 sm:py-32"}>
      <div className="container-x">
        <p className={`mono ${dark ? "text-leaf" : "text-teal-deep"}`}>Trajetória</p>
        <h2 id="trajetoria" className={`display mt-5 text-[clamp(2.8rem,7vw,7rem)] ${dark ? "" : "text-forest"}`}>
          De 1999 ao <span className="text-paineira">bairro-parque</span>
        </h2>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden className={`absolute left-0 right-0 top-[0.55rem] hidden h-px md:block ${dark ? "bg-line-inv" : "bg-line"}`} />
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.08} className="relative">
              <span aria-hidden className="relative z-10 block size-[1.1rem] rounded-full border-4 border-current bg-paineira" />
              <p className="display mt-6 text-4xl text-teal">{t.year}</p>
              <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-paper/70" : "text-ink-soft"}`}>{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
