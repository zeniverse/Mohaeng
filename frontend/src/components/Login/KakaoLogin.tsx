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
      try {
        const response = await axios
          .post(`/oauth2/authorization/kakao`, null, {
            params: { authorizationCode: KAKAO_CODE },
            withCredentials: true,
          })
          .then((res) => console.log(res));

        // 서버에서 인가코드를 가지고 카카오에서 개인정보를 받아온 뒤, 응답값으로 회원가입 유무를 판단할 email을 보내준다.
        const userEmail = response.data.success.kakao_account.email;

        // 회원가입 유무 판단
        const checkUser = await axios.post("/users/check/email", {
          email: userEmail,
        });

        // 이미 있는 계정이라면 서버에서 액세스 토큰 받고 홈으로 이동한다.
        if (checkUser.data.isEmailExisted) {
          try {
            // 토큰 받는 주소 설정이
            const tokenResponse = await axios.post("/auth", {
              email: userEmail,
            });
            const { accessToken } = tokenResponse.data;
            dispatch(setToken(accessToken));
            router.replace("/");
            alert("로그인되었습니다!");
          } catch (e) {
            console.log(e.response);
          }
        } else {
          console.error("error");
        }

        // 없는 계정이라면 회원정보 적을 info 컴포넌트로 간다.
        setValid(true);
      } catch (e) {
        console.log(e);
      }
    };
    postCode();
  }, []);

  // 성공하면 LoginInfo 컴포넌트로 가고, 실패하면 Loading에 머무른다.
  return <>{valid ? <LoginInfo /> : <Loading />}</>;
};

export default KakaoLogin;

// import { NextPage } from "next";
// import { useRouter } from "next/router";
// import { useCallback, useEffect } from "react";

// interface ResponseType {
//   ok: boolean;
//   error?: any;
// }

// const Kakao: NextPage = () => {
//   const router = useRouter();
//   const { code: authCode, error: kakaoServerError } = router.query;

//   const loginHandler = useCallback(
//     async (code: string | string[]) => {
//       // 백엔드에 전송
//       const response: ResponseType = await fetch("/api/users/kakao-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           authCode: code,
//         }),
//       }).then((res) => res.json());

//       if (response.ok) {
//         // 성공하면 홈으로 리다이렉트
//         router.push("/");
//       } else {
//         // 실패하면 에러 페이지로 리다이렉트
//         router.push("/notifications/authentication-failed");
//       }
//     },
//     [router]
//   );

//   useEffect(() => {
//     if (authCode) {
//       loginHandler(authCode);

//       // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
//     } else if (kakaoServerError) {
//       router.push("/notifications/authentication-failed");
//     }
//   }, [loginHandler, authCode, kakaoServerError, router]);

//   return <h2>로그인 중입니다..</h2>;
// };
