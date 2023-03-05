import styles from "./FilterTag.module.css";
import React from "react";

const FilterTag = ({ item, onClick }: any) => {
  return (
    <li key={item.value} className={styles["option-li"]}>
      <span className={styles["option-tag"]}>
        {item.label}
        <button
          className={styles["remove-btn"]}
          onClick={(e) => {
            e.stopPropagation();
            onClick(item);
          }}
        >
          &times;
        </button>
      </span>
    </li>
  );
};

export default FilterTag;
