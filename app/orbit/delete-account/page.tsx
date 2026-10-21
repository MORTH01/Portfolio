import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orbit — Delete your account",
  description: "How to delete your Orbit account and the data associated with it.",
};

const EMAIL = "orbitml.co@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Delete my Orbit account")}&body=${encodeURIComponent(
  "Please delete my Orbit account and all associated data.\n\nThe email I sign in to Orbit with is: "
)}`;

export default function DeleteAccountPage() {
  return (
    <article className="text-gray-300 leading-relaxed">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Orbit · by Gouresh Vernekar</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-light text-white">Delete your Orbit account</h1>
      <p className="mt-6 max-w-[680px]">
        You can delete your Orbit account and the data stored with it at any time, either inside the app or by
        emailing us.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
          <h2 className="text-xl font-bold text-white">Option 1 · In the app (instant)</h2>
          <ol className="mt-4 list-decimal pl-5 space-y-2 text-sm">
            <li>Open Orbit and go to <b className="text-white">Settings</b>.</li>
            <li>Under <b className="text-white">Account</b>, tap <b className="text-white">Delete account</b>.</li>
            <li>Choose a reason (optional feedback).</li>
            <li>Tap <b className="text-white">Confirm Deletion</b>.</li>
          </ol>
          <p className="mt-4 text-sm text-white/60">Your account is deleted immediately and you are signed out.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
          <h2 className="text-xl font-bold text-white">Option 2 · By email</h2>
          <p className="mt-4 text-sm">
            If you no longer have the app, email{" "}
            <a href={MAILTO} className="text-white underline underline-offset-4">{EMAIL}</a> from the address you sign in
            with, with the subject <b className="text-white">&ldquo;Delete my Orbit account&rdquo;</b>.
          </p>
          <p className="mt-4 text-sm text-white/60">We delete the account within 30 days and confirm by email.</p>
          <a
            href={MAILTO}
            className="mt-6 inline-block px-6 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition"
          >
            Email a deletion request
          </a>
        </div>
      </div>

      <h2 className="mt-12 mb-3 text-2xl font-bold text-white">What is deleted</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Your account (email address and sign-in details)</li>
        <li>Your profile (name, focus, occupation, daily target, marketing choice)</li>
        <li>Your cloud backup: tasks, schedule, completions, focus sessions, study time, targets and settings</li>
        <li>Your Orbit Pro subscription record and AI usage counts</li>
      </ul>

      <h2 className="mt-12 mb-3 text-2xl font-bold text-white">What is kept</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>The exit-survey answer, if you give one. It is stored anonymously, without your name, email or account ID.</li>
        <li>Google Play keeps its own record of any purchases, under Google&rsquo;s policies.</li>
        <li>Data on your own devices stays until you remove it (Settings → Data → Reset, or uninstall the app).</li>
      </ul>

      <div className="mt-12 rounded-2xl border border-[#FF5722]/40 bg-[#1c0f0b] p-6">
        <p className="text-white font-semibold">Subscribed to Orbit Pro?</p>
        <p className="mt-2 text-sm">
          Deleting your account does not cancel your Google Play subscription. Cancel it first in Google Play →{" "}
          <a
            href="https://play.google.com/store/account/subscriptions"
            target="_blank"
            rel="noreferrer"
            className="text-white underline underline-offset-4"
          >
            Payments &amp; subscriptions
          </a>
          .
        </p>
      </div>

      <p className="mt-12 text-sm text-white/50">
        See also the <Link href="/orbit/privacy" className="text-white/80 underline underline-offset-4">privacy policy</Link>.
      </p>
    </article>
  );
}
