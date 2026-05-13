import { useEffect } from "react";
import { asset } from "~/lib/asset";
import type { Photo } from "~/types";

interface Props {
  selection: { photos: Photo[]; index: number } | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({ selection, onClose, onIndexChange }: Props) {
  const photo = selection ? selection.photos[selection.index] : null;
  const hasPrev = !!selection && selection.index > 0;
  const hasNext = !!selection && selection.index < selection.photos.length - 1;

  useEffect(() => {
    if (!selection) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrev) onIndexChange(selection.index - 1);
      else if (e.key === "ArrowRight" && hasNext) onIndexChange(selection.index + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [selection, onClose, onIndexChange, hasPrev, hasNext]);

  if (!photo || !selection) return null;
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button
        type="button"
        className="lightbox-close"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <span className="lightbox-close-icon" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="lightbox-nav lightbox-nav-prev"
        aria-label="Previous photo"
        disabled={!hasPrev}
        onClick={(e) => {
          e.stopPropagation();
          if (hasPrev) onIndexChange(selection.index - 1);
        }}
      >
        <span className="arrow arrow-left" />
      </button>
      <div className="lightbox-content">
        <img className="lightbox-image" src={asset(photo.src)} alt={photo.alt} />
        {photo.alt && (
          <aside className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
            <p>{photo.alt}</p>
          </aside>
        )}
      </div>
      <button
        type="button"
        className="lightbox-nav lightbox-nav-next"
        aria-label="Next photo"
        disabled={!hasNext}
        onClick={(e) => {
          e.stopPropagation();
          if (hasNext) onIndexChange(selection.index + 1);
        }}
      >
        <span className="arrow arrow-right" />
      </button>
    </div>
  );
}
