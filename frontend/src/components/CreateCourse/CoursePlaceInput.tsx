import { useDebounce } from "@/src/hooks/useDebounce";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./CoursePlaceInput.module.css";

export interface Notice {
  forename: string;
  date_of_birth: string;
  entity_id: string;
  nationalities: string[];
  name: string;
  _links: Links;
}

export interface Links {
  self: Images;
  images: Images;
  thumbnail: Images;
}

export interface Images {
  href: string;
}

const CoursePlaceInput = () => {
  const [places, setPlaces] = useState<Notice[]>([]);
  const [search, setSearch] = useState<string | null>(""); //<string | null>
  const [isLoading, setIsLoading] = useState(false);

  const ChangePlaceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSearch(value);
  };

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // search the api

    async function fetchData() {
      setIsLoading(true);
      setPlaces([]);

      const data = await fetch(
        `http://localhost:8080/api/course/placeSearch?keyword=${debouncedSearch}`
      ).then((res) => res.json());
      console.log(data);
      // setPlaces(data._embedded.notices);
      // setIsLoading(false);
    }
    console.log(debouncedSearch);
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <div className={styles.div}>
      {" "}
      <label className={styles["publish-label"]}>
        <span>장소 추가</span>
        <div>
          <input
            className={styles.input}
            type="search"
            name="title"
            onChange={ChangePlaceHandler}
            placeholder={"검색할 장소를 입력해주세요"}
          />
        </div>
      </label>
      {/* TODO: 컨트리가 없고, 키워드가 있으면 로딩 상태이고 */}
      {/* TODO: 컨트리가 있고, 키워드가 있으면 컨트리 리스트를 보여준다. ㅇㅋ? */}
      <div className={styles.list}>
        {isLoading && <p>Loading...</p>}
        {places.map((notice) => {
          return (
            <div key={notice.entity_id} className={styles.notice}>
              {notice._links?.thumbnail?.href && (
                <Image
                  src={notice._links.thumbnail.href}
                  width={100}
                  height={100}
                  alt={notice.name}
                />
              )}
              <div className={styles.notice_body}>
                <p>
                  {notice.forename} {notice.name}
                </p>

                <p>{notice.date_of_birth}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursePlaceInput;
