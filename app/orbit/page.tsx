import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orbit — Plan, Focus, Track",
  description:
    "Orbit is a minimal task manager, focus timer and study tracker for Android and macOS, with optional sync and an AI assistant.",
};

// When Orbit is live on Google Play, put its store link here and the button switches from "Coming soon".
const PLAY_URL = "";

const features = [
  { title: "Three-day planner", text: "Today, tomorrow and the day after at a glance, with a calendar, recurring tasks and roll-over of missed tasks." },
  { title: "Focus timer", text: "Pomodoro, deep work, breaks, stopwatch or custom sessions up to 600 minutes." },
  { title: "Targets & points", text: "Priority points with daily, weekly and monthly targets to keep you honest." },
  { title: "Analytics", text: "Study hours, completion streaks and PDF reports of how your time was spent." },
  { title: "Sync, optional", text: "Use Orbit without an account, or sign in with Google or an email code to back up and sync between devices." },
  { title: "AI assistant", text: "Type “gym every weekday at 6am” and Orbit schedules it. Also reads spreadsheets and writes your end-of-day reflection." },
];

export default function OrbitPage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="flex flex-col items-center text-center">
        <Image src="/orbit/icon.png" alt="Orbit app icon" width={112} height={112} className="rounded-[28px] border border-white/10" priority />
        <h1 className="mt-8 text-5xl sm:text-6xl font-light tracking-wide">Orbit</h1>
        <p className="mt-4 text-sm sm:text-base tracking-[0.35em] uppercase text-white/60">Plan · Focus · Track</p>
        <p className="mt-6 max-w-[560px] text-gray-300 leading-relaxed">
          A minimal black-and-white task manager, focus timer and study tracker for Android and macOS.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {PLAY_URL ? (
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noreferrer"
              className="w-[250px] whitespace-nowrap text-center px-7 py-3 rounded-full font-medium bg-white text-black hover:bg-white/90 transition"
            >
              Get it on Google Play
            </a>
          ) : (
            <span className="w-[250px] whitespace-nowrap text-center px-7 py-3 rounded-full font-medium bg-black/45 border border-white/15 text-white/70">
              Coming soon to Google Play
            </span>
          )}
          <Link
            href="/orbit/privacy"
            className="w-[250px] whitespace-nowrap text-center px-7 py-3 rounded-full font-medium bg-black/45 border border-white/15 text-white/90 hover:border-white/40 hover:text-white transition"
          >
            Privacy policy
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">What it does</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-[#141414] border border-white/10 p-6">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro */}
      <section className="rounded-3xl border border-white/10 bg-[#141414] p-8 sm:p-10">
        <h2 className="text-3xl font-bold">Orbit Pro</h2>
        <p className="mt-3 text-gray-300 leading-relaxed max-w-[640px]">
          Everything in Orbit is free. Orbit Pro unlocks the built-in AI assistant, AI spreadsheet import and AI
          reflections, and works on every device you sign in to.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10">₹99 / month</span>
          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10">₹349 / year</span>
          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10">7-day free trial</span>
        </div>
        <p className="mt-5 text-xs text-white/50 leading-relaxed">
          Billed through Google Play; prices outside India are set by Google Play in local currency. Cancel any time in
          Google Play → Payments &amp; subscriptions. Prefer not to subscribe? Add your own free Gemini API key in
          Settings and the AI features stay free.
        </p>
      </section>

      {/* Help */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Help &amp; legal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <Link href="/orbit/privacy" className="rounded-2xl border border-white/10 bg-[#141414] p-6 hover:border-white/30 transition">
            <p className="font-semibold">Privacy policy</p>
            <p className="mt-2 text-gray-400">What Orbit collects and why.</p>
          </Link>
          <Link href="/orbit/delete-account" className="rounded-2xl border border-white/10 bg-[#141414] p-6 hover:border-white/30 transition">
            <p className="font-semibold">Delete your account</p>
            <p className="mt-2 text-gray-400">Remove your account and cloud data.</p>
          </Link>
          <a href="mailto:orbitml.co@gmail.com?subject=Orbit%20support" className="rounded-2xl border border-white/10 bg-[#141414] p-6 hover:border-white/30 transition">
            <p className="font-semibold">Contact support</p>
            <p className="mt-2 text-gray-400">orbitml.co@gmail.com</p>
          </a>
        </div>
      </section>
    </div>
  );
}
