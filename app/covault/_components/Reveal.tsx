"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

// Adds .is-in the first time the element enters the viewport; covault.css animates
// from translateY(24px) + opacity 0. `delay` staggers siblings (in ms).
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      // Fire slightly before the element is fully in view so the motion reads as a reveal, not a pop-in.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`cv-reveal ${className}`}
      style={{ ...style, "--cv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

// Splits a headline into lines that reveal one after another.
export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  as: Tag = "h2",
  step = 110,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: ElementType;
  step?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <Reveal key={line} as="span" delay={i * step} className={`block ${lineClassName}`}>
          {line}
        </Reveal>
      ))}
    </Tag>
  );
}
