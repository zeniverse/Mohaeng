import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { setPage } from "@/src/store/reducers/pageSlice";
import { useEffect, useState } from "react";
import styles from "./Pagebar.module.css";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export interface totalPageProps {
  totalPage: number;
}

const SearchPage = (totalPage: totalPageProps) => {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.page.page);
  const maxPage = Math.ceil(totalPage.totalPage / 10);

  const [pageNumbers, setPageNumber] = useState<number[]>([]);

  const [pagePer, setPagePer] = useState(0);

  useEffect(() => {
    const array = [];
    for (let i = 1; i <= 10; i++) {
      array.push(pagePer * 10 + i);
    }
    setPageNumber(array);
    dispatch(setPage(pagePer * 10 + 1));
  }, [pagePer]);

  useEffect(() => {
    if (page === 1) {
      setPagePer(0);
    }
  }, [page]);

  return (
    <div className={styles.PageContainer}>
      <button
        className={styles.prevNextButton}
        onClick={() => {
          pagePer > 0 && setPagePer(pagePer - 1);
        }}
      >
        prev
      </button>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles["page-item"]}>
            {number <= totalPage.totalPage && (
              <button onClick={() => dispatch(setPage(number))}>
                {number}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button
        className={styles.prevNextButton}
        onClick={() => {
          pagePer < maxPage - 1 && setPagePer(pagePer + 1);
        }}
      >
        next
      </button>
    </div>
  );
};

export default SearchPage;
