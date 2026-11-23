import { SPEC_GRID } from "./content";
import { Bracket, Hashtag, Kicker } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";

const VISIBILITY = ["Private", "Group", "Institution"] as const;
const DESTINATIONS = ["Profile", "Subject Group", "Home Feed"] as const;

export default function Manifesto() {
  return (
    <section id="overview" className="border-t border-vault-line px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <Kicker>(About CoVault)</Kicker>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-3xl border border-vault-line bg-vault-card shadow-soft p-8 sm:p-10 lg:col-span-7">
            <h2 className="max-w-[520px] font-heading text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-vault-ink sm:text-4xl lg:text-5xl">
              Campus knowledge is 20% files, 80% verified context.
            </h2>
            <div className="cv-dots mt-10 h-32 rounded-2xl sm:h-40" aria-hidden />
            <Hashtag className="mt-8 text-vault-ink">#ZeroLeakage</Hashtag>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-between rounded-3xl bg-vault-ink p-8 text-vault-canvas sm:p-10 lg:col-span-5">
            <div>
              <Bracket className="text-vault-canvas/50">Scope</Bracket>
              <p className="mt-3 font-mono text-xs text-vault-canvas/70">institution_id = tenant boundary</p>
            </div>
            <div className="mt-16">
              <h3 className="font-heading text-3xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-4xl">
                What’s the point of the vault?
              </h3>
              <p className="mt-5 max-w-[380px] text-sm leading-relaxed text-vault-canvas/70">
                A file is only useful on campus when three things travel with it: who it is for, who checked it,
                and where it belongs. CoVault stores all three and routes the file accordingly.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid border-y border-vault-line sm:grid-cols-3">
          {SPEC_GRID.map((cell, i) => (
            <Reveal
              key={cell.key}
              delay={i * 90}
              className={`py-7 sm:px-8 ${i > 0 ? "border-t border-vault-line sm:border-l sm:border-t-0" : ""} ${
                i === 0 ? "sm:pl-0" : ""
              }`}
            >
              <p className="font-heading text-lg tracking-tight text-vault-ink">{cell.key}</p>
              <p className="mt-2 font-mono text-xs text-vault-ink/60">{cell.value}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <RevealLines
              as="h3"
              lines={["Why replace scattered", "WhatsApp groups &", "public Drive links?"]}
              className="font-heading text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-vault-ink sm:text-4xl lg:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={150} className="space-y-5 text-base leading-relaxed text-vault-ink/75 sm:text-lg">
              <p>
                Every semester a cohort graduates and takes the group chats with it. Past papers sit in a WhatsApp
                thread nobody can search. The one good set of notes lives on a public Drive link that was shared
                once, is indexed by nobody and reachable by anybody. Faculty answer the same syllabus question by
                email all week.
              </p>
              <p>
                CoVault’s <strong className="font-medium text-vault-ink">Social Propagation Engine</strong> treats
                routing as the product. Upload a file with Private, Group or Institution visibility and it lands
                where it belongs on its own: the uploader’s Profile, the Subject Group and the chronological Home
                Feed. Nothing leaves the institution’s tenant, and nothing needs a public link.
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-10 rounded-3xl border border-vault-line bg-vault-card shadow-soft p-6 sm:p-8">
              <Bracket className="text-vault-ink/50">Propagation</Bracket>
              <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {VISIBILITY.map((v) => (
                    <span key={v} className="rounded-full border border-vault-ink px-3 py-1 font-mono text-xs text-vault-ink">
                      {v}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs text-vault-ink/40">routes to →</span>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map((d) => (
                    <span key={d} className="rounded-full bg-vault-ink px-3 py-1 font-mono text-xs text-vault-canvas">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-vault-ink/55">
                Private stays on the profile. Group adds the subject group. Institution adds the campus-wide feed.
                The audit log records the upload either way.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
