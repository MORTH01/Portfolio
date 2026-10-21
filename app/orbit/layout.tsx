import Image from "next/image";
import Link from "next/link";

// Shared frame for every page under /orbit (overview, privacy policy, account deletion).
// It only wraps the Orbit pages and does not affect the main portfolio page.
export default function OrbitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Same subtle 64px grid texture as the Orbit app's background, fading out towards the edges */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      {/* Soft light glow behind the content */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(255,255,255,0.07), transparent 70%)" }}
      />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/75 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[960px] items-center justify-between px-5 py-3">
          <Link href="/orbit" className="flex items-center gap-3">
            <Image src="/orbit/icon.png" alt="Orbit" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-semibold tracking-wide">Orbit</span>
          </Link>
          <div className="flex items-center gap-5 text-sm text-white/70">
            <Link href="/orbit/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/orbit/delete-account" className="hover:text-white transition-colors">Delete account</Link>
            <Link href="/" className="hidden sm:inline hover:text-white transition-colors">← GG</Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-[960px] px-5 py-12 sm:py-16">{children}</main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[960px] flex-col gap-2 px-5 py-8 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© 2026 Gouresh Vernekar · Orbit</p>
          <p>
            Support:{" "}
            <a href="mailto:orbitml.co@gmail.com" className="text-white/80 underline-offset-4 hover:underline">
              orbitml.co@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
