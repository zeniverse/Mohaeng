import Image from "next/image";
import styles from "./SearchList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Keyword = {
  addr: string;
  id: number;
  image: string;
  mapx: string;
  mapy: string;
  tel: string;
  title: string;
  overview: string;
  review: number;
};

export default function indec(): JSX.Element {
  const [keywordData, setKeywordData] = useState<Keyword[]>([]);
  const router = useRouter();
  console.log(router.query);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/keyword");
      const newData = await res.json();
      const getKeywordData = newData;
      setKeywordData(getKeywordData);
    }
    fetchData();
  }, []);

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.h2}>검색하신 결과 </h2>
        <ul className={styles.keywordList}>
          {keywordData?.map((keyword) => (
            <li className={styles.item} key={keyword.id}>
              <button
                className={styles.Link}
                onClick={() =>
                  router.push(
                    {
                      pathname: "/place/[id]",
                      query: {
                        id: keyword.id,
                      },
                    },
                    `place/${keyword.id}`,
                    { scroll: true }
                  )
                }
              >
                <Image
                  className={styles.img}
                  src={keyword.image}
                  alt={keyword.title}
                  width={257}
                  height={233}
                />
                <span className={styles.keywordInfo}>
                  <p className={styles.title}>{keyword.title}</p>
                  <p className={styles.review}>{keyword.review}건의 리뷰</p>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

{
  /* <Link
className={styles.Link}
href={{
  pathname: "/place/[id]",
  query: {
    id: keyword.id,
    addr: keyword.addr,
    image: keyword.image,
    mapx: keyword.mapx,
    mapy: keyword.mapy,
    tel: keyword.tel,
    title: keyword.title,
    review: keyword.review,
  },
}}
as={`/place/${keyword.id}`}
>
<Image
  className={styles.img}
  src={keyword.image}
  alt={keyword.title}
  width={257}
  height={233}
/>
<span className={styles.keywordInfo}>
  <p className={styles.title}>{keyword.title}</p>
  <p className={styles.review}>{keyword.review}건의 리뷰</p>
</span>
</Link> */
}
