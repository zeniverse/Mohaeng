import "../styles/globals.css";
import "../styles/slider.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store/store";
import GlobalModal from "../components/Modal/GlobalModal";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AppLayout from "../components/Layout/AppLayout";
import { Gowun_Dodum, Noto_Sans_KR, Open_Sans } from "next/font/google";

const OpenSans = Open_Sans({ weight: "400", subsets: ["latin"] });
const NotoSans = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });
const GowunDodum = Gowun_Dodum({ weight: "400", subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${GowunDodum.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>모두의 여행</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Provider store={store}>
        <GlobalModal />
        {/* <div className="wrap">
          <Header />
          <div className="body-content"> */}
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        {/* </div>
          <Footer />
        </div> */}
      </Provider>
    </>
  );
}
