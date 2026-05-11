import { Link } from "react-router";
import { contentByKind } from "~/lib/content";
import type { ContentFrontmatter } from "~/types";

export function meta() {
  return [{ title: "Andy Gobin — Portfolio" }];
}

function EssayList({ heading, items }: { heading: string; items: ContentFrontmatter[] }) {
  if (items.length === 0) return null;
  return (
    <section id="linkPapers">
      <h1>{heading}</h1>
      {items.map((f) => (
        <div key={f.slug}>
          <span className="arrow arrow-right"></span>
          <Link to={`/${f.slug}`}>{f.title}</Link>
        </div>
      ))}
    </section>
  );
}

export default function Index() {
  const essays = contentByKind("essay").map((m) => m.frontmatter);
  const poems = contentByKind("poem").map((m) => m.frontmatter);
  const satire = contentByKind("satire").map((m) => m.frontmatter);

  return (
    <>
      <EssayList heading="Papers by me:" items={essays} />
      <EssayList heading="Poems by me:" items={poems} />
      <EssayList heading="Satire papers by me:" items={satire} />
    </>
  );
}
