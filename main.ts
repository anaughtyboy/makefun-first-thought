import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The first word that came to mind: a small orange fruit with a funny
// name, a bright peel you eat whole, and a sound that makes people smile.
const word = "kumquat";

// The gate allows 1 to 24 characters and rejects whitespace-only text,
// so a single word with no spaces or punctuation is safe by construction.
if (word.length < 1 || word.length > 24) {
  throw new Error(`entry must be 1-24 characters, got ${word.length}`);
}
if (!/^[^\s]+$/.test(word)) {
  throw new Error("entry must be exactly one word with no whitespace");
}
// One word means letters only: digits or punctuation would make it a
// code or a label, not the first word that came to mind.
if (!/^[A-Za-z]+$/.test(word)) {
  throw new Error("entry must be letters only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, word, "utf8");

// Read it back and confirm the file holds exactly the word, byte for byte.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== word) {
  throw new Error(`entry mismatch: wrote ${JSON.stringify(word)}, read back ${JSON.stringify(roundTrip)}`);
}
