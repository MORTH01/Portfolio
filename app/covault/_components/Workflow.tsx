"use client";

import { useEffect, useState } from "react";
import { WORKFLOW } from "./content";
import { Bracket, Kicker } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";
import Simulator from "./Simulator";

const AUTO_ADVANCE_MS = 6500;

export default function Workflow() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Cycle through the stages until the visitor picks one, so the diagram reads as a sequence
  // even for someone who never clicks.
  useEffect(() => {
    if (!auto || hovered) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % WORKFLOW.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, auto, hovered]);

  const stage = WORKFLOW[active];

  return (
    <section id="workflow" className="border-t border-vault-line px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker>(How It Works)</Kicker>
            </Reveal>
            <RevealLines
              as="h2"
              lines={["Four stages,", "one tenant boundary."]}
              className="mt-4 font-heading text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-vault-ink sm:text-5xl lg:text-6xl"
            />
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <p className="max-w-[420px] text-base leading-relaxed text-vault-ink/70">
              The operational flow from first launch to a deep-linked notification. Every stage runs inside the
              institution’s Institution_ID; nothing below crosses it.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-14 grid gap-4 lg:grid-cols-12"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <ol className="lg:col-span-5" aria-label="Workflow stages">
            {WORKFLOW.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.index} className="border-t border-vault-line last:border-b">
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setAuto(false);
                    }}
                    aria-current={isActive ? "step" : undefined}
                    className={`group flex w-full items-start gap-5 py-5 text-left transition-colors duration-300 sm:gap-7 ${
                      isActive ? "text-vault-ink" : "text-vault-ink/45 hover:text-vault-ink"
                    }`}
                  >
                    <span className="mt-1 font-mono text-xs">{s.index} /</span>
                    <span className="flex-1">
                      <span className="block font-heading text-xl font-medium tracking-tight sm:text-2xl">{s.title}</span>
                      <span
                        className={`cv-expand mt-2 text-sm leading-relaxed text-vault-ink/65 ${
                          isActive ? "is-open" : ""
                        }`}
                      >
                        <span className="block">{s.summary}</span>
                      </span>
                    </span>
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-vault-accent" : "bg-vault-ink/15"
                      }`}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-vault-line bg-vault-card shadow-soft p-6 sm:p-8 lg:min-h-[420px]">
              <div className="flex items-center justify-between">
                <Bracket className="text-vault-ink/50">Stage {stage.index}</Bracket>
                <div className="flex gap-1.5" aria-hidden>
                  {WORKFLOW.map((s, i) => (
                    <span
                      key={s.index}
                      className={`h-1 rounded-full transition-all duration-500 ease-kinetic ${
                        i === active ? "w-8 bg-vault-ink" : "w-3 bg-vault-ink/15"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div key={stage.index} className="cv-reveal is-in mt-6">
                <StageDiagram kind={stage.diagram} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {stage.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-vault-line px-3 py-1 font-mono text-[11px] text-vault-ink/75">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Simulator />
      </div>
    </section>
  );
}

function StageDiagram({ kind }: { kind: (typeof WORKFLOW)[number]["diagram"] }) {
  if (kind === "states") {
    return (
      <div>
        <Flow nodes={["Unauthenticated", "Authenticated", "ActiveSession"]} />
        <p className="mt-5 font-mono text-xs leading-relaxed text-vault-ink/55">
          email domain ∈ institution → bind Institution_ID → attach subject groups
        </p>
      </div>
    );
  }
  if (kind === "propagation") {
    return (
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <Node label="Upload" sub="tags + visibility" dark />
        <div className="space-y-2">
          {[
            ["Private", "Profile"],
            ["Group", "Profile · Subject Group"],
            ["Institution", "Profile · Subject Group · Home Feed"],
          ].map(([v, dest]) => (
            <div key={v} className="flex items-center gap-3 rounded-2xl border border-vault-line px-4 py-2.5">
              <span className="w-24 font-mono text-xs text-vault-ink">{v}</span>
              <span className="font-mono text-[11px] text-vault-ink/40">→</span>
              <span className="font-mono text-[11px] text-vault-ink/70">{dest}</span>
            </div>
          ))}
          <p className="pl-1 font-mono text-[11px] text-vault-ink/45">every write → immutable audit log</p>
        </div>
      </div>
    );
  }
  if (kind === "communities") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
          {["Classes", "Subjects", "Clubs"].map((it) => (
            <Node key={it} label={it} />
          ))}
          <span className="font-mono text-[11px] text-vault-ink/45">each created as one of ↓</span>
        </div>
        {[
          { mode: "Open", note: "members join instantly" },
          { mode: "Approval-gated", note: "join requests wait in the admin queue" },
        ].map((col) => (
          <div key={col.mode} className="rounded-2xl border border-vault-line p-4">
            <span className="font-heading text-base font-medium tracking-tight text-vault-ink">{col.mode}</span>
            <p className="mt-1 font-mono text-[11px] text-vault-ink/50">{col.note}</p>
          </div>
        ))}
        <div className="rounded-2xl bg-vault-ink px-4 py-3 font-mono text-[11px] text-vault-canvas sm:col-span-2">
          DM &amp; group threads: scope = institution_id · no cross-campus inbox
        </div>
      </div>
    );
  }
  return (
    <div>
      <Flow nodes={["Event published", "1-tap register", "Reminder fires", "Deep link opens screen"]} />
      <p className="mt-5 font-mono text-xs leading-relaxed text-vault-ink/55">
        push + WebSocket → /events/:id (not the app home)
      </p>
    </div>
  );
}

function Flow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <Node label={n} dark={i === nodes.length - 1} />
          {i < nodes.length - 1 && (
            <span className="font-mono text-xs text-vault-ink/35" aria-hidden>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Node({ label, sub, dark = false }: { label: string; sub?: string; dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-2.5 ${
        dark ? "border-vault-ink bg-vault-ink text-vault-canvas" : "border-vault-line bg-vault-canvas text-vault-ink"
      }`}
    >
      <p className="font-mono text-xs">{label}</p>
      {sub && <p className={`mt-0.5 font-mono text-[10px] ${dark ? "text-vault-canvas/60" : "text-vault-ink/50"}`}>{sub}</p>}
    </div>
  );
}
