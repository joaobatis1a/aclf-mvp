"use client";

import { useLenis } from "lenis/react";

export default function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="flex items-center gap-2 rounded-full px-4 py-2 text-paper ring-1 ring-line-inv transition hover:bg-paper hover:text-forest"
    >
      Voltar ao topo <span aria-hidden>↑</span>
    </button>
  );
}
