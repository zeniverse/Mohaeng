import { useRouter } from "next/router";
import cookie from "react-cookies";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetLog } from "../store/reducers/loginTokenSlice";

function useDeleteToken() {
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = cookie.load("accessToken");

  useEffect(() => {
    const deleteToken = () => {
      cookie.remove("accessToken", { path: "/" });
      dispatch(resetLog());
      router.replace("/");
    };

    if (accessToken) {
      const timer = setTimeout(deleteToken, 24 * 60 * 60 * 1000); // 24시간

      return () => {
        clearTimeout(timer);
      };
    }
  }, [accessToken]);
}

export default useDeleteToken;
