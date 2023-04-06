import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { clearKeyword, setKeyword } from "@/src/store/reducers/FilterSlice";
import React, { useState, KeyboardEvent } from "react";
import ResetButton from "@/src/components/UI/ResetButton";
import styles from "./SearchKeyword.module.css";

const SearchKeyword = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(setKeyword(searchValue));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetHandler = () => {
    setSearchValue("");
    dispatch(clearKeyword());
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className={styles.keyword}>
      <h4>키워드 검색</h4>
      <div className={styles["input-box"]}>
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className={styles["search-btn"]} onClick={handleSearch}>
          검색
        </button>
        <ResetButton onClick={resetHandler} />
      </div>
    </div>
  );
};

export default SearchKeyword;
