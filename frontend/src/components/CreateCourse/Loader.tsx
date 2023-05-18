import { UseInfiniteScroll } from "@/src/hooks/useInfiniteScroll";

// Loader.tsx
type LoaderProps = Pick<
  UseInfiniteScroll,
  "isLoading" | "loadMoreCallback" | "isLastPage"
>;

export const Loader = ({
  isLoading,
  isLastPage,
  loadMoreCallback,
}: LoaderProps) => {
  if (isLoading) return <p>로딩 중...</p>;

  if (isLastPage) return <p>검색 결과가 더이상 존재하지 않습니다.</p>;

  return <div ref={loadMoreCallback}>콜백 실행</div>;
};
