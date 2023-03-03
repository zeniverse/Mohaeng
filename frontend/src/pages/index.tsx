import styles from "./index.module.css";
import RecommendedSection from "../components/Main/RecommendedSection";
import PlaceCardSlider from "../components/Main/PlaceCardSlider";
import CourseCardSlider from "../components/Main/CourseCardSlider";
import BannerSearch from "../components/Main/BannerSearch";
import AccompanyBoard from "../components/Main/AccompanyBoard";
import BoardFilters from "../components/Main/BoardFilters";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <BannerSearch />
        <div className={styles["home-body-container"]}>
          <div className={styles["home-content-container"]}>
            <RecommendedSection
              title="🔥별점 Top 5 여행지"
              bgColor="grey"
              linkUrl="place"
            >
              <PlaceCardSlider />
            </RecommendedSection>
            <RecommendedSection
              title="❤️추천 코스"
              bgColor="grey"
              linkUrl="course"
            >
              <CourseCardSlider />
            </RecommendedSection>
            <RecommendedSection
              title="🧑‍🤝‍🧑동행 게시판"
              bgColor="grey"
              linkUrl="accompany"
            >
              <BoardFilters />
              <AccompanyBoard />
            </RecommendedSection>
          </div>
        </div>
      </main>
    </>
  );
}
