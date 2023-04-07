import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { setSort } from "@/src/store/reducers/FilterSlice";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styles from "./SelectSorting.module.css";

const sortOptions = [
  { value: "", name: "최신순" },
  { value: "likeCount", name: "좋아요순" },
];

const SelectSorting = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const dispatch = useAppDispatch();

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: any) => {
    dispatch(setSort(option.value));
    setSelectedSort(option.name); // React state 업데이트
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.sort}>
      <h4>정렬</h4>
      <div className={styles["dropdown-wrapper"]}>
        <button className={styles["dropdown-label"]} onClick={handleDropdown}>
          {selectedSort}
          <MdOutlineKeyboardArrowDown />
        </button>
        {isDropdownOpen && (
          <div className={styles["dropdown-content"]}>
            <ul>
              {sortOptions
                .filter((option) => option.name !== selectedSort) // 현재 선택된 옵션을 제외한 리스트 필터링
                .map((option) => (
                  <li
                    key={option.name}
                    className={styles["sort-item"]}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSorting;
