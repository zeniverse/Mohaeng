import bannerImg from "/public/assets/banner-img.png";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./BannerSearch.module.css";

const BannerSearch = () => {
  return (
    <div className={styles["home-banner-container"]}>
      <div className={styles["banner-search-container"]}>
        <Image
          priority={true}
          className={styles["banner-image"]}
          src={bannerImg}
          alt=""
        />
        {/* <div className={styles["banner-input-container"]}>
          <form className={styles["banner-input-form"]}>
            <AiOutlineSearch className={styles["banner-input-icon"]} />
            <input
              className={styles["banner-input"]}
              type="text"
              placeholder="어디로 가시나요?"
            />
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default BannerSearch;
