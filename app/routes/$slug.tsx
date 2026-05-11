import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { contentBySlug } from "~/lib/content";

import evaCss from "~/styles/essays/eva.css?url";
import adamCss from "~/styles/essays/adam.css?url";
import aiEDUCss from "~/styles/essays/aiEDU.css?url";
import aiInvestigationCss from "~/styles/essays/aiInvestigation.css?url";
import formativeStrangerCss from "~/styles/essays/formativeStranger.css?url";
import goldenBoughCss from "~/styles/essays/goldenBough.css?url";
import insignificantCss from "~/styles/essays/insignificant.css?url";
import monotonicityCss from "~/styles/essays/monotonicity.css?url";
import mysticismResponsesCss from "~/styles/essays/mysticismResponses.css?url";
import trialCss from "~/styles/essays/trial.css?url";
import redStarCss from "~/styles/poems/redStar.css?url";
import trafficCss from "~/styles/satire/traffic.css?url";

const themeBySlug: Record<string, string> = {
  eva: evaCss,
  adam: adamCss,
  aiEDU: aiEDUCss,
  aiInvestigation: aiInvestigationCss,
  formativeStranger: formativeStrangerCss,
  goldenBough: goldenBoughCss,
  insignificant: insignificantCss,
  monotonicity: monotonicityCss,
  mysticismResponses: mysticismResponsesCss,
  trial: trialCss,
  redStar: redStarCss,
  traffic: trafficCss,
};

//Need to fix
const SPECIAL_REDIRECTS: Record<string, string> = {
  "": "/",
};

export function meta({ params }: { params: { slug: string } }) {
  const mod = contentBySlug.get(params.slug);
  return [{ title: mod?.frontmatter.title ?? "Not found" }];
}

export default function ContentRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const slug = params.slug;

  useEffect(() => {
    if (!slug) return;
    if (slug in SPECIAL_REDIRECTS) {
      navigate(SPECIAL_REDIRECTS[slug]!, { replace: true });
    } else if (slug.endsWith(".html")) {
      navigate(`/${slug.slice(0, -5)}`, { replace: true });
    }
  }, [slug, navigate]);

  const mod = slug ? contentBySlug.get(slug) : undefined;

  useEffect(() => {
    if (!mod) return;
    document.body.dataset.slug = mod.frontmatter.slug;
    return () => {
      delete document.body.dataset.slug;
    };
  }, [mod]);

  if (!mod) {
    return <h1>Not found</h1>;
  }

  const { frontmatter, default: Content } = mod;
  const themeHref = themeBySlug[frontmatter.slug];

  return (
    <>
      {themeHref && <link rel="stylesheet" href={themeHref} />}
      <article data-slug={frontmatter.slug} data-kind={frontmatter.kind}>
        <h1 id="firstTitle">{frontmatter.title}</h1>
        {frontmatter.subtitle && <h2>{frontmatter.subtitle}</h2>}
        {frontmatter.class && <h4 id="class">Written for: {frontmatter.class}</h4>}
        {frontmatter.date && <h4 id="date">Written on {frontmatter.date}</h4>}
        <Content />
        {frontmatter.bibliography && frontmatter.bibliography.length > 0 && (
          <footer>
            Bibliography
            <ul>
              {frontmatter.bibliography.map((b) => (
                <li key={`${b.label}-${b.url}`}>
                  {b.url ? (
                    <a href={b.url} target="_blank" rel="noreferrer">
                      {b.label}
                    </a>
                  ) : (
                    b.label
                  )}
                </li>
              ))}
            </ul>
          </footer>
        )}
      </article>
    </>
  );
}
