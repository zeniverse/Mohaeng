import { useRouter } from "next/router";
import cookie from "react-cookies";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetLog } from "../store/reducers/loginTokenSlice";

function useDeleteToken() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const deleteToken = () => {
      cookie.remove("accessToken", { path: "/" });
      dispatch(resetLog());
      router.push("/");
    };

    const timer = setTimeout(deleteToken, 24 * 60 * 60 * 1000); // 24시간

    return () => {
      clearTimeout(timer);
    };
  }, []);
}

export default useDeleteToken;
