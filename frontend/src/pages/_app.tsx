import "../styles/globals.css";
import "../styles/slider.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store/store";
import GlobalModal from "../components/Modal/GlobalModal";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>모두의 여행</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Provider store={store}>
        <GlobalModal />
        <div className="wrap">
          <Header />
          <div className="body-content">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </Provider>
    </>
  );
}
