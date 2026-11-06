"use client";

import { VideoCard } from "@/components/video/VideoPlayer";
import { site } from "@/config/site";
import type { Video } from "@/data/properties";

export default function VideoSection({ videos }: { videos: Video[] }) {
  const [lead, ...rest] = [...videos].sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "filme" ? -1 : 1));
  return (
    <section id="videos" aria-labelledby="videos-title" className="scroll-mt-24 bg-forest py-24 text-paper sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono text-leaf">Vídeos · {videos.length}</p>
            <h2 id="videos-title" className="display mt-5 text-[clamp(2.8rem,6.5vw,6.5rem)]">
              Assista <span className="accent text-paineira">de perto</span>
            </h2>
          </div>
          <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold ring-1 ring-line-inv transition hover:bg-paper hover:text-forest">
            Canal no YouTube <span aria-hidden>↗</span>
          </a>
        </div>
        <div className={`mt-12 grid gap-8 ${rest.length ? "lg:grid-cols-[1.6fr_1fr]" : ""}`}>
          <VideoCard video={lead} large />
          {rest.length > 0 && (
            <div className="grid content-start gap-8">
              {rest.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
