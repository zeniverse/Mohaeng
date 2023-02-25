"use client";

import "./globals.css";
import Header from "@/components/Header/Header";
import { Provider } from "react-redux";
import styles from "./page.module.css";
import store from "@/store/store";
import GlobalModal from "@/components/Modal/GlobalModal";
import Footer from "@/components/Footer/Footer";

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
