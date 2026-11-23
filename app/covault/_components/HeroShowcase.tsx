"use client";

import { useEffect, useState } from "react";
import { MODULES, SCREENS } from "./content";
import DeviceFrame from "./DeviceFrame";

const AUTOPLAY_MS = 3000;
const COUNT = MODULES.length;

const control =
  "inline-flex h-10 items-center gap-2 rounded-full border border-vault-ink/[0.14] px-4 text-sm font-medium text-vault-ink transition-colors duration-200 ease-out hover:border-vault-accent hover:text-vault-accent";

// Circular peek-through slideshow: the active screen sits crisp in the middle while its
// neighbours show as blurred, dimmed partials on either side. Every slide stays mounted and
// only its transform, opacity and blur change, so moving one step is a single CSS transition.
export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  // Bumped on every manual move so the interval restarts and the next auto-advance is a full
  // AUTOPLAY_MS away from the click.
  const [epoch, setEpoch] = useState(0);

  const go = (delta: number) => {
    setEpoch((e) => e + 1);
    setActive((i) => (i + delta + COUNT) % COUNT);
  };

  // Auto-advances every AUTOPLAY_MS, paused while the pointer is over the slides and off
  // entirely under reduced motion.
  useEffect(() => {
    if (hovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % COUNT), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [hovered, epoch]);

  const current = MODULES[active];
  const tallest = SCREENS["home-feed"];

  return (
    <div className="mt-16 sm:mt-20 lg:mt-24" aria-roledescription="carousel" aria-label="Product screens">
      <div
        className="relative overflow-x-clip"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Invisible sizer: the slide area keeps the tallest frame's height so shorter screens never shift the layout. */}
        <div className="mx-auto w-[80%] sm:w-[68%]" style={{ aspectRatio: `${tallest.width ?? 16} / ${tallest.height ?? 10}` }} aria-hidden />

        {MODULES.map((m, i) => {
          // Signed distance from the active slide along the ring: 0 centre, ±1 the peeks, the rest parked offstage.
          let d = (i - active + COUNT) % COUNT;
          if (d > COUNT / 2) d -= COUNT;
          const isActive = d === 0;
          const isPeek = Math.abs(d) === 1;
          const x = isActive ? 0 : isPeek ? d * 104 : Math.sign(d) * 200;
          return (
            <div
              key={m.index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${m.index} ${m.title}`}
              aria-hidden={!isActive}
              onClick={isPeek ? () => go(d) : undefined}
              className={`absolute left-[10%] top-1/2 w-[80%] transition-all duration-500 ease-out sm:left-[16%] sm:w-[68%] ${
                isActive
                  ? "z-30 opacity-100 blur-0"
                  : isPeek
                  ? "z-20 cursor-pointer opacity-55 blur-[4px]"
                  : "pointer-events-none z-10 opacity-0"
              }`}
              style={{ transform: `translate(${x}%, -50%) scale(${isActive ? 1 : isPeek ? 0.94 : 0.9})` }}
            >
              <DeviceFrame screen={m.screen} priority={i === 0} sizes="(min-width: 1280px) 870px, (min-width: 640px) 68vw, 80vw" />
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-vault-line pt-4 sm:gap-6">
        <button type="button" onClick={() => go(-1)} className={control} aria-label="Previous screen">
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="min-w-0 text-center" aria-live="polite">
          <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-vault-ink/45">{current.index} /</span>
            <span className="font-heading text-lg font-medium tracking-tight text-vault-ink">{current.title}</span>
          </p>
          <p className="mt-1 hidden truncate text-sm text-vault-ink/60 sm:block">{current.text}</p>
          <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
            {MODULES.map((m, i) => (
              <span
                key={m.index}
                className={`h-1 rounded-full transition-all duration-500 ease-out ${i === active ? "w-8 bg-vault-ink" : "w-3 bg-vault-ink/15"}`}
              />
            ))}
          </div>
        </div>

        <button type="button" onClick={() => go(1)} className={control} aria-label="Next screen">
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
