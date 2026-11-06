"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

type YTPlayer = {
  mute: () => void;
  playVideo: () => void;
  destroy: () => void;
};
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      host?: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT!);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

/**
 * Plays an official film muted and looping behind content, cropped to cover its frame.
 * - It only becomes visible while the video is actually playing, so YouTube's poster,
 *   title card and play button never show; if autoplay is blocked, the reel underneath stays.
 * - The player is laid out at twice the size and scaled down, which makes YouTube pick
 *   a sharper stream than it would for the visible size.
 */
export default function YouTubeBackground({ id, title }: { id: string; title: string }) {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const domId = useId();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduce || !host.current) return;
    let player: YTPlayer | null = null;
    let cancelled = false;
    const mount = document.createElement("div");
    host.current.appendChild(mount);

    loadApi().then((YT) => {
      if (cancelled) return;
      player = new YT.Player(mount, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: id,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => setPlaying(e.data === YT.PlayerState.PLAYING),
        },
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
      mount.remove();
    };
  }, [id, reduce]);

  if (reduce) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}>
      <div
        ref={host}
        id={domId}
        title={title}
        className="absolute left-1/2 top-1/2 h-[max(200%,112.5vw)] w-[max(200%,355.56vh)] -translate-x-1/2 -translate-y-1/2 scale-[0.56] [&>iframe]:size-full"
      />
    </div>
  );
}
