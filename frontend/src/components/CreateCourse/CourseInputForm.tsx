import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { ICourseForm } from "@/src/interfaces/Course.type";
import {
  setFormValue,
  setIsFormValidFalse,
  setIsFormValidTrue,
} from "@/src/store/reducers/CourseFormSlice";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./CourseInputForm.module.css";
import {
  validateContent,
  validateIsSelected,
  validateStartEndDate,
  validateTitle,
} from "@/src/utils/validation";
import useValidateInput from "@/src/hooks/useValidateInput";
import { ResionOptions } from "@/src/utils/input-options";

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
    places,
  } = course;
  const dispatch = useAppDispatch();
  const [calcCourseDays, setCalcCourseDays] = useState("");
  const [dateIsValid, setDateIsValid] = useState(false);

  function calculateCoursePeriod(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
    if (!diffInMs) return "당일 치기";
    const nightCount = diffInDays - 1;

    return `${nightCount}박 ${diffInDays}일`;
  }

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
  } = useValidateInput(validateTitle, title);

  const {
    value: enteredRegion,
    isValid: enteredRegionIsValid,
    hasError: regionInputHasError,
    valueChangeHandler: regionChangedHandler,
    inputBlurHandler: regionBlurHandler,
  } = useValidateInput(validateIsSelected, region);
  const {
    value: enteredStartDate,
    isValid: enteredStartDateIsValid,
    hasError: startDateInputHasError,
    valueChangeHandler: startDateChangedHandler,
    inputBlurHandler: startDateBlurHandler,
  } = useValidateInput(validateIsSelected, startDate);
  const {
    value: enteredEndDate,
    isValid: enteredEndDateIsValid,
    hasError: endDateInputHasError,
    valueChangeHandler: endDateChangedHandler,
    inputBlurHandler: endDateBlurHandler,
  } = useValidateInput(validateIsSelected, endDate);

  const {
    value: enteredContent,
    isValid: enteredContentIsValid,
    hasError: contentInputHasError,
    valueChangeHandler: contentChangedHandler,
    inputBlurHandler: contentBlurHandler,
  } = useValidateInput(validateContent, content);

  const checkedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newValue = checked;
    dispatch(
      setFormValue({ name: name as keyof ICourseForm, value: newValue })
    );
  };
  useEffect(() => {
    if (enteredStartDate && enteredEndDate) {
      const isValid = validateStartEndDate(enteredStartDate, enteredEndDate);
      setDateIsValid(isValid);
      if (isValid) {
        const days = calculateCoursePeriod(enteredStartDate, enteredEndDate);
        dispatch(
          setFormValue({
            name: "courseDays",
            value: days.replace(/\s/g, ""),
          })
        );
        setCalcCourseDays(days);
      } else {
        setCalcCourseDays("");
      }
    }
  }, [enteredStartDate, enteredEndDate]);

  const setIsFormValidTrueCallback = useCallback(() => {
    dispatch(setIsFormValidTrue());
  }, [dispatch]);

  const setIsFormValidFalseCallback = useCallback(() => {
    dispatch(setIsFormValidFalse());
  }, [dispatch]);

  const isValid = useMemo(() => {
    return (
      enteredTitleIsValid &&
      enteredRegionIsValid &&
      enteredContentIsValid &&
      dateIsValid
    );
  }, [
    enteredTitleIsValid,
    enteredRegionIsValid,
    enteredContentIsValid,
    dateIsValid,
  ]);

  useEffect(() => {
    if (isValid) {
      setIsFormValidTrueCallback();
    } else {
      setIsFormValidFalseCallback();
    }
  }, [isValid, setIsFormValidTrueCallback, setIsFormValidFalseCallback]);

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
              onChange={checkedChangeHandler}
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
            <p className={styles["error-text"]}>
              4자 이상 20자 이하로 작성해 주세요.
            </p>
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
              value={enteredStartDate}
              onChange={startDateChangedHandler}
              onBlur={startDateBlurHandler}
              required
            />
          </label>
          {startDateInputHasError && (
            <p className={styles["error-text"]}>선택해주세요.</p>
          )}
          {enteredStartDateIsValid && enteredEndDateIsValid && !dateIsValid && (
            <p className={styles["error-text"]}>유효하지 않은 날짜 입니다.</p>
          )}
        </div>
        <div className={styles["input-group"]}>
          <label>
            <span className={styles["input-title"]}>종료일자</span>
            <input
              type="date"
              name="endDate"
              value={enteredEndDate}
              onChange={endDateChangedHandler}
              onBlur={endDateBlurHandler}
              required
            />
          </label>
          {endDateInputHasError && (
            <p className={styles["error-text"]}>선택해주세요.</p>
          )}
        </div>
        <div className={`${styles["input-group"]} ${styles.region}`}>
          <label>
            <span className={styles["input-title"]}>지역</span>
            <select
              required
              name="region"
              value={enteredRegion}
              onChange={regionChangedHandler}
              onBlur={regionBlurHandler}
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
          {regionInputHasError && (
            <p className={styles["error-text"]}>선택해주세요.</p>
          )}
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
          <p className={styles["error-text"]}>
            10자 이상 200자 이하로 작성해 주세요.
          </p>
        )}
        <p className={styles["valid-text-length"]}>
          ({enteredContent.length}/200)
        </p>
      </div>
    </form>
  );
};

export default React.memo(CourseInputForm);
