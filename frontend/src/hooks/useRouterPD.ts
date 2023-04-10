import { useState } from "react";
import { useRouter } from "next/router";

export const useRouteState = () => {
  const router = useRouter();
  const [routeState, setRouteState] = useState(router.query);

  const updateRouteState = (newState: any) => {
    setRouteState((prevRouteState) => {
      const updatedRouteState = { ...prevRouteState, ...newState };
      router.push({
        pathname: router.pathname,
        query: updatedRouteState,
      });
      return updatedRouteState;
    });
  };

  return [routeState, updateRouteState];
};
