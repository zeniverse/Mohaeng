import {
  setEmail,
  setId,
  setNickname,
  setToken,
} from "@/src/store/reducers/loginTokenSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

const KakaoLogin = () => {
  const router = useRouter();
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  // ${process.env.PUBLIC_NEXT_BASE_URL}
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoCode = async () => {
      try {
        const response = await axios.get(
          `http://219.255.1.253:8080/oauth/token?code=${code}`
        );
        const { accessToken } = response.data;
        localStorage.setItem("token", response.headers.authorization);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        dispatch(setToken(accessToken));
        console.log(accessToken);
        router.replace("/");
        console.log("로그인 성공!");
        if (accessToken) {
          try {
            // loginInfo에서 정보 받아오기, 토큰 헤더에 담아서 전송
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            const userResponse = await axios.post(
              `http://219.255.1.253:8080/loginInfo`
            );
            // 여기에서 받아온 유저 정보를 리덕스에 저장한다
            const { id, email, nickname } = userResponse.data;
            dispatch(setId(id));
            dispatch(setEmail(email));
            dispatch(setNickname(nickname));
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("error");
        }
        setValid(true);
      } catch (e) {
        console.log(e);
        // router.push("/");
        // alert("로그인되지 않았습니다.");
      }
    };
    kakaoCode();
  }, [dispatch]);
  return (
    <>
      <Loading />
    </>
  );
};

export default KakaoLogin;

// useEffect(() => {
//   let code = new URL(window.location.href).searchParams.get("code");
//   const kakao = async () => {
//     await axios
//       .get(`http://219.255.1.253:8080/oauth/token?code=${code}`)
//       .then((res) => {
//         localStorage.setItem("token", res.headers.authorization);
//         router.replace("/");
//       })
//       //.then(res => res.json())
//       //.then(data => {
//       // localStorage.setItem('token', data.token) })

//       .catch((error) => console.log(error));
//   };
//   kakao();
// }, []);
