"use client";

import { useEffect, useRef } from "react";

export default function ScrollVideoBackground({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Required for autoplay on mobile
    v.muted = true;
    v.playsInline = true;

    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("canplay", tryPlay);
    tryPlay();

    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
