import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { ICourseForm } from "@/src/interfaces/Course.type";
import {
  setFormError,
  setFormValue,
} from "@/src/store/reducers/CourseFormSlice";
import React from "react";
import styles from "./CourseInputForm.module.css";
import {
  validateCourseDays,
  validateStartEndDate,
  validateTitle,
} from "@/src/utils/validation";

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

const CourseInputForm = () => {
  const { course, errors } = useAppSelector((state) => {
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
  const dispatch = useAppDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    dispatch(
      setFormValue({ name: name as keyof ICourseForm, value: newValue })
    );
  };

  // const handleBlur = (
  //   e: React.FocusEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name } = e.target;
  //   console.log(name);
  //   switch (name) {
  //     case "title":
  //       dispatch(setFormError({ name, error: validateTitle(course.title) }));
  //       break;
  //     case "startDate" || "endDate":
  //       dispatch(
  //         setFormError({
  //           name,
  //           error: validateStartEndDate(course.startDate, course.endDate),
  //         })
  //       );
  //       break;
  //     case "courseDays":
  //       dispatch(
  //         setFormError({ name, error: validateCourseDays(course.courseDays) })
  //       );
  //       break;
  //   }
  // };

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
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
        </label>
        {errors?.title && <p>{errors?.title}</p>}
        <div className={styles["input-group"]}>
          <label>
            <span>제목</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              placeholder={"제목을 작성해주세요"}
              required
            />
          </label>
        </div>
      </div>
      {errors?.startDate && <p>{errors?.startDate}</p>}
      <div className={styles["second-line"]}>
        <div className={styles["input-group"]}>
          <label>
            <span>시작일자</span>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </form>
  );
};

export default CourseInputForm;
