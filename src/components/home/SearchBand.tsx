import SentenceSearch from "@/components/SentenceSearch";

export default function SearchBand() {
  return (
    <section aria-labelledby="busca" className="bg-paper-deep py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
        <div>
          <p className="mono text-teal-deep">Busca</p>
          <h2 id="busca" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">
            Diga o que você <span className="text-teal">procura</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg text-ink-soft">Complete a frase e veja só os empreendimentos que combinam com ela.</p>
        </div>
        <SentenceSearch />
      </div>
    </section>
  );
}
