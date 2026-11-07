"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type YTPlayer = {
  mute: () => void;
  playVideo: () => void;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  pauseVideo: () => void;
  destroy: () => void;
};
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      host?: string;
      playerVars: Record<string, string | number>;
      events: { onReady?: (e: { target: YTPlayer }) => void };
    },
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PLAYING = 1;

// Touch screens (phones, tablets) cannot be trusted to autoplay a YouTube iframe: they stop it
// off-screen, ask for a tap and then draw YouTube's own play button. There the reel of stills,
// which looks the same and never depends on the player, stays on screen instead.
const touchQuery = "(hover: none), (pointer: coarse)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(touchQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useTouch = () => useSyncExternalStore(subscribe, () => window.matchMedia(touchQuery).matches, () => true);

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
 *
 * YouTube draws its own interface (play button, end screen, "more videos") whenever the
 * video is not actually running, so the film is only revealed after it has played for a
 * moment, hidden again as soon as it stalls, and looped by hand just before the end so the
 * end screen never appears. Whatever sits underneath (a reel of stills) is the poster and
 * the fallback, including when the browser blocks autoplay.
 */
export default function YouTubeBackground({ id, title }: { id: string; title: string }) {
  const reduce = useReducedMotion();
  const touch = useTouch();
  const off = reduce || touch;
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (off || !host.current) return;
    let player: YTPlayer | null = null;
    let timer: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;
    let playedSince = 0;
    let onScreen = true;
    const mount = document.createElement("div");
    const hostEl = host.current;
    // Off screen or in a background tab the browser pauses the player and YouTube draws its play
    // button; hide the film at once and only bring it back after it has played again.
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (!onScreen) {
        playedSince = 0;
        setVisible(false);
        player?.pauseVideo();
      } else player?.playVideo();
    });
    io.observe(hostEl);
    const onVisibility = () => {
      if (document.hidden) {
        playedSince = 0;
        setVisible(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
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
          cc_load_policy: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
            timer = setInterval(() => {
              const p = player;
              if (!p || !onScreen || document.hidden) return;
              const state = p.getPlayerState();
              const t = p.getCurrentTime();
              const d = p.getDuration();
              // Loop by hand before YouTube's end screen can show.
              if (d > 0 && d - t < 1.2) {
                p.seekTo(0.1, true);
                return;
              }
              if (state === PLAYING && t > 0.3) {
                playedSince ||= Date.now();
                if (Date.now() - playedSince > 900) setVisible(true);
              } else {
                playedSince = 0;
                setVisible(false);
                if (state !== PLAYING) p.playVideo();
              }
            }, 250);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (timer) clearInterval(timer);
      player?.destroy();
      mount.remove();
    };
  }, [id, off]);

  if (off) return null;

  return (
    <div
      aria-hidden
      title={title}
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Laid out at twice the size and scaled down so YouTube streams a sharper rendition. */}
      <div
        ref={host}
        className="absolute left-1/2 top-1/2 h-[max(200%,112.5vw)] w-[max(200%,355.56vh)] -translate-x-1/2 -translate-y-1/2 scale-[0.58] [&>iframe]:size-full"
      />
    </div>
  );
}
