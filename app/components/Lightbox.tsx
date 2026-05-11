import { useEffect } from "react";

interface Props {
  src: string | null;
  onClose: () => void;
}

export function Lightbox({ src, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [src, onClose]);

  if (!src) return null;
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <img src={src} alt="" />
    </div>
  );
}
