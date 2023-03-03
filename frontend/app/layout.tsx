"use client";

import "../styles/globals.css";
import Header from "../components/Header/Header";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store/store";
import GlobalModal from "../components/Modal/GlobalModal";
import Footer from "../components/Footer/Footer";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <SessionProvider session={session}>
          <Provider store={store}>
            <GlobalModal />
            <Header />
            {children}
            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
