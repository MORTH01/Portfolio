"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  overlayClassName?: string; // optional
};

export default function VideoBackground({
  src,
  poster,
  overlayClassName = "bg-black/35",
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // autoplay requirements
    v.muted = true;
    v.playsInline = true;

    v.play().catch(() => {
      // If autoplay is blocked, it will start after user gesture.
    });
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
        preload="metadata"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
