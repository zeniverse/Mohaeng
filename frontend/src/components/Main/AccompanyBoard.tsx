"use client";

import { Board } from "@/src/interfaces/Board";
import React, { useEffect, useState } from "react";
import styles from "./AccompanyBoard.module.css";
import BoardCard from "./BoardCard";

const AccompanyBoard = () => {
  const [boardData, setBoardData] = useState<Board[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/board");
      const newData = await res.json();
      const getCourseData = newData;
      setBoardData(getCourseData);
    }
    fetchData();
  }, []);
  return (
    <div className={styles["board-container"]}>
      {boardData?.map((board) => (
        <BoardCard
          key={board.id}
          id={board.id}
          title={board.title}
          place={board.place}
          recruiteMember={board.recruiteMember}
          nowMember={board.nowMember}
          isRecruited={board.isRecruited}
          viewCount={board.viewCount}
          modifiedDate={board.modifiedDate}
        />
      ))}
    </div>
  );
};

export default AccompanyBoard;
