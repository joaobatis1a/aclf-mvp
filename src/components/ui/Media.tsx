"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

/**
 * Plays a short muted clip when one exists; otherwise shows the still with a slow
 * camera drift so the frame still feels alive. Reduced-motion users get the still.
 */
export default function Media({
  image,
  video,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  image: string;
  video?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (video && !reduce) {
    return (
      <video
        className={`absolute inset-0 size-full object-cover ${className}`}
        src={video}
        poster={image}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${reduce ? "" : "drift"} ${className}`}
    />
  );
}
