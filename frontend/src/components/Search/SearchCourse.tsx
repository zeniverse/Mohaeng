import { useRouter } from "next/router";
import styles from "./SearchList.module.css";

export default function SearchCourse(): JSX.Element {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.h2}>검색하신 결과: {keyword} </h3>
        <ul className={styles.keywordList}>
          {/* {searchResult.length > 0 ? (
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
          )} */}
          <li> 코스 검색 결과 페이지입니다. </li>
        </ul>
      </section>
    </>
  );
}
