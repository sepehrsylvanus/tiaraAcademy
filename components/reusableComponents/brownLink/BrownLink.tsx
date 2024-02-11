import Link from "next/link";
import React from "react";
import styles from "./brownLink.module.css";
const BrownLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link href={href} className={styles.enrollBtn}>
      {title}
    </Link>
  );
};

export default BrownLink;
