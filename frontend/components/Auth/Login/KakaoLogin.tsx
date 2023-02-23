import { apiInstance } from "@/api/setting";
import Home from "@/app/page";
import { Router } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// const KakaoLogin = () => {
//   const [valid, setValid] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // code 추출부분
//     const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
//     const postCode = async () => {
//       try {
//         // 인가코드 서버로 보내주기
//         const response = await apiInstance.post("/auth/kakao", null, {
//           params: { authorizationCode: KAKAO_CODE },
//         });

// 서버에서 인가코드를 가지고 카카오에서 개인정보를 받아온 뒤, 응답값으로 회원가입 유무를 판단할 email을 보내준다.
// const userEmail = response.data.success.kakao_account.email;

// 회원가입 유무 판단
// const checkUser = await apiInstance.post("/users/check/email", {
//   email: userEmail,
// });

// 이미 있는 계정이라면 서버에서 액세스 토큰 받고 홈으로 이동한다.
// if (checkUser.data.isEmailExisted) {
//   try {
//     const tokenResponse = await apiInstance.post("/auth", {
//       email: userEmail,
//     });
//     const { accessToken } = tokenResponse.data;
//     dispatch(setToken(accessToken));
//     Router.replace("/");
//     console.log("✅ 로그인 완료");
//   } catch (e) {
//     console.log(e.response);
//   }
// } else {
//   console.error("error");
// }

// 없는 계정이라면 회원정보 적을 Signupinfo 컴포넌트로 간다.
//       setValid(true);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// }, []);

// 성공하면 메인으로 가고, 실패하면 로딩 메시지
// return <>{valid ? <Home /> : <p>Loading...</p>}</>;

export default KakaoLogin;
