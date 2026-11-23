"use client";

import { useMemo, useState } from "react";
import { Bracket, Kicker } from "./Kinetic";
import Reveal from "./Reveal";

const ROLES = ["Student", "Faculty", "Admin"] as const;
const VISIBILITY = ["Private", "Group", "Institution"] as const;
const RELATIONS = ["Owner", "Group member", "Same institution", "Other institution"] as const;
const ACTIONS = ["View", "Download", "Verify", "Audit", "Soft-delete"] as const;

type Role = (typeof ROLES)[number];
type Visibility = (typeof VISIBILITY)[number];
type Relation = (typeof RELATIONS)[number];
type Action = (typeof ACTIONS)[number];

// Which actions each role may even attempt; the boundary check then decides per request.
const POLICY: Record<Role, Action[]> = {
  Student: ["View", "Download", "Soft-delete"],
  Faculty: ["View", "Download", "Verify", "Soft-delete"],
  Admin: ["View", "Download", "Audit", "Soft-delete"],
};

type Decision = { action: Action; allowed: boolean; reason: string };

function authorize(role: Role, visibility: Visibility, relation: Relation): Decision[] {
  const sameTenant = relation !== "Other institution";
  const inAudience =
    visibility === "Institution"
      ? sameTenant
      : visibility === "Group"
      ? relation === "Owner" || relation === "Group member"
      : relation === "Owner";

  return ACTIONS.map((action) => {
    if (!POLICY[role].includes(action)) {
      return { action, allowed: false, reason: `not in ${role.toLowerCase()} policy` };
    }
    if (!sameTenant) {
      return { action, allowed: false, reason: "institution_id mismatch" };
    }
    switch (action) {
      case "Audit":
        return { action, allowed: true, reason: "admin, same tenant" };
      case "Soft-delete":
        return relation === "Owner" || role === "Admin"
          ? { action, allowed: true, reason: relation === "Owner" ? "owner" : "admin, snapshot recorded" }
          : { action, allowed: false, reason: "not owner or admin" };
      default:
        return inAudience
          ? { action, allowed: true, reason: `${visibility.toLowerCase()} visibility, in audience` }
          : { action, allowed: false, reason: `${visibility.toLowerCase()} visibility, outside audience` };
    }
  });
}

const DESTINATIONS: Record<Visibility, string[]> = {
  Private: ["Profile"],
  Group: ["Profile", "Subject Group"],
  Institution: ["Profile", "Subject Group", "Home Feed"],
};

export default function Simulator() {
  const [role, setRole] = useState<Role>("Student");
  const [visibility, setVisibility] = useState<Visibility>("Group");
  const [relation, setRelation] = useState<Relation>("Group member");

  const decisions = useMemo(() => authorize(role, visibility, relation), [role, visibility, relation]);
  const sameTenant = relation !== "Other institution";
  const groupMatch = relation === "Owner" || relation === "Group member";

  return (
    <div id="simulator" className="mt-24">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <Kicker>(Live Visibility &amp; RBAC Simulator)</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="mt-4 font-heading text-3xl font-medium leading-[0.98] tracking-[-0.04em] text-vault-ink sm:text-4xl lg:text-5xl">
              Pick a role, set the visibility, watch Authorize_Request decide.
            </h3>
          </Reveal>
        </div>
        <Reveal delay={200} className="lg:col-span-5">
          <p className="max-w-[420px] text-sm leading-relaxed text-vault-ink/65">
            The same pipeline runs on every request in production. Here it evaluates one resource against the
            requester you describe, with the outcome per action and the audit entry it would write.
          </p>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-10 overflow-hidden rounded-3xl border border-vault-line bg-vault-card shadow-soft">
        <div className="grid gap-px bg-vault-line lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8 bg-vault-card p-6 sm:p-8">
            <Control label="Requester role" options={ROLES} value={role} onChange={setRole} />
            <Control label="Resource visibility" options={VISIBILITY} value={visibility} onChange={setVisibility} />
            <Control label="Requester relation to the resource" options={RELATIONS} value={relation} onChange={setRelation} />

            <div>
              <Bracket className="text-vault-ink/50">Propagation</Bracket>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Profile", "Subject Group", "Home Feed"].map((dest) => {
                  const on = DESTINATIONS[visibility].includes(dest);
                  return (
                    <span
                      key={dest}
                      className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors duration-300 ${
                        on ? "bg-vault-ink text-vault-canvas" : "border border-vault-line text-vault-ink/35"
                      }`}
                    >
                      {dest}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-vault-ink p-6 text-vault-canvas sm:p-8">
            <Bracket className="text-vault-canvas/50">Authorize_Request</Bracket>
            <ol className="mt-5 space-y-3">
              <Step index="1" title="JWT Signature & Expiry" ok detail="valid session token" />
              <Step index="2" title="RBAC Policy Matrix" ok detail={`${role.toLowerCase()} may: ${POLICY[role].join(", ").toLowerCase()}`} />
              <Step
                index="3"
                title="Institution & Group Boundary Check"
                ok={sameTenant}
                detail={
                  sameTenant
                    ? `institution_id match · group ${groupMatch ? "match" : "no match"}`
                    : "institution_id mismatch · request rejected"
                }
              />
            </ol>

            <div className="mt-7 border-t border-vault-line-dark pt-6">
              <Bracket className="text-vault-canvas/50">Decision per action</Bracket>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {decisions.map((d) => (
                  <li
                    key={d.action}
                    className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 transition-colors duration-300 ${
                      d.allowed ? "border-vault-accent/70 bg-vault-accent/10" : "border-vault-line-dark"
                    }`}
                  >
                    <div>
                      <p className="font-mono text-xs">{d.action}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-vault-canvas/50">{d.reason}</p>
                    </div>
                    <span className={`font-mono text-[11px] ${d.allowed ? "text-vault-accent" : "text-vault-canvas/40"}`}>
                      {d.allowed ? "ALLOW" : "DENY"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 font-mono text-[11px] leading-relaxed text-vault-canvas/45">
              audit_log ← {`{ role: ${role.toLowerCase()}, visibility: ${visibility.toLowerCase()}, relation: "${relation.toLowerCase()}", view: ${
                decisions[0].allowed ? "ALLOW" : "DENY"
              } }`}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Control<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <Bracket className="text-vault-ink/50">{label}</Bracket>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const selected = opt === value;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-300 ${
                selected
                  ? "border-vault-ink bg-vault-ink text-vault-canvas"
                  : "border-vault-line text-vault-ink hover:border-vault-ink"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step({ index, title, ok, detail }: { index: string; title: string; ok: boolean; detail: string }) {
  return (
    <li className="flex gap-4">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors duration-300 ${
          ok ? "bg-vault-accent text-vault-ink" : "bg-vault-canvas/15 text-vault-canvas"
        }`}
      >
        {index}
      </span>
      <div>
        <p className="font-mono text-xs">
          {title} <span className={ok ? "text-vault-accent" : "text-vault-canvas/50"}>{ok ? "PASS" : "FAIL"}</span>
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-vault-canvas/50">{detail}</p>
      </div>
    </li>
  );
}
