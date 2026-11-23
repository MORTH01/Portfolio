import Image from "next/image";
import type { CSSProperties } from "react";
import { SCREENS, type ScreenId } from "./content";

// Crisp 1px edge plus a soft lift; the mockups carry no shadow of their own after cropping.
// The dark variant swaps the edge for a light one so the frame still reads on the inverted rows.
const SHADOW = {
  light: "shadow-[0_0_0_1px_rgba(13,13,13,0.08),0_1px_2px_rgba(13,13,13,0.04),0_8px_30px_rgba(0,0,0,0.03)]",
  dark: "shadow-[0_0_0_1px_rgba(247,247,245,0.14),0_8px_30px_rgba(0,0,0,0.3)]",
};

// Framed slot for a product screen. With an image bound in content.ts it renders that image at
// its natural ratio (the mockups already carry their own browser chrome or phone bezel, so no
// extra frame is drawn around them), or cropped from the top into a fixed `ratio` when one is
// given. Without an image it renders a labelled placeholder at the default ratio, so the layout
// is final before the screens exist.
export default function DeviceFrame({
  screen,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  ratio,
  tone = "light",
}: {
  screen: ScreenId;
  className?: string;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
  tone?: "light" | "dark";
}) {
  const { label, kind, src, width, height, radius } = SCREENS[screen];

  if (src && width && height) {
    // Percent radii keep the CSS corner aligned with the PNG's transparent corner at any size;
    // a cropped frame has its own corners, so it takes a plain rounded edge instead.
    const style: CSSProperties = ratio
      ? { aspectRatio: ratio }
      : {
          aspectRatio: `${width} / ${height}`,
          borderRadius: radius ? `${(radius / width) * 100}% / ${(radius / height) * 100}%` : undefined,
        };
    return (
      <figure className={`relative overflow-hidden ${ratio ? "rounded-xl" : ""} ${SHADOW[tone]} ${className}`} style={style}>
        <Image
          src={src}
          alt={`CoVault ${label} screen`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </figure>
    );
  }

  return (
    <figure
      className={`cv-frame relative overflow-hidden bg-vault-card ${SHADOW[tone]} ${
        kind === "desktop" ? "rounded-2xl" : "rounded-[2.4rem]"
      } ${className}`}
      style={{ aspectRatio: kind === "desktop" ? "16 / 10" : "9 / 19.5" }}
    >
      {kind === "desktop" ? (
        <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-vault-line bg-vault-canvas px-3">
          <span className="h-2 w-2 rounded-full bg-vault-ink/15" />
          <span className="h-2 w-2 rounded-full bg-vault-ink/15" />
          <span className="h-2 w-2 rounded-full bg-vault-ink/15" />
          <span className="ml-3 h-4 min-w-0 flex-1 truncate rounded-full bg-vault-ink/[0.06] px-3 font-mono text-[9px] leading-4 text-vault-ink/40">
            covault / {label.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </div>
      ) : (
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-vault-ink" />
      )}

      <div className={`cv-dots absolute inset-0 ${kind === "desktop" ? "pt-8" : "pt-10"}`}>
        <Skeleton kind={kind} />
        {/* Top-left so the label stays readable where frames overlap in the hero collage. */}
        <figcaption
          className={`absolute left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-vault-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-vault-canvas ${
            kind === "desktop" ? "top-11" : "top-12"
          }`}
        >
          <span className="cv-slot-prefix">Figma slot: </span>
          {label}
        </figcaption>
      </div>
    </figure>
  );
}

// Grey blocks standing in for the real UI, sized so the composition reads at a glance.
function Skeleton({ kind }: { kind: "desktop" | "mobile" }) {
  if (kind === "mobile") {
    return (
      <div className="flex h-full flex-col gap-3 px-4 pb-12 pt-4">
        <div className="h-6 w-2/5 rounded-md bg-vault-ink/10" />
        <div className="h-24 rounded-xl bg-vault-ink/[0.07]" />
        <div className="h-16 rounded-xl bg-vault-ink/[0.07]" />
        <div className="h-16 rounded-xl bg-vault-ink/[0.07]" />
        <div className="mt-auto h-9 rounded-full bg-vault-ink/10" />
      </div>
    );
  }
  return (
    <div className="grid h-full grid-cols-[150px_1fr] gap-4 p-4 pb-12">
      <div className="hidden flex-col gap-2 sm:flex">
        <div className="h-5 w-3/4 rounded-md bg-vault-ink/10" />
        <div className="mt-2 h-3 w-full rounded bg-vault-ink/[0.07]" />
        <div className="h-3 w-5/6 rounded bg-vault-ink/[0.07]" />
        <div className="h-3 w-2/3 rounded bg-vault-ink/[0.07]" />
        <div className="h-3 w-4/5 rounded bg-vault-ink/[0.07]" />
      </div>
      <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
        <div className="h-7 w-1/3 rounded-md bg-vault-ink/10" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-20 rounded-xl bg-vault-ink/[0.07]" />
          <div className="h-20 rounded-xl bg-vault-ink/[0.07]" />
          <div className="h-20 rounded-xl bg-vault-ink/[0.07]" />
        </div>
        <div className="h-3 w-full rounded bg-vault-ink/[0.07]" />
        <div className="h-3 w-11/12 rounded bg-vault-ink/[0.07]" />
        <div className="h-3 w-3/4 rounded bg-vault-ink/[0.07]" />
      </div>
    </div>
  );
}
