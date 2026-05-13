import { useState } from "react";
import type { LinksFunction } from "react-router";
import { LazyPhotoGrid } from "~/components/LazyPhotoGrid";
import { Lightbox } from "~/components/Lightbox";
import digital from "~/data/digital.json";
import film from "~/data/film.json";
import photographyStyles from "~/styles/photography.css?url";
import type { Photo } from "~/types";

export function meta() {
  return [{ title: "Photography | Shot by Ascnd" }];
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: photographyStyles }];

interface Selection {
  photos: Photo[];
  index: number;
  section: string;
}

export default function Photography() {
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleClose = () => {
    const last = selection;
    setSelection(null);
    if (last) {
      requestAnimationFrame(() => {
        const el = document.querySelector<HTMLImageElement>(
          `[data-section="${last.section}"] img[data-index="${last.index}"]`,
        );
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
    }
  };

  return (
    <main className="photo-page">
      <h1>Shot by Ascnd (Ascnd.JPEG)</h1>

      <h2>Digital Photography</h2>
      <LazyPhotoGrid
        photos={digital as Photo[]}
        section="digital"
        onPhotoClick={(i) => setSelection({ photos: digital as Photo[], index: i, section: "digital" })}
      />

      <h2>Film Photography</h2>
      <LazyPhotoGrid
        photos={film as Photo[]}
        section="film"
        onPhotoClick={(i) => setSelection({ photos: film as Photo[], index: i, section: "film" })}
      />

      <Lightbox
        selection={selection}
        onClose={handleClose}
        onIndexChange={(i) => setSelection((s) => (s ? { ...s, index: i } : s))}
      />
    </main>
  );
}
