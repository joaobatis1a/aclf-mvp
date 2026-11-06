"use client";

import { useState } from "react";
import { site } from "@/config/site";

const subjects = ["Quero comprar um imóvel", "Já sou cliente", "Assistência técnica", "Imprensa", "Outro assunto"];

const field =
  "w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-lg outline-none transition placeholder:text-ink-soft/50 focus:border-teal";

/** Composes the message and hands it to WhatsApp, the company's main service channel. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(subjects[0]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [`Olá! Meu nome é ${d.get("nome")}.`, `Assunto: ${subject}.`, d.get("mensagem"), `Meu e-mail: ${d.get("email")}`].join("\n");
    window.open(`${site.whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="rounded-[2.5rem] bg-paper-deep p-7 sm:p-12">
      <fieldset>
        <legend className="mono text-teal-deep">Assunto</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {subjects.map((s) => (
            <label key={s} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${subject === s ? "bg-forest text-paper" : "bg-paper ring-1 ring-line hover:ring-forest"}`}>
              <input type="radio" name="assunto" value={s} checked={subject === s} onChange={() => setSubject(s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="mono grid gap-1 text-ink-soft">
          Nome
          <input name="nome" required autoComplete="name" className={`${field} font-sans normal-case tracking-normal text-ink`} />
        </label>
        <label className="mono grid gap-1 text-ink-soft">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={`${field} font-sans normal-case tracking-normal text-ink`} />
        </label>
      </div>
      <label className="mono mt-6 grid gap-1 text-ink-soft">
        Mensagem
        <textarea name="mensagem" required rows={4} className={`${field} resize-none font-sans normal-case tracking-normal text-ink`} />
      </label>
      <button type="submit" className="mt-10 inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 font-semibold text-paper transition hover:bg-brand">
        Enviar pelo WhatsApp <span aria-hidden>↗</span>
      </button>
      {sent && (
        <p role="status" className="mt-4 text-sm text-teal-deep">
          Abrimos o WhatsApp com a sua mensagem pronta. É só enviar.
        </p>
      )}
    </form>
  );
}
