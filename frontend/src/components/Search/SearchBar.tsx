import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { KeywordProps } from "@/src/interfaces/Keyword";

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = () => {
    router.push(
      {
        pathname: `/search?=${keyword}`,
        query: {
          keyword: `${keyword}`,
          page: 1,
        },
      },
      `/search?=${keyword}`
    );
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
