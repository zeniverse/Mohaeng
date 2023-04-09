import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// State에 저장해서 id 값 보내줘서 404 해결하려 했지만 실패
export const useQueryId = (key: string): string | undefined => {
  const router = useRouter();
  const [queryValue, setQueryValue] = useState<string>();

  useEffect(() => {
    if (router.query[key]) {
      setQueryValue(String(router.query[key]));
    }
  }, [router.query, key]);

  return queryValue;
};
