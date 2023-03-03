import styles from "./page.module.css";
import RecommendedSection from "@/src/components/Main/RecommendedSection";
import PlaceCardSlider from "@/src/components/Main/PlaceCardSlider";
import CourseCardSlider from "@/src/components/Main/CourseCardSlider";
import BannerSearch from "@/src/components/Main/BannerSearch";
import AccompanyBoard from "@/src/components/Main/AccompanyBoard";
import BoardFilters from "@/src/components/Main/BoardFilters";

import React from "react";

export default function Home() {
  return (
    <main>
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
  );
}
