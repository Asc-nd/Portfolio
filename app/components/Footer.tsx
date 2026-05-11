declare const __BUILD_DATE__: string;

export function Footer() {
  return (
    <footer>
      <p>
        Last updated: <span id="last-updated">{__BUILD_DATE__}</span>
      </p>
    </footer>
  );
}
