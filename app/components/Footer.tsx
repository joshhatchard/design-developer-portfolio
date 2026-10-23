export default function Footer({ className = "", backHref = "#hero" }: { className?: string; backHref?: string }) {
  return (
    <footer className={`footer ${className}`.trim()}>
      <div className="siteContainer">
        <p>Josh Hatchard © 2026</p>
        <div className="footerRight" aria-hidden="true" />
        <a className="footerBack" href={backHref} aria-label="Back to top"><span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
