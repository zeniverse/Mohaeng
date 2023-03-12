import styles from "./RoughMap.module.css";
import { RoughMapTitle } from "@/src/interfaces/Course";
import React, { useEffect, useRef } from "react";

const RoughMap = ({
  RoughMapData,
  setIsRoughMapOpen,
  isRoughMapOpen,
}: RoughMapTitle) => {
  const ref: any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsRoughMapOpen(false);
      }
    }

    if (isRoughMapOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isRoughMapOpen, ref]);
  return (
    <ol ref={ref} className={styles["roughmap-container"]}>
      {RoughMapData.map((title, idx) => (
        <li className={styles.listitem} key={idx}>
          <div className={styles.circle}></div>
          <span className={styles.title}>{title}</span>
        </li>
      ))}
    </ol>
  );
};

export default RoughMap;
