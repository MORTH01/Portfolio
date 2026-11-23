import HeroShowcase from "./HeroShowcase";
import { CtaButton, Kicker } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pb-40 lg:pt-44">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-vault-line pb-5">
          <Kicker>(Product Launch)</Kicker>
          <p className="font-heading text-base tracking-tight text-vault-ink/60 sm:text-lg">#VerifiedKnowledge</p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <RevealLines
            as="h1"
            lines={["Knowledge,", "Verified and", "Vaulted."]}
            className="font-heading text-[2.9rem] font-medium leading-[0.95] tracking-[-0.04em] text-vault-ink sm:text-7xl lg:text-[6.4rem] xl:text-[7.2rem]"
          />
          <Reveal delay={260} className="lg:pb-3">
            <p className="max-w-[440px] text-base leading-relaxed text-vault-ink/75 sm:text-lg">
              CoVault is a cloud-native academic knowledge platform and private social network built for
              universities—unifying verified resources, role-governed communities, and institutional memory.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaButton href="#overview">Explore the System.</CtaButton>
              <CtaButton href="#simulator" tone="outline" arrow={false}>
                Interactive Demo ↓
              </CtaButton>
            </div>
          </Reveal>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
