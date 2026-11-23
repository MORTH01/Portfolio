import { Inter, Space_Grotesk } from "next/font/google";
import "./covault.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

// The fonts are bound to the same CSS variables tailwind.config.ts already maps to
// font-sans and font-heading, so the utilities swap typefaces only inside this tree.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

// Shared frame for the CoVault launch page. It only wraps /covault and leaves the portfolio
// page and the Orbit pages untouched, same as app/orbit/layout.tsx does for /orbit.
export default function CoVaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cv-root ${inter.variable} ${grotesk.variable} min-h-screen font-sans antialiased`}>
      {/* Dot mesh pinned behind every section; sections stay transparent so it shows through,
          and only the cards and the dark architecture band cover it. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(13, 13, 13, 0.055) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
