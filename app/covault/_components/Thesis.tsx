import { THESIS, WALKTHROUGH_HREF } from "./content";
import { Bracket, Kicker, CtaButton } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";

export default function Thesis() {
  return (
    <section id="pitch" className="border-t border-vault-line px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker>(Investor Thesis)</Kicker>
            </Reveal>
            <RevealLines
              as="h2"
              lines={["Why CoVault wins."]}
              className="mt-4 font-heading text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-vault-ink sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <p className="max-w-[420px] text-base leading-relaxed text-vault-ink/70">
              Four reasons the vault gets harder to leave every semester, and one of them is still on the roadmap.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid border-t border-vault-line md:grid-cols-2">
          {THESIS.map((card, i) => (
            <Reveal
              key={card.index}
              delay={i * 90}
              className={`group flex flex-col border-b border-vault-line py-8 transition-colors duration-500 ease-kinetic hover:bg-vault-card md:p-8 ${
                i % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-vault-ink/45">{card.index}</span>
                {card.tag ? (
                  <span className="rounded-full border border-vault-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-vault-accent">
                    {card.tag}
                  </span>
                ) : (
                  <Bracket className="text-vault-ink/40">Core</Bracket>
                )}
              </div>
              <h3 className="mt-10 max-w-[420px] font-heading text-2xl font-medium leading-tight tracking-[-0.03em] text-vault-ink sm:text-3xl">
                {card.title}
              </h3>
              <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-vault-ink/65 sm:text-base">{card.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[520px] text-sm leading-relaxed text-vault-ink/60">
            Pricing, pilot scope and the technical deck are walked through live rather than published here.
          </p>
          <CtaButton href={WALKTHROUGH_HREF}>Request Pitch Deck.</CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
