import styles from "./CourseFilter.module.css";
import React, { useState } from "react";
import { Select, SelectOptions } from "../Select/Select";
import FilterTag from "../UI/FilterTag";
import { GrPowerReset } from "react-icons/gr";

const options = [
  { value: "11", label: "서울특별시" },
  { value: "26", label: "부산광역시" },
  { value: "27", label: "대구광역시" },
  { value: "28", label: "인천광역시" },
  { value: "29", label: "광주광역시" },
  { value: "30", label: "대전광역시" },
  { value: "31", label: "울산광역시" },
  { value: "36", label: "세종특별자치시" },
  { value: "41", label: "경기도" },
  { value: "42", label: "강원도" },
  { value: "43", label: "충청북도" },
  { value: "44", label: "충청남도" },
  { value: "45", label: "전라북도" },
  { value: "46", label: "전라남도" },
  { value: "47", label: "경상북도" },
  { value: "48", label: "경상남도" },
  { value: "50", label: "제주특별자치도" },
];
const ageOptions = [
  { value: "1", label: "당일치기" },
  { value: "2", label: "1박 2일" },
  { value: "3", label: "2박 3일" },
  { value: "4", label: "3박 4일" },
  { value: "5", label: "4박 5일" },
  { value: "6", label: "5박 이상" },
];

const CourseFilter = () => {
  const [siguMultiValue, setSiGuMultiValue] = useState<SelectOptions[]>([]);
  const [ageMultiValue, setAgeMultiValue] = useState<SelectOptions[]>([]);

  const combinedList = [...siguMultiValue, ...ageMultiValue];

  const deleteTagHandler = (option: SelectOptions) => {
    if (siguMultiValue.includes(option)) {
      setSiGuMultiValue(siguMultiValue.filter((o) => o !== option));
    }
    if (ageMultiValue.includes(option)) {
      setAgeMultiValue(ageMultiValue.filter((o) => o !== option));
    }
  };

  const resetHandler = () => {
    setSiGuMultiValue([]);
    setAgeMultiValue([]);
  };
  return (
    <div className={styles["course-filter-container"]}>
      <h1>검색필터</h1>
      <div className={styles["select-container"]}>
        <Select
          multiple
          options={options}
          value={siguMultiValue}
          onChange={(o) => setSiGuMultiValue(o)}
        />
        <Select
          multiple
          options={ageOptions}
          value={ageMultiValue}
          onChange={(o) => setAgeMultiValue(o)}
        />
      </div>
      <ul className={styles["tag-container"]}>
        {combinedList.map((item) => (
          <FilterTag item={item} onClick={deleteTagHandler} />
        ))}
        {combinedList.length !== 0 && (
          <button className={styles["reset-btn"]} onClick={resetHandler}>
            <GrPowerReset />
            초기화
          </button>
        )}
      </ul>
    </div>
  );
};

export default CourseFilter;
