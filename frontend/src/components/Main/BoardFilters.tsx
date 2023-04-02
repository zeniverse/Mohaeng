"use client";

import React, { useState } from "react";
import { Select, SelectOptions } from "../Filter/Select";
import FilterTag from "../UI/FilterTag";
import { GrPowerReset } from "react-icons/gr";

import styles from "./BoardFilters.module.css";

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
  { value: "1", label: "10대" },
  { value: "2", label: "20대" },
  { value: "3", label: "30대" },
  { value: "4", label: "40대" },
  { value: "5", label: "50대" },
  { value: "6", label: "60대 이상" },
];

const BoardFilters = () => {
  // const [doSingleValue, setDooSingleValue] = useState<
  //   SelectOptions | undefined
  // >();

  // TODO: 컴포넌트화
  // TODO: 컴포넌트화
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
    <>
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
    </>
  );
};

export default BoardFilters;
