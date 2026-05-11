export type ContentKind = "essay" | "poem" | "satire";

export interface ContentFrontmatter {
  title: string;
  subtitle?: string;
  slug: string;
  kind: ContentKind;
  class?: string;
  date?: string;
  bibliography?: { label: string; url: string }[];
}

export interface Photo {
  src: string;
  alt: string;
}
