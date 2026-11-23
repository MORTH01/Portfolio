import { readFileSync, statSync } from "node:fs";
import path from "node:path";

// Server-side only: Hero.tsx calls this while rendering, so the page can bind the exported
// device collage without a broken image on deployments that do not have the file yet.
export const SHOWCASE_PATH = "/covault/device-showcase.png";

export type Showcase = { src: string; width: number; height: number };

export function getShowcase(): Showcase | null {
  const file = path.join(process.cwd(), "public", SHOWCASE_PATH);
  try {
    if (!statSync(file).isFile()) return null;
    return { src: SHOWCASE_PATH, ...pngSize(readFileSync(file)) };
  } catch {
    return null;
  }
}

// PNG stores its dimensions in the IHDR chunk right after the 8-byte signature.
function pngSize(buf: Buffer): { width: number; height: number } {
  const isPng = buf.length > 24 && buf.toString("ascii", 1, 4) === "PNG";
  if (!isPng) return { width: 16, height: 10 };
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
