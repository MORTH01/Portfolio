"use client";

import { useEffect, useState } from "react";
import { MODULES, SCREENS } from "./content";
import DeviceFrame from "./DeviceFrame";
import { Bracket, Hashtag, Kicker } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";

export default function Modules() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  // Touch devices fire mouseenter on tap, which would fight the click toggle, so hover
  // behaviour is only wired up where a real pointer exists.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = (i: number) => {
    if (pinned === i) {
      setPinned(null);
      setActive(canHover ? i : null);
    } else {
      setPinned(i);
      setActive(i);
    }
  };

  return (
    <section id="modules" className="border-t border-vault-line px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Kicker>(Core Modules)</Kicker>
            </Reveal>
            <RevealLines
              as="h2"
              lines={["THAT’S THE", "ECOSYSTEM"]}
              className="mt-4 font-heading text-5xl font-medium uppercase leading-[0.92] tracking-[-0.04em] text-vault-ink sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={200} className="max-w-[360px]">
            <Hashtag className="text-vault-ink">#RoleGoverned</Hashtag>
            <p className="mt-3 text-sm leading-relaxed text-vault-ink/65">
              Six modules, one permission model. Hover or tap a row to open its breakdown and the Figma slot for
              its screen.
            </p>
          </Reveal>
        </div>

        <ul
          className="mt-14 border-t border-vault-line"
          onMouseLeave={() => canHover && setActive(pinned)}
        >
          {MODULES.map((m, i) => {
            const open = active === i;
            return (
              <li
                key={m.index}
                onMouseEnter={() => canHover && setActive(i)}
                className={`border-b border-vault-line transition-colors duration-500 ease-kinetic ${
                  open ? "bg-vault-ink text-vault-canvas" : "text-vault-ink"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[4rem_1fr_minmax(0,22rem)_2rem] sm:gap-6 sm:py-7"
                >
                  <span className={`font-mono text-xs ${open ? "text-vault-canvas/60" : "text-vault-ink/45"}`}>{m.index}</span>
                  <span className="font-heading text-3xl font-medium leading-none tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                    {m.title}
                  </span>
                  {/* The full text moves into the left column once the row is open. */}
                  <span
                    className={`hidden text-sm leading-relaxed transition-opacity duration-300 sm:block ${
                      open ? "text-vault-canvas/70 lg:opacity-0" : "text-vault-ink/55"
                    }`}
                  >
                    {m.text}
                  </span>
                  <span
                    className={`justify-self-end font-heading text-2xl leading-none transition-transform duration-500 ease-kinetic ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                <div className={`cv-expand ${open ? "is-open" : ""}`}>
                  <div>
                    <div className="grid gap-6 pb-10 sm:grid-cols-[4rem_1fr]">
                      <span className="hidden sm:block" />
                      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                        <div className="lg:col-span-5">
                          <p className="max-w-[440px] text-base leading-relaxed text-vault-canvas/80">{m.text}</p>
                          <Bracket className="mt-8 text-vault-canvas/50">Capabilities</Bracket>
                          <ul className="mt-3 divide-y divide-vault-line-dark border-y border-vault-line-dark">
                            {m.specs.map((spec, j) => (
                              <li key={spec} className="flex items-center gap-4 py-3 font-mono text-xs text-vault-canvas/85">
                                <span className="text-vault-canvas/40">0{j + 1}</span>
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="lg:col-span-7">
                          <DeviceFrame
                            screen={m.screen}
                            ratio="16 / 9"
                            tone="dark"
                            sizes="(min-width: 1024px) 680px, 100vw"
                          />
                          <div className="mt-3 flex items-baseline gap-3 font-mono text-[11px] text-vault-canvas/50">
                            <Bracket className="text-vault-canvas/45">{SCREENS[m.screen].label}</Bracket>
                            <span>{m.title} screen</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
