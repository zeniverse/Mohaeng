"use client";

import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import GlobalModal from "@/src/components/Modal/GlobalModal";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Provider store={store}>
          <GlobalModal />
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
