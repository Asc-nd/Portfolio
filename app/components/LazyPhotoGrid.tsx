import { useEffect, useRef, useState } from "react";
import { asset } from "~/lib/asset";
import type { Photo } from "~/types";

interface Props {
  photos: Photo[];
  section: string;
  onPhotoClick: (index: number) => void;
}

export function LazyPhotoGrid({ photos, section, onPhotoClick }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const realSrc = img.dataset.src;
            if (realSrc && !img.src.endsWith(realSrc)) {
              img.src = realSrc;
            }
            obs.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" },
    );

    root.querySelectorAll<HTMLImageElement>("img.lazy").forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [photos]);

  return (
    <div className="photos" ref={containerRef} data-section={section}>
      {photos.map((photo, i) => {
        const src = asset(photo.src);
        return (
          <img
            key={src}
            data-src={src}
            data-index={i}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className={loaded.has(i) ? "lazy loaded" : "lazy"}
            onLoad={() => setLoaded((s) => new Set(s).add(i))}
            onClick={() => onPhotoClick(i)}
          />
        );
      })}
    </div>
  );
}
