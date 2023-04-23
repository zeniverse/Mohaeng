import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { ICourseForm } from "@/src/interfaces/Course.type";
import {
  setFormError,
  setFormValue,
} from "@/src/store/reducers/CourseFormSlice";
import React, { useEffect, useState } from "react";
import styles from "./CourseInputForm.module.css";
import {
  validateContent,
  validateCourseDays,
  validateStartEndDate,
  validateTitle,
} from "@/src/utils/validation";
import useValidateInput from "@/src/hooks/useValidateInput";

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
  const [calcCourseDays, setCalcCourseDays] = useState("");

  function getCourseDays(startDate: string, endDate: string) {
    const diffInMs = Date.parse(endDate) - Date.parse(startDate);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // 차이를 일(day) 단위로 계산

    return setCalcCourseDays(DaysOptions[diffInDays]);
  }

  useEffect(() => {
    if (startDate && endDate) {
      getCourseDays(startDate, endDate);
      dispatch(
        setFormValue({
          name: "courseDays",
          value: calcCourseDays.replace(/\s/g, ""),
        })
      );
    }
  }, [startDate, endDate, calcCourseDays]);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
  } = useValidateInput(validateTitle, title);

  const {
    value: enteredContent,
    isValid: enteredContentIsValid,
    hasError: contentInputHasError,
    valueChangeHandler: contentChangedHandler,
    inputBlurHandler: contentBlurHandler,
  } = useValidateInput(validateContent, content);

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

  // const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   const newValue = checked;
  //   dispatch(setFormValue({ name: name as keyof ICourseForm, value: newValue }));
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
        <div className={styles["input-group"]}>
          <label>
            <span className={styles["input-title"]}>코스 제목</span>
            <input
              type="text"
              name="title"
              value={enteredTitle}
              onChange={titleChangedHandler}
              onBlur={titleBlurHandler}
              placeholder={"제목을 작성해주세요"}
              required
            />
          </label>
          {titleInputHasError && (
            <p className={styles["error-text"]}>제목이 일치하지 않음.</p>
          )}
        </div>
      </div>
      {errors?.startDate && <p>{errors?.startDate}</p>}
      <div className={styles["second-line"]}>
        <div className={styles["input-group"]}>
          <label>
            <span className={styles["input-title"]}>시작일자</span>
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
            <span className={styles["input-title"]}>종료일자</span>
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
            <span className={styles["input-title"]}>지역</span>
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
            <span className={styles["input-title"]}>소요일</span>
            <input
              disabled
              required
              value={calcCourseDays ? calcCourseDays : "자동"}
            ></input>
          </label>
          {/* {contentInputHasError && (
            <p className={styles["error-text"]}>내용이 일치하지 않음.</p>
          )} */}
        </div>
      </div>
      <div className={styles["input-group"]}>
        <label>
          <span className={styles["input-title"]}>코스 설명</span>
          <textarea
            name="content"
            value={enteredContent}
            onChange={contentChangedHandler}
            onBlur={contentBlurHandler}
          />
        </label>
        {contentInputHasError && (
          <p className={styles["error-text"]}>내용이 일치하지 않음.</p>
        )}
        <p className={styles["valid-text-length"]}>
          ({enteredContent.length}/200)
        </p>
      </div>
    </form>
  );
};

export default CourseInputForm;
