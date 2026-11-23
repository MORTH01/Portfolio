import Link from "next/link";
import { FOOTER_GRID, WALKTHROUGH_HREF } from "./content";
import { Bracket, CtaButton } from "./Kinetic";
import Reveal, { RevealLines } from "./Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-vault-line">
      <div className="px-6 pt-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <RevealLines
              as="h2"
              lines={["Ready to bring", "institutional memory", "to every campus?"]}
              className="font-heading text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-vault-ink sm:text-6xl lg:text-[4rem]"
            />
            <Reveal delay={200} className="lg:pb-2">
              <p className="max-w-[420px] text-base leading-relaxed text-vault-ink/70">
                Walk through the interactive prototype and the technical deck with the founder, and see how a
                single-department pilot becomes a university-wide license.
              </p>
              <div className="mt-7">
                <CtaButton href={WALKTHROUGH_HREF}>Schedule Investor Walkthrough.</CtaButton>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-vault-line pt-10 md:grid-cols-4">
            {FOOTER_GRID.map((col, i) => (
              <Reveal key={col.key} delay={i * 80}>
                <Bracket className="text-vault-ink/50">{col.key}</Bracket>
                <ul className="mt-4 space-y-1.5 text-sm text-vault-ink">
                  {col.lines.map((line) => (
                    <li key={line.text}>
                      {line.href ? (
                        line.href.startsWith("/") ? (
                          <Link href={line.href} className="underline-offset-4 hover:underline">
                            {line.text}
                          </Link>
                        ) : (
                          <a href={line.href} className="underline-offset-4 hover:underline">
                            {line.text}
                          </a>
                        )
                      ) : (
                        line.text
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Sized from the viewport so the wordmark runs edge to edge at every width. */}
      <div className="mt-16 px-3 sm:px-5" aria-hidden>
        <p className="select-none whitespace-nowrap text-center font-heading text-[24.4vw] font-bold uppercase leading-[0.8] tracking-[-0.06em] text-vault-ink">
          COVAULT
        </p>
      </div>

      <div className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 py-6 text-xs text-vault-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Gouresh Vernekar</p>
          <div className="flex gap-5">
            <Bracket>
              <Link href="/" className="hover:text-vault-ink">
                Back to gxvrnkr.com
              </Link>
            </Bracket>
            <Bracket>Built with Next.js</Bracket>
          </div>
        </div>
      </div>
    </footer>
  );
}
