"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Video } from "@/data/properties";

export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const ytWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const Ctx = createContext<(v: Video) => void>(() => {});

/** Holds the single fullscreen player; any card below it can open a video. */
export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [video, setVideo] = useState<Video | null>(null);
  const lenis = useLenis();
  const close = useCallback(() => setVideo(null), []);

  useEffect(() => {
    if (!video) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [video, close, lenis]);

  return (
    <Ctx.Provider value={setVideo}>
      {children}
      <AnimatePresence>
        {video && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="fixed inset-0 z-[100] grid place-items-center bg-forest/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="w-full max-w-6xl"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-4 text-paper">
                <p className="display-soft text-xl sm:text-2xl">{video.title}</p>
                <div className="flex shrink-0 gap-2">
                  <a href={ytWatch(video.id)} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/30 hover:bg-paper hover:text-forest">
                    YouTube ↗
                  </a>
                  <button type="button" autoFocus onClick={close} className="rounded-full bg-paper px-4 py-2 text-sm font-semibold text-forest">
                    Fechar
                  </button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-black">
                <iframe
                  className="absolute inset-0 size-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export const useVideo = () => useContext(Ctx);

const kindLabel = { filme: "Filme", obra: "Acompanhe a obra" } as const;

/** Thumbnail card. Nothing from YouTube loads until the visitor presses play. */
export function VideoCard({ video, large = false, tone = "dark" }: { video: Video; large?: boolean; tone?: "dark" | "light" }) {
  const open = useVideo();
  const dark = tone === "dark";
  return (
    <button type="button" onClick={() => open(video)} className="group block w-full text-left" aria-label={`Assistir: ${video.title}`}>
      <span className={`relative block overflow-hidden rounded-[1.75rem] bg-black ${large ? "aspect-video" : "aspect-[16/10]"}`}>
        <Image src={ytThumb(video.id)} alt="" fill sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"} className="object-cover opacity-85 transition duration-500 group-hover:opacity-100" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-forest shadow-xl transition duration-300 group-hover:scale-110 ${large ? "size-20" : "size-14"}`}>
          <svg viewBox="0 0 24 24" className={large ? "ml-1 size-8" : "ml-0.5 size-6"} aria-hidden>
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        </span>
        <span className="mono absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-forest">{kindLabel[video.kind]}</span>
      </span>
      <span className={`display-soft mt-4 block leading-tight ${large ? "text-2xl sm:text-3xl" : "text-xl"} ${dark ? "text-paper" : "text-forest"}`}>{video.title}</span>
    </button>
  );
}
