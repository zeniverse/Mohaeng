"use client";
import { setToken } from "@/src/store/reducers/loginTokenSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
          `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google/${code}`
        )
        .then((res) => {
          localStorage.setItem("token", res.headers.authorization);
          router.replace("/");
        })

        .catch((error) => console.log(error));
    };
    if (code) {
      google();
    }
  }, []);

  return <></>;
};

export default GoogleLogin;
