import axios from "axios";
import cookie from "react-cookies";

type setToken = {
  accessToken: string;
  refreshToken: string;
};

function setToken(accessToken: string, refreshToken: string) {
  axios.defaults.headers.common["Access-Token"] = accessToken;
  axios.defaults.headers.common["Refresh-Token"] = refreshToken;

  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24);

  cookie.save("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: false,
  });
  cookie.save("refreshToken", refreshToken, {
    path: "/",
    expires,
    httpOnly: false,
  });
}

export { setToken };
