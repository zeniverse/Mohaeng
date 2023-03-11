import "../styles/globals.css";
import "../styles/slider.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store/store";
import GlobalModal from "../components/Modal/GlobalModal";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import { Noto_Sans_KR } from "next/font/google";

const NotoSansKR = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${NotoSansKR.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>모두의 여행</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Provider store={store}>
        <GlobalModal />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}
