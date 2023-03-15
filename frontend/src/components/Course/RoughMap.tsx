import styles from "./RoughMap.module.css";
import { RoughMapTitle } from "@/src/interfaces/Course";
import React, { useEffect, useRef } from "react";

const RoughMap = ({
  RoughMapData,
  setIsRoughMapOpen,
  isRoughMapOpen,
}: RoughMapTitle) => {
  const RoughMapBox = useRef<HTMLOListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        RoughMapBox.current &&
        !RoughMapBox.current.contains(event.target as Node)
      ) {
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
  }, [isRoughMapOpen, RoughMapBox]);
  return (
    <ol ref={RoughMapBox} className={styles["roughmap-container"]}>
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
