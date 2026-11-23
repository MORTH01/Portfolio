"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { PERSPECTIVES } from "./content";
import { Bracket, Kicker } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";

const ROW_TWO = [...PERSPECTIVES.slice(2), ...PERSPECTIVES.slice(0, 2)];
const EASE_MS = 450;

export default function Perspectives() {
  const [endorsed, setEndorsed] = useState<Record<string, boolean>>({});
  const wrap = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);

  // The rows are plain CSS keyframe animations; hovering eases their playbackRate towards 0
  // instead of flipping play-state, so the marquee glides to a stop and glides away again.
  const easeTo = useCallback((target: number) => {
    const tracks = wrap.current?.querySelectorAll<HTMLElement>(".cv-track");
    if (!tracks?.length) return;
    const anims = Array.from(tracks).flatMap((t) => t.getAnimations());
    if (!anims.length) return;
    cancelAnimationFrame(raf.current);
    const from = anims[0].playbackRate;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / EASE_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      const rate = from + (target - from) * eased;
      for (const a of anims) a.updatePlaybackRate(rate);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const toggle = (id: string) => setEndorsed((s) => ({ ...s, [id]: !s[id] }));

  return (
    <section className="overflow-hidden border-t border-vault-line py-24 lg:py-32">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker>(Stakeholder Perspectives)</Kicker>
            </Reveal>
            <RevealLines
              as="h2"
              lines={["Don’t just take", "our word."]}
              className="mt-4 font-heading text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-vault-ink sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <p className="max-w-[420px] text-base leading-relaxed text-vault-ink/70">
              Four perspectives written from the roles CoVault serves. They are illustrative and unattributed by
              design; named quotes take their place as pilots close.
            </p>
          </Reveal>
        </div>
      </div>

      <div
        ref={wrap}
        className="mt-14 space-y-4"
        onMouseEnter={() => easeTo(0)}
        onMouseLeave={() => easeTo(1)}
        onFocusCapture={() => easeTo(0)}
        onBlurCapture={() => easeTo(1)}
      >
        <Row items={PERSPECTIVES} endorsed={endorsed} onToggle={toggle} duration={70} />
        <Row items={ROW_TWO} endorsed={endorsed} onToggle={toggle} duration={84} reverse />
      </div>
    </section>
  );
}

function Row({
  items,
  endorsed,
  onToggle,
  duration,
  reverse = false,
}: {
  items: typeof PERSPECTIVES;
  endorsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div className="cv-marquee">
      <div
        className="cv-track gap-4 px-2"
        data-direction={reverse ? "reverse" : undefined}
        style={{ "--cv-duration": `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4" aria-hidden={copy === 1}>
            {items.map((p) => (
              <Card key={`${copy}-${p.id}`} p={p} on={!!endorsed[p.id]} onToggle={() => onToggle(p.id)} ghost={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({
  p,
  on,
  onToggle,
  ghost,
}: {
  p: (typeof PERSPECTIVES)[number];
  on: boolean;
  onToggle: () => void;
  ghost: boolean;
}) {
  return (
    <article className="flex w-[320px] shrink-0 flex-col rounded-3xl border border-vault-line bg-vault-card shadow-soft p-6 sm:w-[400px]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vault-ink font-heading text-sm font-medium text-vault-canvas">
          {p.initial}
        </span>
        <div>
          <p className="text-sm font-medium tracking-tight text-vault-ink">{p.role}</p>
          <Bracket className="text-vault-ink/40">Illustrative</Bracket>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-vault-ink/75">{p.text}</p>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onToggle}
          tabIndex={ghost ? -1 : 0}
          aria-pressed={on}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
            on
              ? "border-vault-ink bg-vault-ink text-vault-canvas"
              : "border-vault-line text-vault-ink hover:border-vault-ink"
          }`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {on ? "Endorsed" : "Endorse"}
          <span className={`font-mono ${on ? "text-vault-canvas/70" : "text-vault-ink/45"}`}>{on ? 1 : 0}</span>
        </button>
        <span className="font-mono text-[10px] text-vault-ink/35">#{p.id}</span>
      </div>
    </article>
  );
}
