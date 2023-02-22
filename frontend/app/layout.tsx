"use client";

import "./globals.css";
import Header from "@/component/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Header />
        {children}

      </body>
    </html>
  );
}
