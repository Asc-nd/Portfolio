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

export default function Photography() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <main className="photo-page">
      <h1>Shot by Ascnd (Ascnd.JPEG)</h1>

      <h2>Digital Photography</h2>
      <LazyPhotoGrid photos={digital as Photo[]} onPhotoClick={setLightboxSrc} />

      <h2>Film Photography</h2>
      <LazyPhotoGrid photos={film as Photo[]} onPhotoClick={setLightboxSrc} />

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </main>
  );
}
