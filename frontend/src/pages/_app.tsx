import "../styles/globals.css";
import "../styles/slider.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store/store";
import GlobalModal from "../components/Modal/GlobalModal";
import AppLayout from "../components/Layout/AppLayout";
import { Gowun_Dodum, Noto_Sans_KR, Open_Sans } from "next/font/google";

const NotoSansKR = Noto_Sans_KR({
  weight: "400",
  subsets: ["latin"],
  display: "swap", // 추가
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
          :root {
            --primary-font: ${NotoSansKR.style.fontFamily};
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
