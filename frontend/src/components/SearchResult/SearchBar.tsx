import { BsSearch } from "react-icons/bs";
import styles from "./Header.module.css";
import styled from "styled-components";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import SearchList from "./SearchList";

export default function SearchBar({}) {
  const router = useRouter();
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: { target: { value: SetStateAction<string> } }) => {
    router.push(
      {
        pathname: `/search?=${keyword}`,
        query: {
          keyword: `${keyword}`,
        },
      },
      `/search?=${keyword}`,
      { scroll: true }
    );
    setKeyword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles["search-bar"]}>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          className={styles["search-input"]}
          type="text"
          placeholder="어디 가고 싶으세요?"
          value={keyword}
        />
        <button className={styles["search-icon"]}>
          <BsSearch />
        </button>
      </form>
    </>
  );
}

const StyledIcon = styled(BsSearch)`
  color: #004aad;
`;
