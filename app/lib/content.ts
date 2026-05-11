import type { ComponentType } from "react";
import type { ContentFrontmatter } from "~/types";

interface MdxModule {
  frontmatter: ContentFrontmatter;
  default: ComponentType;
}

const modules = import.meta.glob<MdxModule>(
  ["../content/essays/*.mdx", "../content/poems/*.mdx", "../content/satire/*.mdx"],
  { eager: true },
);

const all: MdxModule[] = Object.values(modules);

export const contentBySlug = new Map<string, MdxModule>(all.map((m) => [m.frontmatter.slug, m]));

export const allContent: MdxModule[] = all;

export function contentByKind(kind: ContentFrontmatter["kind"]): MdxModule[] {
  return all.filter((m) => m.frontmatter.kind === kind);
}
