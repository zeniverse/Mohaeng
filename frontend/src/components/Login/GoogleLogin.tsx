"use client";
import { setToken } from "@/src/store/reducers/loginTokenSlice";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { setToken } from "../../../store/reducers/logintokenSlice";
// import { setSocialEmail } from "../../../store/reducers/socialSlice";
import Loading from "./Loading";
import LoginInfo from "./LoginInfo";

const GoogleLogin = () => {
  const router = useRouter();
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const BASE_URL = "http://localhost:8080/oauth2/authorization/google";

  ///oauth2/authorization/google

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    console.log(code);

    axios
      .get("/oauth2/authorization/google", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: code,
        },
      })
      .then((response) => {
        console.log("Data: ", response.data);
        if (response.ok) {
          // 성공하면 홈으로 리다이렉트
          router.push("/");
        } else {
          // 실패하면 에러 페이지로 리다이렉트
          router.push("/notifications/authentication-failed");
        }
      })
      .catch((err) => {
        console.log("An error occurred:", err.response);
      });

    // const PostCode = async () => {
    //   await fetch(`http://10.58.3.11:8000/oauth2/authorization/google`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": application/x-www-form-urlencoded,
    //     },
    //     body: JSON.stringify({
    //       authCode: code,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((res) => console.log(res));
    // };
    // PostCode();
    // .then((err) => console.log("소셜로그인 에러", err);)

    // fetch("/api/users/kakao-login", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           authCode: code,
    //         })
    // axios
    //   .get("/oauth2/authorization/google", {
    //     params: { authorizationCode: code },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     router.replace("/");
    //     window.alert("로그인 성공!");

    // .get(`${BASE_URL}/code?=${code}`)
    // .then((res) => {
    //   console.log(res); // 토큰이 넘어올 것임

    // const ACCESS_TOKEN = res.data.accessToken;
    // localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
    // ; // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)

    // catch((err) => {
    //       console.log("소셜로그인 에러", err);
    //       router.replace("/"); // 로그인 실패하면 로그인화면으로 돌려보냄
    //     });
    // axios
    //   .post("/oauth2/authorization/google", null, {
    //     params: { authorizationCode: GOOGLE_CODE },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res);

    //     // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
    //     localStorage.setItem("name", res.data.user_name); // 일단 이름만 저장했다.

    //     router.replace("/loginInfo");
    //     alert("로그인 되었습니다!");
  }, []);

  //   useEffect(() => {
  //     const GOOGLE_CODE = new URL(window.location.href).searchParams.get("code");

  //     axios
  //       .post(`/oauth2/authorization/google`, null, {
  //         params: { GOOGLE_CODE },
  //         withCredentials: true,
  //       })
  //       .then((res) => res.())
  //       .then((data) => {
  //         localStorage.setItem("token", data.token);
  //         router.replace("/");
  //         alert("로그인 되었습니다!");
  //       });
  //   }, []);

  return <>{valid ? <LoginInfo /> : <Loading />}</>;
};

export default GoogleLogin;
