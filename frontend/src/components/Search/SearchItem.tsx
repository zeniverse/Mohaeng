import { KeywordProps } from "@/src/interfaces/Keyword";
import Image from "next/image";
import { useRouter } from "next/router";
import { BiBookmarkPlus } from "react-icons/bi";
import styles from "./SearchItem.module.css";

export default function SearchItem({
  name,
  firstImage,
  contentId,
}: KeywordProps) {
  const router = useRouter();

  return (
    <li
      className={styles.keywordItemContainer}
      key={contentId}
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
      <button className={styles.keywordItem}>
        <Image
          className={styles.img}
          src={firstImage}
          alt={name}
          width={280}
          height={210}
          priority
        />
        <div className={styles.keywordInfo}>
          <p className={styles.title}>{name}</p>
          <div className={styles.keywordBookmark}>
            <BiBookmarkPlus />
          </div>
        </div>
      </button>
    </li>
  );
}
