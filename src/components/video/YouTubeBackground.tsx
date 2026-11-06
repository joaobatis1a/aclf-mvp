"use client";

import { useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * Plays an official film muted and looping behind content, cropped to cover its frame.
 * It fades in only once the player is ready, so whatever sits underneath (a reel of stills)
 * works as the poster and as the fallback. Skipped entirely for reduced-motion users.
 */
export default function YouTubeBackground({ id, title }: { id: string; title: string }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  if (reduce) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
  });

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
      <iframe
        className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-[1.18]"
        src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
        title={title}
        tabIndex={-1}
        allow="autoplay; encrypted-media; picture-in-picture"
        // The player paints its own title card for a moment; waiting hides that flash.
        onLoad={() => setTimeout(() => setReady(true), 1800)}
      />
    </div>
  );
}
