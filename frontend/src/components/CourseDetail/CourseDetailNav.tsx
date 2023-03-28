import styles from "./CourseDetailNav.module.css";
import { BiMapAlt, BiShareAlt, BiBookmarkPlus } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { useState } from "react";
import RoughMap from "../Course/RoughMap";

const CourseDetailNav = ({ likeCount, places }: any) => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  const RoughMapData: any[] = places?.map((place: any) => place.name)!;
  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };
  const onClose = () => {
    setIsRoughMapOpen(false);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };
  return (
    <div className={styles["title-nav"]}>
      <div className={styles["title-nav-left"]}>
        <span className={styles.like}>
          <BsFillHeartFill />
          {likeCount}
        </span>
      </div>
      <div className={styles["title-nav-right"]}>
        <div
          className={`${styles["item-nav"]} ${styles.roughmapBtn}`}
          onClick={toggleRoughMapHandler}
        >
          <BiMapAlt className={styles.roughmapIcon} />
          <div className={styles["roughmap-wrapper"]} onClick={handleClick}>
            {isRoughMapOpen && (
              <RoughMap RoughMapData={RoughMapData} onClose={onClose} />
            )}
          </div>
        </div>
        <div className={styles["item-nav"]}>
          <BiBookmarkPlus />
        </div>
        <div className={styles["item-nav"]}>
          <BiShareAlt />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailNav;
