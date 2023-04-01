import Image from "next/image";
import styles from "./SearchList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Keyword } from "@/src/interfaces/Keyword";
import axios from "axios";
import SearchTab from "./SearchTab";
import SearchItem from "./SearchItem";

export default function SearchPlace(): JSX.Element {
  const [searchResult, setSearchResult] = useState<Keyword[]>([]);
  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    const fetchKeyword = async () => {
      try {
        const res = await axios.get(`/api/place?keyword=${keyword}`);
        if (res.data.data.content !== []) {
          const { content } = res.data.data;
          setSearchResult(content);
          console.log(content);
        } else {
          console.log(res.data.data.content);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    if (keyword) {
      fetchKeyword();
    }
  }, [keyword]);

  return (
    <>
      <SearchTab />
      <section className={styles.section}>
        <h3 className={styles.h2}>검색하신 결과: {keyword} </h3>
        <ul className={styles.keywordList}>
          {searchResult.length > 0 ? (
            searchResult?.map((keyword) => (
              <SearchItem
                key={keyword.contentId}
                name={keyword.name}
                firstImage={keyword.firstImage}
                contentId={keyword.contentId}
              />
            ))
          ) : (
            <p>해당하는 검색 결과가 없습니다. 😢 </p>
          )}
        </ul>
      </section>
    </>
  );
}
