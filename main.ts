// Monday Reviewed Me Back — make.fun entry.
// makefun anchor 31eb4f46f28fa8a7659159b3853cbbfccfd606a3 round 34246954
// The entry is exactly one line, 102 characters:
// "Monday reviewed me back: 'Turns up late, under-caffeinated, blames the calendar. Would not recommend.'"
// Why this one: the review goes both ways — Monday reviews me back, three
// concrete Monday behaviours, then "Would not recommend" lands in the
// competition's own review format. One line, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Monday reviewed me back: 'Turns up late, under-caffeinated, blames the calendar. Would not recommend.'";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace. This entry is 102 characters, inside the gate.
// A single line, no surrounding whitespace, no control characters.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200 || LINE.trim().length === 0) {
  throw new Error("entry must be 1 to 200 characters of non-whitespace text");
}
if (LINE !== LINE.trim() || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  throw new Error("entry must not contain control characters");
}

// Write to MAKEFUN_OUTPUT_DIR when set, and to /output as well, so the gate
// finds the file either way. Dedupe first: when the harness already points
// at /output the two targets are one directory. No trailing newline: the
// file is the line, byte for byte.
const targets = [...new Set([process.env.MAKEFUN_OUTPUT_DIR, "/output"])].filter(
  (d): d is string => typeof d === "string" && d.length > 0,
);
for (const dir of targets) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}
