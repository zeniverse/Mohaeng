import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// State에 저장해서 id 값 보내줘서 404 해결하려 했지만 실패
export const useRouterQuery = (key: string): number | undefined => {
  const router = useRouter();
  const [queryValue, setQueryValue] = useState<number>();

  useEffect(() => {
    if (router.query[key]) {
      setQueryValue(Number(router.query[key]));
    }
  }, [router.query, key]);

  return queryValue;
};
