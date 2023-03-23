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

  // ${process.env.PUBLIC_NEXT_BASE_URL}
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakao = async () => {
      await axios
        .get(`http://219.255.1.253:8080/oauth/token?code=${code}`)
        .then((res) => {
          sessionStorage.setItem("token", res.headers.authorization);
          router.replace("/");
          window.alert("로그인 성공!");
        })
        //.then(res => res.json())
        //.then(data => {
        // localStorage.setItem('token', data.token) })

        .catch((error) => console.log(error));
    };
    kakao();
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
