import { useEffect } from "react";
import type { LinksFunction } from "react-router";
import aboutStyles from "~/styles/about.css?url";

export function meta() {
  return [{ title: "About — Andy Gobin" }];
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: aboutStyles }];

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.body.appendChild(s);
}

export default function About() {
  useEffect(() => {
    loadScript("https://www.instagram.com/embed.js");
    loadScript("https://platform.linkedin.com/badges/js/profile.js");
  }, []);

  return (
    <main className="about-page">
      <h1>About</h1>

      <p>
        Hello, I am Andy, a first-generation college student born and raised in the Bronx. My
        passion for Computer Science sparked in middle school and has only grown since then. I
        continued to study Computer Science in high school and now in college. I enjoy doing
        photography, reading, and discussing religion and religious art. I also have a passion for
        museums and archiving. I attend Middlebury College, double-majoring in Computer Science and
        Religion.
      </p>

      <p>
        I have experience in the computer science field across a range of languages and tools:
      </p>
      <ul className="skills">
        <li>Java</li>
        <li>JavaScript</li>
        <li>Python</li>
        <li>HTML</li>
        <li>Kotlin</li>
        <li>C#</li>
        <li>TypeScript</li>
        <li>Unity</li>
        <li>Adobe Creative Cloud</li>
      </ul>

      <p>
        I also have experience doing IT work, functioning as the IT Specialist for my church over
        the past few years.
      </p>

      <p>
        As a photographer, I have built up my reputation on dependability and quick turnaround
        rates. My clients consistently recommend me to their colleagues and are often repeat
        clients. I first started off as a photographer at my high school before getting into events
        and being a street photographer in my free time. I am also president of the Middlebury
        Darkroom Film Photography club and spend a lot of my time there.
      </p>

      <p>
        I plan to continue on the Computer Science track and build my experience up to gain a job
        wherever I am needed in the Computer Science field. My main interest is cybersecurity, and I
        plan to secure my future in that field.
      </p>

      <div className="links">
        <p>
          Feel free to reach out at{" "}
          <a href="mailto:Andy.Gobin115@gmail.com">Andy.Gobin115@gmail.com</a>, or via the links
          below:
        </p>

        <div className="socials">
          <div className="insta-wrapper">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/ascnd.jpeg/?utm_source=ig_embed&utm_campaign=loading"
              data-instgrm-version="14"
            />
          </div>

          <div
            className="badge-base LI-profile-badge"
            data-locale="en_US"
            data-size="large"
            data-theme="dark"
            data-type="HORIZONTAL"
            data-vanity="andy-gobin"
            data-version="v1"
          >
            <a
              className="badge-base__link LI-simple-link"
              href="https://www.linkedin.com/in/andy-gobin?trk=profile-badge"
              target="_blank"
              rel="noreferrer"
            >
              Andy Gobin
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
