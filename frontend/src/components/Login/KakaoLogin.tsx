import {
  setEmail,
  setId,
  setNickname,
  setToken,
  setProfileUrl,
} from "@/src/store/reducers/loginTokenSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import cookie from "react-cookies";

const KakaoLogin = () => {
  const router = useRouter();
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoCode = async () => {
      try {
        const response = await axios.get(`/oauth/token?code=${code}`, {
          withCredentials: true,
        });
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.accessToken;
        cookie.save("accessToken", response.data.accessToken, { path: "/" });
        cookie.save("refreshToken", response.data.refreshToken, {
          path: "/",
        });
        setToken(accessToken);
        setToken(refreshToken);
        dispatch(setToken(accessToken));

        if (accessToken) {
          try {
            // loginInfo에서 정보 받아오기, 토큰 헤더에 담아서 전송
            axios.defaults.headers.common["Access-Token"] = accessToken;
            const userRes = await axios.get(`/loginInfo`, {
              headers: {
                "Access-Token": `${accessToken}`,
              },
              withCredentials: true,
            });
            // 여기에서 받아온 유저 정보를 리덕스에 저장한다
            console.log(userRes.data);
            const { id, nickName, email, profileUrl } = userRes.data.data;
            dispatch(setId(id));
            dispatch(setEmail(email));
            dispatch(setNickname(nickName));
            dispatch(setProfileUrl(profileUrl));
            router.replace("/");
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("error");
        }
        setValid(true);
      } catch (e) {
        console.log(e);
        router.push("/");
      }
    };
    kakaoCode();
  }, [dispatch]);

  if (!valid) {
    return <Loading />;
  }
  return <></>;
};

export default KakaoLogin;

// useEffect(() => {
//   let code = new URL(window.location.href).searchParams.get("code");
//   const kakao = async () => {
//     await axios
//       .get(`http://219.255.1.253:8080/oauth/token?code=${code}`)
//       .then((res) => {
//         localStorage.setItem("token", res.headers.Access-Token);
//         router.replace("/");
//       })
//       //.then(res => res.json())
//       //.then(data => {
//       // localStorage.setItem('token', data.token) })

//       .catch((error) => console.log(error));
//   };
//   kakao();
// }, []);
