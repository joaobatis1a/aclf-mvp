import { site } from "@/config/site";

export default function CtaBand() {
  return (
    <section className="container-x" aria-labelledby="cta">
      <div className="rounded-[2.5rem] bg-brand p-8 text-white sm:p-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div>
          <h2 id="cta" className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Vamos achar o seu apê?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Conte o que você procura e um consultor responde com opções que cabem na sua rotina e no seu orçamento.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-8 py-4 font-semibold text-forest transition hover:bg-paper-deep">
            Chamar no WhatsApp
          </a>
          <a href={site.phoneHref} className="rounded-full border border-white/40 px-8 py-4 font-semibold transition hover:bg-white/10">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
