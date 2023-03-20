import { setToken } from "@/src/store/reducers/loginTokenSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import LoginInfo from "./LoginInfo";

const KakaoLogin = () => {
  const router = useRouter();
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
    const postCode = async () => {
      await axios
        .get(`http://localhost:8080/login/oauth2/code/kakao/${code}`)
        .then((res) => {
          localStorage.setItem("token", res.headers.authorization);
          router.replace("/");
        })
        .catch();
    };
    postCode();
  }, []);
  // 성공하면 LoginInfo 컴포넌트로 가고, 실패하면 Loading에 머무른다.
  // {valid ? <LoginInfo /> : <Loading />}
  return (
    <>
      <Loading />
    </>
  );
};

export default KakaoLogin;
