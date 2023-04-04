import { KeywordProps } from "@/src/interfaces/Keyword";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Bookmark from "../Bookmark/Bookmark";
import styles from "./SearchItem.module.css";

export default function SearchItem({
  name,
  firstImage,
  contentId,
}: KeywordProps) {
  const router = useRouter();
  const [bookMarked, setBookMarked] = useState(false);

  return (
    <li className={styles.keywordItemContainer} key={contentId}>
      <button
        className={styles.keywordItem}
        onClick={() =>
          router.push(
            {
              pathname: `/place/[id]`,
              query: {
                id: contentId,
              },
            },
            `place/${contentId}`
          )
        }
      >
        <Image
          className={styles.img}
          src={firstImage}
          alt={name}
          width={300}
          height={210}
          priority
        />
      </button>
      <div className={styles.keywordInfo}>
        <p className={styles.title}>{name}</p>
        <div className={styles.keywordBookmark}>
          <Bookmark bookMarked={bookMarked} onToggle={setBookMarked} />
        </div>
      </div>
    </li>
  );
}
