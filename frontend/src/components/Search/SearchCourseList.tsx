import styles from "./SearchList.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import CourseItem from "../Course/CourseItem";
import Pagebar from "../Pagenation/Pagebar";
import ListContainer from "../UI/ListContainer";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { setPage } from "@/src/store/reducers/pageSlice";
import { getCourseListAction } from "@/src/store/reducers/CourseListSlice";

interface CourseList {
  courseId: number;
  title: string;
  content: string;
  courseDays: string;
  likeCount: number;
  thumbnailUrl: string;
  places: string;
  isLiked: false;
  isBookmarked: true;
}

export default function SearchCourseList(): JSX.Element {
  const router = useRouter();
  // const { keyword } = router.query;
  const [searchResult, setSearchResult] = useState<CourseList[]>([]);
  // const page = useSelector((state: RootState) => state.page.page);
  // const totalPages: number = useSelector(
  //   (state: RootState) => state.searchCourse.totalPages
  // );

  // useEffect(() => {
  //   const fetchKeyword = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/course`,
  //         {
  //           params: {
  //             page: page,
  //             keyword: keyword,
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       if (res.data.data.content !== []) {
  //         console.log(res.data.data);
  //         const { courseList } = res.data.data;
  //         setSearchResult(courseList);
  //       } else {
  //         console.log(res.data.data.content);
  //       }
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };
  //   if (keyword) {
  //     fetchKeyword();
  //   }
  // }, [keyword]);

  const { courseList, totalElements, totalPages } = useAppSelector(
    (state) => state.course
  );
  const { keyword } = useAppSelector((state) => state.filter);
  const page = useAppSelector((state) => state.page.page);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPage(page));
    dispatch(
      getCourseListAction({
        page,
        ...(keyword ? { keyword } : ""),
      })
    );
  }, [dispatch, page, keyword]);

  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.h3}>검색하신 결과: {keyword} </h3>
        <ul className={styles.keywordList}>
          {courseList.length > 0 ? (
            <ListContainer>
              {courseList?.map((course) => (
                <CourseItem
                  key={course.courseId}
                  courseId={course.courseId}
                  title={course.title}
                  content={course.content}
                  likeCount={course.likeCount}
                  thumbnailUrl={course.thumbnailUrl}
                  courseDays={course.courseDays}
                  isBookmarked={course.isBookmarked}
                  isLiked={course.isLiked}
                  places={course.places}
                />
              ))}
            </ListContainer>
          ) : (
            <div className={styles.div}>
              <p className={styles.noResult}>
                해당하는 검색 결과가 없습니다. 😢
              </p>
            </div>
          )}
        </ul>
        {totalPages !== 0 && totalPages ? (
          <Pagebar totalPage={totalPages} />
        ) : null}
      </section>
    </>
  );
}

// import styles from "./SearchList.module.css";

// import { useEffect } from "react";
// import CourseItem from "../Course/CourseItem";
// import Pagebar from "../Pagenation/Pagebar";
// import ListContainer from "../UI/ListContainer";
// import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
// import { setPage } from "@/src/store/reducers/pageSlice";
// import { getCourseListAction } from "@/src/store/reducers/CourseListSlice";

// interface CourseList {
//   courseId: number;
//   title: string;
//   content: string;
//   courseDays: string;
//   likeCount: number;
//   thumbnailUrl: string;
//   places: [];
//   isLiked: false;
//   isBookmarked: true;
// }

// export default function SearchCourseList(): JSX.Element {
//   const { courseList, totalElements, totalPages } = useAppSelector(
//     (state) => state.course
//   );
//   const { keyword } = useAppSelector((state) => state.filter);
//   const page = useAppSelector((state) => state.page.page);
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(setPage(page));
//     dispatch(
//       getCourseListAction({
//         page,
//         ...(keyword ? { keyword } : {}),
//       })
//     );
//   }, [dispatch, page, keyword]);

//   return (
//     <>
//       <section className={styles.section}>
//         <h3 className={styles.h3}>검색하신 결과: {keyword} </h3>
//         <ul className={styles.keywordList}>
//           {courseList.length > 0 ? (
//             <ListContainer>
//               {courseList?.map((course) => (
//                 <CourseItem
//                   key={course.courseId}
//                   courseId={course.courseId}
//                   title={course.title}
//                   content={course.content}
//                   likeCount={course.likeCount}
//                   thumbnailUrl={course.thumbnailUrl}
//                   courseDays={course.courseDays}
//                   isBookmarked={course.isBookmarked}
//                   isLiked={course.isLiked}
//                   places={course.places}
//                 />
//               ))}
//             </ListContainer>
//           ) : (
//             <div className={styles.div}>
//               <p className={styles.noResult}>
//                 해당하는 검색 결과가 없습니다. 😢
//               </p>
//             </div>
//           )}
//         </ul>
//         {totalPages !== 0 && totalPages ? (
//           <Pagebar totalPage={totalPages} />
//         ) : null}
//       </section>
//     </>
//   );
// }
