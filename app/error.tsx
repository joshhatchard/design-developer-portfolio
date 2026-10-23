"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./fallback.module.css";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>Something went wrong</p>
        <h1 className={styles.title}>Let’s try that again.</h1>
        <p className={styles.copy}>The page hit an unexpected snag. You can retry, or return to the portfolio.</p>
        <div className={styles.actions}>
          <button className={styles.button} type="button" onClick={retry}>Try again</button>
          <Link className={styles.link} href="/">Back to portfolio</Link>
        </div>
      </div>
    </main>
  );
}
