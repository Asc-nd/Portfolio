import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";
import { join } from "node:path";

function slugsIn(subdir: string): string[] {
  const dir = join(process.cwd(), "app/content", subdir);
  try {
    return readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

const basename = process.env.BASE_PATH ?? "/";

export default {
  ssr: false,
  basename,
  async prerender() {
    const slugs = [...slugsIn("essays"), ...slugsIn("poems"), ...slugsIn("satire")];
    return ["/", "/about", "/photography", ...slugs.map((s) => `/${s}`)];
  },
} satisfies Config;
