import "../styles/globals.css";
import "../styles/slider.css";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store/store";
import GlobalModal from "../components/Modal/GlobalModal";
import AppLayout from "../components/Layout/AppLayout";
import { Noto_Sans_KR } from "next/font/google";
import { setToken } from "../store/reducers/loginTokenSlice";
import cookies from "next-cookies";

const NotoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  // const dispatch = useDispatch();
  // const accessToken = localStorage.getItem("accessToken");
  // dispatch(setToken(accessToken));

  return (
    <>
      <style jsx global>{`
        :root {
          --primary-font: ${NotoSansKR.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>모두의 여행</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <Provider store={store}>
        <GlobalModal />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </>
  );
}

// _app.tsx에서 전역으로 getInitialProps를 적용하게 되면, 모든 페이지가 서버 사이드 렌더링이 됨
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  // 서버 사이드 쿠키 얻어오기
  const { ctx } = appContext;
  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies["accessToken"];
  if (accessTokenByCookie !== undefined) {
    const refreshTokenByCookie = allCookies["refreshToken"] || "";
    setToken({ accessTokenByCookie, refreshTokenByCookie });
  }

  return { ...appProps };
};

export default MyApp;
