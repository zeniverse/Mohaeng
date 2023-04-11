import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { setKeyword } from "@/src/store/reducers/FilterSlice";

export default function SearchBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      dispatch(setKeyword(searchValue));
      router.push(
        {
          pathname: `/search`,
          query: {
            keyword: searchValue,
          },
        },
        `/search?keyword=${searchValue}`
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles["search-bar"]}>
        <input
          onChange={handleInputChange}
          className={styles["search-input"]}
          type="text"
          placeholder="어디 가고 싶으세요?"
          value={searchValue}
        />
        <button className={styles["search-icon"]}>
          <BsSearch />
        </button>
      </form>
    </>
  );
}
