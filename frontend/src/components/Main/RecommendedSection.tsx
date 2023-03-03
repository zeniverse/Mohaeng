"use client";

import { palette, PaletteKeyTypes } from "@/src/styles/palette";
import Link from "next/link";
import styled from "styled-components";
import styles from "./RecommendedSection.module.css";

interface SectionStyle {
  children: any;
  title?: any;
  bgColor?: PaletteKeyTypes;
  linkUrl?: string;
}

const RecommendedSection = ({
  children,
  title,
  bgColor,
  linkUrl,
}: SectionStyle) => {
  const getColor = bgColor ? palette[bgColor] : "#99D9D9";
  const style = { backgroundColor: getColor };
  return (
    <section className={styles["recommended-container"]} style={style}>
      <div className={styles["recommended-container-title"]}>
        <h2>{title}</h2>
        {linkUrl && (
          <Link href={linkUrl}>
            <div className={styles["link-button"]}>더보기</div>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
};

export default RecommendedSection;
