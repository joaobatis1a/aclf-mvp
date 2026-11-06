"use client";

import { useState } from "react";
import { site } from "@/config/site";

const subjects = ["Quero comprar um imóvel", "Já sou cliente", "Assistência técnica", "Imprensa", "Outro assunto"];

const field =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none transition focus:border-teal";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [
      `Olá! Meu nome é ${d.get("nome")}.`,
      `Assunto: ${d.get("assunto")}.`,
      d.get("mensagem"),
      `Meu e-mail: ${d.get("email")}`,
    ].join("\n");
    window.open(`${site.whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-[2rem] border border-line bg-white p-7 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold">
          Nome
          <input name="nome" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold">
        Assunto
        <select name="assunto" className={field}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-semibold">
        Mensagem
        <textarea name="mensagem" required rows={5} className={field} />
      </label>
      <button type="submit" className="justify-self-start rounded-full bg-brand px-8 py-3.5 font-semibold text-white transition hover:bg-forest">
        Enviar pelo WhatsApp
      </button>
      {sent && (
        <p role="status" className="text-sm text-teal-deep">
          Abrimos o WhatsApp com a sua mensagem pronta. É só enviar.
        </p>
      )}
    </form>
  );
}
