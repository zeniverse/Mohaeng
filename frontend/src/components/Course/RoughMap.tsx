import styles from "./RoughMap.module.css";
import { RoughMapTitle } from "@/src/interfaces/Course";
import React, { useRef } from "react";
import { useClickOutside } from "@/src/hooks/useClickOutSide";

const RoughMap = ({ RoughMapData, onClose }: RoughMapTitle) => {
  const boxRef = useRef<HTMLOListElement>(null);
  useClickOutside(boxRef, onClose);
  const handleClick = (e: React.MouseEvent<HTMLOListElement>): void => {
    e.stopPropagation();
  };
  return (
    <ol
      onClick={handleClick}
      ref={boxRef}
      className={styles["roughmap-container"]}
    >
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
