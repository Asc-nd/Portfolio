import { reactRouter } from "@react-router/dev/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const buildDate = new Date().toISOString().slice(0, 10);
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: "frontmatter" }]],
      }),
    },
    reactRouter(),
    tsconfigPaths(),
  ],
});
