import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { setKeyword } from "@/src/store/reducers/FilterSlice";

export default function SearchBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/search?keyword=${searchValue}`,
        query: {
          keyword: searchValue,
        },
      },
      `/search?keyword=${searchValue}`
    );
    handleSearch();
  };

  const handleSearch = () => {
    dispatch(setKeyword(searchValue));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles["search-bar"]}>
        <input
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles["search-input"]}
          type="text"
          placeholder="어디 가고 싶으세요?"
          value={searchValue}
        />
        <button onClick={handleSearch} className={styles["search-icon"]}>
          <BsSearch />
        </button>
      </form>
    </>
  );
}
