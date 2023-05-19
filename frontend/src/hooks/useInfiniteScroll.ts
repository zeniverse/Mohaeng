import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Places } from "../components/CreateCourse/CoursePlaceInput";
import CourseApiConfig from "../services/ApiConfig";

// useInfiniteScroll.ts
export interface UseInfiniteScroll {
  isLoading: boolean;
  loadMoreCallback: (el: HTMLDivElement) => void;
  hasDynamicPosts: boolean;
  dynamicPosts: Places[];
  isLastPage: boolean;
}

export const useInfiniteScroll = (
  posts: Places[],
  hasNext: boolean,
  keyword: string | null
): UseInfiniteScroll => {
  const [dynamicPosts, setDynamicPosts] = useState<Places[]>(posts);
  const [isLoading, setIsLoading] = useState(false);

  const [hasDynamicPosts, setHasDynamicPosts] = useState(false);

  const [isLastPage, setIsLastPage] = useState(false);

  const [lastItemId, setLastItemId] = useState<number | undefined>(undefined);
  const [lastItemRating, setLastItemRating] = useState<string | undefined>(
    undefined
  );

  const observerRef = useRef<IntersectionObserver>();
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

  useEffect(() => {
    // post가 변경되면 dynamicPosts에 저장하고 마지막 item의 id와 rating을 저장함.
    setDynamicPosts(posts);
    setHasDynamicPosts(false);
    setLastItemId(posts[posts.length - 1]?.placeId);
    setLastItemRating(posts[posts.length - 1]?.rating);
    setIsLastPage(!hasNext);
  }, [posts]);

  /** Intersection Observer의 콜백 함수 */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      // 감지된 요소와 관련된 정보를 포함하고 있는 첫 번째 요소 사용.
      const target = entries[0];
      if (!hasDynamicPosts) observer.unobserve(target.target);

      // 관찰 대상 요소가 뷰포트에 진입했는지를 나타내는 불리언 값
      if (target.isIntersecting) {
        setIsLoading(true);
        if (loadMoreTimeoutRef.current) {
          // 이전에 설정된 타임아웃을 제거 함으로써 이전의 타임아웃 이벤트가 실행되지 않도록 한다.
          clearTimeout(loadMoreTimeoutRef.current);
        }

        // this timeout debounces the intersection events
        // intersection 이벤트를 디바운스한다. 500ms의 지연 시간 후에 함수 내의 코드 블록이 실행된다.
        loadMoreTimeoutRef.current = setTimeout(() => {
          axios
            .get(
              `${CourseApiConfig.course}/placeSearch?keyword=${keyword}&lastId=${lastItemId}&lastRating=${lastItemRating}`
            )
            .then((resp) => {
              const { hasNext, places } = resp.data.data;
              if (places?.length > 0) {
                const newDynamicPosts = [...dynamicPosts, ...places];
                setDynamicPosts(newDynamicPosts);
                setHasDynamicPosts(true);

                setIsLastPage(!hasNext);
                if (hasNext) {
                  const lastIndex = places.length - 1;
                  setLastItemId(places[lastIndex].placeId);
                  setLastItemRating(places[lastIndex].rating);
                }
              }
            })
            .finally(() => {
              setIsLoading(false);
            });
        }, 500);
      }
    },
    [keyword, lastItemId, lastItemRating, hasDynamicPosts, setDynamicPosts]
  );

  const loadMoreCallback = useCallback(
    // el: Intersection Observer의 대상 요소
    (el: HTMLDivElement | null) => {
      if (isLoading || !el) return;
      // 이전에 관찰하던 요소를 중단하고 새로운 요소를 관찰하기 위해 이전에 생성된 IntersectionObserver 인스턴스를 해제한다.
      if (observerRef.current) observerRef.current.disconnect();

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      };
      // 새로운 IntersectionObserver 인스턴스를 생성
      observerRef.current = new IntersectionObserver(handleObserver, option);

      // el을 관찰 대상으로 추가
      observerRef.current.observe(el);
    },
    [handleObserver, isLoading, hasDynamicPosts]
  );

  return {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage,
  };
};
