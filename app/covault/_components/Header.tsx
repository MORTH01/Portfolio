"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "./content";

// Desktop nav links: colour shift to the accent plus a hairline that draws in underneath.
const navLink =
  "relative py-1 text-sm font-medium tracking-tight text-vault-ink transition-colors duration-200 ease-out hover:text-vault-accent " +
  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-vault-accent after:transition-all after:duration-200 after:ease-out after:content-[''] hover:after:w-full";

const pill =
  "inline-flex items-center rounded-full border border-vault-ink/15 px-3 py-1 text-xs transition-colors duration-200 ease-out hover:border-vault-accent hover:text-vault-accent";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <div
        className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ease-kinetic sm:px-5 ${
          scrolled || open
            ? "border-vault-line bg-vault-canvas/85 shadow-[0_8px_30px_rgba(13,13,13,0.06)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/covault"
            className="font-heading text-lg font-bold uppercase tracking-[-0.04em] text-vault-ink transition-colors duration-200 ease-out hover:text-vault-accent"
          >
            COVAULT
          </Link>
          <Link href="/" className={`${pill} hidden text-vault-ink/60 sm:inline-flex`}>
            ← gxvrnkr.com
          </Link>
        </div>

        <nav className="hidden items-center gap-7 md:flex" aria-label="CoVault sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="cv-mobile-nav"
          className={`${pill} font-medium text-vault-ink md:hidden`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id="cv-mobile-nav" className={`cv-expand mx-auto max-w-[1280px] md:hidden ${open ? "is-open" : ""}`}>
        <div>
          <nav
            className="mt-2 flex flex-col rounded-3xl border border-vault-line bg-vault-canvas/95 p-2 shadow-soft backdrop-blur-md"
            aria-label="CoVault sections"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-vault-ink transition-colors duration-200 ease-out hover:bg-vault-ink/[0.04] hover:text-vault-accent"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/"
              className="rounded-2xl px-4 py-3 text-sm text-vault-ink/60 transition-colors duration-200 ease-out hover:bg-vault-ink/[0.04] hover:text-vault-accent"
            >
              ← gxvrnkr.com
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
