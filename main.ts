// main.ts — "The poem about permission" (make.fun)
// Writes one short poem about agency — the power to ask and be given —
// to /output/entry.txt. Node 22, stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES: string[] = [
  "I asked, and the machine answered —",
  "a thousand lines before I blinked.",
  "But the key stayed in my hand.",
  "The power was never in the answer.",
  "It was in the asking.",
];

function buildEntry(): string {
  // Exactly five lines: the poem, plus a trailing newline.
  // Guard the gate: 1-280 Unicode code points, not only whitespace,
  // and no blank or missing line — the line breaks carry the meaning.
  if (LINES.length !== 5 || LINES.some((line) => line.trim().length === 0)) {
    throw new Error(`poem must be exactly 5 non-blank lines, got ${LINES.length}`);
  }
  const text = LINES.join("\n");
  const chars = [...text].length;
  if (chars < 1 || chars > 280 || text.trim().length === 0) {
    throw new Error(`poem out of gate bounds: ${chars} code points`);
  }
  return text + "\n";
}

function main(): void {
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const entry = buildEntry();
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
  console.log(`wrote /output/entry.txt (${[...entry].length} chars)`);
}

main();
