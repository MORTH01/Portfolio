import type { CSSProperties } from "react";
import { PILLARS, PIPELINE } from "./content";
import { Bracket, Kicker } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";

export default function Architecture() {
  return (
    <section id="architecture" className="bg-vault-dark px-6 py-24 text-vault-canvas sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker>(System Security &amp; Scale)</Kicker>
            </Reveal>
            <RevealLines
              as="h2"
              lines={["Under the hood."]}
              className="mt-4 font-heading text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <Bracket className="text-vault-canvas/50">Architecture</Bracket>
            <p className="mt-3 max-w-[420px] text-base leading-relaxed text-vault-canvas/65">
              Zero-trust by default: a request earns each stage of the pipeline, and the tenant boundary is enforced at
              the database layer, where no client can route around it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-14 rounded-3xl border border-vault-line-dark p-5 sm:p-8">
          <div className="flex items-center justify-between">
            <Bracket className="text-vault-canvas/50">Authorize_Request pipeline</Bracket>
            <span className="font-mono text-[11px] text-vault-canvas/40">6 stages · fail closed</span>
          </div>
          <ol className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {PIPELINE.map((node, i) => (
              <li key={node.step} className="relative flex md:block">
                <div
                  className="cv-pulse flex h-full w-full flex-col rounded-2xl border border-vault-line-dark bg-vault-ink p-4 transition-colors"
                  style={{ "--cv-delay": `${i * 600}ms` } as CSSProperties}
                >
                  <span className="font-mono text-[10px] text-vault-canvas/40">0{i + 1}</span>
                  <span className="mt-3 font-heading text-base font-medium leading-tight tracking-tight">{node.step}</span>
                  <span className="mt-2 font-mono text-[10px] leading-relaxed text-vault-canvas/50">{node.note}</span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <span
                    className="pointer-events-none absolute -right-2.5 top-1/2 hidden -translate-y-1/2 font-mono text-xs text-vault-canvas/30 xl:block"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-vault-line-dark bg-vault-line-dark md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="flex min-w-0 flex-col bg-vault-dark p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-vault-canvas/40">0{i + 1}</span>
                <Bracket className="text-vault-canvas/40">{["Storage", "Search", "Audit", "Scale"][i]}</Bracket>
              </div>
              <h3 className="mt-8 font-heading text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-3xl">{p.title}</h3>
              <p className="mb-6 mt-4 max-w-[480px] text-sm leading-relaxed text-vault-canvas/65">{p.text}</p>
              <code className="mt-auto block max-w-full overflow-x-auto whitespace-nowrap rounded-xl bg-vault-ink px-4 py-3 font-mono text-[11px] text-vault-accent/90">
                {p.code}
              </code>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
