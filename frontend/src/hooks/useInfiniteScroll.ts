import { useDebounce } from "@/src/hooks/useDebounce";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

// useInfiniteScroll.ts
export interface UseInfiniteScroll {
  isLoading: boolean;
  loadMoreCallback: (el: HTMLDivElement) => void;
  hasDynamicPosts: boolean;
  dynamicPosts: any;
  isLastPage: boolean;
}

export const useInfiniteScroll = (
  posts: any[],
  hasNext: boolean,
  keyword: any
): UseInfiniteScroll => {
  const [isLoading, setIsLoading] = useState(false);

  const [hasDynamicPosts, setHasDynamicPosts] = useState(hasNext);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>(posts);

  const [isLastPage, setIsLastPage] = useState(false);

  const [isLastItemId, setIsLastItemId] = useState<number | undefined>(
    undefined
  );

  console.log("실행됨");

  const observerRef = useRef<IntersectionObserver>();
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

  useEffect(() => {
    setDynamicPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (dynamicPosts.length !== undefined) {
      setIsLastItemId(dynamicPosts[dynamicPosts.length - 1]?.placeId);
    }
  }, [dynamicPosts]);

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setIsLoading(true);
        if (loadMoreTimeoutRef.current) {
          clearTimeout(loadMoreTimeoutRef.current);
        }

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(() => {
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/course/placeSearch?keyword=${keyword}&lastId=${isLastItemId}`
            )
            .then((resp) => {
              const { hasNext, places } = resp.data.data;
              setHasDynamicPosts(true);
              setIsLastPage(!hasNext);

              if (places?.length > 0) {
                setDynamicPosts((prevPosts) => [...prevPosts, ...places]);
                setIsLoading(false);
                if (hasNext) {
                  const lastIndex = places.length - 1;
                  setIsLastItemId(places[lastIndex]);
                }
              }
            });
        }, 500);
      }
    },
    [loadMoreTimeoutRef, setIsLoading, dynamicPosts, keyword, isLastItemId]
  );

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      observerRef.current = new IntersectionObserver(handleObserver, option);

      if (el) observerRef.current.observe(el);
    },
    [handleObserver, isLoading]
  );

  return {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage,
  };
};
