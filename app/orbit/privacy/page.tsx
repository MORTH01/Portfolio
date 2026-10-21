import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orbit — Privacy Policy",
  description: "How Orbit handles your data.",
};

const EFFECTIVE = "21 October 2026";
const EMAIL = "orbitml.co@gmail.com";

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="mt-12 mb-3 text-2xl font-bold text-white scroll-mt-24">{children}</h2>;
}

const rows: [string, string, string][] = [
  ["Email address; Google account name and profile picture (if you use Google sign-in)", "When you sign in", "To create and secure your account"],
  ["Profile: full name, main focus, occupation or student status, preferred daily target, marketing-email choice", "Onboarding form after your first sign-in", "To set up your targets, personalise Orbit, understand who uses Orbit (aggregate analysis) and, only if you opt in, send occasional product emails"],
  ["Your Orbit data: tasks, schedule, completions, focus sessions, study time, targets and app settings", "While signed in", "Backup and sync between your devices"],
  ["Orbit Pro subscription: a purchase token from Google Play, plan (monthly or yearly), status and renewal date", "If you subscribe", "To give you Orbit Pro on all your devices. Payment details are handled entirely by Google Play; we never see your card, UPI or bank details"],
  ["Number of AI requests per day", "If you use the AI assistant with Orbit Pro", "To apply a fair-use limit. We do not store the contents of your requests"],
  ["Exit survey: the reason you choose (and any text you type) when deleting your account", "Only if you delete your account", "To improve Orbit. Stored anonymously, without your name, email or account ID"],
  ["Technical: platform (Android or macOS), app version, time zone, last active time", "While signed in", "Support, compatibility and basic usage statistics"],
];

export default function PrivacyPage() {
  return (
    <article className="text-gray-300 leading-relaxed">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Orbit · Privacy policy · Effective {EFFECTIVE}</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-light text-white">Privacy policy</h1>
      <p className="mt-6">
        Orbit is a personal task manager and focus timer for Android and macOS, developed and published by{" "}
        <b className="text-white">Gouresh Vernekar</b> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy explains what Orbit
        collects, why, and the choices you have. Contact: <a className="text-white underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <H2>The short version</H2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Without an account, everything stays <b className="text-white">on your device</b>. We receive nothing.</li>
        <li>If you <b className="text-white">sign in</b> (optional), we store your account, a short profile and a backup of your Orbit data so you can sync and restore it.</li>
        <li>We <b className="text-white">never sell</b> your data and show no ads.</li>
        <li>You can <b className="text-white">delete your account</b> and all cloud data from inside the app at any time.</li>
      </ul>

      <H2>What we collect, and why</H2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#141414]">
        <table className="w-full min-w-[620px] text-sm">
          <thead>
            <tr className="text-left text-white/60">
              <th className="p-4 font-medium">Data</th>
              <th className="p-4 font-medium">When</th>
              <th className="p-4 font-medium">Why</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([d, w, y]) => (
              <tr key={d} className="border-t border-white/10 align-top">
                <td className="p-4 text-white/90">{d}</td>
                <td className="p-4">{w}</td>
                <td className="p-4">{y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4">Your optional Gemini API key and your notification setting are <b className="text-white">never</b> uploaded. They stay on your device.</p>

      <H2>AI assistant (optional)</H2>
      <p><b className="text-white">With Orbit Pro:</b> the text you type to the assistant (or the spreadsheet you import, or your day&rsquo;s stats for the reflection) and the relevant part of your schedule are sent to our server, which forwards them to Google Gemini and returns the answer. We don&rsquo;t store the contents of these requests; we only count how many you make each day to apply a fair-use limit.</p>
      <p className="mt-3"><b className="text-white">With your own Gemini key:</b> the same information is sent directly from your device to Google, and we don&rsquo;t receive it.</p>
      <p className="mt-3">In both cases Google&rsquo;s processing is governed by Google&rsquo;s terms and <a className="text-white underline underline-offset-4" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">privacy policy</a>.</p>

      <H2>Where data is stored</H2>
      <p>Account and backup data are stored with our infrastructure provider <b className="text-white">Supabase</b> (database, authentication and server functions), which runs on Amazon Web Services. Data is encrypted in transit (HTTPS/TLS) and protected by access rules that let each user read only their own records. Sign-in emails are sent through Google (Gmail). Google sign-in is provided by Google, and subscriptions are processed by Google Play.</p>

      <H2>Sharing</H2>
      <p>We do not sell, rent or share your personal data with advertisers or data brokers. We share it only with the service providers above, so they can run the service for us, or when required by law.</p>

      <H2>Subscriptions</H2>
      <p>Orbit Pro is billed by Google Play and renews automatically until you cancel in Google Play → Payments &amp; subscriptions. Deleting your Orbit account does <b className="text-white">not</b> cancel a Google Play subscription, so please cancel it in Google Play first. Refunds are handled by Google Play under its refund policy.</p>

      <H2>Retention</H2>
      <p>We keep your account and backup until you delete your account. Deletion removes your account, profile, cloud backup, subscription record and AI usage counts from our live database immediately. Copies on your own devices stay until you remove them (Settings → Data → Reset, or uninstall the app).</p>

      <H2 id="delete-account">Deleting your account</H2>
      <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 space-y-3">
        <p><b className="text-white">In the app:</b> Settings → Account → <b className="text-white">Delete account</b> → choose a reason → <b className="text-white">Confirm Deletion</b>. This permanently deletes your Orbit account, profile and cloud backup, and clears Orbit&rsquo;s data on that device.</p>
        <p><b className="text-white">Without the app:</b> see <Link href="/orbit/delete-account" className="text-white underline underline-offset-4">gxvrnkr.com/orbit/delete-account</Link>.</p>
      </div>

      <H2>Your choices and rights</H2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use Orbit without an account.</li>
        <li>Edit your profile any time (Settings → Account → Edit profile), including turning marketing email off.</li>
        <li>Export your data (Settings → Schedule files → Export or Full backup).</li>
        <li>Ask us for a copy, correction or deletion of your data by emailing <a className="text-white underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</li>
      </ul>

      <H2>Children</H2>
      <p>Orbit is not directed at children under 13, and we do not knowingly collect their data.</p>

      <H2>Changes</H2>
      <p>We will post any changes on this page and update the effective date above. Material changes will also be announced in the app.</p>
    </article>
  );
}
