import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import {
  resetFormValue,
  setFormValue,
} from "@/src/store/reducers/CourseFormSlice";
import React, { ChangeEvent, useState } from "react";
import { Select } from "../Filter/Select";
import styles from "./CourseInputForm.module.css";

const DaysOptions: string[] = [
  "당일 치기",
  "1박 2일",
  "2박 3일",
  "3박 4일",
  "4박 5일",
  "5박 6일",
  "6박 7일",
  "기타",
];
const ResionOptions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전남",
  "전북",
  "경남",
  "경북",
  "제주",
];

interface CourseInputFormProps {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const CourseInputForm = ({ onChange }: CourseInputFormProps) => {
  const { course } = useAppSelector((state) => {
    return state.courseForm;
  });
  const {
    title,
    startDate,
    endDate,
    isPublished,
    courseDays,
    region,
    content,
  } = course;

  const toggleSwitchclassName = isPublished
    ? `${styles["toggle-switch"]} ${styles.publish}`
    : `${styles["toggle-switch"]} ${styles.private}`;
  const textclassName = isPublished
    ? `${styles["toggle-switch-text"]} ${styles.publish}`
    : `${styles["toggle-switch-text"]} ${styles.private}`;

  return (
    <form className={styles.form}>
      <div className={styles["first-line"]}>
        <label htmlFor="isPublished" className={styles["publish-label"]}>
          <span className={textclassName}>
            {isPublished ? "공개" : "비공개"}
          </span>
          <div className={toggleSwitchclassName}>
            <input
              id="isPublished"
              type="checkbox"
              name="isPublished"
              checked={isPublished}
              onChange={onChange}
              className={styles.input}
              required
            />
          </div>
        </label>
        <div className={styles["input-group"]}>
          <label>
            <span>제목</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder={"제목을 작성해주세요"}
              required
            />
          </label>
        </div>
      </div>
      <div className={styles["second-line"]}>
        <div className={styles["input-group"]}>
          <label>
            <span>시작일자</span>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className={styles["input-group"]}>
          <label>
            <span>종료일자</span>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className={`${styles["input-group"]} ${styles.region}`}>
          <label>
            <span>지역</span>
            <select
              required
              name="region"
              value={region}
              onChange={onChange}
              style={{ overflow: "auto" }}
            >
              <option value="" disabled>
                선택해주세요.
              </option>
              {ResionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles["input-group"]}>
          <label>
            <span>소요일</span>
            <select
              required
              name="courseDays"
              value={courseDays}
              onChange={onChange}
            >
              <option value="" disabled>
                선택해주세요.
              </option>
              {DaysOptions.map((option) => (
                <option key={option} value={option.replace(/\s/g, "")}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <label>
          코스 설명
          <textarea name="content" value={content} onChange={onChange} />
        </label>
      </div>
    </form>
  );
};

export default CourseInputForm;
