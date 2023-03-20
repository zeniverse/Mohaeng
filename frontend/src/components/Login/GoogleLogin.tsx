"use client";
import { setToken } from "@/src/store/reducers/loginTokenSlice";
import axios from "axios";
import { useRouter } from "next/router";
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

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    const google = async () => {
      return await axios
        .get(
          `${process.env.NEXT_PUBLIC_GOOGLE_URL}/oauth2/authorization/google/${code}`
        )
        .then((response) => {
          console.log(response.data);
          if (response.ok) {
            // 성공하면 홈으로 리다이렉트
            return response.data; 
            router.push("/");
          }
        })
        .catch((err) => {
          console.log("에러", err.res);
        });
    };
    if (code) {
      google();
    }
  }, []);

  return <>{valid ? <LoginInfo /> : <Loading />}</>;
};

export default GoogleLogin;
