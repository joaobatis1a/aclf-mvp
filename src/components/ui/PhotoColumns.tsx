import Image from "next/image";

/** Two narrow columns of photos drifting vertically in opposite directions, faded at the edges. */
export default function PhotoColumns({ images, className = "" }: { images: { src: string; alt: string }[]; className?: string }) {
  const half = Math.ceil(images.length / 2);
  const cols = [images.slice(0, half), images.slice(half).concat(images.slice(0, 1))];
  return (
    <div
      aria-hidden
      className={`flex gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] ${className}`}
    >
      {cols.map((col, c) => (
        <div key={c} className="w-32 shrink-0 sm:w-40">
          <div className={`marquee-y flex flex-col gap-3 ${c === 1 ? "[animation-direction:reverse]" : ""}`} style={{ animationDuration: `${col.length * 7}s` }}>
            {[...col, ...col].map((img, i) => (
              <div key={`${img.src}-${i}`} className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
                <Image src={img.src} alt="" fill sizes="10rem" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
