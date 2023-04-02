import { KeywordProps } from "@/src/interfaces/Keyword";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./SearchItem.module.css";

export default function SearchItem({
  name,
  firstImage,
  contentId,
}: KeywordProps) {
  const router = useRouter();
  return (
    <li
      className={styles.item}
      key={contentId}
      onClick={() =>
        router.push(
          {
            pathname: `/place/[id]`,
            query: {
              id: contentId,
            },
          },
          `place/${contentId}`,
          { scroll: true }
        )
      }
    >
      <button className={styles.Link}>
        <Image
          className={styles.img}
          src={firstImage}
          alt={name}
          width={300}
          height={230}
        />
        <span className={styles.keywordInfo}>
          <p className={styles.title}>{name}</p>
        </span>
      </button>
    </li>
  );
}
