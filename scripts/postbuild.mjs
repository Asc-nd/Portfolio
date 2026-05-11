// Post-build: prepare the static output for GitHub Pages.
//   1. Copy __spa-fallback.html → 404.html so GH Pages serves the SPA shell
//      for any unknown path (e.g. /eva.html, which the React app then
//      redirects to /eva client-side).
//   2. Add a .nojekyll marker so GH Pages serves files starting with _ verbatim.

import { copyFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "build", "client");
const fallback = join(out, "__spa-fallback.html");
const notFound = join(out, "404.html");
const noJekyll = join(out, ".nojekyll");

if (existsSync(fallback)) {
  copyFileSync(fallback, notFound);
  console.log(`postbuild: copied ${fallback} → ${notFound}`);
} else {
  console.warn(`postbuild: ${fallback} not found; skipping 404.html copy`);
}

writeFileSync(noJekyll, "");
console.log(`postbuild: wrote ${noJekyll}`);
