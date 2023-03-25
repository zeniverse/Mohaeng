import React from "react";
import styles from "./BoardCard.module.css";
import { Board } from "@/src/interfaces/Board";
import RecruitedLabel from "./RecruitedLabel";

const BoardCard = ({
  title,
  place,
  modifiedDate,
  viewCount,
  nowMember,
  recruiteMember,
  isRecruited,
}: Board) => {
  return (
    <div className={styles["board-card-container"]}>
      <div className={styles["board-header-container"]}>
        <div className={styles["board-title"]}>
          <h4>{title}</h4>
        </div>
        <div className={styles["board-ago"]}>
          <p>3시간 전</p>
        </div>
      </div>
      <div className={styles["board-content-container"]}>
        <div className={styles["content-palce"]}>🚩 {place}</div>
        <div className={styles["content-date"]}>📅 {modifiedDate}</div>
      </div>
      <div className={styles["board-footer-container"]}>
        <div className={styles["footer-left"]}>👁️‍🗨️ {viewCount}</div>
        <div className={styles["footer-right"]}>
          <div className={styles["footer-right-number"]}>
            {nowMember}/{recruiteMember}
          </div>
          <div className={styles["footer-right-state"]}>
            <RecruitedLabel isRecruited={isRecruited} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
