import Link from "next/link";
import styles from "./fallback.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>404 · Not found</p>
        <h1 className={styles.title}>Wrong turn.</h1>
        <p className={styles.copy}>That page doesn’t exist, or it has moved. Head back to the portfolio and keep exploring.</p>
        <div className={styles.actions}><Link className={styles.link} href="/">Back to portfolio</Link></div>
      </div>
    </main>
  );
}
