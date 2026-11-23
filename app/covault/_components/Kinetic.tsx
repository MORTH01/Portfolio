import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "ink" | "outline";

const tones: Record<Tone, string> = {
  ink: "bg-vault-ink text-vault-canvas hover:bg-vault-accent hover:text-white",
  outline:
    "border border-vault-ink/15 text-vault-ink hover:border-vault-accent hover:text-vault-accent hover:shadow-[0_0_0_4px_rgba(255,107,0,0.12)]",
};

// Pill CTA. In-site routes go through next/link; anchors and mailto links stay plain so the
// browser handles them.
export function CtaButton({
  href,
  children,
  tone = "ink",
  arrow = true,
}: {
  href: string;
  children: string;
  tone?: Tone;
  arrow?: boolean;
}) {
  const base = `group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.99] ${tones[tone]}`;

  const body = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={base}>
        {body}
      </Link>
    );
  }
  return (
    <a href={href} className={base}>
      {body}
    </a>
  );
}

function Arrow() {
  return (
    <svg
      className="h-3.5 w-3.5 -translate-x-0.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Editorial markers used throughout the page: (kicker), #hashtag and [bracket] labels.
export function Kicker({ children }: { children: string }) {
  return <p className="font-heading text-base tracking-tight text-vault-accent sm:text-lg">{children}</p>;
}

export function Hashtag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`font-heading text-3xl font-medium tracking-[-0.04em] sm:text-4xl ${className}`}>{children}</p>
  );
}

export function Bracket({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${className}`}>
      [{children}]
    </p>
  );
}
